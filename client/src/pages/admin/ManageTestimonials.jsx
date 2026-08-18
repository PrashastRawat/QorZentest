import { useEffect, useState } from "react";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
} from "../../api/testimonialApi";
import Button from "../../components/common/Button";

const initial = {
  clientName: "",
  message: "",
};

export default function ManageTestimonials() {
  const [items, setItems]       = useState([]);
  const [form, setForm]         = useState(initial);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const load = () =>
    getTestimonials()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please select a client photo");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("clientName", form.clientName);
      data.append("message",    form.message);
      data.append("image",      imageFile);   // matches upload.single("image") in route

      await createTestimonial(data);
      setForm(initial);
      setImageFile(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPage title="Manage Testimonials">
      <form
        onSubmit={submit}
        className="card mb-8 grid gap-4 p-6 md:grid-cols-2"
      >
        <input
          className="input md:col-span-2"
          placeholder="Client name"
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          required
        />
        <textarea
          className="input md:col-span-2"
          placeholder="Client message / testimonial"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <input
          className="input md:col-span-2"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
        {error && (
          <p className="text-sm text-red-500 md:col-span-2">{error}</p>
        )}
        <div className="md:col-span-2">
          <Button loading={loading}>Add Testimonial</Button>
        </div>
      </form>

      <div className="grid gap-4">
        {items.map((t) => (
          <div
            key={t._id}
            className="card flex items-center justify-between p-5"
          >
            <div className="flex items-center gap-4">
              {t.photo?.url && (
                <img
                  src={t.photo.url}
                  alt={t.clientName}
                  className="h-14 w-14 rounded-full object-cover"
                />
              )}
              <div>
                <b>{t.clientName}</b>
                <p className="text-sm text-slate-400 mt-1">{t.message}</p>
              </div>
            </div>
            <button
              className="text-sm font-bold text-red-500"
              onClick={async () => {
                await deleteTestimonial(t._id);
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
    <section className="section bg-violet-950 min-h-screen">
      <div className="container-page">
        <h1 className="section-title text-white">{title}</h1>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}