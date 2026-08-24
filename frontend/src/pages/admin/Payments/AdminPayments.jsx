import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  RefreshCw,
  FileText,
  Sparkles,
  ShieldCheck,
  X,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Layers,
  BriefcaseBusiness,
  GraduationCap
} from 'lucide-react';
import './AdminPayments.css';

// Initial Mock Transactions Dataset
const initialTransactions = [
  {
    id: 'TXN-984210',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@student.qorzen.in',
    program: 'Cyber Security & Zero-Trust Defense',
    category: 'Internship',
    amount: 2399,
    method: 'UPI',
    status: 'Paid',
    date: '23 Aug 2026, 11:32 AM',
    gatewayRef: 'pay_Nz82K198'
  },
  {
    id: 'TXN-984209',
    studentName: 'Rohan Verma',
    studentEmail: 'rohan.v@gmail.com',
    program: 'MERN Stack Masterclass',
    category: 'Training',
    amount: 1399,
    method: 'Card',
    status: 'Paid',
    date: '23 Aug 2026, 09:15 AM',
    gatewayRef: 'pay_Nz71J283'
  },
  {
    id: 'TXN-984208',
    studentName: 'Priya Patel',
    studentEmail: 'priya.p@outlook.com',
    program: 'AI & Data Science Fast-Track',
    category: 'Internship',
    amount: 799,
    method: 'UPI',
    status: 'Paid',
    date: '22 Aug 2026, 07:45 PM',
    gatewayRef: 'pay_Nz60H491'
  },
  {
    id: 'TXN-984207',
    studentName: 'Siddharth Rao',
    studentEmail: 'sid.rao@tech.in',
    program: 'CCNA & Enterprise Networking',
    category: 'Training',
    amount: 2399,
    method: 'NetBanking',
    status: 'Paid',
    date: '22 Aug 2026, 03:20 PM',
    gatewayRef: 'pay_Nz59G112'
  },
  {
    id: 'TXN-984206',
    studentName: 'Ananya Deshmukh',
    studentEmail: 'ananya.d@gmail.com',
    program: 'React 19 & Next.js 15',
    category: 'Course',
    amount: 799,
    method: 'UPI',
    status: 'Paid',
    date: '21 Aug 2026, 12:10 PM',
    gatewayRef: 'pay_Nz48F309'
  },
  {
    id: 'TXN-984205',
    studentName: 'Kunal Singhania',
    studentEmail: 'kunal.singh@yahoo.com',
    program: 'Cloud Architecture & AWS Zero-Trust',
    category: 'Training',
    amount: 1399,
    method: 'Card',
    status: 'Pending',
    date: '20 Aug 2026, 06:40 PM',
    gatewayRef: 'pay_Nz37E902'
  },
  {
    id: 'TXN-984204',
    studentName: 'Deepak Joshi',
    studentEmail: 'deepak.j@gmail.com',
    program: 'Performance Marketing',
    category: 'Course',
    amount: 799,
    method: 'NetBanking',
    status: 'Refunded',
    date: '19 Aug 2026, 04:15 PM',
    gatewayRef: 'rfnd_Nz26D814'
  }
];

