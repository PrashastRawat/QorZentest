const stats = [
  ["30+", "Happy clients"],
  ["5+", "Years experience"],
  ["98%", "Client satisfaction"]
];

export default function StatsCounter() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-page grid grid-cols-3 divide-x divide-slate-200 py-10">
        {stats.map(([number, label]) => (
          <div key={label} className="px-4 text-center">
            <div className="text-3xl font-black text-slate-900">{number}</div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}