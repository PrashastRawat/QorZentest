import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Play,
  Cpu,
  Zap,
  ShieldCheck,
  Code2,
  Terminal,
  Activity,
  CheckCircle2,
  Copy,
  Check,
  Server
} from "lucide-react";
import { Link } from "react-router-dom";

import cppLogo from "../../assets/tech/cpp_logo.png";
import jsLogo from "../../assets/tech/javascript_logo.jpg";
import dataLogo from "../../assets/tech/data_analytics_logo.webp";
import aiLogo from "../../assets/tech/ai_logo.jpg";
import angularLogo from "../../assets/tech/angular_logo.jpg";
import reactLogo from "../../assets/tech/react_logo.jpg";
import javaLogo from "../../assets/tech/java_logo.jpg";
import pythonLogo from "../../assets/tech/python_logo.png";
import mysqlLogo from "../../assets/tech/mysql_logo.png";
import awsLogo from "../../assets/tech/aws_logo.webp";

const floatingLogos = [
  { src: jsLogo, name: "JavaScript", pos: "left-[4%] top-[12%]", delay: "0s" },
  { src: pythonLogo, name: "Python", pos: "right-[4%] top-[10%]", delay: "0.6s" },
  { src: awsLogo, name: "AWS Cloud", pos: "left-[8%] bottom-[24%]", delay: "1.2s" },
  { src: reactLogo, name: "React", pos: "right-[6%] bottom-[22%]", delay: "1.8s" },
  { src: aiLogo, name: "AI / ML", pos: "right-[18%] top-[4%]", delay: "0.9s" },
  { src: dataLogo, name: "Data Science", pos: "left-[16%] top-[4%]", delay: "1.5s" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("ai");
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 1200);
  };

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-dark-900 pt-28 pb-20 text-white lg:pt-36 lg:pb-32">
      {/* Dynamic Glowing Mesh Background Effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-600/30 via-purple-600/20 to-transparent blur-[140px] animate-glow-pulse" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[400px] w-[400px] rounded-full bg-pink-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[120px]" />
      
      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-dark-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-line-grid opacity-30" />

      {/* Ambient Floating Tech Badges */}
      {floatingLogos.map((logo) => (
        <div
          key={logo.name}
          className={`hero-float-badge absolute hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-slate-900/80 px-3.5 py-2 backdrop-blur-md shadow-glass xl:flex ${logo.pos}`}
          style={{ animationDelay: logo.delay }}
        >
          <img src={logo.src} alt={logo.name} className="h-6 w-6 rounded-md object-contain" />
          <span className="text-xs font-semibold text-slate-300">{logo.name}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      ))}

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Top Announcement Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/30 bg-brand-950/60 px-4 py-2 text-xs sm:text-sm font-medium text-brand-200 shadow-glow backdrop-blur-xl transition hover:border-brand-400">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-ping" />
            <Sparkles size={16} className="text-brand-400" />
            <span>QorZen Platform 3.0</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Enterprise AI & Full-Stack Solutions</span>
            <ArrowRight size={14} className="text-brand-400" />
          </div>

          {/* Main Headline */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            Architecting <span className="text-gradient-brand">High-Performance</span> Digital Products.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
            From autonomous AI agents and cloud microservices to enterprise web apps and scalable infrastructure. We transform bold visions into market-leading software.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link to="/contact" className="btn-primary group">
              Start Your Project 
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/portfolio" className="btn-secondary group">
              Explore Live Demos
              <Sparkles size={16} className="ml-2 text-brand-400 transition-transform duration-300 group-hover:rotate-12" />
            </Link>
          </div>

          {/* Key Value Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>99.99% Uptime Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>AI-Driven Automation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Enterprise Grade Security</span>
            </div>
          </div>
        </div>

        {/* Interactive Live Showcase Terminal / Product Card */}
        <div className="mt-14 mx-auto max-w-5xl">
          <div className="relative rounded-2xl border border-slate-700/60 bg-dark-800/90 shadow-2xl backdrop-blur-xl overflow-hidden group">
            {/* Top Bar / Tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-500 hidden sm:inline">qorzen-core-v3.0.4</span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
                    activeTab === "ai"
                      ? "bg-brand-600 text-white shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Cpu size={14} />
                  <span>AI Engine</span>
                </button>
                <button
                  onClick={() => setActiveTab("cloud")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
                    activeTab === "cloud"
                      ? "bg-brand-600 text-white shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Server size={14} />
                  <span>Cloud Ops</span>
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
                    activeTab === "code"
                      ? "bg-brand-600 text-white shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Code2 size={14} />
                  <span>SDK Specs</span>
                </button>
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="p-6 sm:p-8 min-h-[300px]">
              {activeTab === "ai" && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">QorZen Agentic Pipeline</div>
                        <div className="text-xs text-slate-400">Autonomous LLM task orchestration & multi-model routing</div>
                      </div>
                    </div>
                    <button
                      onClick={handleExecute}
                      disabled={isExecuting}
                      className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition"
                    >
                      <Play size={12} className={isExecuting ? "animate-spin" : ""} />
                      <span>{isExecuting ? "Running Simulation..." : "Test AI Model"}</span>
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="text-xs text-slate-400">Response Latency</div>
                      <div className="mt-1 text-2xl font-bold text-emerald-400">12.4 ms</div>
                      <div className="mt-1 text-[11px] text-slate-500">Sub-second execution</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="text-xs text-slate-400">Accuracy Index</div>
                      <div className="mt-1 text-2xl font-bold text-brand-400">99.98%</div>
                      <div className="mt-1 text-[11px] text-slate-500">Validated agentic output</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="text-xs text-slate-400">Token Throughput</div>
                      <div className="mt-1 text-2xl font-bold text-purple-400">4,200/sec</div>
                      <div className="mt-1 text-[11px] text-slate-500">High-concurrency streaming</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                    <div className="flex items-center justify-between text-slate-500 mb-2 border-b border-slate-800 pb-2">
                      <span className="flex items-center gap-1.5"><Terminal size={14}/> Live Output Stream</span>
                      <span className="text-emerald-400 flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"/> Active</span>
                    </div>
                    <p className="text-purple-400">&gt; INITIALIZING QORZEN_AI_AGENT v3.4...</p>
                    <p className="text-slate-400">&gt; Routing request through distributed neural nodes...</p>
                    <p className="text-emerald-300">&gt; SUCCESS: Context compiled in 12.4ms. Executing workflow automation.</p>
                  </div>
                </div>
              )}

              {activeTab === "cloud" && (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="text-xs text-slate-400">Global Regions</div>
                      <div className="mt-1 text-2xl font-extrabold text-white">24 Edge</div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[95%] bg-gradient-to-r from-brand-500 to-emerald-400" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="text-xs text-slate-400">Active Requests</div>
                      <div className="mt-1 text-2xl font-extrabold text-brand-400">1.42M / min</div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[88%] bg-brand-500" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="text-xs text-slate-400">Uptime SLA</div>
                      <div className="mt-1 text-2xl font-extrabold text-emerald-400">99.999%</div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[99%] bg-emerald-400" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="text-xs text-slate-400">Security Threats</div>
                      <div className="mt-1 text-2xl font-extrabold text-cyan-400">0 Blocked</div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[100%] bg-cyan-400" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                      <span className="font-semibold text-white">Cluster Load & Network Throughput</span>
                      <span className="text-slate-500">Live Traffic Monitor</span>
                    </div>
                    <div className="h-28 w-full flex items-end justify-between gap-2 pt-4 border-b border-slate-800">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 95, 60, 75, 88, 92, 70, 85, 98].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-900 rounded-t h-full flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-brand-600 to-purple-400 rounded-t transition-all duration-500 hover:from-brand-400 hover:to-emerald-400"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "code" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-2 border border-slate-800 text-xs">
                    <span className="text-slate-400 font-mono">qorzen-client.config.ts</span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copied ? "Copied" : "Copy Code"}</span>
                    </button>
                  </div>
                  <pre className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-purple-400">import</span> &#123; QorZenSDK &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@qorzen/core'</span>;{"\n\n"}
                      <span className="text-slate-500">// Initialize Enterprise Client Pipeline</span>{"\n"}
                      <span className="text-blue-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-yellow-300">QorZenSDK</span>(&#123;{"\n"}
                      {"  "}apiKey: process.env.<span className="text-brand-400">QORZEN_KEY</span>,{"\n"}
                      {"  "}cluster: <span className="text-emerald-300">'us-east-autoscale'</span>,{"\n"}
                      {"  "}aiModel: <span className="text-emerald-300">'qor-llm-v3'</span>,{"\n"}
                      &#125;);{"\n\n"}
                      <span className="text-purple-400">export default async function</span> <span className="text-yellow-300">deployApp</span>() &#123;{"\n"}
                      {"  "}<span className="text-blue-400">const</span> res = <span className="text-purple-400">await</span> client.deployWorkload(&#123; scale: <span className="text-amber-400">10000</span> &#125;);{"\n"}
                      {"  "}console.<span className="text-yellow-300">log</span>(<span className="text-emerald-300">`Deployed successfully! Status: ${'{'}res.status{'}'}`</span>);{"\n"}
                      &#125;
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-float-badge {
          animation: qz-hero-float 5s ease-in-out infinite;
        }
        @keyframes qz-hero-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}