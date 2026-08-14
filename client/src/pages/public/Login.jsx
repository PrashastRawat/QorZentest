import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";

export default function Login() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black">Welcome back</h1>
        <p className="mt-2 mb-7 text-sm text-slate-500">
          Sign in to your account.
        </p>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-slate-500">
          Admin?{" "}
          <Link className="font-bold text-brand-600" to="/admin/login">
            Admin login
          </Link>
        </p>
      </div>
    </section>
  );
}
