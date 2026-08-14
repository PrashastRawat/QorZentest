import { useEffect, useState } from "react";
import { deleteSubmission, getSubmissions } from "../../api/contactApi";

export default function Submissions() {
  const [items, setItems] = useState([]);
  const load = () =>
    getSubmissions()
      .then((r) => setItems(r.data?.data || r.data || []))
      .catch(() => {});
  useEffect(load, []);
  return (
    <section className="section bg-slate-50">
      <div className="container-page">
        <h1 className="section-title">Contact Submissions</h1>
        <div className="mt-10 grid gap-5">
          {items.map((x) => (
            <article className="card p-6" key={x._id}>
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="font-bold">{x.name}</h2>
                  <p className="text-sm text-slate-500">
                    {x.email} {x.phone && `• ${x.phone}`}
                  </p>
                </div>
                <button
                  className="text-sm font-bold text-red-500"
                  onClick={async () => {
                    await deleteSubmission(x._id);
                    load();
                  }}
                >
                  Delete
                </button>
              </div>
              <p className="mt-4 font-semibold">{x.subject}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {x.message}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
