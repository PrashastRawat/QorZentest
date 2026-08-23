import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Loader2, Sparkles, X } from 'lucide-react';
import {
  getServices, createService, deleteService,
  getProjects, createProject, deleteProject,
  getCourses, createCourse, deleteCourse,
  getBlogs, createBlog, deleteBlog,
  getTestimonials, createTestimonial, deleteTestimonial,
  getJobs, createJob, deleteJob,
  getSubmissions, deleteSubmission
} from '../../../api/adminApi';
import api from '../../../api/axiosInstance';
import './AdminCrudPage.css';

/**
 * Reusable CRUD Page Component for Admin Management Sections
 * Dynamically resolves API handlers from /api/adminApi.js
 * Renders high-quality themed cards matching reference layout images and student portal styling.
 */
export default function AdminCrudPage({
  title = 'Management Section',
  description = 'Add, view, and manage company records.',
  apiEndpoint = '/services',
  fields,
  formFields
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  // Responsive Form visibility: collapsed on mobile by default, open on desktop
  const [showForm, setShowForm] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowForm(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically resolve API Actions from adminApi folder helpers
  const apiHelpers = useMemo(() => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('service')) {
      return { get: getServices, create: createService, delete: deleteService };
    }
    if (lowerTitle.includes('portfolio') || lowerTitle.includes('project')) {
      return { get: getProjects, create: createProject, delete: deleteProject };
    }
    if (lowerTitle.includes('course')) {
      return { get: getCourses, create: createCourse, delete: deleteCourse };
    }
    if (lowerTitle.includes('blog') || lowerTitle.includes('article')) {
      return { get: getBlogs, create: createBlog, delete: deleteBlog };
    }
    if (lowerTitle.includes('testimonial')) {
      return { get: getTestimonials, create: createTestimonial, delete: deleteTestimonial };
    }
    if (lowerTitle.includes('career') || lowerTitle.includes('role') || lowerTitle.includes('job')) {
      return { get: getJobs, create: createJob, delete: deleteJob };
    }
    if (lowerTitle.includes('submission') || lowerTitle.includes('enquiry') || lowerTitle.includes('form')) {
      return { get: getSubmissions, create: null, delete: deleteSubmission };
    }
    // Fallback if not matching explicitly
    return {
      get: () => api.get(apiEndpoint),
      create: (data) => api.post(apiEndpoint, data),
      delete: (id) => api.delete(`${apiEndpoint}/${id}`)
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
      console.warn(`[AdminCrudPage] GET failed for ${title}, fallback to empty list:`, err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiHelpers.create) return;
    setSubmitting(true);
    try {
      await apiHelpers.create(formData);
      setFormData({});
      if (window.innerWidth < 768) {
        setShowForm(false);
      }
      fetchItems();
    } catch (err) {
      alert(`Error saving record: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await apiHelpers.delete(id);
      fetchItems();
    } catch (err) {
      alert(`Error deleting record: ${err.response?.data?.message || err.message}`);
    }
  };

  // Convert fields array to formFields structure
  const finalFields = useMemo(() => {
    if (formFields) return formFields;
    if (fields) {
      return fields.map((f) => {
        let label = f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, ' $1');
        let type = 'text';
        if (f.toLowerCase().includes('description') || f.toLowerCase().includes('text') || f.toLowerCase().includes('message')) {
          type = 'textarea';
        }
        return { name: f, label, type };
      });
    }
    return [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' }
    ];
  }, [fields, formFields]);

  // Renders standard header rows with a Close (X) cross button on the right
  const renderFormHeader = (headingText) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="admin-form-heading" style={{ margin: 0 }}>{headingText}</h3>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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

    if (lowerTitle.includes('submission')) {
      return null;
    }

    // 1. Careers & Job Listings (Reference Image 5)
    if (lowerTitle.includes('career') || lowerTitle.includes('role') || lowerTitle.includes('job')) {
      return (
        <div className="admin-form-container">
          {renderFormHeader('New Job Listing')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Job title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department (e.g. Engineering)"
                value={formData.department || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="location"
                placeholder="Location (e.g. Remote, Dehradun)"
                value={formData.location || ''}
                onChange={handleChange}
                required
              />
              <select
                name="type"
                value={formData.type || 'Full-time'}
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
                value={formData.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="requirements"
                placeholder="Requirements, comma separated (e.g. 2+ years React, Strong CSS)"
                value={formData.requirements || ''}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" disabled={submitting} className="btn-purple-gradient">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>Post Job</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 2. Client Testimonials
    if (lowerTitle.includes('testimonial')) {
      return (
        <div className="admin-form-container">
          {renderFormHeader('Add Testimonial')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-single">
              <input
                type="text"
                name="name"
                placeholder="Client name"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="text"
                placeholder="Client message / testimonial"
                value={formData.text || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) => console.log('File chosen:', e.target.files[0])}
                />
              </div>
            </div>
            <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" disabled={submitting} className="btn-purple-gradient">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>Add Testimonial</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 3. Blog Articles (Reference Image 4)
    if (lowerTitle.includes('blog') || lowerTitle.includes('article')) {
      return (
        <div className="admin-form-container">
          {renderFormHeader('+ New Blog Post')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Blog title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Web Development)"
                value={formData.category || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Write your article here..."
                value={formData.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="tags"
                placeholder="Tags, comma separated (e.g. React, Tutorial)"
                value={formData.tags || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Images</p>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => console.log('File chosen:', e.target.files[0])}
                />
              </div>
              <button type="button" className="admin-link-action" onClick={() => alert('Feature to upload multiple images is coming soon.')}>
                + Add another image
              </button>
            </div>
            <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" disabled={submitting} className="btn-purple-gradient">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>Publish Post</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 4. Courses & Programs (Reference Image 3)
    if (lowerTitle.includes('course')) {
      return (
        <div className="admin-form-container">
          {renderFormHeader('+ Add New Course')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Course title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price (₹)"
                value={formData.price || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="instructor"
                placeholder="Instructor name"
                value={formData.instructor || ''}
                onChange={handleChange}
                required
              />
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => console.log('File chosen:', e.target.files[0])}
                />
              </div>
            </div>
            
            {/* Lessons Sub-section */}
            <div className="form-lessons-section">
              <h4 className="lessons-heading">Lessons</h4>
              <div className="form-row-3col">
                <input
                  type="text"
                  name="lessonTitle"
                  placeholder="Lesson title"
                  value={formData.lessonTitle || ''}
                  onChange={handleChange}
                />
                <input
                  type="url"
                  name="lessonVideoUrl"
                  placeholder="Video URL"
                  value={formData.lessonVideoUrl || ''}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lessonDuration"
                  placeholder="Duration"
                  value={formData.lessonDuration || ''}
                  onChange={handleChange}
                />
              </div>
              <button type="button" className="admin-link-action" onClick={() => alert('Additional lessons can be linked after course creation.')}>
                + Add another lesson
              </button>
            </div>

            <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" disabled={submitting} className="btn-purple-gradient">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>Create Course</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 5. Portfolio & Project Case Studies (Reference Image 2)
    if (lowerTitle.includes('portfolio') || lowerTitle.includes('project')) {
      return (
        <div className="admin-form-container">
          {renderFormHeader('+ Add New Project')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Web Development)"
                value={formData.category || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Images</p>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => console.log('File chosen:', e.target.files[0])}
                />
              </div>
              <button type="button" className="admin-link-action" onClick={() => alert('Feature to upload multiple project images is coming soon.')}>
                + Add another image
              </button>
            </div>
            <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" disabled={submitting} className="btn-purple-gradient">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>Add Project</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 6. Services (Reference Image 1)
    if (lowerTitle.includes('service')) {
      return (
        <div className="admin-form-container">
          {renderFormHeader('+ Add New Service')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder="Service title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Starting price (₹)"
                value={formData.price || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="features"
                placeholder="Features, comma separated (e.g. React, Node.js, Responsive)"
                value={formData.features || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="whyChooseUs"
                placeholder="Why choose us (one paragraph)"
                value={formData.whyChooseUs || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="technologies"
                placeholder="Technologies, comma separated (e.g. React, AWS, Node.js)"
                value={formData.technologies || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => console.log('File chosen:', e.target.files[0])}
                />
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Image can only be set on creation. To change it, delete and re-create.
              </p>
            </div>
            <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" disabled={submitting} className="btn-purple-gradient">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>Add Service</span>
              </button>
            </div>
          </form>
        </div>
      );
    }

    // Default Fallback Form
    return (
      <div className="admin-form-container">
        {renderFormHeader(`Add New ${title.replace(/s$/, '')}`)}
        <form onSubmit={handleSubmit} className="admin-crud-form">
          <div className="form-row-2col">
            {finalFields.map((f) => (
              <div key={f.name}>
                {f.type === 'textarea' ? (
                  <textarea
                    name={f.name}
                    placeholder={f.label}
                    value={formData[f.name] || ''}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type={f.type || 'text'}
                    name={f.name}
                    placeholder={f.label}
                    value={formData[f.name] || ''}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
            <button type="submit" disabled={submitting} className="btn-purple-gradient">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              <span>Add {title.replace(/s$/, '')}</span>
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
      <div className="global-section-header" style={{ marginBottom: '2rem' }}>
        <div className="showcase-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', backgroundColor: 'var(--secondary-light)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-medium)', fontSize: '0.82rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <Sparkles size={14} color="var(--deep-accent)" />
          <span>Record Registry</span>
        </div>
        <h1 className="section-title" style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0' }}>{title}</h1>
        <p className="section-desc" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>

      {/* Action button to show form on mobile if collapsed */}
      {!showForm && !lowerTitle.includes('submission') && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
          <button
            onClick={() => setShowForm(true)}
            className="btn-purple-gradient"
          >
            <Plus size={16} />
            <span>Add New {title.replace(/s$/, '')}</span>
          </button>
        </div>
      )}

      {/* Render Dynamic Layout Box Form */}
      {showForm && renderForm()}

      {/* List of Fetched Items */}
      <div>
        <h3 className="admin-records-heading">Existing Records ({items.length})</h3>
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
                      {item.category && <span className="admin-record-chip category">{item.category}</span>}
                      {item.categoryLabel && <span className="admin-record-chip category">{item.categoryLabel}</span>}
                      {item.department && <span className="admin-record-chip dept">{item.department}</span>}
                      {item.location && <span className="admin-record-chip loc">{item.location}</span>}
                      {item.type && <span className="admin-record-chip type">{item.type}</span>}
                      {item.price && <span className="admin-record-chip price">₹{item.price}</span>}
                    </div>

                    <h4 className="admin-record-title">
                      {item.title || item.name || item.heading || `Record #${itemId}`}
                    </h4>
                    
                    {item.tagline && <p className="admin-record-tagline">"{item.tagline}"</p>}
                    {item.instructor && <p className="admin-record-instructor"><strong>Instructor:</strong> {item.instructor}</p>}

                    <p className="admin-record-desc">
                      {item.description || item.text || item.overview || JSON.stringify(item)}
                    </p>

                    {item.features && (
                      <div className="admin-record-requirements" style={{ marginTop: '0.4rem' }}>
                        <strong>Features:</strong> {item.features}
                      </div>
                    )}

                    {item.whyChooseUs && (
                      <p className="admin-record-desc" style={{ marginTop: '0.4rem', fontStyle: 'italic' }}>
                        <strong>Why Choose Us:</strong> {item.whyChooseUs}
                      </p>
                    )}

                    {item.technologies && (
                      <div className="admin-record-tags-row">
                        {item.technologies.split(',').map((t, i) => (
                          <span key={i} className="admin-tag-label">#{t.trim()}</span>
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
                        {item.tags.split(',').map((t, i) => (
                          <span key={i} className="admin-tag-label">#{t.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="admin-record-card-footer">
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
    </div>
  );
}
