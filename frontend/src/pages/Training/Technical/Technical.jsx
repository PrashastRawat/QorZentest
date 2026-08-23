import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Search,
  Sparkles,
  X,
  Zap,
  Globe,
  Database,
  Layers,
  ShieldCheck,
  Cpu,
  Smartphone,
  Workflow,
  Server,
  Cloud,
  Palette,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  Video
} from 'lucide-react';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { coursePricingData } from '../../../data/courses';
import './Technical.css';

// 31 Technical Domains Dataset (Exact User Specification)
const rawTechnicalModulesData = [
  {
    id: 'tech-cyber-security',
    title: 'Cyber Security',
    tag: 'Security',
    categoryGroup: 'security',
    icon: ShieldCheck,
    description: 'Master penetration testing, web app vulnerability scanning, SOC operations, and threat hunting.',
    tools: ['Burp Suite', 'Metasploit', 'Wireshark', 'Kali Linux', 'Nmap'],
    duration: '6 Months'
  },
  {
    id: 'tech-app-development',
    title: 'App Development',
    tag: 'Mobile Tech',
    categoryGroup: 'development',
    icon: Smartphone,
    description: 'Build native iOS and Android apps with cross-platform frameworks and hardware API access.',
    tools: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    duration: '6 Months'
  },
  {
    id: 'tech-data-engineering',
    title: 'Data Engineering',
    tag: 'Data Pipelines',
    categoryGroup: 'data',
    icon: Database,
    description: 'Build scalable ETL data pipelines, data warehouses, and big data streaming architecture.',
    tools: ['Apache Spark', 'Snowflake', 'Airflow', 'Kafka', 'SQL'],
    duration: '6 Months'
  },
  {
    id: 'tech-game-development',
    title: 'Game Development',
    tag: 'Gaming & 3D',
    categoryGroup: 'development',
    icon: Code,
    description: 'Create immersive 2D/3D games, game physics, and interactive graphics engines.',
    tools: ['Unity', 'Unreal Engine', 'C#', 'C++', 'Blender'],
    duration: '6 Months'
  },
  {
    id: 'tech-dotnet-development',
    title: '.NET Development',
    tag: 'Enterprise Tech',
    categoryGroup: 'development',
    icon: Layers,
    description: 'Architect enterprise software applications and microservices using C# and .NET Core.',
    tools: ['C#', '.NET Core', 'ASP.NET', 'Entity Framework', 'SQL Server'],
    duration: '6 Months'
  },
  {
    id: 'tech-business-analyst',
    title: 'Business Analyst',
    tag: 'Business Intelligence',
    categoryGroup: 'data',
    icon: BarChart3,
    description: 'Bridge business requirements with technical solutions using data modeling and agile workflows.',
    tools: ['Power BI', 'Advanced Excel', 'SQL', 'Jira', 'Tableau'],
    duration: '3 Months'
  },
  {
    id: 'tech-software-testing',
    title: 'Software Testing',
    tag: 'Quality Assurance',
    categoryGroup: 'development',
    icon: Workflow,
    description: 'Implement end-to-end automated testing frameworks for web, API, and mobile applications.',
    tools: ['Selenium', 'Cypress', 'Playwright', 'Postman', 'JUnit'],
    duration: '3 Months'
  },
  {
    id: 'tech-java-full-stack',
    title: 'Java Full Stack Development',
    tag: 'Java Stack',
    categoryGroup: 'development',
    icon: Code,
    description: 'Master end-to-end Java enterprise web development with Spring Boot and React.',
    tools: ['Java', 'Spring Boot', 'Hibernate', 'React', 'MySQL'],
    duration: '6 Months'
  },
  {
    id: 'tech-python-development',
    title: 'Python Development',
    tag: 'Python & Web',
    categoryGroup: 'development',
    icon: Code,
    description: 'Build high-performance web applications, APIs, and automation scripts with Python.',
    tools: ['Python', 'Django', 'FastAPI', 'Flask', 'PostgreSQL'],
    duration: '3 Months'
  },
  {
    id: 'tech-react-development',
    title: 'React Development',
    tag: 'Frontend',
    categoryGroup: 'development',
    icon: Globe,
    description: 'Master modern frontend web development with React 19, Redux Toolkit, and Hooks.',
    tools: ['React 19', 'Redux', 'TypeScript', 'Tailwind CSS', 'Vite'],
    duration: '3 Months'
  },
  {
    id: 'tech-video-editing',
    title: 'Video Editing',
    tag: 'Creative Media',
    categoryGroup: 'design',
    icon: Video,
    description: 'Create high-converting video edits, motion graphics, and visual effects for digital platforms.',
    tools: ['Adobe Premiere Pro', 'After Effects', 'CapCut', 'DaVinci Resolve'],
    duration: '3 Months'
  },
  {
    id: 'tech-graphic-design',
    title: 'Graphic Design',
    tag: 'Visual Arts',
    categoryGroup: 'design',
    icon: Palette,
    description: 'Design professional logos, brand collateral, marketing graphics, and vector illustrations.',
    tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma', 'InDesign'],
    duration: '3 Months'
  },
  {
    id: 'tech-ui-ux-design',
    title: 'UI/UX Design',
    tag: 'Product Design',
    categoryGroup: 'design',
    icon: Layers,
    description: 'Create intuitive user experiences, interactive prototypes, and modern design systems.',
    tools: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Research'],
    duration: '3 Months'
  },
  {
    id: 'tech-digital-marketing',
    title: 'Digital Marketing',
    tag: 'Growth & Ads',
    categoryGroup: 'marketing',
    icon: TrendingUp,
    description: 'Scale business revenue with Meta Ads, Google Ads, SEO, and sales funnel optimization.',
    tools: ['Google Ads', 'Meta Ads Manager', 'GA4', 'SEO', 'Email Automation'],
    duration: '3 Months'
  },
  {
    id: 'tech-advanced-excel',
    title: 'Advanced Excel',
    tag: 'Data & Reporting',
    categoryGroup: 'data',
    icon: FileSpreadsheet,
    description: 'Master complex financial formulas, Pivot Tables, Power Query, and VBA macro automation.',
    tools: ['Pivot Tables', 'VLOOKUP / XLOOKUP', 'Power Query', 'VBA Macros', 'Dashboards'],
    duration: '3 Months'
  },
  {
    id: 'tech-flutter-development',
    title: 'Flutter Development',
    tag: 'Cross-Platform App',
    categoryGroup: 'development',
    icon: Smartphone,
    description: 'Build multi-platform mobile apps for iOS and Android using Dart and Flutter framework.',
    tools: ['Flutter', 'Dart', 'BLoC Pattern', 'Firebase', 'REST APIs'],
    duration: '6 Months'
  },
  {
    id: 'tech-data-visualization',
    title: 'Data Visualization (Power BI)',
    tag: 'Business Dashboards',
    categoryGroup: 'data',
    icon: BarChart3,
    description: 'Transform business metrics into interactive executive telemetry and Power BI dashboards.',
    tools: ['Power BI', 'DAX Formulas', 'Power Query', 'SQL', 'Data Modeling'],
    duration: '3 Months'
  },
  {
    id: 'tech-data-science',
    title: 'Data Science',
    tag: 'AI & Machine Learning',
    categoryGroup: 'data',
    icon: Database,
    description: 'Construct predictive ML models, neural networks, data pipelines, and deep learning algorithms.',
    tools: ['Python', 'Pandas', 'TensorFlow', 'PyTorch', 'Scikit-Learn'],
    duration: '6 Months'
  },
  {
    id: 'tech-mean-stack',
    title: 'MEAN Stack Development',
    tag: 'Web Stack',
    categoryGroup: 'development',
    icon: Globe,
    description: 'Develop enterprise JavaScript web applications using MongoDB, Express, Angular, and Node.js.',
    tools: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'TypeScript'],
    duration: '6 Months'
  },
  {
    id: 'tech-mern-stack',
    title: 'MERN Stack Development',
    tag: 'Web Stack',
    categoryGroup: 'development',
    icon: Globe,
    description: 'Build scalable web platforms using MongoDB, Express, React, and Node.js.',
    tools: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux'],
    duration: '6 Months'
  },
  {
    id: 'tech-machine-learning',
    title: 'Machine Learning',
    tag: 'AI Models',
    categoryGroup: 'data',
    icon: Cpu,
    description: 'Build predictive algorithms, regression, classification, and neural network models.',
    tools: ['Python', 'Scikit-Learn', 'TensorFlow', 'Keras', 'NumPy'],
    duration: '6 Months'
  },
  {
    id: 'tech-artificial-intelligence',
    title: 'Artificial Intelligence',
    tag: 'Generative AI',
    categoryGroup: 'data',
    icon: Cpu,
    description: 'Architect multi-agent AI applications, LLM fine-tuning, RAG, and vector search systems.',
    tools: ['LangChain', 'LlamaIndex', 'Pinecone', 'OpenAI API', 'Ollama'],
    duration: '6 Months'
  },
  {
    id: 'tech-data-analytics',
    title: 'Data Analytics',
    tag: 'Data Insights',
    categoryGroup: 'data',
    icon: Database,
    description: 'Analyze business datasets, generate SQL queries, and build executive reporting dashboards.',
    tools: ['SQL', 'Python', 'Excel', 'Power BI', 'Tableau'],
    duration: '3 Months'
  },
  {
    id: 'tech-web-development',
    title: 'Web Development',
    tag: 'Web Fundamentals',
    categoryGroup: 'development',
    icon: Globe,
    description: 'Build responsive, modern websites using HTML5, CSS3, JavaScript ES6+, and Bootstrap.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git'],
    duration: '3 Months'
  },
  {
    id: 'tech-wordpress-development',
    title: 'WordPress Development',
    tag: 'CMS & E-Commerce',
    categoryGroup: 'development',
    icon: Globe,
    description: 'Create custom WordPress themes, WooCommerce stores, and corporate websites with zero coding.',
    tools: ['WordPress', 'WooCommerce', 'Elementor', 'PHP', 'SEO Plugins'],
    duration: '3 Months'
  },
  {
    id: 'tech-python-full-stack',
    title: 'Python Full Stack Development',
    tag: 'Python Stack',
    categoryGroup: 'development',
    icon: Code,
    description: 'Build full-stack web applications with Python Django backend and React frontend.',
    tools: ['Python', 'Django', 'React.js', 'PostgreSQL', 'Docker'],
    duration: '6 Months'
  },
  {
    id: 'tech-full-stack-dev',
    title: 'Full Stack Development',
    tag: 'Web Engineering',
    categoryGroup: 'development',
    icon: Globe,
    description: 'Master complete web software engineering with frontend, backend microservices, and databases.',
    tools: ['React.js', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    duration: '6 Months'
  },
  {
    id: 'tech-seo',
    title: 'SEO',
    tag: 'Search Engine Optimization',
    categoryGroup: 'marketing',
    icon: Globe,
    description: 'Rank #1 on Google with technical SEO audits, keyword optimization, and backlink strategies.',
    tools: ['Google Search Console', 'Ahrefs', 'SEMrush', 'On-Page SEO', 'Technical SEO'],
    duration: '3 Months'
  },
  {
    id: 'tech-frontend-dev',
    title: 'Frontend Development',
    tag: 'Frontend Stack',
    categoryGroup: 'development',
    icon: Globe,
    description: 'Craft high-speed, interactive user interfaces with HTML, CSS, JavaScript, and React.',
    tools: ['React.js', 'JavaScript ES6+', 'HTML5/CSS3', 'Tailwind CSS', 'Git'],
    duration: '3 Months'
  },
  {
    id: 'tech-backend-dev',
    title: 'Backend Development',
    tag: 'System Architecture',
    categoryGroup: 'development',
    icon: Server,
    description: 'Design resilient server architectures, REST APIs, microservices, and database schemas.',
    tools: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'JWT'],
    duration: '3 Months'
  },
  {
    id: 'tech-ms-sql',
    title: 'MS SQL',
    tag: 'Database Management',
    categoryGroup: 'data',
    icon: Database,
    description: 'Master relational database design, complex T-SQL queries, indexing, and stored procedures.',
    tools: ['MS SQL Server', 'T-SQL', 'SSMS', 'Stored Procedures', 'Database Indexing'],
    duration: '3 Months'
  }
];

