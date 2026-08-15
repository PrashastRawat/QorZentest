import { Link } from "react-router-dom";
import SignupForm from "../../components/forms/SignupForm";

export default function Signup() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
        <p className="font-bold text-brand-400">QORZEN</p>
        <h1 className="mt-2 text-3xl font-black text-white">
          Create your account
        </h1>
        <p className="mt-2 mb-7 text-sm text-slate-400">
          Sign up to browse and purchase courses.
        </p>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-400">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
