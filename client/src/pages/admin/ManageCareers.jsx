import { useEffect, useState } from "react";
import {
  createCareer,
  updateCareer,
  deleteCareer,
  getCareers,
} from "../../api/careerApi";
import Button from "../../components/common/Button";

const initial = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  description: "",
  requirements: "",
};

const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];

export default function ManageCareers() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initial);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = () =>
    getCareers()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (item) => {
    setEditingId(item._id);
    setError("");
    setSuccess("");
    setForm({
      title: item.title || "",
      department: item.department || "",
      location: item.location || "",
      type: item.type || "Full-time",
      description: item.description || "",
      requirements: Array.isArray(item.requirements)
        ? item.requirements.join(", ")
        : item.requirements || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(initial);
    setError("");
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const payload = {
      title: form.title,
      department: form.department,
      location: form.location,
      type: form.type,
      description: form.description,
      requirements: form.requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateCareer(editingId, payload);
        setSuccess("Job listing updated successfully!");
        handleCancel();
      } else {
        await createCareer(payload);
        setForm(initial);
      }
      load();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save job listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section !bg-zinc-900 min-h-screen">
      <div className="container-page">
        <h1 className="section-title text-white">Manage Careers</h1>

        <form onSubmit={submit} className="card mt-10 grid gap-4 p-6 md:grid-cols-2">
          {success && (
            <div className="md:col-span-2 rounded-lg border border-green-500 bg-green-500/20 px-4 py-2 text-sm text-green-300">
              ✓ {success}
            </div>
          )}

          <div className="md:col-span-2 flex items-center justify-between">
            <h2 className="font-semibold text-white">
              {editingId ? "Edit Job Listing" : "New Job Listing"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm text-slate-400 hover:text-white"
              >
                ✕ Cancel Edit
              </button>
            )}
          </div>

          <input
            className="input"
            placeholder="Job title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Department (e.g. Engineering)"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Location (e.g. Remote, Dehradun)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <select
            className="input"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            {jobTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <textarea
            className="input md:col-span-2"
            placeholder="Job description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            className="input md:col-span-2"
            placeholder="Requirements, comma separated (e.g. 2+ years React, Strong CSS)"
            value={form.requirements}
            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          />

          {error && <p className="text-sm text-red-500 md:col-span-2">{error}</p>}

          <div className="md:col-span-2">
            <Button loading={loading}>
              {editingId ? "Update Listing" : "Post Job"}
            </Button>
          </div>
        </form>

        <div className="mt-8 grid gap-4">
          {items.map((c) => (
            <div
              key={c._id}
              className={`card flex items-center justify-between p-5 transition ${
                editingId === c._id ? "ring-2 ring-brand-500" : ""
              }`}
            >
              <div>
                <b className="text-white">{c.title}</b>
                <p className="text-sm text-slate-400">
                  {c.department} · {c.location} · {c.type}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <button
                  className="text-sm font-bold text-brand-400 hover:text-brand-300"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="text-sm font-bold text-red-400 hover:text-red-300"
                  onClick={async () => {
                    if (!window.confirm("Delete this listing?")) return;
                    await deleteCareer(c._id);
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