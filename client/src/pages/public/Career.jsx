export default function Career() {
  const jobs = [
    ["Frontend Developer", "React, JavaScript, Tailwind CSS", "Full-time"],
    ["Backend Developer", "Node.js, Express, MongoDB", "Full-time"],
    ["UI/UX Designer", "Figma, design systems, user research", "Internship"]
  ];
  return <section className="section"><div className="container-page"><p className="font-bold text-brand-600">CAREERS</p><h1 className="mt-2 section-title">Build the future with us.</h1><p className="section-subtitle">Join a team that enjoys solving real problems with technology.</p><div className="mt-12 grid gap-5">{jobs.map(([title, skills, type]) => <div key={title} className="card flex flex-wrap items-center justify-between gap-5 p-6"><div><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-sm text-slate-600">{skills}</p></div><span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">{type}</span></div>)}</div></div></section>;
}