export const technicalModulesData = rawTechnicalModulesData.map((item) => {
  const match = coursePricingData.find(
    (c) => c.title.toLowerCase() === item.title.toLowerCase()
  );
  return {
    ...item,
    price: match ? match.price : null
  };
});

const categories = [
  { key: 'all', label: 'All 31 Domains' },
  { key: 'development', label: 'Software & Web' },
  { key: 'data', label: 'Data & AI' },
  { key: 'security', label: 'Cyber Security' },
  { key: 'design', label: 'Design & Media' },
  { key: 'marketing', label: 'Digital Growth' },
];

const Technical = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter modules based on tab & live search query
  const filteredData = useMemo(() => {
    return technicalModulesData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryGroup === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="technical-page">
      {/* Hero Section */}
      <section className="technical-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Sparkles size={14} className="hero-badge-icon" />
            <span>QorZen Official Technical Training Registry</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            31 Specialized <span className="highlight-text">Technical Training Programs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Hands-on technical mastery across 31 industry-verified domains with 1-on-1 engineering mentorship and certification.
          </motion.p>
        </div>
      </section>

      {/* Filter & Live Search Toolbar */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f9f8f6' }}>
        <div className="container">
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                id="techSearchInput"
                name="techSearchInput"
                type="text"
                autoComplete="off"
                placeholder="Search technical domains, tech stacks, or languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid View */}
      <section className="technical-grid-section" style={{ padding: '4rem 0' }}>
        <div className="container">
          {filteredData.length > 0 ? (
            <div className="cards-responsive-grid">
              {filteredData.map((item, idx) => (
                <CategoryCard
                  key={item.id}
                  category={item}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={32} className="no-results-icon" />
              <h3>No Technical Modules Matched</h3>
              <p>Try refining your search query or switching category tabs.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="reset-filter-btn">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Technical;
