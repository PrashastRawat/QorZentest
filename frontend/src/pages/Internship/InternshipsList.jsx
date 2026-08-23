import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Code,
  Globe,
  Database,
  ShieldCheck,
  Cpu,
  Smartphone,
  Workflow,
  Cloud,
  Users,
  Megaphone,
  DollarSign,
  Layout,
  FileText,
  Target,
  Terminal,
  Lock,
  ArrowUpRight,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
  Palette,
  Video,
  FileSpreadsheet,
  BarChart2,
  Layers,
  Search as SearchIcon,
  Server,
  Calculator,
  Edit3,
  Mail,
  PhoneCall,
  Headphones,
  Award,
  Monitor,
  Network,
  Wifi,
  Shield,
  Gamepad2,
  LineChart,
  CheckCircle,
  FileCode,
  Sparkles,
  PieChart
} from 'lucide-react';
import './InternshipsList.css';

// Master Consolidated ALL_INTERNSHIPS Data Array matching the exact 50+ Domains from user specifications
export const ALL_INTERNSHIPS = [
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence Intern',
    category: 'Technical',
    tag: 'Generative AI & LLMs',
    icon: Sparkles,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Construct generative AI applications, prompt engineering pipelines, agentic AI workflows, and LLM integrations.',
    tools: ['OpenAI API', 'LangChain', 'Python', 'Pinecone', 'HuggingFace'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Intern',
    category: 'Technical',
    tag: 'AI & ML',
    icon: Cpu,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Train supervised/unsupervised machine learning models, neural networks, and model deployment pipelines.',
    tools: ['Python', 'Scikit-Learn', 'TensorFlow', 'PyTorch', 'Jupyter'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security Intern',
    category: 'Technical',
    tag: 'Security',
    icon: ShieldCheck,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Perform web application penetration testing, vulnerability assessments, security log analysis, and ethical hacking.',
    tools: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Nmap', 'Metasploit'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'mern-stack-development',
    title: 'MERN Stack Development Intern',
    category: 'Technical',
    tag: 'Web Engineering',
    icon: Globe,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Architect modern full-stack web applications with React frontend, Node/Express backend, and MongoDB database.',
    tools: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'full-stack-development',
    title: 'Full Stack Development Intern',
    category: 'Technical',
    tag: 'Full Stack',
    icon: Code,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Master complete web application lifecycle from frontend UI creation to backend REST APIs and database design.',
    tools: ['JavaScript', 'React.js', 'Node.js', 'SQL/NoSQL', 'Git'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics Intern',
    category: 'Technical',
    tag: 'Data & Analytics',
    icon: PieChart,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Extract business insights from complex datasets using SQL queries, Tableau dashboards, and Python analytics.',
    tools: ['SQL', 'Tableau', 'Excel', 'Python', 'Statistics'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'cisco-ccna-200-301',
    title: 'Cisco CCNA (200-301) Intern',
    category: 'Networking',
    tag: 'Cisco Certification',
    icon: Wifi,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Prepare for official Cisco CCNA 200-301 certification while configuring real-world network lab topologies.',
    tools: ['Cisco 200-301', 'Packet Tracer', 'IOS CLI', 'OSPF/EIGRP', 'EtherChannel'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing Intern',
    category: 'Non-Technical',
    tag: 'Growth Marketing',
    icon: Megaphone,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Create viral campaign strategies, influencer collaborations, organic reach growth, and paid ad boosts.',
    tools: ['Meta Ads', 'TikTok Studio', 'Canva', 'Copywriting', 'SEO'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Intern',
    category: 'Technical',
    tag: 'Product Design',
    icon: Layout,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Construct interactive Figma wireframes, mobile app UI designs, component design systems, and user research personas.',
    tools: ['Figma', 'Miro', 'Adobe XD', 'Prototyping', 'User Research'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'app-development',
    title: 'App Development Intern',
    category: 'Technical',
    tag: 'Mobile Engineering',
    icon: Smartphone,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop native and cross-platform mobile apps for Android & iOS using modern frameworks and cloud backends.',
    tools: ['Flutter', 'React Native', 'Android Studio', 'Firebase', 'Kotlin'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'data-science',
    title: 'Data Science Intern',
    category: 'Technical',
    tag: 'AI & Data Science',
    icon: Database,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Apply statistical analysis, data cleaning, exploratory data analysis (EDA), and machine learning pipelines.',
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'cloud-and-networking-pro',
    title: 'Cloud and Networking Pro Intern',
    category: 'Networking',
    tag: 'Cloud & AWS Networking',
    icon: Cloud,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Configure AWS VPC subnets, transit gateways, Direct Connect, Route 53, and cloud network security groups.',
    tools: ['AWS VPC', 'Route 53', 'Terraform', 'EC2', 'Cloud Security'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Intern',
    category: 'Technical',
    tag: 'Growth & Ads',
    icon: Megaphone,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Run conversion ad campaigns on Meta & Google Ads, optimize lead funnels, and analyze marketing ROI metrics.',
    tools: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Semrush', 'Copywriting'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking Intern',
    category: 'Networking',
    tag: 'Cyber Defense',
    icon: Lock,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Perform penetration testing, network vulnerability exploitation, wireless security audits, and defensive hardening.',
    tools: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Wireshark', 'Nmap'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'project-management',
    title: 'Project Management Intern',
    category: 'Non-Technical',
    tag: 'Agile & Management',
    icon: Target,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Coordinate project timelines, sprint planning, client requirements gathering, and cross-functional team management.',
    tools: ['Jira', 'Asana', 'Notion', 'Agile Scrum', 'MS Project'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'video-editing',
    title: 'Video Editing Intern',
    category: 'Technical',
    tag: 'Media Production',
    icon: Video,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Edit professional promotional video reels, corporate tutorials, motion graphics, and social media media assets.',
    tools: ['Adobe Premiere Pro', 'After Effects', 'CapCut Pro', 'Color Grading'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'content-creation',
    title: 'Content Creation Intern',
    category: 'Non-Technical',
    tag: 'Creative Media',
    icon: FileText,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Produce high-converting video reels, carousel designs, scriptwriting, and promotional brand content.',
    tools: ['CapCut', 'Canva AI', 'ChatGPT', 'Scriptwriting', 'Photoshop'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'network-engineering',
    title: 'Network Engineering Intern',
    category: 'Networking',
    tag: 'Enterprise Infrastructure',
    icon: Cpu,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Design enterprise local and wide area networks (LAN/WAN), load balancing topologies, and network monitoring.',
    tools: ['GNS3', 'EVE-NG', 'Cisco IOS', 'BGP', 'Wireshark'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'ccna-automation',
    title: 'CCNA Automation Intern',
    category: 'Networking',
    tag: 'Network Automation',
    icon: Cpu,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Automate network router and switch configurations using Python script, Netmiko, Ansible, and Cisco DevNet APIs.',
    tools: ['Python', 'Netmiko', 'Ansible', 'Cisco IOS', 'REST APIs'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'network-security-firewall-expert',
    title: 'Network Security & Firewall Expert Intern',
    category: 'Networking',
    tag: 'Next-Gen Firewalls',
    icon: Shield,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Configure Palo Alto, Fortinet, and pfSense next-gen firewalls, IPsec VPN tunnels, NAT rules, and IPS monitoring.',
    tools: ['Palo Alto PAN-OS', 'FortiGate', 'pfSense', 'IPsec VPN', 'IDS/IPS'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'react-development',
    title: 'React Development Intern',
    category: 'Technical',
    tag: 'Frontend Engineering',
    icon: Globe,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Create fast, modern, responsive web user interfaces using React 19, Redux Toolkit, and dynamic CSS animations.',
    tools: ['React.js', 'JavaScript ES6+', 'Redux', 'HTML5/CSS3', 'Vite'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development Intern',
    category: 'Technical',
    tag: 'Frontend Engineering',
    icon: Layout,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Craft pixel-perfect user interface layouts, dynamic component systems, and fluid web animations.',
    tools: ['React.js', 'HTML5', 'CSS Variables', 'JavaScript', 'Tailwind/Vanilla'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'backend-development',
    title: 'Backend Development Intern',
    category: 'Technical',
    tag: 'Backend Engineering',
    icon: Server,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Engineer high-throughput RESTful API endpoints, authentication security systems, and database optimization.',
    tools: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering Intern',
    category: 'Technical',
    tag: 'Data Systems',
    icon: Database,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build ETL pipelines, architect big data warehouses, and manage automated SQL/NoSQL database streams.',
    tools: ['Apache Spark', 'Python', 'SQL', 'PostgreSQL', 'Airflow'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'game-development',
    title: 'Game Development Intern',
    category: 'Technical',
    tag: 'Gaming & 3D',
    icon: Gamepad2,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop 2D/3D interactive games using Unity and Unreal Engine, writing game physics and logic scripts.',
    tools: ['Unity 3D', 'C#', 'Unreal Engine', 'Blender', 'Physics Engine'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'dot-net-development',
    title: 'Dot Net Development Intern',
    category: 'Technical',
    tag: 'Enterprise Dev',
    icon: Code,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build scalable enterprise Web APIs and microservices using C#, .NET Core, and Microsoft Azure.',
    tools: ['C#', '.NET Core', 'ASP.NET', 'MS SQL Server', 'Azure'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst Intern',
    category: 'Technical',
    tag: 'Analytics & Strategy',
    icon: LineChart,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Analyze business workflows, gather technical product specifications, and build executive analytics dashboards.',
    tools: ['Excel', 'SQL', 'Power BI', 'Jira', 'Business Intelligence'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'software-testing',
    title: 'Software Testing Intern',
    category: 'Technical',
    tag: 'Quality Assurance',
    icon: CheckCircle,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Perform manual & automated testing suites, write test cases, execute regression runs, and track software bugs.',
    tools: ['Selenium', 'Jira', 'Postman', 'TestRail', 'JUnit'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design Intern',
    category: 'Technical',
    tag: 'Visual Media',
    icon: Palette,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Design corporate brand guidelines, marketing banners, social graphics, logos, and digital artwork assets.',
    tools: ['Adobe Photoshop', 'Illustrator', 'Canva Pro', 'Figma', 'InDesign'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'flutter-development',
    title: 'Flutter Development Intern',
    category: 'Technical',
    tag: 'Cross-Platform Mobile',
    icon: Smartphone,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop high-performance cross-platform iOS and Android apps using Dart, Flutter SDK, and Firebase.',
    tools: ['Flutter', 'Dart', 'Firebase', 'State Management', 'REST API'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'mean-stack-development',
    title: 'MEAN Stack Development Intern',
    category: 'Technical',
    tag: 'Web Engineering',
    icon: Globe,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build full-stack web applications using MongoDB, Express.js, Angular, and Node.js with TypeScript.',
    tools: ['Angular', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'web-development',
    title: 'Web Development Intern',
    category: 'Technical',
    tag: 'Web Engineering',
    icon: Globe,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build modern responsive websites and interactive web applications using HTML5, CSS3, and JavaScript.',
    tools: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Bootstrap', 'Git'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'wordpress-development',
    title: 'WordPress Development Intern',
    category: 'Technical',
    tag: 'CMS Engineering',
    icon: Layers,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop custom WordPress themes, Elementor page templates, WooCommerce stores, and PHP plugins.',
    tools: ['WordPress', 'Elementor Pro', 'PHP', 'WooCommerce', 'MySQL'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'ms-sql',
    title: 'MS SQL Database Intern',
    category: 'Technical',
    tag: 'Database Admin',
    icon: Database,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Write complex T-SQL queries, stored procedures, database indexes, triggers, and query performance tuning.',
    tools: ['MS SQL Server', 'SSMS', 'T-SQL', 'Database Indexing', 'ETL'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'sales-executive',
    title: 'Sales Executive Intern',
    category: 'Non-Technical',
    tag: 'Sales & Revenue',
    icon: DollarSign,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Execute B2B corporate sales calls, client presentations, lead qualification, and CRM deal closing.',
    tools: ['HubSpot CRM', 'Cold Calling', 'Salesforce', 'Negotiation', 'CRM'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'social-media-handling',
    title: 'Social Media Handling Intern',
    category: 'Non-Technical',
    tag: 'Social Media',
    icon: Users,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Manage day-to-day social media accounts, community DM responses, content scheduling, and engagement.',
    tools: ['Instagram Studio', 'LinkedIn', 'Buffer', 'Hootsuite', 'Canva'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management Intern',
    category: 'Non-Technical',
    tag: 'Brand Strategy',
    icon: Target,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop monthly social media calendars, brand storytelling, analytics reporting, and audience growth.',
    tools: ['Meta Business Suite', 'Analytics', 'Content Calendar', 'Buffer'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'content-writing',
    title: 'Content Writing Intern',
    category: 'Non-Technical',
    tag: 'Copywriting',
    icon: Edit3,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Write engaging blog posts, website copy, press releases, technical documentation, and social media captions.',
    tools: ['Grammarly', 'ChatGPT', 'WordPress', 'Google Docs', 'SEO Copywriting'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing Intern',
    category: 'Non-Technical',
    tag: 'Marketing Automation',
    icon: Mail,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Design automated email drip sequences, newsletter broadcasts, list segmentation, and open rate tracking.',
    tools: ['Mailchimp', 'Brevo', 'Klaviyo', 'Copywriting', 'A/B Testing'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'tele-calling',
    title: 'Tele Calling Intern',
    category: 'Non-Technical',
    tag: 'Client Communication',
    icon: PhoneCall,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Conduct outbound lead calls, student counseling, course inquiries, and client follow-ups.',
    tools: ['CRM Dialer', 'Excel', 'Communication Skills', 'Lead Management'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'support-calling',
    title: 'Support Calling Intern',
    category: 'Non-Technical',
    tag: 'Customer Support',
    icon: Headphones,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Provide customer support assistance, resolve student queries, track helpdesk tickets, and collect feedback.',
    tools: ['Zendesk', 'Freshdesk', 'CRM', 'Communication', 'Helpdesk'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'ccna-ccna-security',
    title: 'CCNA + CCNA Security Intern',
    category: 'Networking',
    tag: 'Network Security',
    icon: ShieldCheck,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Master core Cisco routing & switching alongside Cisco ASA Firewall rules, IPsec VPNs, and AAA security authentication.',
    tools: ['Cisco ASA', 'Cisco IOS', 'IPsec VPN', 'Radius/TACACS+', 'Wireshark'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals Intern',
    category: 'Networking',
    tag: 'IT Infrastructure',
    icon: Monitor,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Understand computer hardware architecture, OS installation, troubleshooting, BIOS setups, and basic networking.',
    tools: ['Windows Server', 'Linux OS', 'Hardware Diagnostics', 'Command Line'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'tcp-ip-masterclass',
    title: 'TCP/IP Masterclass Intern',
    category: 'Networking',
    tag: 'Protocol Engineering',
    icon: Network,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Deep dive into OSI 7-layer architecture, TCP/UDP packet analysis, DNS routing, DHCP servers, and packet captures.',
    tools: ['Wireshark', 'TCP/IP Model', 'Packet Analysis', 'DNS/DHCP', 'Subnetting'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'ccna-eccnp',
    title: 'CCNA + CCNP Advanced Intern',
    category: 'Networking',
    tag: 'Advanced Enterprise',
    icon: Server,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Master advanced routing protocols (BGP, OSPF), MPLS VPNs, enterprise switching, and high availability design.',
    tools: ['Cisco CCNP Enterprise', 'BGP Routing', 'MPLS', 'EVE-NG', 'OSPFv3'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'enterprise-networking-masterclass',
    title: 'Enterprise Networking Masterclass Intern',
    category: 'Networking',
    tag: 'Data Center & Architecture',
    icon: Globe,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Architect enterprise data center network fabrics, SD-WAN topologies, network telemetry, and disaster recovery.',
    tools: ['Cisco SD-WAN', 'Data Center Networking', 'BGP', 'Python Scripting', 'Wireshark'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'java-full-stack',
    title: 'Java Full Stack Development Intern',
    category: 'Technical',
    tag: 'Software Engineering',
    icon: Code,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build end-to-end web applications with Java Spring Boot microservices on the backend and modern React on the frontend.',
    tools: ['Java', 'Spring Boot', 'Hibernate', 'React.js', 'MySQL'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'python-development',
    title: 'Python Development Intern',
    category: 'Technical',
    tag: 'Backend & Automation',
    icon: FileCode,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop high-performance backend REST APIs, automation scripts, and data processing bots using Python.',
    tools: ['Python', 'Django', 'FastAPI', 'Flask', 'PostgreSQL'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'advance-excel',
    title: 'Advance Excel Intern',
    category: 'Technical',
    tag: 'Data Processing',
    icon: FileSpreadsheet,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Master advanced Excel formulas (VLOOKUP, XLOOKUP, INDEX/MATCH), automated VBA macros, and financial modeling.',
    tools: ['MS Excel', 'VBA Macros', 'Pivot Tables', 'Power Query', 'Data Analysis'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'data-visualization-powerbi',
    title: 'Data Visualization (Power BI) Intern',
    category: 'Technical',
    tag: 'Business Intelligence',
    icon: BarChart2,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Transform raw enterprise data into interactive Power BI dashboards, DAX queries, and executive reports.',
    tools: ['Power BI', 'DAX', 'Power Query', 'SQL', 'Data Modeling'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'python-full-stack',
    title: 'Python Full Stack Development Intern',
    category: 'Technical',
    tag: 'Full Stack',
    icon: FileCode,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build full-stack web applications with Django/FastAPI backend API layers and React frontend components.',
    tools: ['Python', 'Django', 'React.js', 'PostgreSQL', 'Docker'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'seo-intern',
    title: 'SEO Intern',
    category: 'Technical',
    tag: 'Search Engineering',
    icon: SearchIcon,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Perform technical SEO audits, keyword research, on-page optimization, backlink outreach, and Google Search Console analysis.',
    tools: ['Ahrefs', 'Semrush', 'Google Search Console', 'GA4', 'Screaming Frog'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'accounting-intern',
    title: 'Accounting Intern',
    category: 'Non-Technical',
    tag: 'Finance',
    icon: Calculator,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Assist in financial bookkeeping, invoice processing, GST documentation, and financial statement analysis.',
    tools: ['Tally Prime', 'Advance Excel', 'QuickBooks', 'GST Filing', 'Bookkeeping'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'bde-intern',
    title: 'BDE (Business Development Executive) Intern',
    category: 'Non-Technical',
    tag: 'Business Growth',
    icon: Briefcase,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Identify new market opportunities, generate qualified leads, conduct client pitch meetings, and close partnerships.',
    tools: ['LinkedIn Sales Nav', 'Apollo.io', 'HubSpot', 'B2B Sales', 'Outreach'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'hr-intern',
    title: 'HR Intern',
    category: 'Non-Technical',
    tag: 'Human Resources',
    icon: Users,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Assist in talent sourcing, candidate interview coordination, employee onboarding, and HR operations.',
    tools: ['LinkedIn Recruiter', 'Keka HR', 'Workday', 'Excel', 'Google Workspace'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'meta-google-ads',
    title: 'Meta & Google Ads Intern',
    category: 'Non-Technical',
    tag: 'Performance Ads',
    icon: Target,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Configure high-converting Meta Pixel and Google Search ad campaigns, optimize bidding strategies, and track ROAS.',
    tools: ['Meta Ads Manager', 'Google Ads', 'GA4', 'A/B Testing', 'ROAS Tracking'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'bda-intern',
    title: 'BDA (Business Development Associate) Intern',
    category: 'Non-Technical',
    tag: 'Sales & Growth',
    icon: Award,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Drive corporate B2B sales outreach, client relationship building, product demos, and revenue conversion.',
    tools: ['Apollo.io', 'LinkedIn Sales Nav', 'HubSpot CRM', 'Cold Calling', 'Pitching'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  },
  {
    id: 'ccna-intern',
    title: 'CCNA Network Intern',
    category: 'Networking',
    tag: 'Cisco Networking',
    icon: Server,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Configure Cisco switches, routers, VLAN topologies, subnets, OSPF routing protocols, and CLI troubleshooting.',
    tools: ['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'Cisco IOS', 'Putty'],
    price1Month: 799,
    price3Month: 1399,
    price6Month: 2399
  }
];

const filterCategories = ['All', 'Technical', 'Non-Technical', 'Networking'];

const InternshipsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleApplyClick = (item) => {
    const { icon, ...serializableItem } = item;
    navigate(`/internship/enroll?id=${item.id}`, {
      state: { internship: serializableItem }
    });
  };

  // Dynamic filtering logic based on both search query and category filter simultaneously
  const filteredInternships = useMemo(() => {
    return ALL_INTERNSHIPS.filter((item) => {
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="internship-list-page">
      {/* Hero Header */}
      <section className="internship-list-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Briefcase size={14} className="hero-badge-icon" />
            <span>QorZen Verified Internship Portal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Accelerate Your Career with <span className="highlight-text">Practical Internships</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Explore all 50+ practical internship domains across Technical Development, Non-Technical Business, and Networking Infrastructure. Work on real client projects alongside industry mentors.
          </motion.p>

          {/* Search & Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search 50+ internships by title or skill (e.g. MERN Stack, Data Science, HR, CCNA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="filter-pills-row">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Content Section */}
      <section className="internship-grid-section">
        <div className="container">
          <div className="grid-header-meta">
            <h2 className="grid-section-title">
              Available Positions{' '}
              <span className="count-pill">
                Showing {filteredInternships.length} of {ALL_INTERNSHIPS.length} internships
              </span>
            </h2>
            <p className="grid-section-sub">
              Select any role below to view complete duration tiers, project roadmap, and enrollment details.
            </p>
          </div>

          {filteredInternships.length > 0 ? (
            <div className="internship-cards-grid">
              {filteredInternships.map((item, index) => {
                const IconComponent = item.icon || Briefcase;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ y: -6 }}
                    className="internship-card"
                  >
                    <div className="card-badge-header">
                      <span className="category-pill">{item.category}</span>
                    </div>

                    <div className="card-main-info">
                      <div className="internship-icon-wrapper">
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="internship-title">{item.title}</h3>
                        <p className="internship-description">{item.description}</p>
                      </div>
                    </div>

                    {/* Internship Specs */}
                    <div className="internship-meta-row">
                      <div className="meta-item">
                        <Calendar size={14} className="meta-icon" />
                        <span>Duration: <strong>{item.duration}</strong></span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={14} className="meta-icon" />
                        <span>Access Mode: <strong>{item.mode || 'Online'}</strong></span>
                      </div>
                    </div>

                    {/* Skills Chips */}
                    <div className="card-tools-container">
                      <span className="tools-list-label">Skills Covered:</span>
                      <div className="tools-flex-wrap">
                        {item.tools.map((skill, i) => (
                          <span key={i} className="skill-chip">
                            <CheckCircle2 size={12} className="chip-icon" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer CTA using explicit button onClick handler */}
                    <div className="card-footer-apply">
                      <button
                        type="button"
                        className="card-apply-btn"
                        onClick={() => handleApplyClick(item)}
                      >
                        <span>Apply for Internship</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={48} className="no-results-icon" />
              <h3>No internships found</h3>
              <p>We couldn't find any position matching "{searchQuery}". Try another search term.</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InternshipsList;
