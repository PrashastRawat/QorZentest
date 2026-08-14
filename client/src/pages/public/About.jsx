export default function About() {
  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-bold text-brand-600">ABOUT US</p>
          <h1 className="mt-3 section-title">
            A small team with a big digital mindset.
          </h1>
          <p className="section-subtitle">
            QorZen is a digital product studio focused on building practical,
            beautiful and scalable technology.
          </p>
        </div>
        <div className="card bg-slate-950 p-8 text-slate-300">
          <h2 className="text-2xl font-bold text-white">Our mission</h2>
          <p className="mt-4 leading-8">
            Make high-quality digital development accessible to businesses that
            want to move faster without compromising on quality.
          </p>
        </div>
      </div>
    </section>
  );
}
