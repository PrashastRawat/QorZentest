import { useEffect, useState } from "react";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
} from "../../api/courseApi";
import Button from "../../components/common/Button";
import { Trash2 } from "lucide-react";

const initialForm = { title: "", description: "", price: "", instructor: "" };
const emptyLesson = { title: "", videoUrl: "", duration: "" };

export default function ManageCourses() {
  const [items, setItems]         = useState([]);
  const [form, setForm]           = useState(initialForm);
  const [lessons, setLessons]     = useState([{ ...emptyLesson }]);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

  const load = () =>
    getCourses()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  // ── Lesson helpers ────────────────────────────────────────────────────────
  const updateLesson = (index, field, value) =>
    setLessons((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );

  const addLesson    = () => setLessons((prev) => [...prev, { ...emptyLesson }]);
  const removeLesson = (index) =>
    setLessons((prev) => prev.filter((_, i) => i !== index));

  // ── Edit mode ─────────────────────────────────────────────────────────────
  const handleEdit = (item) => {
    setEditingId(item._id);
    setError("");
    setSuccess("");
    setForm({
      title:       item.title       || "",
      description: item.description || "",
      price:       item.price       || "",
      instructor:  item.instructor  || "",
    });
    // pre-fill existing lessons — map _id too so backend can match them
    setLessons(
      item.lessons?.length > 0
        ? item.lessons.map((l) => ({
            _id:      l._id || "",
            title:    l.title    || "",
            videoUrl: l.videoUrl || "",
            duration: l.duration || "",
          }))
        : [{ ...emptyLesson }]
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(initialForm);
    setLessons([{ ...emptyLesson }]);
    setImageFile(null);
    setError("");
    setSuccess("");
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (editingId) {
      // ── UPDATE — plain JSON, lessons replaced entirely ──────────────────
      const validLessons = lessons.filter((l) => l.title && l.videoUrl);
      if (validLessons.length === 0) {
        setError("At least one lesson with title and video URL is required");
        return;
      }
      setLoading(true);
      try {
        await updateCourse(editingId, {
          title:       form.title,
          description: form.description,
          price:       form.price,
          instructor:  form.instructor,
          lessons:     validLessons.map((l) => ({
            ...(l._id ? { _id: l._id } : {}),
            title:    l.title,
            videoUrl: l.videoUrl,
            duration: l.duration,
          })),
        });
        setSuccess("Course updated successfully!");
        handleCancel();
        load();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to update course");
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── CREATE — FormData with thumbnail ────────────────────────────────────
    if (!imageFile) {
      setError("Please select a thumbnail image");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title",       form.title);
      data.append("description", form.description);
      data.append("price",       form.price);
      data.append("instructor",  form.instructor);
      data.append("image",       imageFile);

      const validLessons = lessons.filter((l) => l.title && l.videoUrl);
      validLessons.forEach((lesson, i) => {
        data.append(`lessons[${i}][title]`,    lesson.title);
        data.append(`lessons[${i}][videoUrl]`, lesson.videoUrl);
        data.append(`lessons[${i}][duration]`, lesson.duration);
      });

      await createCourse(data);
      setForm(initialForm);
      setLessons([{ ...emptyLesson }]);
      setImageFile(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <section className="section bg-fuchsia-950 min-h-screen">
      <div className="container-page">
        <h1 className="section-title text-white">Manage Courses</h1>

        <form onSubmit={submit} className="card mt-10 grid gap-4 p-6 md:grid-cols-2">

          {/* Banners */}
          {success && (
            <div className="md:col-span-2 rounded-lg bg-green-500/20 border border-green-500 px-4 py-2 text-sm text-green-300">
              ✓ {success}
            </div>
          )}

          {/* Form header */}
          <div className="md:col-span-2 flex items-center justify-between">
            <h2 className="text-white font-semibold">
              {editingId ? "✏️ Edit Course" : "➕ Add New Course"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm text-slate-400 hover:text-white transition"
              >
                ✕ Cancel Edit
              </button>
            )}
          </div>

          <input
            className="input"
            placeholder="Course title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="input"
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            className="input md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Instructor name"
            value={form.instructor}
            onChange={(e) => setForm({ ...form, instructor: e.target.value })}
            required
          />

          {/* Thumbnail — create only */}
          {!editingId ? (
            <input
              className="input"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          ) : (
            <p className="text-xs text-slate-500 flex items-end">
              ℹ️ Thumbnail cannot be changed during edit.
            </p>
          )}

          {/* Lessons — editable in both modes */}
          <div className="md:col-span-2">
            <p className="mb-3 text-sm font-bold text-white">
              Lessons
              {editingId && (
                <span className="ml-2 text-xs font-normal text-slate-400">
                  (you can add, edit, or remove lessons)
                </span>
              )}
            </p>
            <div className="space-y-3">
              {lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="grid gap-2 sm:grid-cols-[2fr_2fr_1fr_auto]"
                >
                  <input
                    className="input"
                    placeholder="Lesson title"
                    value={lesson.title}
                    onChange={(e) => updateLesson(i, "title", e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Video URL"
                    value={lesson.videoUrl}
                    onChange={(e) => updateLesson(i, "videoUrl", e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Duration"
                    value={lesson.duration}
                    onChange={(e) => updateLesson(i, "duration", e.target.value)}
                  />
                  {lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLesson(i)}
                      className="flex items-center justify-center rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 px-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addLesson}
              className="mt-3 text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              + Add another lesson
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 md:col-span-2">{error}</p>
          )}

          <div className="md:col-span-2">
            <Button loading={loading}>
              {editingId ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </form>

        {/* Course list */}
        <div className="mt-8 grid gap-4">
          {items.map((c) => (
            <div
              key={c._id}
              className={`card flex items-center justify-between p-5 transition ${
                editingId === c._id ? "ring-2 ring-brand-500" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                {c.thumbnail?.url && (
                  <img
                    src={c.thumbnail.url}
                    alt={c.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                )}
                <div>
                  <b className="text-white">{c.title}</b>
                  <p className="text-sm text-slate-400">{c.instructor}</p>
                  <p className="text-sm font-semibold text-brand-400">
                    ₹{c.price}
                  </p>
                  <p className="text-xs text-slate-500">
                    {c.lessons?.length || 0} lesson(s)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <button
                  className="text-sm font-bold text-brand-400 hover:text-brand-300 transition"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="text-sm font-bold text-red-400 hover:text-red-300 transition"
                  onClick={async () => {
                    if (!window.confirm("Delete this course?")) return;
                    await deleteCourse(c._id);
                    if (editingId === c._id) handleCancel();
                    load();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}