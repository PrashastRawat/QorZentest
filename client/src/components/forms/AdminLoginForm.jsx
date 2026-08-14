import { useState } from "react";
import { adminLogin } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

export default function AdminLoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await adminLogin(form);
      saveAuth(res.data.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <input className="input" type="email" placeholder="Admin email" required value={form.email} onChange={e => setForm({...form,email:e.target.value})} />
      <input className="input" type="password" placeholder="Password" required value={form.password} onChange={e => setForm({...form,password:e.target.value})} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button className="w-full" loading={loading} type="submit">Admin Login</Button>
    </form>
  );
}
