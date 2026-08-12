import { useEffect, useState } from "react";
import { createService, deleteService, getServices } from "../../api/serviceApi";
import Button from "../../components/common/Button";

export default function ManageServices() {
  const [items,setItems]=useState([]); const [form,setForm]=useState({title:"",description:""}); const [loading,setLoading]=useState(false);
  const load=()=>getServices().then(r=>setItems(r.data?.data||r.data||[])).catch(()=>{});
  useEffect(load,[]);
  const submit=async e=>{e.preventDefault();setLoading(true);try{await createService(form);setForm({title:"",description:""});load()}finally{setLoading(false)}};
  return <AdminPage title="Manage Services"><form onSubmit={submit} className="card mb-8 grid gap-4 p-6 md:grid-cols-3"><input className="input" placeholder="Service title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/><input className="input md:col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/><Button loading={loading}>Add Service</Button></form><div className="grid gap-4">{items.map(x=><div className="card flex items-center justify-between p-5" key={x._id}><div><b>{x.title}</b><p className="text-sm text-slate-500">{x.description}</p></div><button className="text-sm font-bold text-red-500" onClick={async()=>{await deleteService(x._id);load()}}>Delete</button></div>)}</div></AdminPage>;
}

function AdminPage({title,children}) { return <section className="section bg-slate-50"><div className="container-page"><h1 className="section-title">{title}</h1><div className="mt-10">{children}</div></div></section>; }
