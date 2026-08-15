import { useEffect, useState } from "react";
import {
  createCourse,
  deleteCourse,
  getCourses,
} from "../../api/courseApi";
import Button from "../../components/common/Button";
import { Trash2 } from "lucide-react";

const initialForm = { title: "", description: "", price: "", instructor: "" };
const emptyLesson = { title: "", videoUrl: "", duration: "" };

export default function ManageCourses() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [lessons, setLessons] = useState([{ ...emptyLesson }]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    getCourses()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const updateLesson = (index, field, value) => {
    setLessons((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  };

  const addLesson = () => setLessons((prev) => [...prev, { ...emptyLesson }]);

  const removeLesson = (index) =>
    setLessons((prev) => prev.filter((_, i) => i !== index));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please select a thumbnail image");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("instructor", form.instructor);
      data.append("image", imageFile);

      const validLessons = lessons.filter((l) => l.title && l.videoUrl);
      validLessons.forEach((lesson, i) => {
        data.append(`lessons[${i}][title]`, lesson.title);
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

  return (
    <section className="section bg-fuchsia-950 min-h-screen">
      <div className="container-page">
        <h1 className="section-title text-white">Manage Courses</h1>

        <form onSubmit={submit} className="card mt-10 grid gap-4 p-6 md:grid-cols-2">
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
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />

          {/* Lessons */}
          <div className="md:col-span-2">
            <p className="mb-3 text-sm font-bold text-white">Lessons</p>
            <div className="space-y-3">
              {lessons.map((lesson, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-[2fr_2fr_1fr_auto]">
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
                      className="flex items-center justify-center rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10"
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

          {error && <p className="text-sm text-red-500 md:col-span-2">{error}</p>}
          <div className="md:col-span-2">
            <Button loading={loading}>Create Course</Button>
          </div>
        </form>

        <div className="mt-8 grid gap-4">
          {items.map((c) => (
            <div key={c._id} className="card flex items-center justify-between p-5">
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
                  <p className="text-sm font-semibold text-brand-400">₹{c.price}</p>
                </div>
              </div>
              <button
                className="text-sm font-bold text-red-400"
                onClick={async () => {
                  await deleteCourse(c._id);
                  load();
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}