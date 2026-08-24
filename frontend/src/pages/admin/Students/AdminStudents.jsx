import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Sparkles,
  GraduationCap,
  BriefcaseBusiness,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Layers,
  Trash2
} from 'lucide-react';
import './AdminStudents.css';

// Master List of Available Programs to Grant
const availableProgramsToAssign = [
  { id: 'prog-cyber', title: 'Cyber Security & Zero-Trust Defense', category: 'Internship' },
  { id: 'prog-mern', title: 'Full Stack MERN & Next.js Engineering', category: 'Training' },
  { id: 'prog-ai', title: 'Agentic AI & Vector RAG Masterclass', category: 'Course' },
  { id: 'prog-ccna', title: 'Cisco CCNA (200-301) Enterprise Routing', category: 'Training' },
  { id: 'prog-aws', title: 'Cloud Architecture & AWS Zero-Trust', category: 'Internship' },
  { id: 'prog-python', title: 'Python for AI & Data Analytics', category: 'Course' },
  { id: 'prog-devops', title: 'DevOps, CI/CD & Kubernetes Pipeline', category: 'Training' },
  { id: 'prog-ethical', title: 'Ethical Hacking & Penetration Testing', category: 'Internship' },
  { id: 'prog-digital', title: 'Digital Marketing & Growth Funnels', category: 'Course' },
  { id: 'prog-react', title: 'Advanced React 19 & TypeScript', category: 'Training' }
];

