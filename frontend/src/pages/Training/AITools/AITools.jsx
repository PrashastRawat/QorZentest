import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  Code2,
  Workflow,
  BarChart3,
  Database,
  Layout,
  Palette,
  Video,
  Image as ImageIcon,
  Compass,
  Megaphone,
  Share2,
  TrendingUp,
  Coins,
  Presentation,
  Check,
  X,
  BookOpen,
  Zap,
  Award
} from 'lucide-react';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { coursePricingData } from '../../../data/courses';
import './AITools.css';

// 14 Exact Sections as requested
const rawAiToolsData = [
  {
    id: 'ai-coding',
    title: 'AI Coding',
    tag: 'AI Engineering',
    categoryGroup: 'tech',
    icon: Code2,
    description: 'Boost software development velocity with cutting-edge AI pair programmers.',
    tools: ['Cursor', 'GitHub Copilot', 'Windsurf', 'Replit AI', 'Amazon Q Developer']
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    tag: 'Workflows',
    categoryGroup: 'tech',
    icon: Workflow,
    description: 'Automate repetitive workflows, APIs, and business processes using agentic tools.',
    tools: ['n8n', 'Make.com', 'Zapier AI', 'Lindy AI', 'Gumloop']
  },
  {
    id: 'data-analytics',
    title: 'Data Analyst',
    tag: 'Business Intelligence',
    categoryGroup: 'tech',
    icon: BarChart3,
    description: 'Transform complex datasets into actionable business insights with AI analysts.',
    tools: ['Chat GPT', 'Claude ai', 'Julius ai', 'Power BI Copilot', 'GitHub Copilot']
  },
  {
    id: 'data-science',
    title: 'Data Science (Short)',
    tag: 'Machine Learning',
    categoryGroup: 'tech',
    icon: Database,
    description: 'Build predictive models, machine learning pipelines, and cloud AI infrastructure.',
    tools: ['DataRobot', 'H2O.ai', 'Dataiku', 'Amazon SageMaker AI', 'Vertex AI']
  },
  {
    id: 'ui-ux-designing',
    title: 'UI UX',
    tag: 'Product Design',
    categoryGroup: 'design',
    icon: Layout,
    description: 'Generate high-fidelity UI mockups, wireframes, and design systems automatically.',
    tools: ['Figma AI', 'Galileo Ai', 'Uizard', 'Framer AI', 'Relume AI']
  },
  {
    id: 'graphic-designing',
    title: 'Graphic designing',
    tag: 'Visual Design',
    categoryGroup: 'design',
    icon: Palette,
    description: 'Create stunning brand assets, banners, and digital graphics with generative AI.',
    tools: ['Photoshop', 'Canva Ai', 'Adobe Express', 'ChatGPT (GPT Image Gen)', 'Pixlr AI']
  },
  {
    id: 'ai-video-editing',
    title: 'AI video Editing',
    tag: 'Media Production',
    categoryGroup: 'design',
    icon: Video,
    description: 'Automate script-to-video production, editing, subtitles, and motion graphics.',
    tools: ['Runway', 'CapCut AI', 'Adobe Premiere Pro', 'Descript', 'VEED.IO']
  },
  {
    id: 'ai-image-generation',
    title: 'AI Image Genrat',
    tag: 'Generative Media',
    categoryGroup: 'design',
    icon: ImageIcon,
    description: 'Synthesize photorealistic concept art, textures, and commercial illustrations.',
    tools: ['Midjourney', 'ChatGPT (GPT Image Gen)', 'Adobe Firefly', 'Ideogram AI', 'Flux AI']
  },
  {
    id: 'creative-digital-skills',
    title: 'Creative & Digital Skill',
    tag: 'Digital Growth',
    categoryGroup: 'business',
    icon: Compass,
    description: 'Master practical digital skills for remote work, freelancing, and monetization.',
    tools: ['Canva Mastery', 'Lead Generation', 'Affiliate Marketing']
  },
  {
    id: 'marketing-skills',
    title: 'Marketing Skill',
    tag: 'Soft Skills',
    categoryGroup: 'career',
    icon: Megaphone,
    description: 'Develop impactful executive communication, public speaking, and fluency.',
    tools: ['Public Speaking', 'Communication Skills', 'Spoken English']
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    tag: 'Social Media',
    categoryGroup: 'business',
    icon: Share2,
    description: 'Build viral personal brands, engage audiences, and produce engaging short-form reels.',
    tools: ['Instagram Mastery', 'Reel Creation Mastery', 'How to Attract & Influence People']
  },
  {
    id: 'business-marketing',
    title: 'Digital Business marketing',
    tag: 'Performance Ads',
    categoryGroup: 'business',
    icon: TrendingUp,
    description: 'Scale customer acquisition with Facebook ads, email automation, and reselling.',
    tools: ['Facebook Ads Run', 'Email marketing', 'Reselling Mastery']
  },
  {
    id: 'wealth-creation',
    title: 'wealth creation & Business Growth',
    tag: 'Finance & Sales',
    categoryGroup: 'career',
    icon: Coins,
    description: 'Master stock market trading, crypto fundamentals, YouTube monetization, and sales.',
    tools: ['Stock Market', 'Finance', 'Crypto', 'YouTube Mastery', 'Sales Mastery']
  },
  {
    id: 'ai-presentation',
    title: 'AI Presentation & Documation',
    tag: 'Productivity',
    categoryGroup: 'tech',
    icon: Presentation,
    description: 'Create compelling investor pitch decks, reports, and AI slide presentations in seconds.',
    tools: ['Gamma AI', 'Tome AI', 'Beautiful.ai', 'Canva AI', 'Decktopus AI']
  }
];

// Map coursePricingData dynamically to assign real prices & durations
export const aiToolsData = rawAiToolsData.map((item) => {
  const match = coursePricingData.find(
    (c) => c.title.toLowerCase() === item.title.toLowerCase()
  );
  return {
    ...item,
    price: match ? match.price : null,
    duration: match ? match.duration : '3 Months'
  };
});

const categories = [
  { key: 'all', label: 'All Categories' },
  { key: 'tech', label: 'AI & Data Tech' },
  { key: 'design', label: 'Design & Media' },
  { key: 'business', label: 'Marketing & Business' },
  { key: 'career', label: 'Career & Wealth' },
];

const AITools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter tools based on tab & live search query
  const filteredData = useMemo(() => {
    return aiToolsData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryGroup === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="ai-tools-page">
      {/* Hero Section */}
      <section className="ai-tools-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Sparkles size={14} className="hero-badge-icon" />
            <span>QorZen Advanced Training Curriculum</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-main-title"
          >
            Master 14+ Specialized <br />
            <span className="text-highlight-gradient">AI Tools & Skills</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subtitle-description"
          >
            Transform your technical capability with hands-on mastery of 50+ cutting-edge AI pair programmers, automated workflows, and digital marketing engines.
          </motion.p>
        </div>
      </section>

      {/* Filter & Live Search Toolbar */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f9f8f6' }}>
        <div className="container">
          <div className="search-filter-wrapper">
            {/* Search Input Box */}
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                id="aiSearchInput"
                name="aiSearchInput"
                type="text"
                autoComplete="off"
                placeholder="Search tools, AI models, or categories..."
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

            {/* Category Filter Pills */}
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
      <section className="ai-cards-grid-section">
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-results-state"
            >
              <div className="no-results-icon-wrap">
                <Search size={32} />
              </div>
              <h3>No AI Tools Matched</h3>
              <p>Try refining your search keyword or switching category filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="reset-search-btn"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AITools;
