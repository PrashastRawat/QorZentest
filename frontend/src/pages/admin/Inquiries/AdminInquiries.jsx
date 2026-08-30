import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Sparkles,
  BriefcaseBusiness,
  BookOpen,
  GraduationCap,
  Layers,
  HelpCircle,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  Trash2,
  X,
  Send,
  Eye,
  AlertCircle
} from 'lucide-react';
import { getSubmissions, deleteSubmission } from '../../../api/adminApi';
import './AdminInquiries.css';

// Master Baseline Inquiries Dataset with Specific Categorization & Tags
const initialInquiries = [
  {
    id: 'INQ-FAIL-1049',
    name: 'Manish Tiwari',
    email: 'manish.t@gmail.com',
    phone: '+91 98765 11223',
    tagCategory: 'Training',
    tagDetail: 'Payment Failed - ₹1,399 (Cloud Architecture & AWS)',
    message: 'Automated Lead Alert: Payment transaction TXN-984205 of ₹1,399 for "Cloud Architecture & AWS Zero-Trust" failed via Card (Gateway Ref: pay_Nz37E902). Follow up with the student to assist with alternative payment or technical assistance.',
    status: 'Payment Failed',
    createdAt: 'Today, 05:10 PM',
    failedTxnId: 'TXN-984205'
  },
  {
    id: 'INQ-1048',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    tagCategory: 'Internship',
    tagDetail: 'Cyber Security & Zero-Trust (6 Months)',
    message: 'I am a 3rd year CSE student interested in the 6-month Cyber Security Internship. Does it include live SOC lab access and ISO certificate?',
    status: 'New',
    createdAt: 'Today, 04:30 PM'
  },
  {
    id: 'INQ-1047',
    name: 'Neha Kapoor',
    email: 'neha.k@enterprise.tech',
    phone: '+91 98112 23344',
    tagCategory: 'Training',
    tagDetail: 'Corporate Training - 25 Engineers',
    message: 'We require customized corporate training on MERN Stack and AWS Cloud for our incoming 25 associate software engineers. Please share the syllabus and pricing proposal.',
    status: 'Contacted',
    createdAt: 'Today, 02:15 PM'
  },
  {
    id: 'INQ-1046',
    name: 'Aman Deep',
    email: 'aman.deep@outlook.com',
    phone: '+91 97123 45678',
    tagCategory: 'Course',
    tagDetail: 'Agentic AI & Vector RAG Masterclass',
    message: 'Interested in enrolling in the AI Course. Is Python knowledge compulsory before starting?',
    status: 'New',
    createdAt: 'Today, 11:45 AM'
  },
  {
    id: 'INQ-1045',
    name: 'Siddharth Deshmukh',
    email: 'siddharth.d@gmail.com',
    phone: '+91 96234 56789',
    tagCategory: 'Internship',
    tagDetail: 'Full Stack MERN Developer Intern',
    message: 'Looking for a 3-month internship in MERN stack. I already know React and Node.js fundamentals. When does the next batch start?',
    status: 'Contacted',
    createdAt: 'Yesterday, 07:20 PM'
  },
  {
    id: 'INQ-1044',
    name: 'Pooja Hegde',
    email: 'pooja.h@globalcorp.in',
    phone: '+91 95345 67890',
    tagCategory: 'Services',
    tagDetail: 'AI & Workflow Automation Engineering',
    message: 'We want to automate our invoice processing and OCR pipeline with custom LLM vector search. Would like to schedule an architecture consultation call.',
    status: 'New',
    createdAt: 'Yesterday, 03:40 PM'
  },
  {
    id: 'INQ-1043',
    name: 'Vikas Pandey',
    email: 'vikas.p@gmail.com',
    phone: '+91 94456 78901',
    tagCategory: 'Course',
    tagDetail: 'Online Business & Dropshipping Mastery',
    message: 'Wanted to check if the online business course covers Amazon and Shopify integrations and product research tools.',
    status: 'Resolved',
    createdAt: '21 Aug 2026'
  },
  {
    id: 'INQ-1042',
    name: 'Anjali Verma',
    email: 'anjali.v@techhub.org',
    phone: '+91 93567 89012',
    tagCategory: 'Training',
    tagDetail: 'Cisco CCNA (200-301) Enterprise Routing',
    message: 'Inquiring about the CCNA certification batch schedule and lab hardware simulator access.',
    status: 'Resolved',
    createdAt: '20 Aug 2026'
  },
  {
    id: 'INQ-1041',
    name: 'Karan Mehra',
    email: 'karan.m@gmail.com',
    phone: '+91 92678 90123',
    tagCategory: 'General',
    tagDetail: 'College Campus Partnership',
    message: 'We would like to invite QorZen Technologies for an on-campus seminar and internship drive at our college campus.',
    status: 'Contacted',
    createdAt: '19 Aug 2026'
  }
];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedTagTab, setSelectedTagTab] = useState('ALL'); // 'ALL', 'Internship', 'Training', 'Course', 'Services', 'General'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'New', 'Contacted', 'Resolved'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBackendSubmissions();
  }, []);

  const fetchBackendSubmissions = async () => {
    try {
      setLoading(true);
      const res = await getSubmissions().catch(() => ({ data: [] }));
      const backendData = res.data?.data || res.data || [];
      
      // Load local synced inquiries (including automated failed payment records)
      let localSynced = [];
      try {
        localSynced = JSON.parse(localStorage.getItem('qorzen_inquiries') || '[]');
      } catch (e) {
        localSynced = [];
      }

      if (Array.isArray(backendData) && backendData.length > 0) {
        // Merge backend submissions with tagged format
        const formatted = backendData.map((item, idx) => ({
          id: item._id || item.id || `INQ-${2000 + idx}`,
          name: item.name || 'Anonymous User',
          email: item.email || 'user@example.com',
          phone: item.phone || '+91 98765 00000',
          tagCategory: detectTagCategory(item.service || item.subject || item.message),
          tagDetail: item.service || item.subject || 'General Inquiry',
          message: item.message || 'No additional message provided.',
          status: item.status || 'New',
          createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN') : 'Recent'
        }));
        setInquiries([...localSynced, ...formatted]);
      } else {
        setInquiries([...localSynced, ...initialInquiries]);
      }
    } catch (err) {
      console.warn('Using baseline inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const detectTagCategory = (text = '') => {
    const lower = text.toLowerCase();
    if (lower.includes('intern')) return 'Internship';
    if (lower.includes('train') || lower.includes('ccna') || lower.includes('corp')) return 'Training';
    if (lower.includes('course') || lower.includes('ai') || lower.includes('business')) return 'Course';
    if (lower.includes('service') || lower.includes('dev') || lower.includes('web') || lower.includes('app')) return 'Services';
    return 'General';
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.tagDetail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    const matchesTag = selectedTagTab === 'ALL' || inq.tagCategory.toUpperCase() === selectedTagTab.toUpperCase();
    const matchesStatus = statusFilter === 'ALL' || inq.status.toUpperCase() === statusFilter.toUpperCase();

    return matchesTag && matchesStatus;
  });

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = 'Inquiry ID,Sender Name,Email,Phone,Tag Category,Specific Tag / Program,Message,Status,Date\n';
    const rows = inquiries
      .map(
        (i) =>
          `"${i.id}","${i.name}","${i.email}","${i.phone}","${i.tagCategory}","${i.tagDetail}","${i.message.replace(/"/g, '""')}","${i.status}","${i.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `QorZen_Tagged_Inquiries_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status Updater
  const handleUpdateStatus = (id, newStatus) => {
    setInquiries(
      inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete/archive this inquiry record?')) return;
    try {
      await deleteSubmission(id).catch(() => {});
    } catch (e) {}
    setInquiries(inquiries.filter((i) => i.id !== id));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null);
    }
  };

  return (
    <div className="admin-inquiries-page">
      {/* Top Header */}
      <header className="inquiries-page-header">
        <div className="inquiries-title-group">
          <div className="welcome-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '1px solid #d9cfc7', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <Sparkles size={13} color="#8b7050" />
            <span>Tagged Inquiries & Leads Dispatcher</span>
          </div>
          <h1>Inquiries & Form Submissions</h1>
          <p>
            Access, categorize, and follow up with all customer inquiries tagged by Internship, Training, Course, and Enterprise Services.
          </p>
        </div>

        <div className="inquiries-header-actions">
          <button onClick={handleExportCSV} className="btn-export-inquiries" title="Export Inquiries to CSV">
            <Download size={15} />
            <span>Export Inquiries CSV</span>
          </button>
        </div>
      </header>

      {/* KPI Overview Cards */}
      <section className="inquiries-kpi-grid">
        <div className="inquiry-kpi-card">
          <div className="inquiry-kpi-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <BriefcaseBusiness size={22} />
          </div>
          <div className="inquiry-kpi-data">
            <span className="inquiry-kpi-val">
              {inquiries.filter((i) => i.tagCategory === 'Internship').length}
            </span>
            <span className="inquiry-kpi-lbl">Internship Inquiries</span>
          </div>
        </div>

        <div className="inquiry-kpi-card">
          <div className="inquiry-kpi-icon-wrap" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
            <BookOpen size={22} />
          </div>
          <div className="inquiry-kpi-data">
            <span className="inquiry-kpi-val">
              {inquiries.filter((i) => i.tagCategory === 'Training').length}
            </span>
            <span className="inquiry-kpi-lbl">Training Leads</span>
          </div>
        </div>

        <div className="inquiry-kpi-card">
          <div className="inquiry-kpi-icon-wrap" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
            <GraduationCap size={22} />
          </div>
          <div className="inquiry-kpi-data">
            <span className="inquiry-kpi-val">
              {inquiries.filter((i) => i.tagCategory === 'Course').length}
            </span>
            <span className="inquiry-kpi-lbl">Course Inquiries</span>
          </div>
        </div>

        <div className="inquiry-kpi-card">
          <div className="inquiry-kpi-icon-wrap" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <Layers size={22} />
          </div>
          <div className="inquiry-kpi-data">
            <span className="inquiry-kpi-val">
              {inquiries.filter((i) => i.tagCategory === 'Services').length}
            </span>
            <span className="inquiry-kpi-lbl">B2B Service Proposals</span>
          </div>
        </div>

        <div className="inquiry-kpi-card">
          <div className="inquiry-kpi-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <Inbox size={22} />
          </div>
          <div className="inquiry-kpi-data">
            <span className="inquiry-kpi-val">{inquiries.length}</span>
            <span className="inquiry-kpi-lbl">Total Submissions</span>
          </div>
        </div>
      </section>

      {/* Category Tag Filters & Search */}
      <section className="inquiries-filter-container">
        {/* Mobile Dropdown Selector */}
        <div className="inquiry-mobile-tag-dropdown">
          <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Filter by Inquiry Tag
          </label>
          <select
            value={selectedTagTab}
            onChange={(e) => setSelectedTagTab(e.target.value)}
            className="inquiry-mobile-select"
          >
            <option value="ALL">All Inquiries ({inquiries.length})</option>
            <option value="INTERNSHIP">💼 Internships ({inquiries.filter((i) => i.tagCategory === 'Internship').length})</option>
            <option value="TRAINING">📖 Training ({inquiries.filter((i) => i.tagCategory === 'Training').length})</option>
            <option value="COURSE">🎓 Courses ({inquiries.filter((i) => i.tagCategory === 'Course').length})</option>
            <option value="SERVICES">🛠️ Services ({inquiries.filter((i) => i.tagCategory === 'Services').length})</option>
            <option value="GENERAL">❓ General ({inquiries.filter((i) => i.tagCategory === 'General').length})</option>
          </select>
        </div>

        {/* Desktop Tag Tabs */}
        <div className="inquiry-tag-tabs desktop-only-tag-tabs">
          <button
            onClick={() => setSelectedTagTab('ALL')}
            className={`inquiry-tab-btn ${selectedTagTab === 'ALL' ? 'active' : ''}`}
          >
            <span>All Tags</span>
            <span className="inquiry-tab-badge">{inquiries.length}</span>
          </button>
          <button
            onClick={() => setSelectedTagTab('INTERNSHIP')}
            className={`inquiry-tab-btn ${selectedTagTab === 'INTERNSHIP' ? 'active' : ''}`}
          >
            <span>💼 Internships</span>
            <span className="inquiry-tab-badge">
              {inquiries.filter((i) => i.tagCategory === 'Internship').length}
            </span>
          </button>
          <button
            onClick={() => setSelectedTagTab('TRAINING')}
            className={`inquiry-tab-btn ${selectedTagTab === 'TRAINING' ? 'active' : ''}`}
          >
            <span>📖 Training</span>
            <span className="inquiry-tab-badge">
              {inquiries.filter((i) => i.tagCategory === 'Training').length}
            </span>
          </button>
          <button
            onClick={() => setSelectedTagTab('COURSE')}
            className={`inquiry-tab-btn ${selectedTagTab === 'COURSE' ? 'active' : ''}`}
          >
            <span>🎓 Courses</span>
            <span className="inquiry-tab-badge">
              {inquiries.filter((i) => i.tagCategory === 'Course').length}
            </span>
          </button>
          <button
            onClick={() => setSelectedTagTab('SERVICES')}
            className={`inquiry-tab-btn ${selectedTagTab === 'SERVICES' ? 'active' : ''}`}
          >
            <span>🛠️ Services</span>
            <span className="inquiry-tab-badge">
              {inquiries.filter((i) => i.tagCategory === 'Services').length}
            </span>
          </button>
          <button
            onClick={() => setSelectedTagTab('GENERAL')}
            className={`inquiry-tab-btn ${selectedTagTab === 'GENERAL' ? 'active' : ''}`}
          >
            <span>❓ General</span>
            <span className="inquiry-tab-badge">
              {inquiries.filter((i) => i.tagCategory === 'General').length}
            </span>
          </button>
        </div>

        <div className="inquiries-search-wrap">
          <input
            type="text"
            placeholder="Search by sender, email, tag, or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="inquiry-search-input"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.55rem 0.85rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', fontSize: '0.82rem', backgroundColor: '#ffffff', fontWeight: 700 }}
          >
            <option value="ALL">All Status</option>
            <option value="NEW">🔵 New (Unread)</option>
            <option value="PAYMENT FAILED">🔴 Payment Failed ({inquiries.filter((i) => i.status.toUpperCase() === 'PAYMENT FAILED').length})</option>
            <option value="CONTACTED">🟡 Contacted / In Progress</option>
            <option value="RESOLVED">🟢 Resolved / Closed</option>
          </select>
        </div>
      </section>

      {/* Master Inquiries Directory Table */}
      <section className="inquiries-table-card">
        {/* Mobile View: Native Stacked Inquiries Feed */}
        <div className="mobile-inquiries-cards-feed">
          {filteredInquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#78716c', fontSize: '0.85rem' }}>
              No inquiries found matching the selected tag or filter.
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div key={inq.id} className="mobile-inquiry-card">
                <div className="mobile-inquiry-top-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span className={`inquiry-tag-pill ${inq.tagCategory.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
                      {inq.tagCategory}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#78716c' }}>{inq.createdAt}</span>
                  </div>
                  <span className={`inquiry-status-pill ${inq.status.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                    {inq.status === 'New' && <Clock size={10} />}
                    {inq.status === 'Contacted' && <Sparkles size={10} />}
                    {inq.status === 'Resolved' && <CheckCircle2 size={10} />}
                    {inq.status === 'Payment Failed' && <AlertCircle size={10} />}
                    <span>{inq.status}</span>
                  </span>
                </div>

                <div className="mobile-inquiry-main-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#1c1917' }}>{inq.name}</strong>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#78716c', wordBreak: 'break-all' }}>
                      ✉️ {inq.email}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#8b7050', fontWeight: 700 }}>
                      📞 {inq.phone}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1c1917', backgroundColor: '#efe9e3', padding: '0.2rem 0.55rem', borderRadius: '0.35rem', width: 'fit-content', marginTop: '0.1rem' }}>
                    {inq.tagDetail}
                  </span>

                  <p style={{ fontSize: '0.78rem', color: '#44403c', margin: '0.15rem 0 0 0', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {inq.message}
                  </p>
                </div>

                <div className="mobile-inquiry-bottom-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^\d]/g, '')}?text=Hi%20${encodeURIComponent(inq.name)},%20this%20is%20regarding%20your%20inquiry%20at%20QorZen%20Technologies.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-inq-action-sm whatsapp"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '0.35rem', fontWeight: 700 }}
                    >
                      <MessageSquare size={11} />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        backgroundColor: '#faf8f5',
                        border: '1px solid #d9cfc7',
                        borderRadius: '0.35rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#1c1917',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        padding: '0.35rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Master Table View */}
        <div className="inquiries-table-wrap desktop-only-table">
          <table className="admin-inquiries-table">
            <thead>
              <tr>
                <th>Sender & Contact</th>
                <th>Inquiry Tag & Track</th>
                <th>Message Snippet</th>
                <th>Status</th>
                <th>Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#78716c' }}>
                    No inquiries found matching the selected tag or filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ fontSize: '0.88rem', color: '#1c1917' }}>{inq.name}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#78716c' }}>{inq.email}</span>
                        <span style={{ fontSize: '0.7rem', color: '#8b7050', fontWeight: 600 }}>{inq.phone}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`inquiry-tag-pill ${inq.tagCategory.toLowerCase()}`}>
                        {inq.tagCategory}
                      </span>
                      <strong style={{ display: 'block', fontSize: '0.8rem', color: '#1c1917', marginTop: '0.25rem' }}>
                        {inq.tagDetail}
                      </strong>
                    </td>
                    <td>
                      <p style={{ fontSize: '0.78rem', color: '#44403c', margin: 0, lineHeight: 1.4, maxWidth: '340px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {inq.message}
                      </p>
                    </td>
                    <td>
                      <span className={`inquiry-status-pill ${inq.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {inq.status === 'New' && <Clock size={11} />}
                        {inq.status === 'Contacted' && <Sparkles size={11} />}
                        {inq.status === 'Resolved' && <CheckCircle2 size={11} />}
                        {inq.status === 'Payment Failed' && <AlertCircle size={11} />}
                        <span>{inq.status}</span>
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: '#78716c' }}>{inq.createdAt}</span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          style={{
                            padding: '0.45rem 0.85rem',
                            backgroundColor: '#faf8f5',
                            border: '1px solid #d9cfc7',
                            borderRadius: '0.35rem',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: '#1c1917',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#dc2626',
                            cursor: 'pointer',
                            padding: '0.35rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                          title="Delete inquiry"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Inquiry Detail & Follow-up Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inquiry-modal-backdrop"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              className="inquiry-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #efe9e3' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                    <span className={`inquiry-tag-pill ${selectedInquiry.tagCategory.toLowerCase()}`}>
                      {selectedInquiry.tagCategory}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#78716c' }}>
                      ID: {selectedInquiry.id} • {selectedInquiry.createdAt}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
                    {selectedInquiry.name}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Sender Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: '#faf8f5', borderRadius: '0.5rem', border: '1px solid #efe9e3' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', textDecoration: 'none', marginTop: '0.2rem' }}
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                <div style={{ padding: '0.75rem', backgroundColor: '#faf8f5', borderRadius: '0.5rem', border: '1px solid #efe9e3' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>
                    Phone Number
                  </span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#16a34a', textDecoration: 'none', marginTop: '0.2rem' }}
                  >
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              {/* Tag / Program Subject */}
              <div style={{ padding: '0.85rem', backgroundColor: '#fffbeb', borderRadius: '0.5rem', border: '1px solid #fde68a' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  Requested Track / Subject Tag
                </span>
                <p style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1c1917', margin: '0.2rem 0 0 0' }}>
                  {selectedInquiry.tagDetail}
                </p>
              </div>

              {/* Message Content */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Detailed Message / Requirements:
                </span>
                <div style={{ padding: '1rem', backgroundColor: '#ffffff', border: '1px solid #d9cfc7', borderRadius: '0.65rem', fontSize: '0.88rem', color: '#1c1917', lineHeight: 1.6 }}>
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Updater */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #efe9e3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#78716c' }}>Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                    style={{ padding: '0.4rem 0.65rem', borderRadius: '0.4rem', border: '1px solid #d9cfc7', fontSize: '0.8rem', fontWeight: 700 }}
                  >
                    <option value="New">🔵 New (Unread)</option>
                    <option value="Payment Failed">🔴 Payment Failed (Recovery Required)</option>
                    <option value="Contacted">🟡 Contacted / In Progress</option>
                    <option value="Resolved">🟢 Resolved / Closed</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.5rem 0.85rem',
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      borderRadius: '0.45rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <MessageSquare size={13} />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: QorZen Technologies Inquiry - ${selectedInquiry.tagDetail}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.5rem 0.85rem',
                      backgroundColor: '#1c1917',
                      color: '#ffffff',
                      borderRadius: '0.45rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <Mail size={13} />
                    <span>Reply Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
