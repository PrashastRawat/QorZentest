
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Globe,
  TrendingUp,
  Share2,
  Clock,
  Briefcase,
  Users,
  Headphones
} from 'lucide-react';

// Core B2B Services List (Plain English & Simple Terminology)
export const b2bServices = [
  {
    id: 'ai-automation',
    title: 'AI & Smart Workflows',
    icon: Sparkles,
    desc: 'Smart AI bots and automated workflows that save time, cut manual work, and handle daily business tasks automatically.',
    link: '/services/ai-automation',
    tags: ['AI Chatbots', 'Smart Workflows', 'Auto Invoicing', 'OpenAI']
  },
  {
    id: 'web-development',
    title: 'Website & App Development',
    icon: Globe,
    desc: 'Fast, custom websites, business portals, and mobile apps built to help your business grow smoothly.',
    link: '/services/software-development',
    tags: ['Custom Websites', 'Business Apps', 'Online Portals', 'React & Node']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Ads',
    icon: TrendingUp,
    desc: 'Get more customers and sales with targeted Google & Facebook ads, SEO ranking, and lead generation.',
    link: '/services/digital-marketing',
    tags: ['Google Ads', 'Facebook Ads', 'SEO Ranking', 'Lead Generation']
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Setup & Server Hosting',
    icon: Cpu,
    desc: 'Secure cloud hosting and setup on AWS & Google Cloud to keep your website fast, reliable, and always online.',
    link: '/services/cloud-computing',
    tags: ['AWS Cloud Setup', '24/7 Server Support', 'Fast Speed', 'Backup & Security']
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Data Safety',
    icon: ShieldCheck,
    desc: 'Protect your business data and website from hackers, viruses, and security leaks with complete safety testing.',
    link: '/services/cyber-security',
    tags: ['Hacking Protection', 'Security Testing', 'Data Privacy', '24/7 Monitoring']
  },
  {
    id: 'social-media',
    title: 'Social Media & Brand Growth',
    icon: Share2,
    desc: 'Grow your brand followers with creative social media posts, short video reels, and active engagement on Instagram & LinkedIn.',
    link: '/services/social-media',
    tags: ['Instagram Reels', 'LinkedIn Growth', 'Post Creation', 'Brand Awareness']
  }
];

// Featured Major Projects Portfolio (Simple Terms)
export const featuredProjects = [
  {
    title: 'Smart Supply Chain & Inventory Software',
    client: 'Logistics Enterprise',
    category: 'Business Software',
    impact: '3x Faster Order Processing',
    metric: '300%',
    image: '/assets/enterprise-erp.jpg',
    desc: 'Built a complete software system to track warehouse stock, manage delivery trucks, and automatically print customer bills.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    title: 'Online Store & Easy Payment Gateway',
    client: 'Retail Store Network',
    category: 'E-Commerce & Online Payments',
    impact: 'Crossed ₹100 Crore Online Sales',
    metric: '₹100 Cr+',
    image: '/assets/fintech-ecommerce.jpg',
    desc: 'Designed a fast online shopping website with easy online payment options, coupon codes, and fraud protection.',
    tech: ['Next.js', 'Stripe API', 'Redis', 'Microservices']
  },
  {
    title: 'AI Customer Support & Chatbot Helper',
    client: 'SaaS Software Enterprise',
    category: 'AI & Automation',
    impact: 'Saved 85% Support Time',
    metric: '85%',
    image: '/assets/ai-customer-suite.jpg',
    desc: 'Created smart AI assistants that answer customer queries 24/7, update support tickets, and resolve complaints automatically.',
    tech: ['Python', 'LangChain', 'OpenAI GPT-4', 'Pinecone', 'n8n']
  },
  {
    title: 'HR Management & AI Resume Scanner',
    client: 'Global Recruitment Group',
    category: 'HR & Staffing Automation',
    impact: '65% Faster Employee Hiring',
    metric: '65%',
    image: '/assets/hr-automation.jpg',
    desc: 'Developed an easy HR portal that automatically scans job resumes, schedules interviews, and manages staff attendance.',
    tech: ['React.js', 'Node.js', 'Python', 'PostgreSQL', 'n8n']
  },
  {
    title: 'Secure Cloud Setup & Hacker Protection',
    client: 'Capital Investment Network',
    category: 'Cloud & Security',
    impact: '100% Data Safety & Zero Downtime',
    metric: '100%',
    image: '/assets/cyber-security.jpg',
    desc: 'Configured safe cloud servers on AWS with firewall protection to keep company files safe from hacking and data leaks.',
    tech: ['AWS VPC', 'Kubernetes', 'Palo Alto Firewalls', 'Terraform']
  }
];

// Animated Trust Metrics Counters
export const statsOverview = [
  { value: '5+', label: 'Years Experience', icon: Clock },
  { value: '200+', label: 'Projects Delivered', icon: Briefcase },
  { value: '90%', label: 'Happy Clients', icon: Users },
  { value: '24/7', label: 'Dedicated Support', icon: Headphones }
];

export const clientTestimonials = [
  {
    name: 'Rajesh Nair (Executive VP)',
    company: 'Global Freight Partner',
    rating: 5,
    text: 'QorZen completely automated our inventory tracking. Our order processing speed tripled within 60 days of deployment.'
  },
  {
    name: 'Anjali Sharma (Chief Commercial Officer)',
    company: 'Retail E-Commerce Group',
    rating: 5,
    text: 'Their digital ads and fast store setup scaled our annual sales past ₹100 Cr with complete payment reliability.'
  },
  {
    name: 'Amit Patel (Head of Customer Experience)',
    company: 'Enterprise SaaS Firm',
    rating: 5,
    text: 'The 24/7 AI chatbot assistant cut our support backlog by 85% while keeping customer satisfaction scores high.'
  },
  {
    name: 'Suresh Kumar (Director of Infrastructure)',
    company: 'Capital Banking & Finance',
    rating: 5,
    text: 'Configured 100% secure AWS cloud servers with zero downtime and complete security audit compliance.'
  },
  {
    name: 'Priya Iyer (Vice President of Product)',
    company: 'Healthcare Solutions',
    rating: 5,
    text: 'Delivered a fast, modern web portal that doubled our monthly user signups and inbound customer leads.'
  },
  {
    name: 'Vikram Mehta (Head of Digital Strategy)',
    company: 'Global Retail Network',
    rating: 5,
    text: 'Their performance ad campaigns on Google and Meta delivered a 5.4x return on ad spend with verified sales leads.'
  },
  {
    name: 'David Harrison (Founder & Tech Lead)',
    company: 'FinTech Payment Systems',
    rating: 5,
    text: 'Built our online payment portal & iOS app in record time with sub-second transaction speeds and zero bugs.'
  },
  {
    name: 'Sanjay Deshmukh (Chief Operating Officer)',
    company: 'Supply Chain Enterprises',
    rating: 5,
    text: 'Automated custom ERP software eliminated manual billing errors and saved over 40 hours per week for our team.'
  },
  {
    name: 'Sarah Jenkins (Head of Cyber Security)',
    company: 'International Insurance Net',
    rating: 5,
    text: 'Conducted thorough penetration testing and firewall hardening with zero security breaches across all subnets.'
  },
  {
    name: 'Deepa Verma (VP of Talent Acquisition)',
    company: 'Global Staffing Group',
    rating: 5,
    text: 'AI resume scanner & HR portal reduced our candidate hiring cycle from several weeks down to just 3 days.'
  }
];
