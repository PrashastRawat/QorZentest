// Revenue & Payments Management — wired to the real backend.
// - Course / Training / Internship revenue comes from confirmed EnrollmentRequests
//   (GET /api/enrollment-requests/stats/revenue), same as before.
// - Services revenue is NEW: recorded via "Record Payment" -> Service, saved to
//   ServicePayment (GET/POST /api/service-payments), and merged into the same
//   totals/trends/streams by the backend summary endpoint.
// - "Record Payment" -> Service asks for client name/email/phone (not "student"),
//   since a service client is not a student.
// - Course/Training/Internship manual entries via this modal are NOT persisted
//   (there's no generic manual-payment endpoint for those yet — their real
//   numbers come from actual enrollment confirmations). They're shown locally
//   for the same "auto-route failed payments to Inquiries" convenience as before.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  CreditCard,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  RefreshCw,
  FileText,
  Sparkles,
  X,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import {
  getRevenueSummary,
  getEnrollmentRequests,
  getServicePayments,
  createServicePayment
} from '../../../api';
import './AdminPayments.css';

const CATEGORY_LABELS = {
  Internship: 'Internship',
  Training: 'Training',
  Course: 'Online Course',
  Service: 'Service Project'
};

const STREAM_META = {
  course: { emoji: '🎓', color: '#d97706' },
  training: { emoji: '📖', color: '#8b5cf6' },
  internship: { emoji: '💼', color: '#2563eb' },
  service: { emoji: '🛠️', color: '#0d9488' }
};

const fmtINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const fmtDate = (d) => {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '—';
  }
};