// Master Student Dataset with Multi-Course Enrollment Support
const initialStudents = [
  {
    id: 'STU-98421',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.qorzen.in',
    phone: '+91 98765 43210',
    city: 'Bangalore, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    domain: 'Cyber Security & Zero-Trust Defense',
    category: 'Internship',
    batch: 'Morning Cohort (Mon - Fri)',
    mentor: 'Dr. Vikramaditya (Lead Architect)',
    enrollDate: '15 July 2026',
    progress: 88,
    attendance: 96,
    assignmentsSubmitted: '7 / 8',
    projectStatus: 'Production Submitted (GitHub Verified)',
    feePaid: 2399,
    feeStatus: 'Paid',
    certStatus: 'Issued',
    lorStatus: 'Granted',
    lastLogin: 'Active now',
    enrolledCourses: [
      { id: 'prog-cyber', title: 'Cyber Security & Zero-Trust Defense', category: 'Internship', progress: 88, status: 'Active' },
      { id: 'prog-ethical', title: 'Ethical Hacking & Penetration Testing', category: 'Internship', progress: 65, status: 'Active' }
    ]
  },
  {
    id: 'STU-98420',
    name: 'Rohan Verma',
    email: 'rohan.v@gmail.com',
    phone: '+91 98112 34567',
    city: 'Noida, UP',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    domain: 'Full Stack MERN & Next.js Engineering',
    category: 'Training',
    batch: 'Evening Intensive Batch',
    mentor: 'Pooja Nair (Senior Fullstack Lead)',
    enrollDate: '01 August 2026',
    progress: 74,
    attendance: 92,
    assignmentsSubmitted: '5 / 6',
    projectStatus: 'In Review (Sprint 3)',
    feePaid: 1399,
    feeStatus: 'Paid',
    certStatus: 'Eligible',
    lorStatus: 'Pending Review',
    lastLogin: '12m ago',
    enrolledCourses: [
      { id: 'prog-mern', title: 'Full Stack MERN & Next.js Engineering', category: 'Training', progress: 74, status: 'Active' }
    ]
  },
  {
    id: 'STU-98419',
    name: 'Priya Patel',
    email: 'priya.p@outlook.com',
    phone: '+91 97234 56789',
    city: 'Ahmedabad, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    domain: 'Agentic AI & Vector RAG Masterclass',
    category: 'Course',
    batch: 'Self-Paced with Live Weekend Clinics',
    mentor: 'Ananya Deshmukh (AI Research)',
    enrollDate: '10 August 2026',
    progress: 92,
    attendance: 98,
    assignmentsSubmitted: '8 / 8',
    projectStatus: 'Final Evaluation Passed',
    feePaid: 799,
    feeStatus: 'Paid',
    certStatus: 'Issued',
    lorStatus: 'Granted',
    lastLogin: '45m ago',
    enrolledCourses: [
      { id: 'prog-ai', title: 'Agentic AI & Vector RAG Masterclass', category: 'Course', progress: 92, status: 'Active' },
      { id: 'prog-python', title: 'Python for AI & Data Analytics', category: 'Course', progress: 100, status: 'Completed' }
    ]
  },
  {
    id: 'STU-98418',
    name: 'Siddharth Rao',
    email: 'sid.rao@tech.in',
    phone: '+91 96543 21098',
    city: 'Hyderabad, Telangana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    domain: 'Cisco CCNA (200-301) Enterprise Routing',
    category: 'Training',
    batch: 'Weekend Corporate Batch',
    mentor: 'Rajesh Mehra (Network Lead)',
    enrollDate: '20 July 2026',
    progress: 65,
    attendance: 88,
    assignmentsSubmitted: '4 / 6',
    projectStatus: 'Lab Topology Configured',
    feePaid: 2399,
    feeStatus: 'Paid',
    certStatus: 'Under Review',
    lorStatus: 'Eligible upon Completion',
    lastLogin: '2 hours ago',
    enrolledCourses: [
      { id: 'prog-ccna', title: 'Cisco CCNA (200-301) Enterprise Routing', category: 'Training', progress: 65, status: 'Active' }
    ]
  },
  {
    id: 'STU-98417',
    name: 'Neha Gupta',
    email: 'neha.g@gmail.com',
    phone: '+91 95432 10987',
    city: 'Jaipur, Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    domain: 'Digital Marketing & Growth Funnels',
    category: 'Course',
    batch: 'Evening Cohort',
    mentor: 'Sameer Khan (Growth VP)',
    enrollDate: '05 August 2026',
    progress: 45,
    attendance: 85,
    assignmentsSubmitted: '3 / 6',
    projectStatus: 'Case Study Drafted',
    feePaid: 799,
    feeStatus: 'Paid',
    certStatus: 'In Progress',
    lorStatus: 'Not Eligible Yet',
    lastLogin: '5 hours ago',
    enrolledCourses: [
      { id: 'prog-digital', title: 'Digital Marketing & Growth Funnels', category: 'Course', progress: 45, status: 'Active' }
    ]
  },
  {
    id: 'STU-98416',
    name: 'Kunal Singhania',
    email: 'kunal.singh@yahoo.com',
    phone: '+91 94321 09876',
    city: 'Pune, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    domain: 'Cloud Architecture & AWS Zero-Trust',
    category: 'Internship',
    batch: 'Fast-Track Track A',
    mentor: 'Deepak Verma (DevOps Lead)',
    enrollDate: '25 July 2026',
    progress: 58,
    attendance: 80,
    assignmentsSubmitted: '4 / 7',
    projectStatus: 'Terraform Scripts Deployed',
    feePaid: 1399,
    feeStatus: 'Paid',
    certStatus: 'Under Review',
    lorStatus: 'Pending Review',
    lastLogin: 'Yesterday',
    enrolledCourses: [
      { id: 'prog-aws', title: 'Cloud Architecture & AWS Zero-Trust', category: 'Internship', progress: 58, status: 'Active' }
    ]
  }
];

