import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-black text-white">Qor<span className="text-brand-500">Zen</span></Link>
          <p className="mt-4 max-w-md leading-7 text-slate-400">
            We build modern digital products, websites and experiences that help businesses grow.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <Link to="/services" className="hover:text-white">Services</Link>
            <Link to="/portfolio" className="hover:text-white">Portfolio</Link>
            <Link to="/blog" className="hover:text-white">Blog</Link>
            <Link to="/career" className="hover:text-white">Career</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <p className="flex gap-2"><Mail size={17}/> hello@qorzen.com</p>
            <p className="flex gap-2"><Phone size={17}/> +91 98765 43210</p>
            <p className="flex gap-2"><MapPin size={17}/> Uttarakhand, India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} QorZen. All rights reserved.
      </div>
    </footer>
  );
}
