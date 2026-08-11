import {
  ShieldCheck,
  Expand,
  Lock,
  Clock,
  SlidersHorizontal,
  Users,
  Headset,
  CalendarCheck,
  Sparkles
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Battle-Tested Reliability",
    description:
      "We build resilient software designed to withstand heavy production workloads backed by continuous automated integration tests.",
  },
  {
    icon: Expand,
    title: "Infinite Microservices Scale",
    description:
      "Architected to scale seamlessly from early prototype to millions of active enterprise transactions without performance bottlenecks.",
  },
  {
    icon: Lock,
    title: "Zero-Trust Security Mesh",
    description:
      "Industry best practices, encrypted payload handling, and role-based security layers protecting your data around the clock.",
  },
  {
    icon: Clock,
    title: "Accelerated Time-to-Market",
    description:
      "Agile engineering sprints and modular SDKs ensure your product ships weeks ahead of traditional agency timelines.",
  },
  {
    icon: SlidersHorizontal,
    title: "100% Tailored Engineering",
    description:
      "No boilerplate copy-pasting. Every system is bespoke-coded for your precise business logic and scaling requirements.",
  },
  {
    icon: Users,
    title: "Dedicated Senior Engineers",
    description:
      "Direct collaboration with seasoned software architects, AI researchers, and UX designers dedicated to your project.",
  },
  {
    icon: Headset,
    title: "24/7 Engineered Support SLA",
    description:
      "Active infrastructure monitoring and rapid incident response teams keep your digital ecosystem running continuously.",
  },
  {
    icon: CalendarCheck,
    title: "Guaranteed Milestone Delivery",
    description:
      "Transparent project roadmaps with clear sprint deliverables, ensuring deadlines are met on time, every time.",
  },
];

export default function WhyUs() {
  return (
    <section className="section bg-dark-900 text-white">
      <div className="container-page relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs font-semibold text-purple-300">
            <Sparkles size={14} className="text-purple-400" />
            THE QORZEN ADVANTAGE
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why Enterprise Leaders <span className="text-gradient-brand">Choose QorZen.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg mx-auto">
            We bridge high-level product design with robust backend engineering to build digital products that dominate their markets.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/50 hover:shadow-glow"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 transition duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-glow">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white transition group-hover:text-brand-300">{title}</h3>
                <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">{description}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Enterprise Grade</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}