export default function AdminPayments() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activePeriodTab, setActivePeriodTab] = useState('weekly'); // 'weekly', 'monthly', 'yearly', 'streams'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    program: '',
    category: 'Internship',
    amount: '',
    method: 'UPI',
    status: 'Paid'
  });

  // Filtered Transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || tx.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = 'Transaction ID,Student Name,Email,Program,Category,Amount (INR),Method,Status,Date\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.studentName}","${t.studentEmail}","${t.program}","${t.category}",${t.amount},"${t.method}","${t.status}","${t.date}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `QorZen_Revenue_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Manual Payment Record
  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!newPayment.studentName || !newPayment.amount) return;

    const createdTx = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      studentName: newPayment.studentName,
      studentEmail: newPayment.studentEmail || 'student@example.com',
      studentPhone: newPayment.studentPhone || '+91 98765 00000',
      program: newPayment.program || 'Custom Training Track',
      category: newPayment.category,
      amount: Number(newPayment.amount),
      method: newPayment.method,
      status: newPayment.status,
      date: 'Just now',
      gatewayRef: `manual_${Date.now().toString(36)}`
    };

    setTransactions([createdTx, ...transactions]);

    // If Payment Failed: Auto-Route directly to Inquiries & Leads
    if (createdTx.status === 'Failed') {
      const failedInquiry = {
        id: `INQ-FAIL-${Math.floor(1000 + Math.random() * 9000)}`,
        name: createdTx.studentName,
        email: createdTx.studentEmail,
        phone: createdTx.studentPhone,
        tagCategory: createdTx.category,
        tagDetail: `Payment Failed - ₹${createdTx.amount.toLocaleString('en-IN')} (${createdTx.program})`,
        message: `Automated Lead Alert: Payment transaction ${createdTx.id} of ₹${createdTx.amount.toLocaleString('en-IN')} for "${createdTx.program}" failed via ${createdTx.method}. Follow up with the student to assist with payment completion.`,
        status: 'Payment Failed',
        createdAt: 'Just now',
        failedTxnId: createdTx.id
      };

      try {
        const stored = JSON.parse(localStorage.getItem('qorzen_inquiries') || '[]');
        localStorage.setItem('qorzen_inquiries', JSON.stringify([failedInquiry, ...stored]));
      } catch (err) {
        console.warn('Could not sync failed payment to inquiries:', err);
      }
    }

    setModalOpen(false);
    setNewPayment({
      studentName: '',
      studentEmail: '',
      studentPhone: '',
      program: '',
      category: 'Internship',
      amount: '',
      method: 'UPI',
      status: 'Paid'
    });
  };

  return (
    <div className="admin-payments-page">
      {/* Top Header */}
      <header className="payments-header">
        <div className="payments-title-group">
          <div className="welcome-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '1px solid #d9cfc7', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <Sparkles size={13} color="#8b7050" />
            <span>Financial & Revenue Center</span>
          </div>
          <h1>Revenue & Payments Management</h1>
          <p>
            Real-time billing analytics, multi-tier comparison charts (YoY, MoM, WoW), and verified student payment receipts.
          </p>
        </div>

        <div className="payments-header-actions">
          <button onClick={handleExportCSV} className="btn-export-csv" title="Export Financial Data to CSV">
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button onClick={() => setModalOpen(true)} className="btn-record-payment">
            <Plus size={15} />
            <span>Record Payment</span>
          </button>
        </div>
      </header>

      {/* 4 Big KPI Metric Cards with Comparisons */}
      <section className="revenue-kpi-grid">
        {/* Total Gross Revenue */}
        <div className="revenue-kpi-card" style={{ '--card-accent': '#16a34a' }}>
          <div className="revenue-kpi-header">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
              <IndianRupee size={20} />
            </div>
            <span className="kpi-badge-growth positive">
              <ArrowUpRight size={13} />
              <span>+53.4% YoY</span>
            </span>
          </div>
          <span className="kpi-title">Total Gross Revenue</span>
          <h2 className="kpi-amount">₹24,85,600</h2>
          <p className="kpi-subtext">Lifetime collected across 445 enrolled students</p>
        </div>

        {/* Month-Wise Revenue */}
        <div className="revenue-kpi-card" style={{ '--card-accent': '#8b5cf6' }}>
          <div className="revenue-kpi-header">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
              <Calendar size={20} />
            </div>
            <span className="kpi-badge-growth positive">
              <ArrowUpRight size={13} />
              <span>+18.4% MoM</span>
            </span>
          </div>
          <span className="kpi-title">This Month (August 2026)</span>
          <h2 className="kpi-amount">₹4,92,400</h2>
          <p className="kpi-subtext">vs ₹4,15,800 in July 2026</p>
        </div>

        {/* Week-Wise Revenue & Comparison with Previous Week */}
        <div className="revenue-kpi-card" style={{ '--card-accent': '#2563eb' }}>
          <div className="revenue-kpi-header">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
              <BarChart3 size={20} />
            </div>
            <span className="kpi-badge-growth positive">
              <ArrowUpRight size={13} />
              <span>+17.5% vs Prev Week</span>
            </span>
          </div>
          <span className="kpi-title">This Week (Week 34)</span>
          <h2 className="kpi-amount">₹1,28,600</h2>
          <p className="kpi-subtext">
            vs <strong>₹1,09,400</strong> in Week 33 (Previous Week)
          </p>
        </div>

        {/* Today's Collection */}
        <div className="revenue-kpi-card" style={{ '--card-accent': '#d97706' }}>
          <div className="revenue-kpi-header">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
              <CreditCard size={20} />
            </div>
            <span className="kpi-badge-growth positive">
              <Sparkles size={13} />
              <span>14 Paid Today</span>
            </span>
          </div>
          <span className="kpi-title">Today's Daily Inflow</span>
          <h2 className="kpi-amount">₹18,450</h2>
          <p className="kpi-subtext">Settlement active • Zero gateway failures</p>
        </div>
      </section>

      {/* Comparison Analysis Section with Period Switcher */}
      <section className="analytics-section-card">
        <div className="analytics-card-header">
          <div className="analytics-card-title">
            <BarChart3 size={20} color="#8b7050" />
            <span>Revenue Comparison & Trend Analysis</span>
          </div>

          {/* Mobile Dropdown View */}
          <div className="period-mobile-dropdown-wrap">
            <select
              value={activePeriodTab}
              onChange={(e) => setActivePeriodTab(e.target.value)}
              className="period-mobile-select"
            >
              <option value="weekly">📅 Week-Wise (WoW)</option>
              <option value="monthly">🗓️ Month-Wise (MoM)</option>
              <option value="yearly">📈 Year-Wise (YoY)</option>
              <option value="streams">📊 Domain Streams</option>
            </select>
          </div>

          {/* Desktop Tab Switcher */}
          <div className="period-tab-group desktop-only-period-tabs">
            <button
              onClick={() => setActivePeriodTab('weekly')}
              className={`period-tab-btn ${activePeriodTab === 'weekly' ? 'active' : ''}`}
            >
              Week-Wise (WoW)
            </button>
            <button
              onClick={() => setActivePeriodTab('monthly')}
              className={`period-tab-btn ${activePeriodTab === 'monthly' ? 'active' : ''}`}
            >
              Month-Wise (MoM)
            </button>
            <button
              onClick={() => setActivePeriodTab('yearly')}
              className={`period-tab-btn ${activePeriodTab === 'yearly' ? 'active' : ''}`}
            >
              Year-Wise (YoY)
            </button>
            <button
              onClick={() => setActivePeriodTab('streams')}
              className={`period-tab-btn ${activePeriodTab === 'streams' ? 'active' : ''}`}
            >
              Domain Streams
            </button>
          </div>
        </div>

        {/* 1. Week-Wise Comparison */}
        {activePeriodTab === 'weekly' && (
          <div className="bars-chart-container">
            <div className="chart-bar-row">
              <div className="bar-label-col">Week 34 (Current)</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '100%', background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)' }}>
                  <span className="bar-fill-text">₹1,28,600</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹1,28,600</span>
                <span className="compare-growth up">+17.5% vs Prev</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">Week 33 (Prev)</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '85%', background: 'linear-gradient(90deg, #60a5fa, #2563eb)' }}>
                  <span className="bar-fill-text">₹1,09,400</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹1,09,400</span>
                <span className="compare-growth up">+8.2% vs Prev</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">Week 32</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '78%', background: '#93c5fd' }}>
                  <span className="bar-fill-text" style={{ color: '#1e3a8a' }}>₹1,01,100</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹1,01,100</span>
                <span className="compare-growth up">+12.0% vs Prev</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">Week 31</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '70%', background: '#cbd5e1' }}>
                  <span className="bar-fill-text" style={{ color: '#334155' }}>₹90,300</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹90,300</span>
                <span className="compare-growth up">+5.4% vs Prev</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Month-Wise Comparison */}
        {activePeriodTab === 'monthly' && (
          <div className="bars-chart-container">
            <div className="chart-bar-row">
              <div className="bar-label-col">August 2026</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '100%', background: 'linear-gradient(90deg, #8b5cf6, #6d28d9)' }}>
                  <span className="bar-fill-text">₹4,92,400</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹4,92,400</span>
                <span className="compare-growth up">+18.4% MoM</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">July 2026</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '84%', background: 'linear-gradient(90deg, #a78bfa, #7c3aed)' }}>
                  <span className="bar-fill-text">₹4,15,800</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹4,15,800</span>
                <span className="compare-growth up">+14.2% MoM</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">June 2026</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '74%', background: '#c4b5fd' }}>
                  <span className="bar-fill-text" style={{ color: '#4c1d95' }}>₹3,64,200</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹3,64,200</span>
                <span className="compare-growth up">+22.1% MoM</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">May 2026</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '60%', background: '#ddd6fe' }}>
                  <span className="bar-fill-text" style={{ color: '#4c1d95' }}>₹2,98,000</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹2,98,000</span>
                <span className="compare-growth up">+8.3% MoM</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Year-Wise Comparison */}
        {activePeriodTab === 'yearly' && (
          <div className="bars-chart-container">
            <div className="chart-bar-row">
              <div className="bar-label-col">2026 (YTD)</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '100%', background: 'linear-gradient(90deg, #10b981, #047857)' }}>
                  <span className="bar-fill-text">₹24,85,600</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹24.85 Lakhs</span>
                <span className="compare-growth up">+53.4% YoY</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">2025</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '65%', background: 'linear-gradient(90deg, #34d399, #059669)' }}>
                  <span className="bar-fill-text">₹16,20,000</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹16.20 Lakhs</span>
                <span className="compare-growth up">+82.0% YoY</span>
              </div>
            </div>

            <div className="chart-bar-row">
              <div className="bar-label-col">2024</div>
              <div className="bar-track-wrap">
                <div className="bar-fill-current" style={{ width: '36%', background: '#a7f3d0' }}>
                  <span className="bar-fill-text" style={{ color: '#064e3b' }}>₹8,90,000</span>
                </div>
              </div>
              <div className="bar-compare-col">
                <span className="compare-val">₹8.90 Lakhs</span>
                <span className="compare-growth up">Baseline</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Stream Revenue Breakdown */}
        {activePeriodTab === 'streams' && (
          <div className="stream-breakdown-grid">
            <div className="stream-card" style={{ borderLeft: '4px solid #2563eb' }}>
              <div className="stream-header">
                <span className="stream-title">💼 Internship Programs</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb' }}>50.1%</span>
              </div>
              <div className="stream-amount">₹12,45,000</div>
              <div className="stream-progress">
                <div className="stream-progress-bar" style={{ width: '50.1%', backgroundColor: '#2563eb' }} />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#78716c' }}>142 Enrolled Interns (₹799 - ₹2399 Tiers)</span>
            </div>

            <div className="stream-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
              <div className="stream-header">
                <span className="stream-title">📖 Corporate & Tech Training</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6' }}>30.6%</span>
              </div>
              <div className="stream-amount">₹7,60,000</div>
              <div className="stream-progress">
                <div className="stream-progress-bar" style={{ width: '30.6%', backgroundColor: '#8b5cf6' }} />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#78716c' }}>88 Enrolled Trainees & Corporate Batches</span>
            </div>

            <div className="stream-card" style={{ borderLeft: '4px solid #d97706' }}>
              <div className="stream-header">
                <span className="stream-title">🎓 Online Courses & AI Masterclasses</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706' }}>19.3%</span>
              </div>
              <div className="stream-amount">₹4,80,600</div>
              <div className="stream-progress">
                <div className="stream-progress-bar" style={{ width: '19.3%', backgroundColor: '#d97706' }} />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#78716c' }}>215 Self-Paced & Live Course Learners</span>
            </div>
          </div>
        )}
      </section>

      {/* Transactions & Invoices Table Section */}
      <section className="transactions-card">
        <div className="transactions-card-header">
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
              Recent Payment Transactions & Invoices ({filteredTransactions.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#78716c' }}>
              Automatic QR receipts and gateway settlement logs
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search student or TXN ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="table-search-input"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.55rem 0.85rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', fontSize: '0.82rem', backgroundColor: '#ffffff' }}
            >
              <option value="ALL">All Status</option>
              <option value="PAID">Paid (Verified)</option>
              <option value="PENDING">Pending</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
        </div>

        {/* Mobile Feed (Active on Mobile Phones < 768px) */}
        <div className="mobile-tx-cards-feed">
          {filteredTransactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#78716c', fontSize: '0.85rem' }}>
              No transactions match your search.
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="mobile-tx-card">
                <div className="mobile-tx-top-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span className="tx-id" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                      {tx.id}
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1c1917', backgroundColor: '#efe9e3', padding: '0.15rem 0.45rem', borderRadius: '0.3rem' }}>
                      {tx.method}
                    </span>
                  </div>
                  <span className={`tx-status-pill ${tx.status.toLowerCase()}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                    {tx.status === 'Paid' && <CheckCircle2 size={10} />}
                    {tx.status === 'Pending' && <Clock size={10} />}
                    {tx.status === 'Refunded' && <RefreshCw size={10} />}
                    <span>{tx.status}</span>
                  </span>
                </div>

                <div className="mobile-tx-main-row">
                  <strong style={{ fontSize: '0.92rem', color: '#1c1917', display: 'block' }}>
                    {tx.studentName}
                  </strong>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#78716c', display: 'block', marginTop: '0.15rem' }}>
                    {tx.program.replace(/\s*\([^)]*\)/g, '')}
                  </span>
                </div>

                <div className="mobile-tx-bottom-row">
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: '#1c1917', display: 'block', lineHeight: 1.1 }}>
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: '#a8a29e' }}>{tx.date}</span>
                  </div>

                  <button
                    onClick={() => alert(`Generating Official QorZen Tax Invoice for ${tx.id} (${tx.studentName}) - Amount: ₹${tx.amount}`)}
                    className="btn-invoice-download"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                  >
                    <FileText size={12} />
                    <span>Invoice</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop & Tablet Master Table (Active on >= 768px) */}
        <div className="transactions-table-wrap desktop-only-table">
          <table className="admin-tx-table">
            <thead>
              <tr>
                <th>TXN ID</th>
                <th>Student</th>
                <th>Transaction (UPI / Card / NetBanking)</th>
                <th>Program</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <span className="tx-id" style={{ fontSize: '0.74rem', fontWeight: 800 }}>
                      {tx.id}
                    </span>
                  </td>
                  <td>
                    <span className="tx-student-name" style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1c1917', whiteSpace: 'nowrap' }}>
                      {tx.studentName}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', fontWeight: 700, color: '#1c1917', backgroundColor: '#efe9e3', padding: '0.15rem 0.45rem', borderRadius: '0.3rem', whiteSpace: 'nowrap' }}>
                      {tx.method}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', lineHeight: 1.3, display: 'block' }}>
                      {tx.program.replace(/\s*\([^)]*\)/g, '')}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.85rem', color: '#1c1917' }}>₹{tx.amount.toLocaleString('en-IN')}</strong>
                  </td>
                  <td>
                    <span className={`tx-status-pill ${tx.status.toLowerCase()}`}>
                      {tx.status === 'Paid' && <CheckCircle2 size={11} />}
                      {tx.status === 'Pending' && <Clock size={11} />}
                      {tx.status === 'Refunded' && <RefreshCw size={11} />}
                      <span>{tx.status}</span>
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.72rem', color: '#78716c', whiteSpace: 'nowrap' }}>{tx.date}</span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => alert(`Generating Official QorZen Tax Invoice for ${tx.id} (${tx.studentName}) - Amount: ₹${tx.amount}`)}
                      className="btn-invoice-download"
                      title="Download Official Tax Receipt / Invoice"
                      style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}
                    >
                      <FileText size={12} />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Manual Payment Entry Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="manual-payment-modal-backdrop"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="manual-payment-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
                  Record Offline / Manual Payment
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#78716c' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="modal-form-grid">
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={newPayment.studentName}
                      onChange={(e) => setNewPayment({ ...newPayment, studentName: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Student Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={newPayment.studentEmail}
                      onChange={(e) => setNewPayment({ ...newPayment, studentEmail: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Program / Domain Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cyber Security Intern (3M)"
                      value={newPayment.program}
                      onChange={(e) => setNewPayment({ ...newPayment, program: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Program Stream
                    </label>
                    <select
                      value={newPayment.category}
                      onChange={(e) => setNewPayment({ ...newPayment, category: e.target.value })}
                      className="modal-input-field"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Training">Training</option>
                      <option value="Course">Online Course</option>
                    </select>
                  </div>
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Amount Received (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1399"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Transaction Option *
                    </label>
                    <select
                      value={newPayment.method}
                      onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                      className="modal-input-field"
                    >
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                      <option value="NetBanking">NetBanking</option>
                    </select>
                  </div>
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Student Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={newPayment.studentPhone}
                      onChange={(e) => setNewPayment({ ...newPayment, studentPhone: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Payment Status *
                    </label>
                    <select
                      value={newPayment.status}
                      onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
                      className="modal-input-field"
                      style={{
                        color: newPayment.status === 'Failed' ? '#dc2626' : newPayment.status === 'Paid' ? '#16a34a' : 'inherit',
                        fontWeight: 700
                      }}
                    >
                      <option value="Paid">Paid (Successful)</option>
                      <option value="Failed">Failed (Auto-routes to Inquiries)</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                {newPayment.status === 'Failed' && (
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.45rem', fontSize: '0.75rem', color: '#991b1b', lineHeight: 1.45 }}>
                    ⚠️ <strong>Payment Failure Auto-Routing:</strong> This failed payment will be automatically created in <strong>Inquiries & Leads</strong> with status <strong>"Payment Failed"</strong> so your team can immediately contact the student via WhatsApp / Phone to recover the transaction.
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn-export-csv"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-record-payment"
                  >
                    Save & Generate Receipt
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
