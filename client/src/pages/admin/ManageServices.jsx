import { useEffect, useState } from "react";
import {
  createService,
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
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initial);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = () =>
    getServices()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("priceStartingFrom", form.priceStartingFrom);
      form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
        .forEach((f) => data.append("features[]", f));

      data.append("whyChooseUs", form.whyChooseUs);

      form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => data.append("technologies[]", t));

      data.append("image", imageFile);

      await createService(data);
      setForm(initial);
      setImageFile(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPage title="Manage Services">
      <form
        onSubmit={submit}
        className="card mb-8 grid gap-4 p-6 md:grid-cols-2"
      >
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
          onChange={(e) =>
            setForm({ ...form, priceStartingFrom: e.target.value })
          }
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
          placeholder="Technologies used, comma separated (e.g. React, AWS, Node.js)"
          value={form.technologies}
          onChange={(e) => setForm({ ...form, technologies: e.target.value })}
        />
        <input
          className="input md:col-span-2"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
        {error && <p className="text-sm text-red-500 md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <Button loading={loading}>Add Service</Button>
        </div>
      </form>
      <div className="grid gap-4">
        {items.map((x) => (
          <div
            className="card flex items-center justify-between p-5"
            key={x._id}
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
                <b>{x.title}</b>
                <p className="text-sm text-slate-500">{x.description}</p>
                <p className="text-sm font-semibold text-brand-600">
                  ₹{x.priceStartingFrom}
                </p>
              </div>
            </div>
            <button
              className="text-sm font-bold text-red-500"
              onClick={async () => {
                await deleteService(x._id);
                load();
              }}
            >
              Delete
            </button>
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
