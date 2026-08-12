import cloudImg from "../assets/services/cloud-computing.jpg";
import cyberImg from "../assets/services/cyber-security.webp";
import seoImg from "../assets/services/seo.png";
import marketingImg from "../assets/services/digital-marketing.jpg";
import dataImg from "../assets/services/data-analysis-science.jpg";
import aiImg from "../assets/services/ai-automation.png";

/**
 * Frontend fallback/display data for QorZen's service line-up.
 * The backend only stores { _id, title, description }, so `icon` and
 * `image` here are presentation-only extras used when the API hasn't
 * returned data yet (see useFetch fallback pattern across the app).
 */
const services = [
  {
    _id: "cloud-computing",
    icon: "CLD",
    title: "Cloud Computing",
    description:
      "We design, migrate and manage cloud infrastructure on AWS, Azure and GCP — cutting costs while improving uptime and speed of delivery.",
    image: cloudImg,
  },
  {
    _id: "cyber-security",
    icon: "SEC",
    title: "Cyber Security",
    description:
      "Vulnerability audits, penetration testing and 24/7 threat monitoring that keep your systems, data and customers protected.",
    image: cyberImg,
  },
  {
    _id: "seo",
    icon: "SEO",
    title: "SEO",
    description:
      "Technical audits, keyword strategy and content that move you up the search results for sustainable organic growth.",
    image: seoImg,
  },
  {
    _id: "digital-marketing",
    icon: "MKT",
    title: "Digital Marketing",
    description:
      "Full-funnel campaigns across paid, social and email, built around clear goals and measured against real business outcomes.",
    image: marketingImg,
  },
  {
    _id: "data-analysis-science",
    icon: "DATA",
    title: "Data Analysis & Data Science",
    description:
      "Dashboards, pipelines and predictive models that turn scattered data into insight your team can act on.",
    image: dataImg,
  },
  {
    _id: "ai-automation",
    icon: "AI",
    title: "AI & Automation",
    description:
      "Custom AI models and workflow automation that cut manual effort and help teams make faster decisions.",
    image: aiImg,
  },
];

export default services;
