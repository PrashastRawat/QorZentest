import { useState } from "react";
import { signup } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signup(form);
      saveAuth(res.data.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <input
        className="input"
        placeholder="Full name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="input"
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="input"
        type="password"
        placeholder="Password (min 8  characters)"
        required
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button className="w-full" loading={loading} type="submit">
        Sign up
      </Button>
    </form>
  );
}
