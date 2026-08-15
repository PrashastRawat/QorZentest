import AdminLoginForm from "../../components/forms/AdminLoginForm";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-slate-950 px-5 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft">
        <p className="font-bold text-brand-600">QORZEN ADMIN</p>
        <h1 className="mt-2 text-3xl font-black">Dashboard Login</h1>
        <p className="mt-2 mb-7 text-sm text-slate-500">
          Authorized administrators only.
        </p>
        <AdminLoginForm />
        <p className="mt-6 text-center text-sm text-slate-500">
          Not an admin?{" "}
          <Link className="font-bold text-brand-600" to="/login">
            User login
          </Link>
        </p>
      </div>
    </section>
  );
}
