import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../../components/forms/ContactForm";

export default function Contact() {
  return (
    <section className="section bg-slate-50">
      <div className="container-page grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-bold text-brand-600">CONTACT</p>
          <h1 className="mt-2 section-title">Let’s build something great.</h1>
          <p className="section-subtitle">
            Tell us what you are working on and our team will get back to you.
          </p>
          <div className="mt-8 grid gap-5 text-sm text-slate-600">
            <p className="flex gap-3">
              <Mail /> hello@qorzen.com
            </p>
            <p className="flex gap-3">
              <Phone /> +91 98765 43210
            </p>
            <p className="flex gap-3">
              <MapPin /> Uttarakhand, India
            </p>
          </div>
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
