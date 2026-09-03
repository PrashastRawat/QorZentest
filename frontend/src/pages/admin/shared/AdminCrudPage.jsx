import React, { useState, useEffect, useMemo } from "react";
import { Plus, Trash2, Loader2, Sparkles, X } from "lucide-react";
import {
  getServices,
  createService,
  deleteService,
  getProjects,
  createProject,
  deleteProject,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getBlogs,
  createBlog,
  deleteBlog,
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
  getJobs,
  createJob,
  deleteJob,
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
  getSubmissions,
  deleteSubmission,
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
} from "../../../api/adminApi";
import api from "../../../api/axiosInstance";
import AdminAssignmentsModal from "./AdminAssignmentsModal";
import AdminLiveClassesModal from "./AdminLiveClassesModal";
import AdminInternshipApplicationsModal from "./AdminInternshipApplicationsModal";
import "./AdminCrudPage.css";

/**
 * Reusable CRUD Page Component for Admin Management Sections
 * Dynamically resolves API handlers from /api/adminApi.js
 * Renders high-quality themed cards matching reference layout images and student portal styling.
 */
export default function AdminCrudPage({
  title = "Management Section",
  description = "Add, view, and manage company records.",
  apiEndpoint = "/services",
  fields,
  formFields,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [assignmentsModalCourse, setAssignmentsModalCourse] = useState(null);
  const [liveClassModalItem, setLiveClassModalItem] = useState(null);
  const [applicationsModalInternship, setApplicationsModalInternship] = useState(null);

  // Course-specific state: real File object + real lessons array
  // (kept separate from formData because formData only ever holds plain strings)
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [courseLessons, setCourseLessons] = useState([]);
  const [blogImages, setBlogImages] = useState([]);

  // Responsive Form visibility: collapsed on mobile by default, open on desktop
  const [showForm, setShowForm] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowForm(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically resolve API Actions from adminApi folder helpers
  const apiHelpers = useMemo(() => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("service")) {
      return { get: getServices, create: createService, delete: deleteService };
    }
    if (lowerTitle.includes("portfolio") || lowerTitle.includes("project")) {
      return { get: getProjects, create: createProject, delete: deleteProject };
    }
    if (lowerTitle.includes("course")) {
      return {
        get: getCourses,
        create: createCourse,
        update: updateCourse,
        delete: deleteCourse,
      };
    }
    if (lowerTitle.includes("blog") || lowerTitle.includes("article")) {
      return { get: getBlogs, create: createBlog, delete: deleteBlog };
    }
    if (lowerTitle.includes("testimonial")) {
      return {
        get: getTestimonials,
        create: createTestimonial,
        delete: deleteTestimonial,
      };
    }
    if (
      lowerTitle.includes("career") ||
      lowerTitle.includes("role") ||
      lowerTitle.includes("job")
    ) {
      return { get: getJobs, create: createJob, delete: deleteJob };
    }
    if (lowerTitle.includes("internship")) {
      return {
        get: getInternships,
        create: createInternship,
        update: updateInternship,
        delete: deleteInternship,
      };
    }
    if (
      lowerTitle.includes("submission") ||
      lowerTitle.includes("enquiry") ||
      lowerTitle.includes("form")
    ) {
      return { get: getSubmissions, create: null, delete: deleteSubmission };
    }
    if (lowerTitle.includes("training")) {
      return {
        get: getTrainings,
        create: createTraining,
        update: updateTraining,
        delete: deleteTraining,
      };
    }
    // Fallback if not matching explicitly
    return {
      get: () => api.get(apiEndpoint),
      create: (data) => api.post(apiEndpoint, data),
      delete: (id) => api.delete(`${apiEndpoint}/${id}`),
    };
  }, [apiEndpoint, title]);

  useEffect(() => {
    fetchItems();
  }, [apiHelpers]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await apiHelpers.get();
      const data = res.data?.data || res.data || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn(
        `[AdminCrudPage] GET failed for ${title}, fallback to empty list:`,
        err.message,
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Stores the actual selected File for the course thumbnail (instead of just console.logging it)
  const handleThumbnailChange = (e) => {
    setCourseThumbnail(e.target.files[0] || null);
  };

  const handleBlogImagesChange = (e) => {
    setBlogImages(Array.from(e.target.files || []));
  };

  // Reads the three temp lesson fields out of formData, pushes a real lesson object
  // into courseLessons, then clears just those three fields
  const handleAddLesson = () => {
    const { lessonTitle, lessonVideoUrl, lessonDuration } = formData;
    if (!lessonTitle || !lessonVideoUrl || !lessonDuration) {
      alert("Fill in lesson title, video URL, and duration before adding.");
      return;
    }
    setCourseLessons((prev) => [
      ...prev,
      {
        title: lessonTitle,
        videoUrl: lessonVideoUrl,
        duration: lessonDuration,
      },
    ]);
    setFormData((prev) => ({
      ...prev,
      lessonTitle: "",
      lessonVideoUrl: "",
      lessonDuration: "",
    }));
  };

  const handleRemoveLesson = (index) => {
    setCourseLessons((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiHelpers.create) return;
    setSubmitting(true);
    try {
      const lowerTitleNow = title.toLowerCase();

      if (lowerTitleNow.includes("course")) {
        if (editingItem) {
          await apiHelpers.update(editingItem._id || editingItem.id, {
            title: formData.title || "",
            description: formData.description || "",
            price: formData.price || "",
            instructor: formData.instructor || "",
            category: formData.category || "",
            duration: formData.duration || "",
            isTrending: Boolean(formData.isTrending),
          });
        } else {
          // Courses need a real multipart/form-data submission (file + array),
          // so build FormData instead of sending formData straight as JSON.
          // axiosInstance.js already auto-detects FormData and skips JSON.stringify.
          const fd = new FormData();
          fd.append("title", formData.title || "");
          fd.append("description", formData.description || "");
          fd.append("price", formData.price || "");
          fd.append("instructor", formData.instructor || "");
          fd.append("category", formData.category || "");
          fd.append("duration", formData.duration || "");
          fd.append("lessons", JSON.stringify(courseLessons));
          fd.append("isTrending", String(Boolean(formData.isTrending)));
          if (courseThumbnail) {
            fd.append("thumbnail", courseThumbnail);
          }
          await apiHelpers.create(fd);
        }
        setCourseThumbnail(null);
        setCourseLessons([]);
      } else if (
        lowerTitleNow.includes("blog") ||
        lowerTitleNow.includes("article")
      ) {
        if (blogImages.length === 0) {
          alert("At least one image is required for a blog post.");
          setSubmitting(false);
          return;
        }
        const fd = new FormData();
        fd.append("title", formData.title || "");
        fd.append("content", formData.description || "");
        fd.append("category", formData.category || "");
        fd.append("tags", formData.tags || "");
        blogImages.forEach((file) => fd.append("images", file));
        await apiHelpers.create(fd);
        setBlogImages([]);
      } else if (lowerTitleNow.includes("training")) {
        const parsedTools = formData.tools
          ? formData.tools
              .split(",")
              .map((tool) => tool.trim())
              .filter(Boolean)
          : [];
        const trainingPayload = {
          title: formData.title || "",
          category: formData.category || "",
          tag: formData.tag || "",
          iconName: formData.iconName || "",
          description: formData.description || "",
          tools: parsedTools,
          duration: formData.duration || "",
          price: formData.price || "",
          mode: formData.mode || "Online",
          isTrending: Boolean(formData.isTrending),
        };
        if (editingItem) {
          await apiHelpers.update(editingItem._id || editingItem.id, trainingPayload);
        } else {
          await apiHelpers.create(trainingPayload);
        }
      } else if (
        lowerTitleNow.includes("career") ||
        lowerTitleNow.includes("role") ||
        lowerTitleNow.includes("job")
      ) {
        // Career is a plain job-posting record — no special parsing needed,
        // formData maps straight onto the Career schema.
        await apiHelpers.create({
          title: formData.title || "",
          department: formData.department || "",
          location: formData.location || "",
          type: formData.type || "Full-time",
          description: formData.description || "",
          requirements: formData.requirements || "",
        });
      } else if (lowerTitleNow.includes("internship")) {
        // Internship is backed by its own model — tiered pricing, tools[],
        // category enum. Not the same shape as a Career/Job posting.
        const parsedTools = formData.tools
          ? formData.tools
              .split(",")
              .map((tool) => tool.trim())
              .filter(Boolean)
          : [];
        const payload = {
          title: formData.title || "",
          category: formData.category || "Technical",
          tag: formData.tag || "",
          iconName: formData.iconName || "",
          description: formData.description || "",
          tools: parsedTools,
          mode: formData.mode || "Online",
          price1Month: Number(formData.price1Month) || 0,
          price3Month: Number(formData.price3Month) || 0,
          price6Month: Number(formData.price6Month) || 0,
        };
        if (editingItem) {
          await apiHelpers.update(editingItem._id || editingItem.id, payload);
        } else {
          await apiHelpers.create(payload);
        }
      } else {
        await apiHelpers.create(formData);
      }

      setFormData({});
      setEditingItem(null);
      if (window.innerWidth < 768) {
        setShowForm(false);
      }
      fetchItems();
    } catch (err) {
      alert(
        `Error saving record: ${err.response?.data?.message || err.message}`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await apiHelpers.delete(id);
      fetchItems();
    } catch (err) {
      alert(
        `Error deleting record: ${err.response?.data?.message || err.message}`,
      );
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const lowerTitleNow = title.toLowerCase();
    if (lowerTitleNow.includes("internship")) {
      setFormData({
        title: item.title || "",
        category: item.category || "Technical",
        tag: item.tag || "",
        iconName: item.iconName || "",
        description: item.description || "",
        tools: Array.isArray(item.tools) ? item.tools.join(", ") : item.tools || "",
        mode: item.mode || "Online",
        price1Month: item.price1Month ?? "",
        price3Month: item.price3Month ?? "",
        price6Month: item.price6Month ?? "",
      });
    } else if (lowerTitleNow.includes("training")) {
      setFormData({
        title: item.title || "",
        category: item.category || "",
        tag: item.tag || "",
        iconName: item.iconName || "",
        description: item.description || "",
        tools: Array.isArray(item.tools) ? item.tools.join(", ") : item.tools || "",
        duration: item.duration || "",
        price: item.price ?? "",
        mode: item.mode || "Online",
        isTrending: Boolean(item.isTrending),
      });
    } else {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        price: item.price ?? "",
        instructor: item.instructor || "",
        category: item.category || "",
        duration: item.duration || "",
        isTrending: Boolean(item.isTrending),
      });
    }
    setCourseThumbnail(null);
    setCourseLessons(item.lessons || []);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Convert fields array to formFields structure
  const finalFields = useMemo(() => {
    if (formFields) return formFields;
    if (fields) {
      return fields.map((f) => {
        let label =
          f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, " $1");
        let type = "text";
        if (
          f.toLowerCase().includes("description") ||
          f.toLowerCase().includes("text") ||
          f.toLowerCase().includes("message")
        ) {
          type = "textarea";
        }
        return { name: f, label, type };
      });
    }
    return [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ];
  }, [fields, formFields]);

  // Renders standard header rows with a Close (X) cross button on the right
  const renderFormHeader = (headingText) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h3 className="admin-form-heading" style={{ margin: 0 }}>
          {headingText}
        </h3>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            padding: "0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="form-close-btn"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
      </div>
    );
  };

  // Dynamically render form matching the exact reference screenshots
  const renderForm = () => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("submission")) {
      return null;
    }

    // 1. Careers & Job Listings
    if (
      lowerTitle.includes("career") ||
      lowerTitle.includes("role") ||
      lowerTitle.includes("job")
    ) {
      return (
        <div className="admin-form-container">
          {renderFormHeader("New Job Listing")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Job title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department (e.g. Engineering)"
                value={formData.department || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="location"
                placeholder="Location (e.g. Remote, Dehradun)"
                value={formData.location || ""}
                onChange={handleChange}
                required
              />
              <select
                name="type"
                value={formData.type || "Full-time"}
                onChange={handleChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Job description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="requirements"
                placeholder="Requirements, comma separated (e.g. 2+ years React, Strong CSS)"
                value={formData.requirements || ""}
                onChange={handleChange}
              />
            </div>
            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>Post Job</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 1b. Internship Programs (own model — tiered pricing, tools, category)
    if (lowerTitle.includes("internship")) {
      return (
        <div className="admin-form-container">
          {renderFormHeader(editingItem ? "Edit Internship" : "+ Add New Internship")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Internship title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <select
                name="category"
                value={formData.category || "Technical"}
                onChange={handleChange}
                required
              >
                <option value="Technical">Technical</option>
                <option value="Non-Technical">Non-Technical</option>
                <option value="Networking">Networking</option>
              </select>
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="tag"
                placeholder="Tag (short label, e.g. Popular)"
                value={formData.tag || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="iconName"
                placeholder="Icon name (e.g. Cpu, Shield, Code)"
                value={formData.iconName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <select
                name="mode"
                value={formData.mode || "Online"}
                onChange={handleChange}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="tools"
                placeholder="Tools, comma separated (e.g. Python, Git, Figma)"
                value={formData.tools || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-3col">
              <input
                type="number"
                name="price1Month"
                placeholder="1-Month price (₹)"
                value={formData.price1Month || ""}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price3Month"
                placeholder="3-Month price (₹)"
                value={formData.price3Month || ""}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price6Month"
                placeholder="6-Month price (₹)"
                value={formData.price6Month || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>{editingItem ? "Save Internship" : "Add Internship"}</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 2. Client Testimonials
    if (lowerTitle.includes("testimonial")) {
      return (
        <div className="admin-form-container">
          {renderFormHeader("Add Testimonial")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-single">
              <input
                type="text"
                name="name"
                placeholder="Client name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="text"
                placeholder="Client message / testimonial"
                value={formData.text || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) =>
                    console.log("File chosen:", e.target.files[0])
                  }
                />
              </div>
            </div>
            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>Add Testimonial</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 3. Blog Articles (Reference Image 4)
    if (lowerTitle.includes("blog") || lowerTitle.includes("article")) {
      return (
        <div className="admin-form-container">
          {renderFormHeader("+ New Blog Post")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Blog title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Web Development)"
                value={formData.category || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Write your article here..."
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="tags"
                placeholder="Tags, comma separated (e.g. React, Tutorial)"
                value={formData.tags || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Images (select one or more)
              </p>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleBlogImagesChange}
                  required
                />
              </div>
              {blogImages.length > 0 && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginTop: "0.35rem",
                  }}
                >
                  {blogImages.length} image{blogImages.length > 1 ? "s" : ""}{" "}
                  selected: {blogImages.map((file) => file.name).join(", ")}
                </p>
              )}
            </div>
            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>Publish Post</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 4. Courses & Programs (Reference Image 3)
    // Rebuilt: real thumbnail File in state, real category/duration inputs,
    // real add/remove lessons array, submitted as FormData via handleSubmit above.
    if (lowerTitle.includes("course")) {
      return (
        <div className="admin-form-container">
          {renderFormHeader(editingItem ? "Edit Course" : "+ Add New Course")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Course title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price (₹)"
                value={formData.price || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Web Development)"
                value={formData.category || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. 6 Weeks)"
                value={formData.duration || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="instructor"
                placeholder="Instructor name"
                value={formData.instructor || ""}
                onChange={handleChange}
                required
              />
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  required={!editingItem}
                />
              </div>
            </div>
            {courseThumbnail && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginTop: "-0.5rem",
                  marginBottom: "1rem",
                }}
              >
                Selected: {courseThumbnail.name}
              </p>
            )}

            {/* Lessons Sub-section */}
            <div className="form-lessons-section">
              <h4 className="lessons-heading">Lessons</h4>

              {courseLessons.length > 0 && (
                <ul style={{ marginBottom: "0.75rem", paddingLeft: "1.1rem" }}>
                  {courseLessons.map((lesson, i) => (
                    <li
                      key={i}
                      style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}
                    >
                      {lesson.title} — {lesson.duration}{" "}
                      <button
                        type="button"
                        onClick={() => handleRemoveLesson(i)}
                        style={{
                          marginLeft: "0.5rem",
                          color: "var(--text-muted)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontSize: "0.8rem",
                        }}
                      >
                        remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="form-row-3col">
                <input
                  type="text"
                  name="lessonTitle"
                  placeholder="Lesson title"
                  value={formData.lessonTitle || ""}
                  onChange={handleChange}
                />
                <input
                  type="url"
                  name="lessonVideoUrl"
                  placeholder="Video URL"
                  value={formData.lessonVideoUrl || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lessonDuration"
                  placeholder="Duration"
                  value={formData.lessonDuration || ""}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="admin-link-action"
                onClick={handleAddLesson}
              >
                + Add another lesson
              </button>
            </div>

            <label
              className="form-row-single"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                name="isTrending"
                checked={Boolean(formData.isTrending)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isTrending: e.target.checked,
                  }))
                }
              />
              <span>Mark as Trending (shows at top)</span>
            </label>

            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>{editingItem ? "Save Course" : "Create Course"}</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 5. Portfolio & Project Case Studies (Reference Image 2)
    if (lowerTitle.includes("portfolio") || lowerTitle.includes("project")) {
      return (
        <div className="admin-form-container">
          {renderFormHeader("+ Add New Project")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Web Development)"
                value={formData.category || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Images
              </p>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    console.log("File chosen:", e.target.files[0])
                  }
                />
              </div>
              <button
                type="button"
                className="admin-link-action"
                onClick={() =>
                  alert(
                    "Feature to upload multiple project images is coming soon.",
                  )
                }
              >
                + Add another image
              </button>
            </div>
            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>Add Project</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 6. Services (Reference Image 1)
    if (lowerTitle.includes("service")) {
      return (
        <div className="admin-form-container">
          {renderFormHeader("+ Add New Service")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Service title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="priceStartingFrom"
                placeholder="Starting price (₹)"
                value={formData.priceStartingFrom || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="categoryLabel"
                placeholder="Category label (e.g. Cloud Computing & DevOps Solutions)"
                value={formData.categoryLabel || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="tagline"
                placeholder="Tagline (short one-line pitch)"
                value={formData.tagline || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="iconName"
                placeholder="Icon name (e.g. Cloud, Code, Shield)"
                value={formData.iconName || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="approach"
                placeholder="Approach (short paragraph)"
                value={formData.approach || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="features"
                placeholder="Features, comma separated (e.g. React, Node.js, Responsive)"
                value={formData.features || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="whyChooseUs"
                placeholder="Why choose us (one paragraph)"
                value={formData.whyChooseUs || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="technologies"
                placeholder="Technologies, comma separated (e.g. React, AWS, Node.js)"
                value={formData.technologies || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    console.log("File chosen:", e.target.files[0])
                  }
                />
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginTop: "0.35rem",
                }}
              >
                Image can only be set on creation. To change it, delete and
                re-create.
              </p>
            </div>
            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>Add Service</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 7. Training Programs
    if (lowerTitle.includes("training")) {
      return (
        <div className="admin-form-container">
          {renderFormHeader(editingItem ? "Edit Training" : "+ Add New Training")}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Training title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price (₹)"
                value={formData.price || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. AI & Digital Skills)"
                value={formData.category || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. 3 Months)"
                value={formData.duration || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="tag"
                placeholder="Tag (short label, e.g. Popular)"
                value={formData.tag || ""}
                onChange={handleChange}
              />
              <select
                name="mode"
                value={formData.mode || "Online"}
                onChange={handleChange}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="iconName"
                placeholder="Icon name (e.g. Cpu, Shield, Code)"
                value={formData.iconName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="tools"
                placeholder="Tools, comma separated (e.g. Python, TensorFlow, Docker)"
                value={formData.tools || ""}
                onChange={handleChange}
              />
            </div>
            <label
              className="form-row-single"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                name="isTrending"
                checked={Boolean(formData.isTrending)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isTrending: e.target.checked,
                  }))
                }
              />
              <span>Mark as Trending (shows at top)</span>
            </label>
            <div
              className="admin-form-submit-row"
              style={{ justifyContent: "flex-start" }}
            >
              <button
                type="submit"
                disabled={submitting}
                className="btn-purple-gradient"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                <span>{editingItem ? "Save Training" : "Add Training"}</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // Default Fallback Form
    return (
      <div className="admin-form-container">
        {renderFormHeader(`Add New ${title.replace(/s$/, "")}`)}
        <form onSubmit={handleSubmit} className="admin-crud-form">
          <div className="form-row-2col">
            {finalFields.map((f) => (
              <div key={f.name}>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    placeholder={f.label}
                    value={formData[f.name] || ""}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type={f.type || "text"}
                    name={f.name}
                    placeholder={f.label}
                    value={formData[f.name] || ""}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className="admin-form-submit-row"
            style={{ justifyContent: "flex-start" }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="btn-purple-gradient"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Plus size={16} />
              )}
              <span>Add {title.replace(/s$/, "")}</span>
            </button>
          </div>
        </form>
      </div>
    );
  };

  const lowerTitle = title.toLowerCase();

  return (
    <div className="admin-crud-container">
      {/* Header */}
      <div className="global-section-header" style={{ marginBottom: "2rem" }}>
        <div
          className="showcase-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.35rem 0.85rem",
            backgroundColor: "var(--secondary-light)",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-medium)",
            fontSize: "0.82rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "var(--text-primary)",
          }}
        >
          <Sparkles size={14} color="var(--deep-accent)" />
          <span>Record Registry</span>
        </div>
        <h1
          className="section-title"
          style={{ fontSize: "2.25rem", fontWeight: 800, margin: "0.5rem 0" }}
        >
          {title}
        </h1>
        <p className="section-desc" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      </div>

      {/* Action button to show form on mobile if collapsed */}
      {!showForm && !lowerTitle.includes("submission") && (
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <button
            onClick={() => setShowForm(true)}
            className="btn-purple-gradient"
          >
            <Plus size={16} />
            <span>Add New {title.replace(/s$/, "")}</span>
          </button>
        </div>
      )}

      {/* Render Dynamic Layout Box Form */}
      {showForm && renderForm()}

      {/* List of Fetched Items */}
      <div>
        <h3 className="admin-records-heading">
          Existing Records ({items.length})
        </h3>
        {loading ? (
          <div className="admin-loading-spinner-box">
            <Loader2 size={26} color="#c9b59c" className="animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="admin-empty-card">
            <p>No records found. Use the form above to add a new record.</p>
          </div>
        ) : (
          <div className="admin-records-grid">
            {items.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="admin-record-card">
                  <div className="admin-record-card-body">
                    {/* Meta Tags Row */}
                    <div className="admin-record-meta-tags">
                      {item.category && (
                        <span className="admin-record-chip category">
                          {item.category}
                        </span>
                      )}
                      {item.categoryLabel && (
                        <span className="admin-record-chip category">
                          {item.categoryLabel}
                        </span>
                      )}
                      {item.department && (
                        <span className="admin-record-chip dept">
                          {item.department}
                        </span>
                      )}
                      {item.location && (
                        <span className="admin-record-chip loc">
                          {item.location}
                        </span>
                      )}
                      {item.type && (
                        <span className="admin-record-chip type">
                          {item.type}
                        </span>
                      )}
                      {item.mode && (
                        <span className="admin-record-chip type">
                          {item.mode}
                        </span>
                      )}
                      {item.price && (
                        <span className="admin-record-chip price">
                          ₹{item.price}
                        </span>
                      )}
                      {(item.price1Month || item.price3Month || item.price6Month) && (
                        <span className="admin-record-chip price">
                          ₹{item.price1Month}/1mo · ₹{item.price3Month}/3mo · ₹{item.price6Month}/6mo
                        </span>
                      )}
                    </div>

                    <h4 className="admin-record-title">
                      {item.title ||
                        item.name ||
                        item.heading ||
                        `Record #${itemId}`}
                    </h4>

                    {item.tagline && (
                      <p className="admin-record-tagline">"{item.tagline}"</p>
                    )}
                    {item.instructor && (
                      <p className="admin-record-instructor">
                        <strong>Instructor:</strong> {item.instructor}
                      </p>
                    )}

                    <p className="admin-record-desc">
                      {item.description ||
                        item.text ||
                        item.overview ||
                        JSON.stringify(item)}
                    </p>

                    {item.features && (
                      <div
                        className="admin-record-requirements"
                        style={{ marginTop: "0.4rem" }}
                      >
                        <strong>Features:</strong> {item.features}
                      </div>
                    )}

                    {item.whyChooseUs && (
                      <p
                        className="admin-record-desc"
                        style={{ marginTop: "0.4rem", fontStyle: "italic" }}
                      >
                        <strong>Why Choose Us:</strong> {item.whyChooseUs}
                      </p>
                    )}

                    {item.technologies && (
                      <div className="admin-record-tags-row">
                        {(Array.isArray(item.technologies)
                          ? item.technologies
                          : String(item.technologies).split(",")
                        ).map((t, i) => (
                          <span key={i} className="admin-tag-label">
                            #{String(t).trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.tools && (
                      <div className="admin-record-tags-row">
                        {(Array.isArray(item.tools)
                          ? item.tools
                          : String(item.tools).split(",")
                        ).map((t, i) => (
                          <span key={i} className="admin-tag-label">
                            #{String(t).trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.requirements && (
                      <div className="admin-record-requirements">
                        <strong>Requirements:</strong> {item.requirements}
                      </div>
                    )}

                    {item.tags && (
                      <div className="admin-record-tags-row">
                        {(Array.isArray(item.tags)
                          ? item.tags
                          : String(item.tags).split(",")
                        ).map((t, i) => (
                          <span key={i} className="admin-tag-label">
                            #{String(t).trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="admin-record-card-footer">
                    {lowerTitle.includes("course") && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="btn-admin-edit"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setAssignmentsModalCourse(item)}
                          className="btn-admin-edit"
                        >
                          Assignments
                        </button>
                      </>
                    )}
                    {lowerTitle.includes("internship") && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="btn-admin-edit"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setApplicationsModalInternship(item)}
                          className="btn-admin-edit"
                        >
                          Applications
                        </button>
                      </>
                    )}
                    {lowerTitle.includes("training") && (
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="btn-admin-edit"
                      >
                        Edit
                      </button>
                    )}
                    {(lowerTitle.includes("course") ||
                      lowerTitle.includes("training")) && (
                      <button
                        type="button"
                        onClick={() =>
                          setLiveClassModalItem({
                            item,
                            itemType: lowerTitle.includes("course")
                              ? "course"
                              : "training",
                          })
                        }
                        className="btn-admin-edit"
                      >
                        Live Class
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(itemId)}
                      className="btn-admin-delete"
                    >
                      <Trash2 size={14} />
                      <span>Delete Record</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {assignmentsModalCourse && (
        <AdminAssignmentsModal
          course={assignmentsModalCourse}
          onClose={() => setAssignmentsModalCourse(null)}
        />
      )}
      {liveClassModalItem && (
        <AdminLiveClassesModal
          item={liveClassModalItem.item}
          itemType={liveClassModalItem.itemType}
          onClose={() => setLiveClassModalItem(null)}
        />
      )}
      {applicationsModalInternship && (
        <AdminInternshipApplicationsModal
          internship={applicationsModalInternship}
          onClose={() => setApplicationsModalInternship(null)}
        />
      )}
    </div>
  );
}