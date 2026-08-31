import React, { useState, useEffect, useMemo } from "react";
import { Loader2, Download, Search, Users, Briefcase, Layers, GraduationCap, Award } from "lucide-react";
import { getManageStudentsDirectory } from "../../../api/adminApi";

const TABS = [
  { key: "all", label: "All Students" },
  { key: "internship", label: "Internships" },
  { key: "training", label: "Training" },
  { key: "course", label: "Courses" },
  { key: "certificates", label: "Certificates Issued" },
];

const CERT_LABEL = {
  issued: { text: "Issued", bg: "#dcfce7", color: "#166534" },
  eligible: { text: "Eligible", bg: "#dbeafe", color: "#1e40af" },
  in_progress: { text: "In Progress", bg: "#f5f0ea", color: "#78716c" },
};

// Turns an array of flat rows into a downloadable CSV file client-side —
// no backend export route or CSV library needed for a dataset this size.
function downloadCsv(rows, filename) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const escape = (val) => {
    const str = val === null || val === undefined ? "" : String(val);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function AdminManageStudents() {
  const [directory, setDirectory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDirectory();
  }, []);

  const fetchDirectory = async () => {
    try {
      setLoading(true);
      const res = await getManageStudentsDirectory();
      setDirectory(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load student directory", err);
      setDirectory([]);
    } finally {
      setLoading(false);
    }
  };

  // Flatten to one row per (student, program) — this is what the table,
  // filters, and CSV export all work off of.
  const flatRows = useMemo(() => {
    const rows = [];
    for (const student of directory) {
      for (const program of student.programs) {
        rows.push({
          studentId: student.studentId,
          userId: student.userId,
          name: student.name,
          email: student.email,
          feePaid: student.feePaid,
          type: program.type,
          title: program.title,
          category: program.category,
          progress: program.progress,
          attendancePercent: program.attendancePercent,
          assignmentsCompleted: program.assignmentsCompleted,
          assignmentsTotal: program.assignmentsTotal,
          certificateStatus: program.certificateStatus,
        });
      }
    }
    return rows;
  }, [directory]);

  const tabCounts = useMemo(() => {
    return {
      all: flatRows.length,
      internship: flatRows.filter((r) => r.type === "internship").length,
      training: flatRows.filter((r) => r.type === "training").length,
      course: flatRows.filter((r) => r.type === "course").length,
      certificates: flatRows.filter((r) => r.certificateStatus === "issued").length,
    };
  }, [flatRows]);

  const rowsForActiveTab = useMemo(() => {
    if (activeTab === "all") return flatRows;
    if (activeTab === "certificates") return flatRows.filter((r) => r.certificateStatus === "issued");
    return flatRows.filter((r) => r.type === activeTab);
  }, [flatRows, activeTab]);

  const availableCategories = useMemo(() => {
    const set = new Set(rowsForActiveTab.map((r) => r.category).filter(Boolean));
    return Array.from(set).sort();
  }, [rowsForActiveTab]);

  const filteredRows = useMemo(() => {
    let rows = rowsForActiveTab;
    if (activeCategory) {
      rows = rows.filter((r) => r.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [rowsForActiveTab, activeCategory, search]);

  const totalStudents = directory.length;
  const totalCertificatesIssued = directory.reduce((sum, s) => sum + s.certificatesIssued, 0);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setActiveCategory(null); // reset sub-filter when switching tabs
  };

  const handleExport = () => {
    downloadCsv(
      filteredRows.map((r) => ({
        Name: r.name,
        Email: r.email,
        ProgramType: r.type,
        ProgramTitle: r.title,
        Category: r.category || "",
        ProgressPercent: r.progress,
        AttendancePercent: r.attendancePercent ?? "",
        AssignmentsCompleted: r.assignmentsCompleted ?? "",
        AssignmentsTotal: r.assignmentsTotal ?? "",
        CertificateStatus: r.certificateStatus || "",
        TotalFeePaid: r.feePaid,
      })),
      `qorzen-student-directory-${activeTab}.csv`
    );
  };

  return (
    <div className="admin-crud-container">
      <div className="global-section-header" style={{ marginBottom: "2rem" }}>
        <h1 className="section-title" style={{ fontSize: "2.25rem", fontWeight: 800, margin: "0.5rem 0" }}>
          Manage Students &amp; Program Permissions
        </h1>
        <p className="section-desc" style={{ color: "var(--text-secondary)" }}>
          Every enrolled student across Courses, Training, and Internships — progress, attendance, assignments, fees, and certificate status.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
        <button
          onClick={handleExport}
          disabled={filteredRows.length === 0}
          className="btn-purple-gradient"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
        >
          <Download size={15} />
          <span>Export Directory ({filteredRows.length})</span>
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { icon: Users, label: "Total Enrolled Students", value: totalStudents, color: "#166534" },
          { icon: Briefcase, label: "Internship Enrollments", value: tabCounts.internship, color: "#1e40af" },
          { icon: Layers, label: "Training Enrollments", value: tabCounts.training, color: "#7c3aed" },
          { icon: GraduationCap, label: "Course Enrollments", value: tabCounts.course, color: "#b45309" },
          { icon: Award, label: "Certificates Issued", value: totalCertificatesIssued, color: "#be185d" },
        ].map((stat) => (
          <div key={stat.label} style={{ border: "1px solid var(--border-medium, #e5ded6)", borderRadius: "0.85rem", padding: "1rem" }}>
            <stat.icon size={18} color={stat.color} />
            <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "0.4rem" }}>{stat.value}</div>
            <div style={{ fontSize: "0.78rem", color: "#78716c" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              padding: "0.4rem 0.85rem",
              borderRadius: "0.6rem",
              border: "1px solid var(--border-medium, #e5ded6)",
              backgroundColor: activeTab === tab.key ? "#1c1917" : "#fff",
              color: activeTab === tab.key ? "#fff" : "#1c1917",
              cursor: "pointer",
            }}
          >
            {tab.label} ({tabCounts[tab.key]})
          </button>
        ))}
      </div>

      {/* Sub-category chips (only meaningful for internship/training/course tabs) */}
      {availableCategories.length > 0 && activeTab !== "all" && activeTab !== "certificates" && (
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              border: "1px solid var(--border-medium, #e5ded6)",
              backgroundColor: !activeCategory ? "#f5f0ea" : "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            All categories
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontSize: "0.75rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "999px",
                border: "1px solid var(--border-medium, #e5ded6)",
                backgroundColor: activeCategory === cat ? "#f5f0ea" : "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "1.25rem", maxWidth: "24rem" }}>
        <Search size={15} style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: "#a8a29e" }} />
        <input
          type="text"
          placeholder="Search by student name, email, or program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "0.55rem 0.75rem 0.55rem 2.1rem", border: "1px solid var(--border-medium, #e5ded6)", borderRadius: "0.6rem" }}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading-spinner-box">
          <Loader2 size={26} color="#c9b59c" className="animate-spin" />
        </div>
      ) : filteredRows.length === 0 ? (
        <div className="admin-empty-card">
          <p>No matching records found.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto", border: "1px solid var(--border-medium, #e5ded6)", borderRadius: "0.85rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#faf7f3", textAlign: "left" }}>
                {["Student", "Program", "Progress", "Attendance", "Assignments", "Fee Paid", "Certificate"].map((h) => (
                  <th key={h} style={{ padding: "0.65rem 0.85rem", fontWeight: 800, whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r, i) => {
                const cert = r.certificateStatus ? CERT_LABEL[r.certificateStatus] : null;
                return (
                  <tr key={`${r.studentId}-${r.type}-${r.title}-${i}`} style={{ borderTop: "1px solid #f0e9e1" }}>
                    <td style={{ padding: "0.65rem 0.85rem" }}>
                      <div style={{ fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#78716c" }}>{r.email}</div>
                    </td>
                    <td style={{ padding: "0.65rem 0.85rem" }}>
                      <div>{r.title}</div>
                      <div style={{ fontSize: "0.72rem", color: "#78716c", textTransform: "capitalize" }}>
                        {r.type}
                        {r.category ? ` · ${r.category}` : ""}
                      </div>
                    </td>
                    <td style={{ padding: "0.65rem 0.85rem" }}>{r.progress}%</td>
                    <td style={{ padding: "0.65rem 0.85rem" }}>
                      {r.attendancePercent === null ? "N/A" : `${r.attendancePercent}%`}
                    </td>
                    <td style={{ padding: "0.65rem 0.85rem" }}>
                      {r.assignmentsTotal === null ? "N/A" : `${r.assignmentsCompleted}/${r.assignmentsTotal}`}
                    </td>
                    <td style={{ padding: "0.65rem 0.85rem" }}>₹{r.feePaid}</td>
                    <td style={{ padding: "0.65rem 0.85rem" }}>
                      {cert ? (
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.55rem",
                            borderRadius: "999px",
                            backgroundColor: cert.bg,
                            color: cert.color,
                          }}
                        >
                          {cert.text}
                        </span>
                      ) : (
                        <span style={{ color: "#a8a29e" }}>N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
