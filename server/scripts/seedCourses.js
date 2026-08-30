import "dotenv/config";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import connectDB from "../config/db.js";

// Full dataset migrated from the 6 hardcoded frontend pages
// (Networking.jsx, AITools.jsx, Technical.jsx, NonTechnical.jsx,
// CorporateTraining.jsx, OnlineBusiness.jsx). iconName is stored as the
// literal lucide-react export name so the frontend can look it up
// dynamically (same pattern as the Internship model's iconName field).

const allCoursesData = [
  // --- NETWORKING (12) ---
  { title: "CCNA Automation", category: "Networking", tag: "Network Automation", iconName: "Terminal", tools: ["Python", "Ansible", "RESTCONF", "NETCONF", "Cisco DNA Center"], duration: "3 Months", price: 12499, description: "Automate network configuration and telemetry using Python Netmiko and Ansible." },
  { title: "Ethical Hacking", category: "Networking", tag: "Security & Hacking", iconName: "Lock", tools: ["Kali Linux", "Metasploit", "Nmap", "Burp Suite", "Wireshark"], duration: "3 Months", price: 12999, description: "Learn vulnerability assessment, penetration testing, network sniffing, and security audits." },
  { title: "CCNA", category: "Networking", tag: "Cisco Fundamentals", iconName: "Cpu", tools: ["Cisco Packet Tracer", "GNS3", "Wireshark", "Cisco IOS CLI", "Putty"], duration: "3 Months", price: 11999, description: "Master IPv4/IPv6 subnetting, OSPF, VLANs, STP, WAN protocols, and Cisco IOS CLI." },
  { title: "CCNA + CCNA Security", category: "Networking", tag: "Advanced Security", iconName: "ShieldCheck", tools: ["Cisco ASA", "Packet Tracer", "VPN Tunnels", "AAA Services", "Wireshark"], duration: "6 Months", price: 15499, description: "Comprehensive Cisco routing, switching, VPN encryption, and firewall security suite." },
  { title: "Computer Fundamentals", category: "Networking", tag: "IT Basics", iconName: "Cpu", tools: ["Windows OS", "Linux Commands", "Hardware Specs", "BIOS", "Networking"], duration: "1 Month", price: 4999, description: "Master computer architecture, OS fundamentals, hardware assembly, and network basics." },
  { title: "TCP/IP Masterclass", category: "Networking", tag: "Protocols", iconName: "Activity", tools: ["Wireshark", "TCPDump", "IP Subnetting", "DNS", "DHCP Server"], duration: "3 Months", price: 7999, description: "Deep dive into OSI layers, TCP handshake, IP packet analysis, and DNS/DHCP troubleshooting." },
  { title: "Cisco CCNA (200-301)", category: "Networking", tag: "Official Certification", iconName: "Server", tools: ["EVE-NG", "Cisco Packet Tracer", "Python Netmiko", "Cisco SD-WAN"], duration: "3 Months", price: 13999, description: "Advanced BGP routing, EIGRP, SD-WAN architecture, and enterprise switch hardening." },
  { title: "Network Engineering", category: "Networking", tag: "Infrastructure", iconName: "Radio", tools: ["Cisco Switches", "Mikrotik", "BGP Routing", "VLAN Trunking", "GNS3"], duration: "3 Months", price: 14499, description: "Architect enterprise networks, multi-switch trunking, inter-VLAN routing, and ISP failover." },
  { title: "CCNA + ECCNP", category: "Networking", tag: "Master Certification", iconName: "Award", tools: ["Cisco IOS", "EVE-NG", "Wireshark", "Security Auditing", "Firewalls"], duration: "6 Months", price: 15999, description: "Enterprise-grade Cisco CCNA paired with advanced EC-Council network security practitioner training." },
  { title: "Cloud and Networking Pro", category: "Networking", tag: "Cloud & VPC", iconName: "Cloud", tools: ["AWS VPC", "Azure VNet", "CloudFlare DNS", "Terraform Cloud"], duration: "3 Months", price: 14999, description: "Architect multi-region VPC peering, Transit Gateways, Direct Connect, and Route 53 DNS." },
  { title: "Network Security & Firewall Expert", category: "Networking", tag: "Firewalls", iconName: "ShieldCheck", tools: ["Palo Alto PAN-OS", "FortiGate", "pfSense", "Cisco ASA", "Wireshark"], duration: "6 Months", price: 14499, description: "Configure Palo Alto, Fortinet, and Cisco ASA firewalls, NAT, IPsec VPNs, and IPS/IDS." },
  { title: "Enterprise Networking Masterclass", category: "Networking", tag: "Enterprise Architecture", iconName: "Globe", tools: ["Cisco SD-WAN", "Wi-Fi 6 APs", "Spine-Leaf Fabric", "Radius Server", "EVE-NG"], duration: "6 Months", price: 14999, description: "Design high-density corporate Wi-Fi 6, SD-WAN mesh topologies, and zero-downtime ISP failover." },

  // --- AI & DIGITAL SKILLS (14) ---
  { title: "AI Coding", category: "AI & Digital Skills", tag: "AI Engineering", iconName: "Code2", tools: ["Cursor", "GitHub Copilot", "Windsurf", "Replit AI", "Amazon Q Developer"], duration: "3 Months", price: 1499, description: "Boost software development velocity with cutting-edge AI pair programmers." },
  { title: "AI Automation", category: "AI & Digital Skills", tag: "Workflows", iconName: "Workflow", tools: ["n8n", "Make.com", "Zapier AI", "Lindy AI", "Gumloop"], duration: "3 Months", price: 1999, description: "Automate repetitive workflows, APIs, and business processes using agentic tools." },
  { title: "Data Analyst", category: "AI & Digital Skills", tag: "Business Intelligence", iconName: "BarChart3", tools: ["Chat GPT", "Claude ai", "Julius ai", "Power BI Copilot", "GitHub Copilot"], duration: "3 Months", price: 1499, description: "Transform complex datasets into actionable business insights with AI analysts." },
  { title: "Data Science (Short)", category: "AI & Digital Skills", tag: "Machine Learning", iconName: "Database", tools: ["DataRobot", "H2O.ai", "Dataiku", "Amazon SageMaker AI", "Vertex AI"], duration: "3 Months", price: 1699, description: "Build predictive models, machine learning pipelines, and cloud AI infrastructure." },
  { title: "UI UX", category: "AI & Digital Skills", tag: "Product Design", iconName: "Layout", tools: ["Figma AI", "Galileo Ai", "Uizard", "Framer AI", "Relume AI"], duration: "3 Months", price: 1299, description: "Generate high-fidelity UI mockups, wireframes, and design systems automatically." },
  { title: "Graphic designing", category: "AI & Digital Skills", tag: "Visual Design", iconName: "Palette", tools: ["Photoshop", "Canva Ai", "Adobe Express", "ChatGPT (GPT Image Gen)", "Pixlr AI"], duration: "3 Months", price: 1299, description: "Create stunning brand assets, banners, and digital graphics with generative AI." },
  { title: "AI video Editing", category: "AI & Digital Skills", tag: "Media Production", iconName: "Video", tools: ["Runway", "CapCut AI", "Adobe Premiere Pro", "Descript", "VEED.IO"], duration: "3 Months", price: 999, description: "Automate script-to-video production, editing, subtitles, and motion graphics." },
  { title: "AI Image Genrat", category: "AI & Digital Skills", tag: "Generative Media", iconName: "Image", tools: ["Midjourney", "ChatGPT (GPT Image Gen)", "Adobe Firefly", "Ideogram AI", "Flux AI"], duration: "3 Months", price: 499, description: "Synthesize photorealistic concept art, textures, and commercial illustrations." },
  { title: "Creative & Digital Skill", category: "AI & Digital Skills", tag: "Digital Growth", iconName: "Compass", tools: ["Canva Mastery", "Lead Generation", "Affiliate Marketing"], duration: "3 Months", price: 999, description: "Master practical digital skills for remote work, freelancing, and monetization." },
  { title: "Marketing Skill", category: "AI & Digital Skills", tag: "Soft Skills", iconName: "Megaphone", tools: ["Public Speaking", "Communication Skills", "Spoken English"], duration: "3 Months", price: 999, description: "Develop impactful executive communication, public speaking, and fluency." },
  { title: "Content Creation", category: "AI & Digital Skills", tag: "Social Media", iconName: "Share2", tools: ["Instagram Mastery", "Reel Creation Mastery", "How to Attract & Influence People"], duration: "3 Months", price: 1299, description: "Build viral personal brands, engage audiences, and produce engaging short-form reels." },
  { title: "Digital Business marketing", category: "AI & Digital Skills", tag: "Performance Ads", iconName: "TrendingUp", tools: ["Facebook Ads Run", "Email marketing", "Reselling Mastery"], duration: "3 Months", price: 1499, description: "Scale customer acquisition with Facebook ads, email automation, and reselling." },
  { title: "wealth creation & Business Growth", category: "AI & Digital Skills", tag: "Finance & Sales", iconName: "Coins", tools: ["Stock Market", "Finance", "Crypto", "YouTube Mastery", "Sales Mastery"], duration: "3 Months", price: 1499, description: "Master stock market trading, crypto fundamentals, YouTube monetization, and sales." },
  { title: "AI Presentation & Documation", category: "AI & Digital Skills", tag: "Productivity", iconName: "Presentation", tools: ["Gamma AI", "Tome AI", "Beautiful.ai", "Canva AI", "Decktopus AI"], duration: "3 Months", price: 1499, description: "Create compelling investor pitch decks, reports, and AI slide presentations in seconds." },

  // --- TECHNICAL DOMAINS (31) ---
  { title: "Cyber Security", category: "Technical Domains", tag: "Security", iconName: "ShieldCheck", tools: ["Burp Suite", "Metasploit", "Wireshark", "Kali Linux", "Nmap"], duration: "6 Months", price: 14999, description: "Master penetration testing, web app vulnerability scanning, SOC operations, and threat hunting." },
  { title: "App Development", category: "Technical Domains", tag: "Mobile Tech", iconName: "Smartphone", tools: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"], duration: "6 Months", price: 14999, description: "Build native iOS and Android apps with cross-platform frameworks and hardware API access." },
  { title: "Data Engineering", category: "Technical Domains", tag: "Data Pipelines", iconName: "Database", tools: ["Apache Spark", "Snowflake", "Airflow", "Kafka", "SQL"], duration: "6 Months", price: 14999, description: "Build scalable ETL data pipelines, data warehouses, and big data streaming architecture." },
  { title: "Game Development", category: "Technical Domains", tag: "Gaming & 3D", iconName: "Code", tools: ["Unity", "Unreal Engine", "C#", "C++", "Blender"], duration: "6 Months", price: 14999, description: "Create immersive 2D/3D games, game physics, and interactive graphics engines." },
  { title: ".NET Development", category: "Technical Domains", tag: "Enterprise Tech", iconName: "Layers", tools: ["C#", ".NET Core", "ASP.NET", "Entity Framework", "SQL Server"], duration: "6 Months", price: 12999, description: "Architect enterprise software applications and microservices using C# and .NET Core." },
  { title: "Business Analyst", category: "Technical Domains", tag: "Business Intelligence", iconName: "BarChart3", tools: ["Power BI", "Advanced Excel", "SQL", "Jira", "Tableau"], duration: "3 Months", price: 9999, description: "Bridge business requirements with technical solutions using data modeling and agile workflows." },
  { title: "Software Testing", category: "Technical Domains", tag: "Quality Assurance", iconName: "Workflow", tools: ["Selenium", "Cypress", "Playwright", "Postman", "JUnit"], duration: "3 Months", price: 8999, description: "Implement end-to-end automated testing frameworks for web, API, and mobile applications." },
  { title: "Java Full Stack Development", category: "Technical Domains", tag: "Java Stack", iconName: "Code", tools: ["Java", "Spring Boot", "Hibernate", "React", "MySQL"], duration: "6 Months", price: 14999, description: "Master end-to-end Java enterprise web development with Spring Boot and React." },
  { title: "Python Development", category: "Technical Domains", tag: "Python & Web", iconName: "Code", tools: ["Python", "Django", "FastAPI", "Flask", "PostgreSQL"], duration: "3 Months", price: 9999, description: "Build high-performance web applications, APIs, and automation scripts with Python." },
  { title: "React Development", category: "Technical Domains", tag: "Frontend", iconName: "Globe", tools: ["React 19", "Redux", "TypeScript", "Tailwind CSS", "Vite"], duration: "3 Months", price: 8999, description: "Master modern frontend web development with React 19, Redux Toolkit, and Hooks." },
  { title: "Video Editing", category: "Technical Domains", tag: "Creative Media", iconName: "Video", tools: ["Adobe Premiere Pro", "After Effects", "CapCut", "DaVinci Resolve"], duration: "3 Months", price: 6999, description: "Create high-converting video edits, motion graphics, and visual effects for digital platforms." },
  { title: "Graphic Design", category: "Technical Domains", tag: "Visual Arts", iconName: "Palette", tools: ["Photoshop", "Illustrator", "Canva", "Figma", "InDesign"], duration: "3 Months", price: 6999, description: "Design professional logos, brand collateral, marketing graphics, and vector illustrations." },
  { title: "UI/UX Design", category: "Technical Domains", tag: "Product Design", iconName: "Layers", tools: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"], duration: "3 Months", price: 6999, description: "Create intuitive user experiences, interactive prototypes, and modern design systems." },
  { title: "Digital Marketing", category: "Technical Domains", tag: "Growth & Ads", iconName: "TrendingUp", tools: ["Google Ads", "Meta Ads Manager", "GA4", "SEO", "Email Automation"], duration: "3 Months", price: 9999, description: "Scale business revenue with Meta Ads, Google Ads, SEO, and sales funnel optimization." },
  { title: "Advanced Excel", category: "Technical Domains", tag: "Data & Reporting", iconName: "FileSpreadsheet", tools: ["Pivot Tables", "VLOOKUP / XLOOKUP", "Power Query", "VBA Macros", "Dashboards"], duration: "3 Months", price: 4999, description: "Master complex financial formulas, Pivot Tables, Power Query, and VBA macro automation." },
  { title: "Flutter Development", category: "Technical Domains", tag: "Cross-Platform App", iconName: "Smartphone", tools: ["Flutter", "Dart", "BLoC Pattern", "Firebase", "REST APIs"], duration: "6 Months", price: 12999, description: "Build multi-platform mobile apps for iOS and Android using Dart and Flutter framework." },
  { title: "Data Visualization (Power BI)", category: "Technical Domains", tag: "Business Dashboards", iconName: "BarChart3", tools: ["Power BI", "DAX Formulas", "Power Query", "SQL", "Data Modeling"], duration: "3 Months", price: 6999, description: "Transform business metrics into interactive executive telemetry and Power BI dashboards." },
  { title: "Data Science", category: "Technical Domains", tag: "AI & Machine Learning", iconName: "Database", tools: ["Python", "Pandas", "TensorFlow", "PyTorch", "Scikit-Learn"], duration: "6 Months", price: 14999, description: "Construct predictive ML models, neural networks, data pipelines, and deep learning algorithms." },
  { title: "MEAN Stack Development", category: "Technical Domains", tag: "Web Stack", iconName: "Globe", tools: ["MongoDB", "Express.js", "Angular", "Node.js", "TypeScript"], duration: "6 Months", price: 14999, description: "Develop enterprise JavaScript web applications using MongoDB, Express, Angular, and Node.js." },
  { title: "MERN Stack Development", category: "Technical Domains", tag: "Web Stack", iconName: "Globe", tools: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux"], duration: "6 Months", price: 14999, description: "Build scalable web platforms using MongoDB, Express, React, and Node.js." },
  { title: "Machine Learning", category: "Technical Domains", tag: "AI Models", iconName: "Cpu", tools: ["Python", "Scikit-Learn", "TensorFlow", "Keras", "NumPy"], duration: "6 Months", price: 14999, description: "Build predictive algorithms, regression, classification, and neural network models." },
  { title: "Artificial Intelligence", category: "Technical Domains", tag: "Generative AI", iconName: "Cpu", tools: ["LangChain", "LlamaIndex", "Pinecone", "OpenAI API", "Ollama"], duration: "6 Months", price: 14999, description: "Architect multi-agent AI applications, LLM fine-tuning, RAG, and vector search systems." },
  { title: "Data Analytics", category: "Technical Domains", tag: "Data Insights", iconName: "Database", tools: ["SQL", "Python", "Excel", "Power BI", "Tableau"], duration: "3 Months", price: 9999, description: "Analyze business datasets, generate SQL queries, and build executive reporting dashboards." },
  { title: "Web Development", category: "Technical Domains", tag: "Web Fundamentals", iconName: "Globe", tools: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git"], duration: "3 Months", price: 9999, description: "Build responsive, modern websites using HTML5, CSS3, JavaScript ES6+, and Bootstrap." },
  { title: "WordPress Development", category: "Technical Domains", tag: "CMS & E-Commerce", iconName: "Globe", tools: ["WordPress", "WooCommerce", "Elementor", "PHP", "SEO Plugins"], duration: "3 Months", price: 4999, description: "Create custom WordPress themes, WooCommerce stores, and corporate websites with zero coding." },
  { title: "Python Full Stack Development", category: "Technical Domains", tag: "Python Stack", iconName: "Code", tools: ["Python", "Django", "React.js", "PostgreSQL", "Docker"], duration: "6 Months", price: 14999, description: "Build full-stack web applications with Python Django backend and React frontend." },
  { title: "Full Stack Development", category: "Technical Domains", tag: "Web Engineering", iconName: "Globe", tools: ["React.js", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript"], duration: "6 Months", price: 14999, description: "Master complete web software engineering with frontend, backend microservices, and databases." },
  { title: "SEO", category: "Technical Domains", tag: "Search Engine Optimization", iconName: "Globe", tools: ["Google Search Console", "Ahrefs", "SEMrush", "On-Page SEO", "Technical SEO"], duration: "3 Months", price: 4999, description: "Rank #1 on Google with technical SEO audits, keyword optimization, and backlink strategies." },
  { title: "Frontend Development", category: "Technical Domains", tag: "Frontend Stack", iconName: "Globe", tools: ["React.js", "JavaScript ES6+", "HTML5/CSS3", "Tailwind CSS", "Git"], duration: "3 Months", price: 8999, description: "Craft high-speed, interactive user interfaces with HTML, CSS, JavaScript, and React." },
  { title: "Backend Development", category: "Technical Domains", tag: "System Architecture", iconName: "Server", tools: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis", "JWT"], duration: "3 Months", price: 9999, description: "Design resilient server architectures, REST APIs, microservices, and database schemas." },
  { title: "MS SQL", category: "Technical Domains", tag: "Database Management", iconName: "Database", tools: ["MS SQL Server", "T-SQL", "SSMS", "Stored Procedures", "Database Indexing"], duration: "3 Months", price: 4999, description: "Master relational database design, complex T-SQL queries, indexing, and stored procedures." },

  // --- NON-TECHNICAL DOMAINS (15) ---
  { title: "Project Management", category: "Non-Technical Domains", tag: "Management", iconName: "Briefcase", tools: ["Jira", "Asana", "Trello", "MS Project", "Slack"], duration: "3 Months", price: 7999, description: "Master PMP & Scrum frameworks, agile sprint scheduling, risk management, and team leadership." },
  { title: "Sales Executive", category: "Non-Technical Domains", tag: "Sales", iconName: "DollarSign", tools: ["Salesforce", "HubSpot CRM", "Cold Calling", "Pitching", "CRM Tracking"], duration: "3 Months", price: 5999, description: "Learn high-converting sales pitching, objection handling, lead qualification, and deal closing." },
  { title: "Social Media Handling", category: "Non-Technical Domains", tag: "Social Media", iconName: "Megaphone", tools: ["Buffer", "Hootsuite", "Meta Business Suite", "Canva", "Later"], duration: "1 Month", price: 3999, description: "Manage daily social media accounts, audience inbox replies, community engagement, and post scheduling." },
  { title: "Social Media Management", category: "Non-Technical Domains", tag: "Social Growth", iconName: "Megaphone", tools: ["Meta Suite", "Sprout Social", "Canva Pro", "CapCut", "Analytics"], duration: "3 Months", price: 5999, description: "Develop monthly brand content calendars, organic growth strategies, and social media analytics." },
  { title: "Social Media Marketing", category: "Non-Technical Domains", tag: "Social Ads", iconName: "Megaphone", tools: ["Meta Ads Manager", "LinkedIn Ads", "YouTube Ads", "Pixel Tracking", "GA4"], duration: "3 Months", price: 6999, description: "Run high-ROI paid ad campaigns on Instagram, Facebook, LinkedIn, and YouTube for lead generation." },
  { title: "Accounting", category: "Non-Technical Domains", tag: "Finance & Tax", iconName: "BarChart", tools: ["Tally Prime", "QuickBooks", "Excel", "GST Filing", "Zoho Books"], duration: "3 Months", price: 6999, description: "Master corporate financial accounting, GST filing, balance sheets, Tally Prime, and payroll." },
  { title: "Content Creation", category: "Non-Technical Domains", tag: "Creative Media", iconName: "FileText", tools: ["Canva Pro", "CapCut", "ChatGPT", "Instagram Reels", "YouTube Shorts"], duration: "3 Months", price: 5999, description: "Create viral short-form video reels, brand storytelling, graphics, and multi-channel content." },
  { title: "BDE (Business Development Executive)", category: "Non-Technical Domains", tag: "BizDev", iconName: "Target", tools: ["LinkedIn Sales Nav", "Apollo.io", "Email Outreach", "Cold Pitching", "CRM"], duration: "3 Months", price: 5999, description: "Master B2B corporate outreach, client acquisition, proposal writing, and revenue expansion." },
  { title: "HR", category: "Non-Technical Domains", tag: "Human Resources", iconName: "Users", tools: ["Workday", "BambooHR", "LinkedIn Recruiter", "Keka", "Excel"], duration: "3 Months", price: 6999, description: "Master corporate HR operations, talent acquisition, employee onboarding, labor laws, and payroll." },
  { title: "Content Writing", category: "Non-Technical Domains", tag: "Copywriting", iconName: "FileText", tools: ["Grammarly", "ChatGPT", "WordPress", "SEO Copywriting", "Hemingway"], duration: "3 Months", price: 4999, description: "Write high-converting website copy, SEO blog articles, email sales sequences, and ad scripts." },
  { title: "Email Marketing", category: "Non-Technical Domains", tag: "Email Funnels", iconName: "Megaphone", tools: ["Mailchimp", "Klaviyo", "ActiveCampaign", "Sendinblue", "Copywriting"], duration: "1 Month", price: 3999, description: "Build automated email sequences, newsletter campaigns, lead magnet funnels, and high open-rate copy." },
  { title: "Tele Calling", category: "Non-Technical Domains", tag: "Customer Outreach", iconName: "Users", tools: ["Phone Etiquette", "CRM Logging", "Objection Handling", "Lead Follow-up"], duration: "1 Month", price: 3999, description: "Develop professional phone etiquette, outbound telesales techniques, and customer lead follow-ups." },
  { title: "Support Calling", category: "Non-Technical Domains", tag: "Customer Service", iconName: "Users", tools: ["Zendesk", "Freshdesk", "Customer Support", "Ticket Routing", "VoIP"], duration: "1 Month", price: 3999, description: "Master customer service support, ticket resolution, query handling, and client retention." },
  { title: "Meta & Google Ads", category: "Non-Technical Domains", tag: "Performance Ads", iconName: "Target", tools: ["Google Ads", "Meta Ads Manager", "Keyword Planner", "GA4", "GTM"], duration: "3 Months", price: 6999, description: "Run high-converting paid search ads on Google and retargeting campaigns on Meta Ads Manager." },
  { title: "BDA (Business Development Associate)", category: "Non-Technical Domains", tag: "Sales & Growth", iconName: "Target", tools: ["HubSpot CRM", "Cold Calling", "Sales Nav", "Email Pitching", "Negotiation"], duration: "3 Months", price: 5999, description: "Learn consultative sales, client relationship management, revenue growth, and deal closing." },

  // --- CORPORATE TRAINING (9) ---
  { title: "IT Department & Corporate Technology Basics", category: "Corporate Training", tag: "IT Department", iconName: "Building", tools: ["Active Directory", "AWS Cloud", "Windows Server", "HelpDesk", "Network Basics"], duration: "1 Month", price: 4999, description: "Master enterprise IT infrastructure, cloud fundamentals, corporate cybersecurity hygiene, and tech support." },
  { title: "Human Resource Management in Corporate", category: "Corporate Training", tag: "HR Department", iconName: "Users", tools: ["Workday", "Keka HR", "LinkedIn Recruiter", "Excel", "HR Policies"], duration: "1 Month", price: 3999, description: "Corporate HR management, employee onboarding, labor law compliance, performance reviews, and retention." },
  { title: "Corporate Sales & Business Development", category: "Corporate Training", tag: "Sales Department", iconName: "TrendingUp", tools: ["Salesforce", "HubSpot CRM", "LinkedIn Sales Nav", "Cold Pitching", "B2B Sales"], duration: "1 Month", price: 3999, description: "Corporate B2B lead generation, consultative sales pitching, pipeline CRM tracking, and deal negotiation." },
  { title: "Digital Marketing & Corporate Marketing", category: "Corporate Training", tag: "Marketing Dept", iconName: "Target", tools: ["Google Ads", "Meta Ads Manager", "GA4", "SEO", "Email Campaigns"], duration: "1 Month", price: 4999, description: "Corporate brand positioning, Meta & Google Ads campaigns, SEO optimization, and corporate PR." },
  { title: "Corporate Finance & Accounting Basics", category: "Corporate Training", tag: "Finance Dept", iconName: "BarChart", tools: ["Tally Prime", "QuickBooks", "Excel Financials", "GST Filing", "Zoho Books"], duration: "1 Month", price: 3999, description: "Master corporate financial accounting, balance sheet auditing, GST compliance, Tally, and budgeting." },
  { title: "Business Operations & Process Management", category: "Corporate Training", tag: "Operations Dept", iconName: "Layers", tools: ["Asana", "Process Mapping", "SOPs", "Notion", "Jira"], duration: "1 Month", price: 3999, description: "Optimize corporate business processes, supply chain workflows, SOP documentation, and operational efficiency." },
  { title: "Project Handling, Agile & Team Coordination", category: "Corporate Training", tag: "PM Department", iconName: "Briefcase", tools: ["Jira", "Confluence", "Agile Scrum", "Trello", "MS Project"], duration: "1 Month", price: 4999, description: "Train corporate project teams in Agile Scrum, sprint planning, Jira management, and cross-team coordination." },
  { title: "Corporate Administration & Office Management", category: "Corporate Training", tag: "Admin Dept", iconName: "Building", tools: ["MS Office 365", "Vendor Management", "Facility Admin", "Email Etiquette", "Scheduling"], duration: "1 Month", price: 3499, description: "Corporate front-office administration, vendor management, executive scheduling, and facility coordination." },
  { title: "Leadership & Team Management Skills", category: "Corporate Training", tag: "Leadership", iconName: "GraduationCap", tools: ["Leadership Frameworks", "1-on-1 Coaching", "Conflict Resolution", "KPI Tracking", "Team Building"], duration: "1 Month", price: 4499, description: "Develop team leader capabilities, conflict resolution, performance feedback, decision making, and motivation." },

  // --- ONLINE BUSINESS (6) ---
  { title: "Affiliate Marketing Mastery", category: "Online Business", tag: "Monetization", iconName: "Globe", tools: ["Amazon Associates", "ClickBank", "Impact Radius", "CJ Affiliate", "LinkTrust"], duration: "2 Months", price: 2499, description: "Build passive income streams using high-commission affiliate networks, tracking, and content funnels." },
  { title: "Reselling & Dropshipping Mastery", category: "Online Business", tag: "E-Commerce", iconName: "ShoppingBag", tools: ["Shopify", "Meesho", "DSers", "AliExpress", "WooCommerce"], duration: "2 Months", price: 1999, description: "Launch profitable dropshipping stores, product sourcing, meesho reselling, and zero-inventory scaling." },
  { title: "YouTube Mastery & Video Creator Blueprint", category: "Online Business", tag: "Video Growth", iconName: "Video", tools: ["YouTube Studio", "VidIQ", "TubeBuddy", "Canva", "CapCut"], duration: "3 Months", price: 2999, description: "Create viral YouTube channels, video SEO, thumbnail design, and multi-channel ad revenue." },
  { title: "Facebook & Instagram Paid Ads Scaling", category: "Online Business", tag: "Paid Ads", iconName: "Megaphone", tools: ["Meta Ads Manager", "Meta Pixel", "Canva Ads", "AdEspresso", "GA4"], duration: "3 Months", price: 3499, description: "Master Meta Ads Manager, CBO budgeting, custom audience pixel tracking, and high-ROAS ads." },
  { title: "Email Marketing & Sales Funnel Automation", category: "Online Business", tag: "Funnels", iconName: "Mail", tools: ["Mailchimp", "Klaviyo", "ClickFunnels", "ActiveCampaign", "ConvertKit"], duration: "2 Months", price: 2499, description: "Build automated email sequences, opt-in landing pages, and lead magnet conversion funnels." },
  { title: "High-Ticket Sales & Remote Closing", category: "Online Business", tag: "Sales Closing", iconName: "DollarSign", tools: ["Objection Handling", "Cold Calling", "Deal Structuring", "LinkedIn Sales Nav", "CRM Control"], duration: "3 Months", price: 2999, description: "Master consultative high-ticket sales scripts, handling objections, and closing premium clients." },
];

const seedCourses = async () => {
  await connectDB();

  const operations = allCoursesData.map((course, index) => ({
    updateOne: {
      filter: {
        title: course.title,
        category: course.category,
      },
      update: {
        $set: {
          title: course.title,
          category: course.category,
          duration: course.duration,
          price: course.price,
          tag: course.tag,
          iconName: course.iconName,
          tools: course.tools,
          description: course.description,
        },
        $setOnInsert: {
          instructor: "QorZen Academy",
          thumbnail: {
            url: "https://placehold.co/1280x720/png?text=QorZen+Course",
            publicId: `qorzen/seed-courses/${course.category}-${index}`.replace(/\s+/g, "-").toLowerCase(),
          },
          lessons: [],
          isActive: true,
        },
      },
      upsert: true,
    },
  }));

  const result = await Course.bulkWrite(operations);
  console.log(
    `Course seed complete: ${result.upsertedCount} created, ${result.modifiedCount} updated, ${allCoursesData.length} processed.`,
  );
};

try {
  await seedCourses();
} catch (error) {
  console.error(`Course seed failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}