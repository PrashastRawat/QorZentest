import Hero from "../../components/home/Hero";
import ServicesTicker from "../../components/home/ServicesTicker";
import About from "../../components/home/About";
import Services from "../../components/home/Services";
import Projects from "../../components/home/Projects";
import TechEstimator from "../../components/home/TechEstimator";
import WhyUs from "../../components/home/WhyUs";
import Testimonials from "../../components/home/Testimonials";
import CtaBanner from "../../components/home/CtaBanner";
import FloatingContact from "../../components/layout/FloatingContact";

export default function Home() {
  return (
    <main className="bg-dark-900 overflow-x-hidden min-h-screen text-slate-100">
      <Hero />
      <ServicesTicker />
      <About />
      <Services />
      <Projects />
      <TechEstimator />
      <WhyUs />
      <Testimonials />
      <CtaBanner />
      <FloatingContact />
    </main>
  );
}
