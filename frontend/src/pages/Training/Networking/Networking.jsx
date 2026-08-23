import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Search,
  Sparkles,
  X,
  ShieldCheck,
  Server,
  Cloud,
  Terminal,
  Activity,
  Radio,
  Lock,
  Award,
  Globe
} from 'lucide-react';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { coursePricingData } from '../../../data/courses';
import './Networking.css';

// 12 Networking Courses Dataset (Exact Specification)
const rawNetworkingModulesData = [
  {
    id: 'ccna-automation',
    title: 'CCNA Automation',
    tag: 'Network Automation',
    categoryGroup: 'networking',
    icon: Terminal,
    description: 'Automate network configuration and telemetry using Python Netmiko and Ansible.',
    tools: ['Python', 'Ansible', 'RESTCONF', 'NETCONF', 'Cisco DNA Center'],
    duration: '3 Months'
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    tag: 'Security & Hacking',
    categoryGroup: 'security',
    icon: Lock,
    description: 'Learn vulnerability assessment, penetration testing, network sniffing, and security audits.',
    tools: ['Kali Linux', 'Metasploit', 'Nmap', 'Burp Suite', 'Wireshark'],
    duration: '3 Months'
  },
  {
    id: 'ccna',
    title: 'CCNA',
    tag: 'Cisco Fundamentals',
    categoryGroup: 'networking',
    icon: Cpu,
    description: 'Master IPv4/IPv6 subnetting, OSPF, VLANs, STP, WAN protocols, and Cisco IOS CLI.',
    tools: ['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'Cisco IOS CLI', 'Putty'],
    duration: '3 Months'
  },
  {
    id: 'ccna-security',
    title: 'CCNA + CCNA Security',
    tag: 'Advanced Security',
    categoryGroup: 'security',
    icon: ShieldCheck,
    description: 'Comprehensive Cisco routing, switching, VPN encryption, and firewall security suite.',
    tools: ['Cisco ASA', 'Packet Tracer', 'VPN Tunnels', 'AAA Services', 'Wireshark'],
    duration: '6 Months'
  },
  {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals',
    tag: 'IT Basics',
    categoryGroup: 'networking',
    icon: Cpu,
    description: 'Master computer architecture, OS fundamentals, hardware assembly, and network basics.',
    tools: ['Windows OS', 'Linux Commands', 'Hardware Specs', 'BIOS', 'Networking'],
    duration: '1 Month'
  },
  {
    id: 'tcp-ip-masterclass',
    title: 'TCP/IP Masterclass',
    tag: 'Protocols',
    categoryGroup: 'networking',
    icon: Activity,
    description: 'Deep dive into OSI layers, TCP handshake, IP packet analysis, and DNS/DHCP troubleshooting.',
    tools: ['Wireshark', 'TCPDump', 'IP Subnetting', 'DNS', 'DHCP Server'],
    duration: '3 Months'
  },
  {
    id: 'cisco-ccna-200-301',
    title: 'Cisco CCNA (200-301)',
    tag: 'Official Certification',
    categoryGroup: 'networking',
    icon: Server,
    description: 'Advanced BGP routing, EIGRP, SD-WAN architecture, and enterprise switch hardening.',
    tools: ['EVE-NG', 'Cisco Packet Tracer', 'Python Netmiko', 'Cisco SD-WAN'],
    duration: '3 Months'
  },
  {
    id: 'network-engineering',
    title: 'Network Engineering',
    tag: 'Infrastructure',
    categoryGroup: 'networking',
    icon: Radio,
    description: 'Architect enterprise networks, multi-switch trunking, inter-VLAN routing, and ISP failover.',
    tools: ['Cisco Switches', 'Mikrotik', 'BGP Routing', 'VLAN Trunking', 'GNS3'],
    duration: '3 Months'
  },
  {
    id: 'ccna-eccnp',
    title: 'CCNA + ECCNP',
    tag: 'Master Certification',
    categoryGroup: 'networking',
    icon: Award,
    description: 'Enterprise-grade Cisco CCNA paired with advanced EC-Council network security practitioner training.',
    tools: ['Cisco IOS', 'EVE-NG', 'Wireshark', 'Security Auditing', 'Firewalls'],
    duration: '6 Months'
  },
  {
    id: 'cloud-networking-pro',
    title: 'Cloud and Networking Pro',
    tag: 'Cloud & VPC',
    categoryGroup: 'cloud',
    icon: Cloud,
    description: 'Architect multi-region VPC peering, Transit Gateways, Direct Connect, and Route 53 DNS.',
    tools: ['AWS VPC', 'Azure VNet', 'CloudFlare DNS', 'Terraform Cloud'],
    duration: '3 Months'
  },
  {
    id: 'network-security-firewall',
    title: 'Network Security & Firewall Expert',
    tag: 'Firewalls',
    categoryGroup: 'security',
    icon: ShieldCheck,
    description: 'Configure Palo Alto, Fortinet, and Cisco ASA firewalls, NAT, IPsec VPNs, and IPS/IDS.',
    tools: ['Palo Alto PAN-OS', 'FortiGate', 'pfSense', 'Cisco ASA', 'Wireshark'],
    duration: '6 Months'
  },
  {
    id: 'enterprise-networking',
    title: 'Enterprise Networking Masterclass',
    tag: 'Enterprise Architecture',
    categoryGroup: 'networking',
    icon: Globe,
    description: 'Design high-density corporate Wi-Fi 6, SD-WAN mesh topologies, and zero-downtime ISP failover.',
    tools: ['Cisco SD-WAN', 'Wi-Fi 6 APs', 'Spine-Leaf Fabric', 'Radius Server', 'EVE-NG'],
    duration: '6 Months'
  }
];

export const networkingModulesData = rawNetworkingModulesData.map((item) => {
  const match = coursePricingData.find(
    (c) => c.title.toLowerCase() === item.title.toLowerCase()
  );
  return {
    ...item,
    price: match ? match.price : null
  };
});

const categories = [
  { key: 'all', label: 'All 12 Programs' },
  { key: 'networking', label: 'Cisco & Routing' },
  { key: 'security', label: 'Security & Firewalls' },
  { key: 'cloud', label: 'Cloud & VPC' }
];

const Networking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredData = useMemo(() => {
    return networkingModulesData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryGroup === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="networking-page">
      {/* Hero Section */}
      <section className="networking-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Sparkles size={14} className="hero-badge-icon" />
            <span>QorZen Enterprise Networking & Security Registry</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-main-title"
          >
            12 Specialized <span className="text-highlight-gradient">Networking & Security Programs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subtitle-description"
          >
            Master Cisco routing, CCNA automation, ethical hacking, next-gen firewalls, and cloud VPC peering with real hardware labs.
          </motion.p>
        </div>
      </section>

      {/* Toolbar & Filter */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f9f8f6' }}>
        <div className="container">
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                id="networkingSearchInput"
                name="networkingSearchInput"
                type="text"
                autoComplete="off"
                placeholder="Search networking modules, Cisco tools, or protocols..."
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

      {/* Cards Grid */}
      <section className="networking-grid-section">
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
            <div className="no-results-state">
              <h3>No Networking Modules Matched</h3>
              <p>Try clearing your search query or switching category tabs.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="reset-search-btn">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Networking;
