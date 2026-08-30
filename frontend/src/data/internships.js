
/**
 * ============================================================================
 * BACKEND DEVELOPER GUIDE (Hinglish Guide for Internships Dataset):
 * ============================================================================
 * Internship Schema for MongoDB:
 * - id: String (slug identifier, e.g. 'mern-stack-development')
 * - title: String (e.g. 'MERN Stack Development Intern')
 * - category: String ('Technical', 'Non-Technical', 'Networking')
 * - duration: String ('1, 3, 6 Months')
 * - mode: String ('Online')
 * - stipend: String ('Stipend + Certificate')
 * - tools: Array of Strings (['React', 'Node.js', 'MongoDB'])
 * - price1Month: Number (499)
 * - price3Month: Number (999)
 * - price6Month: Number (1499)
 * 
 * MongoDB me insert karne ke liye `db.internships.insertMany(internshipData)` use kar sakte hain.
 * ============================================================================
 */

export const internshipData = [
  {
    id: 'cyber-security',
    title: 'Cyber Security Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Security',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Perform web application penetration testing, vulnerability assessments, security log analysis, and ethical hacking.',
    tools: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Nmap', 'Metasploit'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'app-development',
    title: 'App Development Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Mobile Engineering',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop native and cross-platform mobile apps for Android & iOS using modern frameworks and cloud backends.',
    tools: ['Flutter', 'React Native', 'Android Studio', 'Firebase', 'Kotlin'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'data-science',
    title: 'Data Science Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'AI & Data',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Analyze complex datasets, train machine learning models, and generate predictive business insights.',
    tools: ['Python', 'Pandas', 'Scikit-Learn', 'TensorFlow', 'Jupyter'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Intern',
    category: 'Non-Technical Domains',
    categoryGroup: 'non-technical',
    tag: 'Growth Marketing',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Execute PPC campaigns on Meta & Google Ads, optimize SEO copy, and drive inbound lead funnels.',
    tools: ['Meta Ads Manager', 'Google Analytics 4', 'Semrush', 'Mailchimp'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'project-management',
    title: 'Project Management Intern',
    category: 'Non-Technical Domains',
    categoryGroup: 'non-technical',
    tag: 'Agile Delivery',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Coordinate Agile sprint ceremonies, track deliverables, manage Jira backlogs, and write client updates.',
    tools: ['Jira', 'Trello', 'Asana', 'Notion', 'Slack'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'react-development',
    title: 'React Development Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Frontend UI',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build responsive, accessible user interfaces with React 19, Redux Toolkit, Tailwind CSS, and Framer Motion.',
    tools: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'TypeScript'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Data Systems',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build ETL pipelines, architect big data warehouses, and manage automated SQL/NoSQL database streams.',
    tools: ['Apache Spark', 'Python', 'SQL', 'PostgreSQL', 'Airflow'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'game-development',
    title: 'Game Development Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Game Engine',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Design 2D/3D physics, game loops, multiplayer networking, and character asset mechanics.',
    tools: ['Unity 3D', 'Unreal Engine 5', 'C#', 'C++', 'Blender'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'dotnet-development',
    title: '.NET Development Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Enterprise Backend',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build enterprise C# ASP.NET Core web APIs, microservices architectures, and Azure integrations.',
    tools: ['C#', 'ASP.NET Core', 'MS SQL Server', 'Entity Framework', 'Azure'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Requirements & BI',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Gather client requirements, document SRS/BRD specifications, and create Power BI executive dashboards.',
    tools: ['Power BI', 'Advanced Excel', 'Jira', 'SQL', 'UML Diagrams'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'software-testing',
    title: 'Software Testing (QA) Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'QA Automation',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Execute manual test suites, write automated Selenium test scripts, and perform API testing with Postman.',
    tools: ['Selenium', 'Cypress', 'Postman', 'Jira', 'JUnit'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management Intern',
    category: 'Non-Technical Domains',
    categoryGroup: 'non-technical',
    tag: 'Social Media',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Plan content calendars, create viral Instagram reels, write engaging LinkedIn posts, and manage online communities.',
    tools: ['Canva', 'CapCut', 'Hootsuite', 'Buffer', 'ChatGPT'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'java-full-stack',
    title: 'Java Full Stack Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Enterprise Java',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Engineer full-stack web platforms using Spring Boot, Hibernate, MySQL, and React frontend components.',
    tools: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'Docker'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'python-development',
    title: 'Python Development Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Python Engineering',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop REST APIs, web scrapers, data processing automation, and Django/FastAPI microservices.',
    tools: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'BeautifulSoup'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack Intern',
    category: 'Technical Domains',
    categoryGroup: 'technical',
    tag: 'Full-Stack Web',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Architect complete full-stack web applications with MongoDB, Express, React, and Node.js.',
    tools: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'hr-internship',
    title: 'Human Resources (HR) Intern',
    category: 'Non-Technical Domains',
    categoryGroup: 'non-technical',
    tag: 'Talent Acquisition',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Source technical candidates, schedule interview pipelines, assist in employee onboarding and engagement.',
    tools: ['LinkedIn Recruiter', 'Keka HR', 'Google Workspace', 'Canva'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'ccna-networking',
    title: 'CCNA Network Engineering Intern',
    category: 'Networking',
    categoryGroup: 'networking',
    tag: 'Network Core',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Configure Cisco routers & switches, troubleshoot OSPF/VLANs, and build Packet Tracer enterprise topology labs.',
    tools: ['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'Cisco IOS CLI', 'Putty'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'ethical-hacking-networking',
    title: 'Ethical Hacking & Network Security Intern',
    category: 'Networking',
    categoryGroup: 'networking',
    tag: 'Pentesting',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Perform network vulnerability scanning, Wi-Fi security audits, firewall rule testing, and SOC threat analysis.',
    tools: ['Kali Linux', 'Nmap', 'Burp Suite', 'Wireshark', 'pfSense'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  },
  {
    id: 'cloud-networking-intern',
    title: 'Cloud & SD-WAN Network Intern',
    category: 'Networking',
    categoryGroup: 'networking',
    tag: 'Cloud Infrastructure',
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Architect AWS VPC network peering, Transit Gateways, Direct Connect, and Cisco SD-WAN overlay networks.',
    tools: ['AWS VPC', 'Azure VNet', 'Cisco SD-WAN', 'Terraform', 'Wireshark'],
    price1Month: 499,
    price3Month: 999,
    price6Month: 1499
  }
];
