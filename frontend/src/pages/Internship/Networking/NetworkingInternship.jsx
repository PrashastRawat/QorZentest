import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Search,
  Check,
  X,
  Zap,
  Server,
  Cloud,
  ShieldCheck,
  Terminal,
  Lock
} from 'lucide-react';
import InternshipCard from '../../../components/InternshipCard/InternshipCard';
import './NetworkingInternship.css';

export const networkingInternshipData = [
  {
    id: 'ccna-network-intern',
    title: 'CCNA Network Engineer Intern',
    tag: 'Networking',
    categoryGroup: 'networking',
    icon: Cpu,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Assist in configuring Cisco switches, routers, VLAN topologies, OSPF routing, and troubleshooting CLI network loops.',
    tools: ['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'Cisco IOS', 'Putty']
  },
  {
    id: 'cloud-admin-intern',
    title: 'Cloud Administration & AWS VPC Intern',
    tag: 'Cloud Infrastructure',
    categoryGroup: 'cloud',
    icon: Cloud,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Configure AWS EC2 instances, VPC subnets, security groups, S3 storage buckets, and IAM access policies.',
    tools: ['AWS Cloud', 'AWS VPC', 'IAM', 'Terraform', 'Linux']
  },
  {
    id: 'network-security-intern',
    title: 'Network Security & Firewall Analyst Intern',
    tag: 'Firewalls',
    categoryGroup: 'security',
    icon: ShieldCheck,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Assist in Palo Alto & Fortinet firewall rule configuration, IPsec VPN tunnels, and IDS/IPS monitoring.',
    tools: ['Palo Alto PAN-OS', 'FortiGate', 'pfSense', 'Wireshark', 'NAT']
  },
  {
    id: 'linux-sysadmin-intern',
    title: 'System & Linux Administrator Intern',
    tag: 'SysAdmin',
    categoryGroup: 'admin',
    icon: Terminal,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Manage RedHat/Ubuntu servers, write automation Bash scripts, configure Active Directory, and monitor system health.',
    tools: ['Linux RHEL', 'Ubuntu Server', 'Bash Scripting', 'SSH', 'Active Directory']
  },
  {
    id: 'soc-analyst-intern',
    title: 'Cyber Defense & SOC Analyst Intern',
    tag: 'SOC Operations',
    categoryGroup: 'security',
    icon: Lock,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Monitor real-time SIEM alerts, analyze packet capture telemetry, and investigate security incident logs.',
    tools: ['Splunk', 'Wazuh SIEM', 'Elastic SOC', 'Snort', 'Wireshark']
  }
];

const categories = [
  { key: 'all', label: 'All Positions' },
  { key: 'networking', label: 'Cisco & Switching' },
  { key: 'cloud', label: 'Cloud & AWS' },
  { key: 'security', label: 'Security & Firewalls' },
  { key: 'admin', label: 'SysAdmin & Linux' }
];

const NetworkingInternship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRoleModal, setSelectedRoleModal] = useState(null);

  const filteredData = useMemo(() => {
    return networkingInternshipData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryGroup === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleApplyClick = (title, tag, duration, mode) => {
    setSelectedRoleModal({ title, tag, duration, mode });
  };

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
            <Cpu size={14} className="hero-badge-icon" />
            <span>QorZen Networking & Infrastructure Internship Portal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Guaranteed Practical <span className="highlight-text">Networking Internships</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Gain live network infrastructure experience in Cisco Switching, Next-Gen Firewalls, AWS VPC Networking, Linux Administration, and SOC Telemetry Monitoring.
          </motion.p>

          {/* Search & Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search networking internships (e.g. CCNA, Cloud Admin, Firewall, Linux Admin)..."
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

            <div className="category-tabs flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

  
      <section className="technical-grid-section">
        <div className="container">
          <div className="grid-header-meta">
            <h2 className="grid-section-title">
              Open Infrastructure Roles <span className="count-pill">{filteredData.length} Positions</span>
            </h2>
            <p className="grid-section-sub">
              Apply for any networking internship role below to begin your evaluation process.
            </p>
          </div>

          {filteredData.length > 0 ? (
            <div className="technical-cards-grid">
              {filteredData.map((internship, index) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  index={index}
                  onApplyClick={handleApplyClick}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={48} className="no-results-icon" />
              <h3>No internship role found</h3>
              <p>We couldn't find any position matching "{searchQuery}". Try another search term.</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedRoleModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedRoleModal(null)}>
                <X size={20} />
              </button>
              <div className="modal-header-badge">
                <Zap size={16} className="modal-badge-icon" />
                <span>{selectedRoleModal.tag} Internship</span>
              </div>
              <h3 className="modal-tool-name">{selectedRoleModal.title}</h3>
              <p className="modal-description">
                You are applying for the <strong>{selectedRoleModal.title}</strong> role (<strong>{selectedRoleModal.duration}</strong> | <strong>{selectedRoleModal.mode}</strong>). Complete the screening application below.
              </p>
              <div className="modal-features-list">
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Virtual lab topology access & network config reviews</span>
                </div>
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Performance stipend + QorZen Verified Internship Certificate</span>
                </div>
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Direct conversion pathway to Full-Time Network Engineer</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-modal-primary" onClick={() => setSelectedRoleModal(null)}>
                  Submit Application for {selectedRoleModal.title}
                </button>
                <button className="btn-modal-secondary" onClick={() => setSelectedRoleModal(null)}>
                  Download Role Description PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetworkingInternship;
