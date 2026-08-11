import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";

export default function AdminCrudPage({ title, fields, loader, creator, deleter }) {
  const [items,setItems]=useState([]); const [form,setForm]=useState(Object.fromEntries(fields.map(f=>[f,""]))); const [loading,setLoading]=useState(false);
  const load=()=>loader().then(r=>setItems(r.data?.data||r.data||[])).catch(()=>{});
  useEffect(load,[]);
  const submit=async e=>{e.preventDefault();setLoading(true);try{await creator(form);setForm(Object.fromEntries(fields.map(f=>[f,""])));load()}finally{setLoading(false)}};
  return <section className="section bg-slate-50"><div className="container-page"><h1 className="section-title">{title}</h1><form onSubmit={submit} className="card mt-10 grid gap-4 p-6 md:grid-cols-2">{fields.map(f=><input key={f} className="input" placeholder={f[0].toUpperCase()+f.slice(1)} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} required/>)}<Button loading={loading}>Add</Button></form><div className="mt-8 grid gap-4">{items.map(item=><div className="card flex items-center justify-between p-5" key={item._id}><div><b>{item.title || item.name}</b><p className="mt-1 text-sm text-slate-500">{item.description || item.excerpt || item.quote}</p></div><button className="text-sm font-bold text-red-500" onClick={async()=>{await deleter(item._id);load()}}>Delete</button></div>)}</div></div></section>;
}
