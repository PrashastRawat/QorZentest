import { useEffect, useState } from "react";
import {
  createService,
  updateService,
  deleteService,
  getServices,
} from "../../api/serviceApi";
import Button from "../../components/common/Button";

const initial = {
  title: "",
  description: "",
  priceStartingFrom: "",
  features: "",
  whyChooseUs: "",
  technologies: "",
};

export default function ManageServices() {
  const [items, setItems]         = useState([]);
  const [form, setForm]           = useState(initial);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null); // null = create mode, id = edit mode
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

  const load = () =>
    getServices()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});

  useEffect(() => { load(); }, []);

  // ── Enter edit mode — pre-fill form with existing data ────────────────────
  const handleEdit = (item) => {
    setEditingId(item._id);
    setError("");
    setSuccess("");
    setForm({
      title:             item.title || "",
      description:       item.description || "",
      priceStartingFrom: item.priceStartingFrom || "",
      // arrays come from DB → join back to comma string for the input
      features:          Array.isArray(item.features)
                           ? item.features.join(", ")
                           : item.features || "",
      whyChooseUs:       item.whyChooseUs || "",
      technologies:      Array.isArray(item.technologies)
                           ? item.technologies.join(", ")
                           : item.technologies || "",
    });
    // scroll form into view
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Cancel edit — reset to create mode ───────────────────────────────────
  const handleCancel = () => {
    setEditingId(null);
    setForm(initial);
    setImageFile(null);
    setError("");
    setSuccess("");
  };

  // ── Submit — create or update depending on editingId ─────────────────────
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Image only required when creating
    if (!editingId && !imageFile) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        // ── UPDATE — plain JSON, no image ──────────────────────────────────
        const payload = {
          title:             form.title,
          description:       form.description,
          priceStartingFrom: form.priceStartingFrom,
          whyChooseUs:       form.whyChooseUs,
          // split comma strings back to arrays
          features: form.features
            .split(",").map((f) => f.trim()).filter(Boolean),
          technologies: form.technologies
            .split(",").map((t) => t.trim()).filter(Boolean),
        };
        await updateService(editingId, payload);
        setSuccess("Service updated successfully!");
        handleCancel();
      } else {
        // ── CREATE — FormData with image ───────────────────────────────────
        const data = new FormData();
        data.append("title",             form.title);
        data.append("description",       form.description);
        data.append("priceStartingFrom", form.priceStartingFrom);
        data.append("whyChooseUs",       form.whyChooseUs);
        form.features
          .split(",").map((f) => f.trim()).filter(Boolean)
          .forEach((f) => data.append("features[]", f));
        form.technologies
          .split(",").map((t) => t.trim()).filter(Boolean)
          .forEach((t) => data.append("technologies[]", t));
        data.append("image", imageFile);

        await createService(data);
        setSuccess("Service created successfully!");
        setForm(initial);
        setImageFile(null);
      }
      load();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPage title="Manage Services">

      {/* ── Feedback banners ── */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-500/20 border border-red-500 px-4 py-2 text-sm text-red-300">
          ⚠ {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-green-500/20 border border-green-500 px-4 py-2 text-sm text-green-300">
          ✓ {success}
        </div>
      )}

      {/* ── Form — create or edit ── */}
      <form onSubmit={submit} className="card mb-8 grid gap-4 p-6 md:grid-cols-2">

        {/* Form header changes based on mode */}
        <div className="md:col-span-2 flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">
            {editingId ? "✏️ Edit Service" : "➕ Add New Service"}
          </h2>
          {/* Cancel button only visible in edit mode */}
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
          placeholder="Service title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="input"
          type="number"
          placeholder="Starting price (₹)"
          value={form.priceStartingFrom}
          onChange={(e) => setForm({ ...form, priceStartingFrom: e.target.value })}
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
          className="input md:col-span-2"
          placeholder="Features, comma separated (e.g. React, Node.js, Responsive)"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />
        <textarea
          className="input md:col-span-2"
          placeholder="Why choose us (one paragraph)"
          rows={3}
          value={form.whyChooseUs}
          onChange={(e) => setForm({ ...form, whyChooseUs: e.target.value })}
        />
        <input
          className="input md:col-span-2"
          placeholder="Technologies, comma separated (e.g. React, AWS, Node.js)"
          value={form.technologies}
          onChange={(e) => setForm({ ...form, technologies: e.target.value })}
        />

        {/* Image only shown when creating — backend update route has no multer */}
        {!editingId && (
          <div className="md:col-span-2">
            <input
              className="input w-full"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              Image can only be set on creation. To change it, delete and re-create.
            </p>
          </div>
        )}

        {/* In edit mode show a reminder about the image */}
        {editingId && (
          <p className="md:col-span-2 text-xs text-slate-500">
            ℹ️ Image cannot be changed during edit. Only text fields above will be updated.
          </p>
        )}

        <div className="md:col-span-2">
          <Button loading={loading}>
            {editingId ? "Update Service" : "Add Service"}
          </Button>
        </div>
      </form>

      {/* ── Existing services list ── */}
      <div className="grid gap-4">
        {items.map((x) => (
          <div
            key={x._id}
            className={`card flex items-center justify-between p-5 transition ${
              editingId === x._id ? "ring-2 ring-brand-500" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              {x.image?.url && (
                <img
                  src={x.image.url}
                  alt={x.title}
                  className="h-14 w-14 rounded-lg object-cover"
                />
              )}
              <div>
                <b className="text-white">{x.title}</b>
                <p className="text-sm text-slate-400">{x.description}</p>
                <p className="text-sm font-semibold text-brand-400">
                  ₹{x.priceStartingFrom}
                </p>
              </div>
            </div>

            {/* Edit + Delete buttons */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                className="text-sm font-bold text-brand-400 hover:text-brand-300 transition"
                onClick={() => handleEdit(x)}
              >
                Edit
              </button>
              <button
                className="text-sm font-bold text-red-500 hover:text-red-400 transition"
                onClick={async () => {
                  if (!window.confirm("Delete this service?")) return;
                  await deleteService(x._id);
                  // if we were editing this item, exit edit mode
                  if (editingId === x._id) handleCancel();
                  load();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}

function AdminPage({ title, children }) {
  return (
    <section className="section bg-indigo-950 min-h-screen">
      <div className="container-page">
        <h1 className="section-title text-white">{title}</h1>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}