export default function AdminStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProgramToGrant, setSelectedProgramToGrant] = useState(availableProgramsToAssign[0].id);

  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    domain: '',
    category: 'Internship',
    batch: 'Morning Cohort (Mon - Fri)',
    mentor: 'Senior Lead Mentor',
    feePaid: 1399
  });

  // Filtered Students List
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.domain.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategoryTab === 'ALL') return true;
    if (activeCategoryTab === 'Issued') return s.certStatus === 'Issued';
    return s.category.toUpperCase() === activeCategoryTab.toUpperCase();
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'Student ID,Full Name,Email,Phone,City,Domain Track,Category,Progress (%),Attendance (%),Fee (INR),Cert Status,LOR Status,Total Courses\n';
    const rows = students
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.phone}","${s.city}","${s.domain}","${s.category}",${s.progress},${s.attendance},${s.feePaid},"${s.certStatus}","${s.lorStatus}",${s.enrolledCourses?.length || 1}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `QorZen_Enrolled_Students_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Student Handler
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.email) return;

    const initialProg = {
      id: `prog-${Date.now()}`,
      title: newStudentForm.domain || 'MERN Stack Engineering',
      category: newStudentForm.category,
      progress: 0,
      status: 'Active'
    };

    const createdStudent = {
      id: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
      name: newStudentForm.name,
      email: newStudentForm.email,
      phone: newStudentForm.phone || '+91 90000 00000',
      city: newStudentForm.city || 'Pan India',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      domain: newStudentForm.domain || 'MERN Stack Engineering',
      category: newStudentForm.category,
      batch: newStudentForm.batch,
      mentor: newStudentForm.mentor,
      enrollDate: 'Just Now',
      progress: 10,
      attendance: 100,
      assignmentsSubmitted: '0 / 8',
      projectStatus: 'Sprint 1 Initialized',
      feePaid: Number(newStudentForm.feePaid),
      feeStatus: 'Paid',
      certStatus: 'In Progress',
      lorStatus: 'Eligible upon Completion',
      lastLogin: 'Active now',
      enrolledCourses: [initialProg]
    };

    setStudents([createdStudent, ...students]);
    setAddModalOpen(false);
    setNewStudentForm({
      name: '',
      email: '',
      phone: '',
      city: '',
      domain: '',
      category: 'Internship',
      batch: 'Morning Cohort (Mon - Fri)',
      mentor: 'Senior Lead Mentor',
      feePaid: 1399
    });
  };

  // Grant / Assign Course to Student (Any number of courses)
  const handleGrantCourse = (stuId) => {
    const progToAdd = availableProgramsToAssign.find((p) => p.id === selectedProgramToGrant);
    if (!progToAdd) return;

    const updated = students.map((s) => {
      if (s.id === stuId) {
        const existing = s.enrolledCourses || [];
        const alreadyHas = existing.some((c) => c.title.toLowerCase() === progToAdd.title.toLowerCase());
        if (alreadyHas) {
          alert(`Student already has access to "${progToAdd.title}".`);
          return s;
        }
        const newCourses = [
          ...existing,
          {
            id: progToAdd.id,
            title: progToAdd.title,
            category: progToAdd.category,
            progress: 0,
            status: 'Active'
          }
        ];
        return { ...s, enrolledCourses: newCourses };
      }
      return s;
    });

    setStudents(updated);
    if (selectedStudent && selectedStudent.id === stuId) {
      const updatedStudent = updated.find((s) => s.id === stuId);
      setSelectedStudent(updatedStudent);
    }
    alert(`Access to "${progToAdd.title}" successfully granted to student!`);
  };

  // Revoke Course Access
  const handleRevokeCourse = (stuId, courseId) => {
    if (!window.confirm('Are you sure you want to revoke access to this course for this student?')) return;

    const updated = students.map((s) => {
      if (s.id === stuId) {
        const newCourses = (s.enrolledCourses || []).filter((c) => c.id !== courseId);
        return { ...s, enrolledCourses: newCourses };
      }
      return s;
    });

    setStudents(updated);
    if (selectedStudent && selectedStudent.id === stuId) {
      const updatedStudent = updated.find((s) => s.id === stuId);
      setSelectedStudent(updatedStudent);
    }
  };

  // Certificate Issuance Toggle
  const handleIssueCert = (stuId) => {
    setStudents(
      students.map((s) =>
        s.id === stuId ? { ...s, certStatus: 'Issued', lorStatus: 'Granted' } : s
      )
    );
    if (selectedStudent && selectedStudent.id === stuId) {
      setSelectedStudent({ ...selectedStudent, certStatus: 'Issued', lorStatus: 'Granted' });
    }
    alert(`Verified ISO-Certified Certificate & LOR successfully issued for Student ID: ${stuId}`);
  };

  return (
    <div className="admin-students-page">
      {/* Top Header */}
      <header className="students-page-header">
        <div className="students-title-group">
          <div className="welcome-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '1px solid #d9cfc7', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <Sparkles size={13} color="#8b7050" />
            <span>Master Cohort & Multi-Course Registry</span>
          </div>
          <h1>Manage Students & Course Permissions</h1>
          <p>
            Central database for assigning unlimited courses, tracking academic progress, issuing certificates, and granting credentials.
          </p>
        </div>

        <div className="students-header-actions">
          <button onClick={handleExportCSV} className="btn-export-students" title="Export Directory to CSV">
            <Download size={15} />
            <span>Export Directory</span>
          </button>
          <button onClick={() => setAddModalOpen(true)} className="btn-add-student">
            <Plus size={15} />
            <span>Register Student</span>
          </button>
        </div>
      </header>

      {/* KPI Cards Overview */}
      <section className="students-kpi-grid">
        <div className="student-kpi-card">
          <div className="student-kpi-icon-wrap" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <Users size={22} />
          </div>
          <div className="student-kpi-data">
            <span className="student-kpi-val">445</span>
            <span className="student-kpi-lbl">Total Enrolled Students</span>
          </div>
        </div>

        <div className="student-kpi-card">
          <div className="student-kpi-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <BriefcaseBusiness size={22} />
          </div>
          <div className="student-kpi-data">
            <span className="student-kpi-val">142</span>
            <span className="student-kpi-lbl">Active Internships</span>
          </div>
        </div>

        <div className="student-kpi-card">
          <div className="student-kpi-icon-wrap" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
            <BookOpen size={22} />
          </div>
          <div className="student-kpi-data">
            <span className="student-kpi-val">88</span>
            <span className="student-kpi-lbl">Training Programs</span>
          </div>
        </div>

        <div className="student-kpi-card">
          <div className="student-kpi-icon-wrap" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
            <GraduationCap size={22} />
          </div>
          <div className="student-kpi-data">
            <span className="student-kpi-val">215</span>
            <span className="student-kpi-lbl">Online Courses</span>
          </div>
        </div>

        <div className="student-kpi-card">
          <div className="student-kpi-icon-wrap" style={{ backgroundColor: '#fdf2f8', color: '#db2777' }}>
            <Award size={22} />
          </div>
          <div className="student-kpi-data">
            <span className="student-kpi-val">318</span>
            <span className="student-kpi-lbl">Certificates Issued</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search Row */}
      <section className="students-filter-container">
        {/* Mobile Dropdown Selector */}
        <div className="students-mobile-filter-dropdown">
          <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Filter Student Stream
          </label>
          <select
            value={activeCategoryTab}
            onChange={(e) => setActiveCategoryTab(e.target.value)}
            className="students-mobile-select"
          >
            <option value="ALL">All Students ({students.length})</option>
            <option value="INTERNSHIP">Internships ({students.filter((s) => s.category.toUpperCase() === 'INTERNSHIP').length})</option>
            <option value="TRAINING">Training ({students.filter((s) => s.category.toUpperCase() === 'TRAINING').length})</option>
            <option value="COURSE">Courses ({students.filter((s) => s.category.toUpperCase() === 'COURSE').length})</option>
            <option value="Issued">Certificates Issued ({students.filter((s) => s.certStatus === 'Issued').length})</option>
          </select>
        </div>

        {/* Desktop Domain Tabs */}
        <div className="students-domain-tabs desktop-only-domain-tabs">
          <button
            onClick={() => setActiveCategoryTab('ALL')}
            className={`student-tab-btn ${activeCategoryTab === 'ALL' ? 'active' : ''}`}
          >
            <span>All Students</span>
            <span className="student-tab-badge">{students.length}</span>
          </button>
          <button
            onClick={() => setActiveCategoryTab('INTERNSHIP')}
            className={`student-tab-btn ${activeCategoryTab === 'INTERNSHIP' ? 'active' : ''}`}
          >
            <span>Internships</span>
            <span className="student-tab-badge">
              {students.filter((s) => s.category.toUpperCase() === 'INTERNSHIP').length}
            </span>
          </button>
          <button
            onClick={() => setActiveCategoryTab('TRAINING')}
            className={`student-tab-btn ${activeCategoryTab === 'TRAINING' ? 'active' : ''}`}
          >
            <span>Training</span>
            <span className="student-tab-badge">
              {students.filter((s) => s.category.toUpperCase() === 'TRAINING').length}
            </span>
          </button>
          <button
            onClick={() => setActiveCategoryTab('COURSE')}
            className={`student-tab-btn ${activeCategoryTab === 'COURSE' ? 'active' : ''}`}
          >
            <span>Courses</span>
            <span className="student-tab-badge">
              {students.filter((s) => s.category.toUpperCase() === 'COURSE').length}
            </span>
          </button>
          <button
            onClick={() => setActiveCategoryTab('Issued')}
            className={`student-tab-btn ${activeCategoryTab === 'Issued' ? 'active' : ''}`}
          >
            <span>Certificates Issued</span>
            <span className="student-tab-badge">
              {students.filter((s) => s.certStatus === 'Issued').length}
            </span>
          </button>
        </div>

        <div className="students-search-wrap">
          <input
            type="text"
            placeholder="Search by student name, ID, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="student-search-input"
          />
        </div>
      </section>

      {/* Master Students Directory Table */}
      <section className="students-table-card">
        {/* Mobile View: Native Stacked Student Cards Feed */}
        <div className="mobile-students-cards-feed">
          {filteredStudents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#78716c', fontSize: '0.85rem' }}>
              No students match your filter.
            </div>
          ) : (
            filteredStudents.map((s) => (
              <div key={s.id} className="mobile-student-card">
                <div className="mobile-student-top-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img src={s.avatar} alt={s.name} className="student-table-avatar" style={{ width: '2.5rem', height: '2.5rem' }} />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1c1917', display: 'block' }}>{s.name}</strong>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8b7050' }}>{s.id}</span>
                    </div>
                  </div>
                  <span className={`cert-status-pill ${s.certStatus === 'Issued' ? 'issued' : s.certStatus === 'Eligible' ? 'eligible' : 'review'}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                    {s.certStatus === 'Issued' && <CheckCircle2 size={10} />}
                    {s.certStatus === 'Eligible' && <Sparkles size={10} />}
                    {s.certStatus !== 'Issued' && s.certStatus !== 'Eligible' && <Clock size={10} />}
                    <span>{s.certStatus}</span>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span className={`student-domain-pill ${s.category.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
                    {s.category}
                  </span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#1c1917' }}>
                    {s.domain}
                  </span>
                </div>

                <div className="mobile-student-metrics-row">
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#78716c', display: 'block' }}>Progress</span>
                    <strong style={{ fontSize: '0.82rem', color: '#16a34a' }}>{s.progress}%</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#78716c', display: 'block' }}>Attendance</span>
                    <strong style={{ fontSize: '0.82rem', color: s.attendance >= 90 ? '#16a34a' : '#d97706' }}>{s.attendance}%</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#78716c', display: 'block' }}>Fee</span>
                    <strong style={{ fontSize: '0.82rem', color: '#1c1917' }}>₹{s.feePaid}</strong>
                  </div>
                </div>

                <div className="mobile-student-bottom-row">
                  <span style={{ fontSize: '0.72rem', color: '#78716c' }}>
                    {s.enrolledCourses?.length || 1} Enrolled Program{(s.enrolledCourses?.length || 1) > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setSelectedStudent(s)}
                    className="btn-view-dossier"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                  >
                    <FileText size={12} />
                    <span>Manage / Assign</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Master Table View */}
        <div className="students-table-wrap desktop-only-table">
          <table className="admin-students-table">
            <thead>
              <tr>
                <th>Student & ID</th>
                <th>Domain Stream</th>
                <th>Progress</th>
                <th>Attendance</th>
                <th>Assignments</th>
                <th>Fee Paid</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="student-profile-col">
                      <img src={s.avatar} alt={s.name} className="student-table-avatar" />
                      <div className="student-name-meta">
                        <span className="student-table-name">{s.name}</span>
                        <span className="student-table-id">{s.id}</span>
                        <span style={{ fontSize: '0.68rem', color: '#78716c' }}>{s.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span className={`student-domain-pill ${s.category.toLowerCase()}`}>
                          {s.category}
                        </span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8b7050', backgroundColor: '#efe9e3', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                          {s.enrolledCourses?.length || 1} Course{(s.enrolledCourses?.length || 1) > 1 ? 's' : ''}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1c1917' }}>
                        {s.domain}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="progress-mini-wrap">
                      <div className="progress-mini-bar">
                        <div className="progress-mini-fill" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="progress-mini-text">{s.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.82rem', color: s.attendance >= 90 ? '#16a34a' : '#d97706' }}>
                      {s.attendance}%
                    </strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917' }}>
                      {s.assignmentsSubmitted}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.85rem', color: '#1c1917' }}>₹{s.feePaid}</strong>
                    <span style={{ display: 'block', fontSize: '0.68rem', color: '#16a34a', fontWeight: 700 }}>
                      Paid
                    </span>
                  </td>
                  <td>
                    <span className={`cert-status-pill ${s.certStatus === 'Issued' ? 'issued' : s.certStatus === 'Eligible' ? 'eligible' : 'review'}`}>
                      {s.certStatus === 'Issued' && <CheckCircle2 size={11} />}
                      {s.certStatus === 'Eligible' && <Sparkles size={11} />}
                      {s.certStatus !== 'Issued' && s.certStatus !== 'Eligible' && <Clock size={11} />}
                      <span>{s.certStatus}</span>
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="btn-view-dossier"
                      title="Manage Student & Assign Courses"
                    >
                      <FileText size={12} />
                      <span>Manage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Complete Student Dossier & Multi-Course Access Manager Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dossier-modal-backdrop"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              className="dossier-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dossier-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', border: '2px solid #8b7050' }}
                  />
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
                      {selectedStudent.name}
                    </h2>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8b7050' }}>
                      Student ID: {selectedStudent.id} • {selectedStudent.enrolledCourses?.length || 1} Enrolled Programs
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Admin Multi-Course Permission Section */}
              <div style={{ padding: '1.15rem', backgroundColor: '#faf8f5', border: '1px solid var(--border-medium)', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <ShieldCheck size={18} color="#8b7050" />
                    <strong style={{ fontSize: '0.92rem', color: '#1c1917' }}>
                      Admin Course Granting & Multi-Enrollment Authority
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#166534', backgroundColor: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '999px' }}>
                    Unlimited Courses Permitted
                  </span>
                </div>

                {/* Currently Assigned Courses List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>
                    Currently Active Programs ({selectedStudent.enrolledCourses?.length || 1}):
                  </span>
                  {(selectedStudent.enrolledCourses || [
                    { id: 'prog-default', title: selectedStudent.domain, category: selectedStudent.category, progress: selectedStudent.progress }
                  ]).map((prog, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        padding: '0.65rem 0.85rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid #efe9e3',
                        borderRadius: '0.5rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <span className={`student-domain-pill ${prog.category.toLowerCase()}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {prog.category}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a', whiteSpace: 'nowrap' }}>
                            {prog.progress || 0}% Done
                          </span>
                          {(selectedStudent.enrolledCourses?.length || 1) > 1 && (
                            <button
                              onClick={() => handleRevokeCourse(selectedStudent.id, prog.id)}
                              style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0.2rem', display: 'flex', alignItems: 'center' }}
                              title="Revoke course access"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>

                      <strong style={{ fontSize: '0.82rem', color: '#1c1917', lineHeight: 1.35, wordBreak: 'break-word', display: 'block' }}>
                        {prog.title}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Assign Another Course Tool */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.65rem', borderTop: '1px dashed #e7ded7', flexWrap: 'wrap' }}>
                  <select
                    value={selectedProgramToGrant}
                    onChange={(e) => setSelectedProgramToGrant(e.target.value)}
                    style={{ flex: 1, minWidth: '220px', padding: '0.55rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', fontSize: '0.82rem', backgroundColor: '#ffffff' }}
                  >
                    {availableProgramsToAssign.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.category}] {p.title}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleGrantCourse(selectedStudent.id)}
                    className="btn-add-student"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} />
                    <span>Grant Course Access</span>
                  </button>
                </div>
              </div>

              {/* Comprehensive Student Info Grid */}
              <div className="dossier-info-grid">
                <div className="dossier-info-box">
                  <span className="dossier-lbl">Email Address</span>
                  <span className="dossier-val">{selectedStudent.email}</span>
                </div>
                <div className="dossier-info-box">
                  <span className="dossier-lbl">Phone Number</span>
                  <span className="dossier-val">{selectedStudent.phone}</span>
                </div>
                <div className="dossier-info-box">
                  <span className="dossier-lbl">City & State</span>
                  <span className="dossier-val">{selectedStudent.city}</span>
                </div>
                <div className="dossier-info-box">
                  <span className="dossier-lbl">Enrollment Date</span>
                  <span className="dossier-val">{selectedStudent.enrollDate}</span>
                </div>
                <div className="dossier-info-box">
                  <span className="dossier-lbl">Assigned Mentor</span>
                  <span className="dossier-val">{selectedStudent.mentor}</span>
                </div>
                <div className="dossier-info-box">
                  <span className="dossier-lbl">Batch Schedule</span>
                  <span className="dossier-val">{selectedStudent.batch}</span>
                </div>
                <div className="dossier-info-box">
                  <span className="dossier-lbl">Academic Progress</span>
                  <span className="dossier-val" style={{ color: '#16a34a' }}>{selectedStudent.progress}% (Attendance: {selectedStudent.attendance}%)</span>
                </div>
                <div className="dossier-info-box">
                  <span className="dossier-lbl">Project Status</span>
                  <span className="dossier-val">{selectedStudent.projectStatus}</span>
                </div>
              </div>

              {/* Admin Actions Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #efe9e3' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', display: 'block' }}>
                    Certification: {selectedStudent.certStatus} | LOR: {selectedStudent.lorStatus}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {selectedStudent.certStatus !== 'Issued' ? (
                    <button
                      onClick={() => handleIssueCert(selectedStudent.id)}
                      className="btn-add-student"
                      style={{ backgroundColor: '#16a34a' }}
                    >
                      <Award size={14} />
                      <span>Issue Official Certificate & LOR</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`Downloading Verified ISO Certificate for ${selectedStudent.name} (${selectedStudent.id})`)}
                      className="btn-export-students"
                    >
                      <Download size={14} />
                      <span>Download Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register New Student Modal */}
      <AnimatePresence>
        {addModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dossier-modal-backdrop"
            onClick={() => setAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              className="dossier-modal-card"
              style={{ maxWidth: '520px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
                  Register New Student
                </h3>
                <button
                  onClick={() => setAddModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={newStudentForm.name}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={newStudentForm.email}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={newStudentForm.phone}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi NCR"
                      value={newStudentForm.city}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, city: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Initial Program Track *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MERN Stack Developer"
                      value={newStudentForm.domain}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, domain: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Stream Category
                    </label>
                    <select
                      value={newStudentForm.category}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, category: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
                    >
                      <option value="Internship">Internship</option>
                      <option value="Training">Training</option>
                      <option value="Course">Online Course</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Batch Timing
                    </label>
                    <input
                      type="text"
                      value={newStudentForm.batch}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, batch: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                      Fee Received (₹)
                    </label>
                    <input
                      type="number"
                      value={newStudentForm.feePaid}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, feePaid: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.45rem', border: '1px solid #d9cfc7', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="btn-export-students"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-add-student"
                  >
                    Register & Activate Portal
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
