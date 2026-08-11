import { useState } from "react";
import { submitContact } from "../../api/contactApi";
import Button from "../common/Button";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      await submitContact(form);
      setForm(initial);
      setStatus("Thanks! Your message has been submitted.");
    } catch (err) {
      setStatus(err.response?.data?.message || "Unable to submit. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <input className="input" name="name" placeholder="Your name" value={form.name} onChange={change} required />
        <input className="input" name="email" type="email" placeholder="Email address" value={form.email} onChange={change} required />
        <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={change} />
        <input className="input" name="subject" placeholder="Subject" value={form.subject} onChange={change} />
      </div>
      <textarea className="input min-h-36 resize-y" name="message" placeholder="Tell us about your project..." value={form.message} onChange={change} required />
      <Button type="submit" loading={loading}>Send Message</Button>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  );
}
