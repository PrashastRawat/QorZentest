import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Sparkles,
  BookOpen,
  Terminal,
  Lock,
  Cpu,
  ShieldCheck,
  Activity,
  Server,
  Radio,
  Award,
  Cloud,
  Globe,
  Code2,
  Workflow,
  BarChart3,
  Database,
  Layout,
  Palette,
  Video,
  Image,
  Compass,
  Megaphone,
  Share2,
  TrendingUp,
  Coins,
  Presentation,
  Smartphone,
  Code,
  Layers,
  FileSpreadsheet,
  Briefcase,
  DollarSign,
  FileText,
  Target,
  Users,
  BarChart,
  Building,
  GraduationCap,
  ShoppingBag,
  Mail,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { getPublicCourses } from "../../api/courseCatalogApi";
import { useEnquiryModal } from "../../context/EnquiryModalContext";
import "./CourseCategoryBrowser.css";
import { useSearchParams } from "react-router-dom";

// Maps the iconName string stored on each Course document back to the
// real lucide-react component. Same pattern as the Internship model's
// iconName field. Falls back to a generic BookOpen icon if a name
// doesn't match (e.g. an admin picks something not in this list later).
const ICON_MAP = {
  Terminal,
  Lock,
  Cpu,
  ShieldCheck,
  Activity,
  Server,
  Radio,
  Award,
  Cloud,
  Globe,
  Code2,
  Workflow,
  BarChart3,
  Database,
  Layout,
  Palette,
  Video,
  Image,
  Compass,
  Megaphone,
  Share2,
  TrendingUp,
  Coins,
  Presentation,
  Smartphone,
  Code,
  Layers,
  FileSpreadsheet,
  Briefcase,
  DollarSign,
  FileText,
  Target,
  Users,
  BarChart,
  Building,
  GraduationCap,
  ShoppingBag,
  Mail,
};

const getIconComponent = (name) => ICON_MAP[name] || BookOpen;

/**
 * Reusable category-tabbed course browser.
 *
 * Props:
 * - pageTitle: heading shown at the top
 * - pageSubtitle: description under the heading
 * - badgeText: small pill text above the heading
 * - allowedCategories: optional array of category strings to restrict this
 *   page to (e.g. the 5 Training categories). If omitted, every category
 *   present in the real data is shown automatically — including any new
 *   category an admin creates later.
 */
const CourseCategoryBrowser = ({
  pageTitle = "Courses",
  pageSubtitle = "Browse our real, up-to-date course catalog.",
  badgeText = "QorZen Programs",
  allowedCategories = null,
  fetchFn = getPublicCourses,
  itemType = "course",
}) => {
  const { openModal, openDetailsModal } = useEnquiryModal();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all",
  );

  // Keeps the active tab in sync if the person clicks a different dropdown
  // link while already on this page (path stays the same, only the query changes)
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setActiveCategory(catParam);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchFn();
        const data = res.data?.data || [];
        if (isMounted) setAllCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[CourseCategoryBrowser] Failed to load courses:", err);
        if (isMounted)
          setError(
            "Could not load courses right now. Please try again shortly.",
          );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  // Courses this page is scoped to (before category-tab filtering)
  const scopedCourses = useMemo(() => {
    if (!allowedCategories) return allCourses;
    return allCourses.filter((c) => allowedCategories.includes(c.category));
  }, [allCourses, allowedCategories]);

  // Category tabs: either the fixed allowed list (in that order), or every
  // unique category actually present in the data, alphabetically.
  const categoryTabs = useMemo(() => {
    if (allowedCategories) return allowedCategories;
    const unique = [
      ...new Set(allCourses.map((c) => c.category).filter(Boolean)),
    ];
    return unique.sort();
  }, [allCourses, allowedCategories]);

  const filteredCourses = useMemo(() => {
    return scopedCourses.filter((course) => {
      const matchesCategory =
        activeCategory === "all" || course.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        course.title?.toLowerCase().includes(q) ||
        course.tag?.toLowerCase().includes(q) ||
        (course.tools || []).some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [scopedCourses, activeCategory, searchQuery]);

  return (
    <div className="ccb-page">
      <section className="ccb-hero">
        <div className="ccb-container">
          <div className="ccb-badge-pill">
            <Sparkles size={14} />
            <span>{badgeText}</span>
          </div>
          <h1 className="ccb-title">{pageTitle}</h1>
          <p className="ccb-subtitle">{pageSubtitle}</p>
        </div>
      </section>

      <section className="ccb-toolbar-section">
        <div className="ccb-container">
          <div className="ccb-search-box">
            <Search size={18} className="ccb-search-icon" />
            <input
              type="text"
              placeholder="Search by title, tag, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ccb-search-input"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                className="ccb-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="ccb-category-tabs">
            <button
              className={`ccb-tab-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {categoryTabs.map((cat) => (
              <button
                key={cat}
                className={`ccb-tab-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ccb-grid-section">
        <div className="ccb-container">
          {loading ? (
            <div className="ccb-status-box">Loading courses...</div>
          ) : error ? (
            <div className="ccb-status-box ccb-error">{error}</div>
          ) : filteredCourses.length === 0 ? (
            <div className="ccb-status-box">
              <Search size={32} />
              <h3>No courses matched</h3>
              <p>Try a different search term or category.</p>
              <button
                className="ccb-reset-btn"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="ccb-cards-grid">
              {filteredCourses.map((course, idx) => {
                const IconComponent = getIconComponent(course.iconName);
                return (
                  <motion.div
                    key={course._id}
                    className="ccb-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(idx * 0.03, 0.3),
                    }}
                  >
                    <div className="ccb-card-icon-wrap">
                      <IconComponent size={22} />
                    </div>
                    <div className="ccb-card-meta">
                      <span className="ccb-card-category">
                        {course.category}
                      </span>
                      {course.tag && (
                        <span className="ccb-card-tag">{course.tag}</span>
                      )}
                    </div>
                    <h3 className="ccb-card-title">{course.title}</h3>
                    <p className="ccb-card-desc">{course.description}</p>
                    {course.tools?.length > 0 && (
                      <div className="ccb-card-tools">
                        {course.tools.slice(0, 4).map((tool) => (
                          <span key={tool} className="ccb-tool-chip">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="ccb-card-footer">
                      <span className="ccb-card-price">₹{course.price}</span>
                      <span className="ccb-card-duration">
                        {course.duration}
                      </span>
                    </div>
                    <div className="ccb-card-actions">
                      <button
                        className="ccb-btn-details"
                        onClick={() => openDetailsModal({ ...course, itemType })}
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                      <button
                        className="ccb-btn-enroll"
                        onClick={() => openModal({ ...course, itemType })}
                      >
                        <span>Enroll Now</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseCategoryBrowser;