export default function AdminPayments() {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [summary, setSummary] = useState(null); // full response from getRevenueSummary
  const [transactions, setTransactions] = useState([]); // merged enrollment + service rows

  const [activePeriodTab, setActivePeriodTab] = useState('weekly'); // 'weekly' | 'monthly' | 'yearly' | 'streams'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [newPayment, setNewPayment] = useState({
    name: '',
    email: '',
    phone: '',
    company: '', // Service-only
    program: '',
    category: 'Internship',
    amount: '',
    method: 'UPI',
    status: 'Paid'
  });

  // ---- Data loading ----
  const loadData = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const [summaryRes, enrollmentsRes, servicesRes] = await Promise.all([
        getRevenueSummary(),
        getEnrollmentRequests('confirmed'),
        getServicePayments()
      ]);

      setSummary(summaryRes.data?.data || null);

      const enrollmentTx = (enrollmentsRes.data?.data || []).map((r) => ({
        id: r.requestCode || r._id,
        _id: r._id,
        name: r.student?.name || 'Unknown Student',
        email: r.student?.email || '—',
        phone: '—',
        program: r.itemTitle,
        category:
          r.itemType === 'course' ? 'Course' : r.itemType === 'training' ? 'Training' : 'Internship',
        amount: r.amount || 0,
        method: r.method === 'razorpay' ? 'Razorpay' : 'WhatsApp / Manual',
        status: 'Paid',
        date: r.confirmedAt || r.createdAt,
        source: 'enrollment'
      }));

      const serviceTx = (servicesRes.data?.data || []).map((s) => ({
        id: `SRV-${String(s._id).slice(-6).toUpperCase()}`,
        _id: s._id,
        name: s.clientName,
        email: s.clientEmail || '—',
        phone: s.clientPhone || '—',
        program: s.projectTitle,
        category: 'Service',
        amount: s.amount || 0,
        method: s.method || 'UPI',
        status: s.status || 'Paid',
        date: s.paidAt || s.createdAt,
        source: 'service'
      }));

      const merged = [...enrollmentTx, ...serviceTx].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(merged);
    } catch (err) {
      console.error('Failed to load revenue data:', err);
      setErrorMsg(
        err?.response?.data?.message || 'Could not load revenue data. Please refresh and try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ---- Filtering for the transactions table ----
  const filteredTransactions = transactions.filter((tx) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      tx.name.toLowerCase().includes(q) ||
      String(tx.id).toLowerCase().includes(q) ||
      tx.program?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'ALL' || tx.status.toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ---- CSV export helpers ----
  const exportRows = (rows, filenamePrefix) => {
    const headers = 'ID,Name,Email,Phone,Program / Project,Category,Amount (INR),Method,Status,Date\n';
    const body = rows
      .map(
        (t) =>
          `"${t.id}","${t.name}","${t.email}","${t.phone}","${t.program}","${t.category}",${t.amount},"${t.method}","${t.status}","${fmtDate(t.date)}"`
      )
      .join('\n');
    const blob = new Blob([headers + body], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `QorZen_${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullReport = () => exportRows(transactions, 'Full_Revenue_Report');

  const handleDownloadMonthlyReport = () => {
    const now = new Date();
    const monthRows = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    exportRows(monthRows, `Monthly_Report_${now.toLocaleString('en-IN', { month: 'short', year: 'numeric' }).replace(' ', '_')}`);
  };

  // ---- Record Payment modal ----
  const resetForm = () =>
    setNewPayment({
      name: '',
      email: '',
      phone: '',
      company: '',
      program: '',
      category: 'Internship',
      amount: '',
      method: 'UPI',
      status: 'Paid'
    });

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!newPayment.name || !newPayment.amount) return;

    setSaving(true);
    try {
      if (newPayment.category === 'Service') {
        // Real DB write — this is the new part.
        await createServicePayment({
          projectTitle: newPayment.program || 'Client Service Project',
          clientName: newPayment.name,
          clientEmail: newPayment.email || undefined,
          clientPhone: newPayment.phone || undefined,
          clientCompany: newPayment.company || undefined,
          amount: Number(newPayment.amount),
          method: newPayment.method,
          status: newPayment.status
        });
        await loadData(); // refresh totals/trends/streams/table from the server
      } else {
        // No generic manual-payment endpoint exists yet for Course/Training/
        // Internship — keep this as a local-only row so the UI still works
        // for quick offline record-keeping, same as the original prototype.
        const createdTx = {
          id: `MANUAL-${Math.floor(100000 + Math.random() * 900000)}`,
          _id: undefined,
          name: newPayment.name,
          email: newPayment.email || '—',
          phone: newPayment.phone || '—',
          program: newPayment.program || 'Custom Track',
          category: newPayment.category,
          amount: Number(newPayment.amount),
          method: newPayment.method,
          status: newPayment.status,
          date: new Date().toISOString(),
          source: 'manual-local'
        };
        setTransactions((prev) => [createdTx, ...prev]);

        // If Payment Failed: Auto-Route directly to Inquiries & Leads
        if (createdTx.status === 'Failed') {
          const failedInquiry = {
            id: `INQ-FAIL-${Math.floor(1000 + Math.random() * 9000)}`,
            name: createdTx.name,
            email: createdTx.email,
            phone: createdTx.phone,
            tagCategory: createdTx.category,
            tagDetail: `Payment Failed - ${fmtINR(createdTx.amount)} (${createdTx.program})`,
            message: `Automated Lead Alert: Manual payment entry of ${fmtINR(createdTx.amount)} for "${createdTx.program}" was marked Failed. Follow up with the lead to assist with payment completion.`,
            status: 'Payment Failed',
            createdAt: 'Just now'
          };
          try {
            const stored = JSON.parse(localStorage.getItem('qorzen_inquiries') || '[]');
            localStorage.setItem('qorzen_inquiries', JSON.stringify([failedInquiry, ...stored]));
          } catch (err) {
            console.warn('Could not sync failed payment to inquiries:', err);
          }
        }
      }

      setModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Failed to record payment:', err);
      alert(err?.response?.data?.message || 'Failed to record payment. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const isService = newPayment.category === 'Service';

  // ---- Derived chart data from summary ----
  const weeklyRows = useMemo(() => {
    if (!summary?.weeklyTrend) return [];
    const rows = [...summary.weeklyTrend].reverse(); // latest first
    const max = Math.max(...rows.map((r) => r.revenue), 1);
    return rows.map((r, i) => ({
      label: i === 0 ? `Week ${r.weekNumber} (Current)` : `Week ${r.weekNumber}`,
      revenue: r.revenue,
      widthPct: Math.max(6, Math.round((r.revenue / max) * 100)),
      changePct: r.changePct
    }));
  }, [summary]);

  const monthlyRows = useMemo(() => {
    if (!summary?.monthlyTrend) return [];
    const rows = [...summary.monthlyTrend].reverse().slice(0, 4); // latest 4 first
    const max = Math.max(...rows.map((r) => r.revenue), 1);
    return rows.map((r) => ({
      label: r.label,
      revenue: r.revenue,
      widthPct: Math.max(6, Math.round((r.revenue / max) * 100)),
      changePct: r.changePct
    }));
  }, [summary]);

  const yearlyRows = useMemo(() => {
    if (!summary?.yearlyTrend) return [];
    const rows = [...summary.yearlyTrend].reverse(); // latest first
    const max = Math.max(...rows.map((r) => r.revenue), 1);
    return rows.map((r, i) => ({
      label: i === rows.length - 1 ? `${r.label} (Baseline)` : r.label,
      revenue: r.revenue,
      widthPct: Math.max(6, Math.round((r.revenue / max) * 100)),
      changePct: r.changePct
    }));
  }, [summary]);

  const streams = summary?.streams || [];

  if (loading) {
    return (
      <div className="admin-payments-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '0.75rem' }}>
        <Loader2 size={28} className="spin-loader" style={{ animation: 'spin 1s linear infinite' }} />
        <span style={{ color: '#78716c', fontSize: '0.9rem' }}>Loading revenue data…</span>
      </div>
    );
  }

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
            Real-time billing analytics across Courses, Training, Internships & Services, plus verified payment records.
          </p>
        </div>

        <div className="payments-header-actions">
          <button onClick={handleDownloadFullReport} className="btn-export-csv" title="Download the complete all-time revenue report">
            <Download size={15} />
            <span>Download Full Report</span>
          </button>
          <button onClick={handleDownloadMonthlyReport} className="btn-export-csv" title="Download this month's revenue report only">
            <Download size={15} />
            <span>Download Monthly Report</span>
          </button>
          <button onClick={() => setModalOpen(true)} className="btn-record-payment">
            <Plus size={15} />
            <span>Record Payment</span>
          </button>
        </div>
      </header>

      {errorMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.82rem', marginBottom: '1rem' }}>
          <AlertTriangle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 4 Big KPI Metric Cards with Comparisons */}
      <section className="revenue-kpi-grid">
        {/* Total Gross Revenue */}
        <div className="revenue-kpi-card" style={{ '--card-accent': '#16a34a' }}>
          <div className="revenue-kpi-header">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
              <IndianRupee size={20} />
            </div>
          </div>
          <span className="kpi-title">Total Gross Revenue</span>
          <h2 className="kpi-amount">{fmtINR(summary?.totalRevenue)}</h2>
          <p className="kpi-subtext">Lifetime collected across {summary?.confirmedCount || 0} payments</p>
        </div>

        {/* Month-Wise Revenue */}
        <div className="revenue-kpi-card" style={{ '--card-accent': '#8b5cf6' }}>
          <div className="revenue-kpi-header">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
              <Calendar size={20} />
            </div>
            <span className={`kpi-badge-growth ${summary?.thisMonth?.changePct >= 0 ? 'positive' : 'negative'}`}>
              {summary?.thisMonth?.changePct >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              <span>{summary?.thisMonth?.changePct >= 0 ? '+' : ''}{summary?.thisMonth?.changePct ?? 0}% MoM</span>
            </span>
          </div>
          <span className="kpi-title">This Month ({summary?.thisMonth?.label})</span>
          <h2 className="kpi-amount">{fmtINR(summary?.thisMonth?.revenue)}</h2>
          <p className="kpi-subtext">vs {fmtINR(summary?.thisMonth?.prevRevenue)} in {summary?.thisMonth?.prevLabel}</p>
        </div>

        {/* Week-Wise Revenue & Comparison with Previous Week */}
        <div className="revenue-kpi-card" style={{ '--card-accent': '#2563eb' }}>
          <div className="revenue-kpi-header">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
              <BarChart3 size={20} />
            </div>
            <span className={`kpi-badge-growth ${summary?.thisWeek?.changePct >= 0 ? 'positive' : 'negative'}`}>
              {summary?.thisWeek?.changePct >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              <span>{summary?.thisWeek?.changePct >= 0 ? '+' : ''}{summary?.thisWeek?.changePct ?? 0}% vs Prev Week</span>
            </span>
          </div>
          <span className="kpi-title">This Week (Week {summary?.thisWeek?.weekNumber})</span>
          <h2 className="kpi-amount">{fmtINR(summary?.thisWeek?.revenue)}</h2>
          <p className="kpi-subtext">
            vs <strong>{fmtINR(summary?.thisWeek?.prevRevenue)}</strong> (Previous Week)
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
              <span>{summary?.today?.count ?? 0} Paid Today</span>
            </span>
          </div>
          <span className="kpi-title">Today's Daily Inflow</span>
          <h2 className="kpi-amount">{fmtINR(summary?.today?.revenue)}</h2>
          <p className="kpi-subtext">Live totals across all revenue streams</p>
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
            <button onClick={() => setActivePeriodTab('weekly')} className={`period-tab-btn ${activePeriodTab === 'weekly' ? 'active' : ''}`}>
              Week-Wise (WoW)
            </button>
            <button onClick={() => setActivePeriodTab('monthly')} className={`period-tab-btn ${activePeriodTab === 'monthly' ? 'active' : ''}`}>
              Month-Wise (MoM)
            </button>
            <button onClick={() => setActivePeriodTab('yearly')} className={`period-tab-btn ${activePeriodTab === 'yearly' ? 'active' : ''}`}>
              Year-Wise (YoY)
            </button>
            <button onClick={() => setActivePeriodTab('streams')} className={`period-tab-btn ${activePeriodTab === 'streams' ? 'active' : ''}`}>
              Domain Streams
            </button>
          </div>
        </div>

        {/* 1. Week-Wise Comparison */}
        {activePeriodTab === 'weekly' && (
          <div className="bars-chart-container">
            {weeklyRows.length === 0 ? (
              <p style={{ color: '#78716c', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>No weekly data yet.</p>
            ) : (
              weeklyRows.map((row, idx) => (
                <div className="chart-bar-row" key={row.label}>
                  <div className="bar-label-col">{row.label}</div>
                  <div className="bar-track-wrap">
                    <div
                      className="bar-fill-current"
                      style={{
                        width: `${row.widthPct}%`,
                        background: idx === 0 ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' : idx === 1 ? 'linear-gradient(90deg, #60a5fa, #2563eb)' : '#93c5fd'
                      }}
                    >
                      <span className="bar-fill-text" style={idx > 1 ? { color: '#1e3a8a' } : {}}>{fmtINR(row.revenue)}</span>
                    </div>
                  </div>
                  <div className="bar-compare-col">
                    <span className="compare-val">{fmtINR(row.revenue)}</span>
                    <span className={`compare-growth ${row.changePct >= 0 ? 'up' : 'down'}`}>
                      {row.changePct >= 0 ? '+' : ''}{row.changePct}% vs Prev
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 2. Month-Wise Comparison */}
        {activePeriodTab === 'monthly' && (
          <div className="bars-chart-container">
            {monthlyRows.length === 0 ? (
              <p style={{ color: '#78716c', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>No monthly data yet.</p>
            ) : (
              monthlyRows.map((row, idx) => (
                <div className="chart-bar-row" key={row.label}>
                  <div className="bar-label-col">{row.label}</div>
                  <div className="bar-track-wrap">
                    <div
                      className="bar-fill-current"
                      style={{
                        width: `${row.widthPct}%`,
                        background: idx === 0 ? 'linear-gradient(90deg, #8b5cf6, #6d28d9)' : idx === 1 ? 'linear-gradient(90deg, #a78bfa, #7c3aed)' : idx === 2 ? '#c4b5fd' : '#ddd6fe'
                      }}
                    >
                      <span className="bar-fill-text" style={idx > 1 ? { color: '#4c1d95' } : {}}>{fmtINR(row.revenue)}</span>
                    </div>
                  </div>
                  <div className="bar-compare-col">
                    <span className="compare-val">{fmtINR(row.revenue)}</span>
                    <span className={`compare-growth ${row.changePct >= 0 ? 'up' : 'down'}`}>
                      {row.changePct >= 0 ? '+' : ''}{row.changePct}% MoM
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 3. Year-Wise Comparison */}
        {activePeriodTab === 'yearly' && (
          <div className="bars-chart-container">
            {yearlyRows.length === 0 ? (
              <p style={{ color: '#78716c', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>No yearly data yet.</p>
            ) : (
              yearlyRows.map((row, idx) => (
                <div className="chart-bar-row" key={row.label}>
                  <div className="bar-label-col">{row.label}</div>
                  <div className="bar-track-wrap">
                    <div
                      className="bar-fill-current"
                      style={{
                        width: `${row.widthPct}%`,
                        background: idx === 0 ? 'linear-gradient(90deg, #10b981, #047857)' : idx === 1 ? 'linear-gradient(90deg, #34d399, #059669)' : '#a7f3d0'
                      }}
                    >
                      <span className="bar-fill-text" style={idx > 1 ? { color: '#064e3b' } : {}}>{fmtINR(row.revenue)}</span>
                    </div>
                  </div>
                  <div className="bar-compare-col">
                    <span className="compare-val">{fmtINR(row.revenue)}</span>
                    <span className={`compare-growth ${row.changePct >= 0 ? 'up' : 'down'}`}>
                      {idx === yearlyRows.length - 1 ? 'Baseline' : `${row.changePct >= 0 ? '+' : ''}${row.changePct}% YoY`}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 4. Stream Revenue Breakdown (Course / Training / Internship / Services) */}
        {activePeriodTab === 'streams' && (
          <div className="stream-breakdown-grid">
            {streams.length === 0 ? (
              <p style={{ color: '#78716c', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>No revenue recorded yet.</p>
            ) : (
              streams.map((s) => {
                const meta = STREAM_META[s.key] || { emoji: '💰', color: '#78716c' };
                return (
                  <div className="stream-card" key={s.key} style={{ borderLeft: `4px solid ${meta.color}` }}>
                    <div className="stream-header">
                      <span className="stream-title">{meta.emoji} {s.label}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: meta.color }}>{s.percentage}%</span>
                    </div>
                    <div className="stream-amount">{fmtINR(s.revenue)}</div>
                    <div className="stream-progress">
                      <div className="stream-progress-bar" style={{ width: `${s.percentage}%`, backgroundColor: meta.color }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#78716c' }}>
                      {s.count} {s.key === 'service' ? 'Completed Projects' : s.key === 'internship' ? 'Enrolled Interns' : s.key === 'training' ? 'Enrolled Trainees' : 'Enrolled Learners'}
                    </span>
                  </div>
                );
              })
            )}
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
              Combined feed: enrollments (Course/Training/Internship) + Service Projects
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search name, TXN ID, or program..."
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
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>

        {/* Mobile Feed */}
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
                    <span className="tx-id" style={{ fontSize: '0.75rem', fontWeight: 800 }}>{tx.id}</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1c1917', backgroundColor: '#efe9e3', padding: '0.15rem 0.45rem', borderRadius: '0.3rem' }}>
                      {tx.category}
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
                  <strong style={{ fontSize: '0.92rem', color: '#1c1917', display: 'block' }}>{tx.name}</strong>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#78716c', display: 'block', marginTop: '0.15rem' }}>
                    {tx.program}
                  </span>
                </div>

                <div className="mobile-tx-bottom-row">
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: '#1c1917', display: 'block', lineHeight: 1.1 }}>{fmtINR(tx.amount)}</strong>
                    <span style={{ fontSize: '0.68rem', color: '#a8a29e' }}>{fmtDate(tx.date)}</span>
                  </div>
                  <button
                    onClick={() => alert(`Generating Official QorZen Receipt for ${tx.id} (${tx.name}) - Amount: ${fmtINR(tx.amount)}`)}
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

        {/* Desktop & Tablet Master Table */}
        <div className="transactions-table-wrap desktop-only-table">
          <table className="admin-tx-table">
            <thead>
              <tr>
                <th>TXN ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Program / Project</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#78716c', fontSize: '0.85rem' }}>
                    No transactions match your search.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td><span className="tx-id" style={{ fontSize: '0.74rem', fontWeight: 800 }}>{tx.id}</span></td>
                    <td>
                      <span className="tx-student-name" style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1c1917', whiteSpace: 'nowrap' }}>{tx.name}</span>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#a8a29e' }}>{tx.email}</span>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', fontWeight: 700, color: '#1c1917', backgroundColor: '#efe9e3', padding: '0.15rem 0.45rem', borderRadius: '0.3rem', whiteSpace: 'nowrap' }}>
                        {tx.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', lineHeight: 1.3, display: 'block' }}>{tx.program}</span>
                    </td>
                    <td><strong style={{ fontSize: '0.85rem', color: '#1c1917' }}>{fmtINR(tx.amount)}</strong></td>
                    <td>
                      <span className={`tx-status-pill ${tx.status.toLowerCase()}`}>
                        {tx.status === 'Paid' && <CheckCircle2 size={11} />}
                        {tx.status === 'Pending' && <Clock size={11} />}
                        {tx.status === 'Refunded' && <RefreshCw size={11} />}
                        <span>{tx.status}</span>
                      </span>
                    </td>
                    <td><span style={{ fontSize: '0.72rem', color: '#78716c', whiteSpace: 'nowrap' }}>{fmtDate(tx.date)}</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => alert(`Generating Official QorZen Receipt for ${tx.id} (${tx.name}) - Amount: ${fmtINR(tx.amount)}`)}
                        className="btn-invoice-download"
                        title="Download Receipt / Invoice"
                        style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}
                      >
                        <FileText size={12} />
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Record Payment Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="manual-payment-modal-backdrop"
            onClick={() => !saving && setModalOpen(false)}
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
                  Record {isService ? 'Service Project' : 'Offline / Manual'} Payment
                </h3>
                <button onClick={() => !saving && setModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#78716c' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Category first — everything below adapts to it */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    Revenue Category *
                  </label>
                  <select
                    value={newPayment.category}
                    onChange={(e) => setNewPayment({ ...newPayment, category: e.target.value })}
                    className="modal-input-field"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Training">Training</option>
                    <option value="Course">Online Course</option>
                    <option value="Service">Service Project (Client)</option>
                  </select>
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      {isService ? 'Client Full Name *' : 'Student Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isService ? 'e.g. Rohan Mehta (Client)' : 'e.g. Aarav Sharma'}
                      value={newPayment.name}
                      onChange={(e) => setNewPayment({ ...newPayment, name: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      {isService ? 'Client Email Address' : 'Student Email Address'}
                    </label>
                    <input
                      type="email"
                      placeholder={isService ? 'client@company.com' : 'student@example.com'}
                      value={newPayment.email}
                      onChange={(e) => setNewPayment({ ...newPayment, email: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                </div>

                {isService && (
                  <div className="modal-form-grid">
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                        Client Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={newPayment.phone}
                        onChange={(e) => setNewPayment({ ...newPayment, phone: e.target.value })}
                        className="modal-input-field"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                        Client Company (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Pvt Ltd"
                        value={newPayment.company}
                        onChange={(e) => setNewPayment({ ...newPayment, company: e.target.value })}
                        className="modal-input-field"
                      />
                    </div>
                  </div>
                )}

                <div className="modal-form-grid">
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      {isService ? 'Service Project Title *' : 'Program / Domain Title *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isService ? 'e.g. SEO for Acme Pvt Ltd' : 'e.g. Cyber Security Intern (3M)'}
                      value={newPayment.program}
                      onChange={(e) => setNewPayment({ ...newPayment, program: e.target.value })}
                      className="modal-input-field"
                    />
                  </div>
                  {!isService && (
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                        Student Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={newPayment.phone}
                        onChange={(e) => setNewPayment({ ...newPayment, phone: e.target.value })}
                        className="modal-input-field"
                      />
                    </div>
                  )}
                </div>

                <div className="modal-form-grid">
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Amount {isService ? 'Earned' : 'Received'} (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
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
                      {isService && <option value="Cash">Cash</option>}
                      {isService && <option value="BankTransfer">Bank Transfer</option>}
                    </select>
                  </div>
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
                    <option value="Failed">Failed{!isService ? ' (Auto-routes to Inquiries)' : ''}</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                {isService && (
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '0.45rem', fontSize: '0.75rem', color: '#115e59', lineHeight: 1.45 }}>
                    ✅ This will be saved to the database as a real Service Project and added to your total revenue and the Services stream.
                  </div>
                )}

                {!isService && newPayment.status === 'Failed' && (
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.45rem', fontSize: '0.75rem', color: '#991b1b', lineHeight: 1.45 }}>
                    ⚠️ <strong>Payment Failure Auto-Routing:</strong> This failed payment will be automatically created in <strong>Inquiries & Leads</strong> with status <strong>"Payment Failed"</strong> so your team can immediately contact them to recover the transaction.
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-export-csv" disabled={saving}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-record-payment" disabled={saving}>
                    {saving ? 'Saving…' : 'Save & Generate Receipt'}
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