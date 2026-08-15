import { useEffect, useState } from "react";
import {
  createPortfolioItem,
  deletePortfolioItem,
  getPortfolio,
} from "../../api/portfolioApi";
import Button from "../../components/common/Button";

const initial = { title: "", description: "", category: "" };

export default function ManagePortfolio() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initial);
  const [imageFiles, setImageFiles] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    getPortfolio()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const updateImage = (index, file) => {
    setImageFiles((prev) => prev.map((f, i) => (i === index ? file : f)));
  };

  const addImageSlot = () => setImageFiles((prev) => [...prev, null]);

  const removeImageSlot = (index) =>
    setImageFiles((prev) => prev.filter((_, i) => i !== index));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const validImages = imageFiles.filter(Boolean);
    if (validImages.length === 0) {
      setError("Please select at least one image");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      validImages.forEach((file) => data.append("images", file));

      await createPortfolioItem(data);
      setForm(initial);
      setImageFiles([null]);
      load();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create portfolio item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section !bg-blue-950 min-h-screen">
      <div className="container-page">
        <h1 className="section-title text-white">Manage Portfolio</h1>

        <form onSubmit={submit} className="card mt-10 grid gap-4 p-6 md:grid-cols-2">
          <input
            className="input"
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="input"
            placeholder="Category (e.g. Web Development)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            className="input md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-400">Images</label>
            <div className="space-y-2">
              {imageFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateImage(i, e.target.files[0])}
                  />
                  {imageFiles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageSlot(i)}
                      className="shrink-0 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addImageSlot}
              className="mt-2 text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              + Add another image
            </button>
          </div>

          {error && <p className="text-sm text-red-500 md:col-span-2">{error}</p>}
          <div className="md:col-span-2">
            <Button loading={loading}>Add Project</Button>
          </div>
        </form>

        <div className="mt-8 grid gap-4">
          {items.map((p) => (
            <div key={p._id} className="card flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                {p.images?.[0]?.url && (
                  <img
                    src={p.images[0].url}
                    alt={p.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                )}
                <div>
                  <b className="text-white">{p.title}</b>
                  <p className="text-sm text-slate-400">{p.category}</p>
                  {p.images?.length > 1 && (
                    <p className="text-xs text-slate-500">
                      +{p.images.length - 1} more image(s)
                    </p>
                  )}
                </div>
              </div>
              <button
                className="text-sm font-bold text-red-400"
                onClick={async () => {
                  await deletePortfolioItem(p._id);
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