
import { categoryProjectsMap } from './services/index';

// ================= 1. HOME PAGE 11-FLAGSHIP PROJECTS =================
export const flagshipProjects = [
  {
    id: 'flagship-ai-automation',
    title: 'AI Customer Chatbot & Auto Lead System',
    serviceCategory: 'AI & Automation',
    categorySlug: 'ai-automation',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    metric: 'Saved 85% Manual Work Time',
    description: 'Built smart AI bots and automated lead processing that automatically sync customer inquiries and support tickets.',
    tech: ['n8n', 'Python', 'AI Chatbots', 'OpenAI API']
  },
  {
    id: 'flagship-data-analysis',
    title: 'Sales Reports & Live Business Dashboard',
    serviceCategory: 'Data Analysis & Data Science',
    categorySlug: 'data-analysis',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop',
    metric: '99.2% Report Accuracy',
    description: 'Organized company sales and customer data into easy-to-read Power BI dashboards and monthly profit trend reports.',
    tech: ['Power BI', 'Python', 'Pandas', 'PostgreSQL']
  },
  {
    id: 'flagship-digital-marketing',
    title: 'Google & Facebook Ad Leads Campaign',
    serviceCategory: 'Digital Marketing',
    categorySlug: 'digital-marketing',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1000&auto=format&fit=crop',
    metric: '5.4x Sales Growth',
    description: 'Ran targeted Google Search & Facebook ad campaigns paired with fast landing pages to generate qualified business leads.',
    tech: ['Meta Ads', 'Google Ads', 'GA4 Analytics', 'CRO']
  },
  {
    id: 'flagship-web-design',
    title: 'Modern Company Website & Online Store',
    serviceCategory: 'Web Design & Development',
    categorySlug: 'web-design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    metric: '+240% Visitors',
    description: 'Designed a fast, mobile-friendly website with instant page loading, online payments, and easy navigation.',
    tech: ['React 19', 'Next.js', 'Framer Motion', 'Tailwind']
  },
  {
    id: 'flagship-software-development',
    title: 'Warehouse Stock & Customer Billing App',
    serviceCategory: 'Software Development',
    categorySlug: 'software-development',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    metric: '3x Faster Billing',
    description: 'Built custom management software to track stock inventory, vehicle dispatch, and automated client billing.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Docker']
  },
  {
    id: 'flagship-graphic-designing',
    title: 'Company Logo, Banners & Graphic Design Kit',
    serviceCategory: 'Graphic Designing',
    categorySlug: 'graphic-designing',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop',
    metric: 'Award Winning Graphics',
    description: 'Created professional company logos, business cards, social media banners, and app design UI graphics.',
    tech: ['Figma AI', 'Photoshop', 'Illustrator', 'Branding']
  },
  {
    id: 'flagship-seo',
    title: 'Google Search Ranking & Traffic Growth',
    serviceCategory: 'SEO Engine',
    categorySlug: 'seo',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop',
    metric: '+450% Traffic Growth',
    description: 'Optimized website code and blog content to rank #1 on Google for high-intent business search keywords.',
    tech: ['Technical SEO', 'Ahrefs', 'Schema Markup', 'Content Strategy']
  },
  {
    id: 'flagship-social-media-marketing',
    title: 'Instagram Reels & Social Media Growth',
    serviceCategory: 'Social Media Marketing',
    categorySlug: 'social-media-marketing',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    metric: '3.2M Online Views',
    description: 'Produced creative short video reels and daily social media posts that grew follower engagement on Instagram & LinkedIn.',
    tech: ['Short-Form Video', 'Meta Suite', 'LinkedIn', 'Analytics']
  },
  {
    id: 'flagship-cloud-computing',
    title: 'AWS Cloud Server & Website Hosting',
    serviceCategory: 'Cloud Computing',
    categorySlug: 'cloud-computing',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    metric: '99.999% Cloud Uptime',
    description: 'Configured safe cloud hosting servers on AWS to keep websites running fast 24/7 without crashing.',
    tech: ['AWS EKS', 'Terraform', 'Docker', 'Kubernetes']
  },
  {
    id: 'flagship-cyber-security',
    title: 'Cyber Security & Hacker Data Protection',
    serviceCategory: 'Cyber Security',
    categorySlug: 'cyber-security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    metric: '0 Security Breaches',
    description: 'Protected corporate computers and servers with firewall security, anti-hacker tests, and data safety compliance.',
    tech: ['Penetration Testing', 'Palo Alto', 'ISO 27001', 'SIEM']
  },
  {
    id: 'flagship-networking',
    title: 'Office Wi-Fi, Routers & Cisco Network Setup',
    serviceCategory: 'Networking & Infrastructure',
    categorySlug: 'networking',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
    metric: '10 Gbps Fast Mesh',
    description: 'Set up high-speed Wi-Fi networks, office routers, and secure VPN connections for multi-office businesses.',
    tech: ['Cisco SD-WAN', 'TCP/IP Mesh', 'Firewall OS', 'Network Automation']
  }
];

// Re-export Category Projects Dictionary
export const categoryProjects = categoryProjectsMap;

/**
 * Service Projects Lookup Helper
 */
export const getProjectsByCategory = (categorySlug) => {
  if (categoryProjectsMap[categorySlug] && categoryProjectsMap[categorySlug].length > 0) {
    return categoryProjectsMap[categorySlug];
  }
  return [];
};
