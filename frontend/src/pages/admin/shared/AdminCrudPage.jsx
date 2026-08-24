import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Loader2, Sparkles, X } from 'lucide-react';
import {
  getServices, createService, deleteService,
  getProjects, createProject, deleteProject,
  getCourses, createCourse, deleteCourse,
  getBlogs, createBlog, deleteBlog,
  getTestimonials, createTestimonial, deleteTestimonial,
  getInternships, createInternship, deleteInternship,
  getJobs, createJob, deleteJob,
  getSubmissions, deleteSubmission
} from '../../../api/adminApi';
import { ALL_INTERNSHIPS } from '../../Internship/InternshipsList';
import { coursePricingData } from '../../../data/courses';
import { onlineBusinessModulesData } from '../../Course/OnlineBusiness/OnlineBusiness';
import { serviceRegistry } from '../../../data/services/serviceRegistryData';
import { featuredProjects } from '../../../data/featuredProjects';
import api from '../../../api/axiosInstance';
import './AdminCrudPage.css';

const defaultAiCourses = [
  { id: 'ai-c1', title: 'AI Coding & Pair Programming', category: 'AI Courses', duration: '2 Months', price: 2999, description: 'Boost software velocity with Cursor, Copilot, Windsurf & Replit AI.' },
  { id: 'ai-c2', title: 'Generative AI & LLM Engineering', category: 'AI Courses', duration: '3 Months', price: 4999, description: 'Build RAG pipelines, fine-tune models, and develop agentic workflows with LangChain.' },
  { id: 'ai-c3', title: 'AI Visual & Image Generation', category: 'AI Courses', duration: '1 Month', price: 1999, description: 'Master Midjourney v6, Stable Diffusion XL, and FLUX image synthesis.' },
  { id: 'ai-c4', title: 'AI Video Production & Avatars', category: 'AI Courses', duration: '2 Months', price: 2499, description: 'Create studio-quality videos with HeyGen, Runway Gen-3, and Kling AI.' },
  { id: 'ai-c5', title: 'AI Automation & No-Code Webhooks', category: 'AI Courses', duration: '2 Months', price: 2999, description: 'Automate business workflows with n8n, Make, and Zapier AI integrations.' },
  { id: 'ai-c6', title: 'AI Voice Synthesis & Cloning', category: 'AI Courses', duration: '1 Month', price: 1999, description: 'ElevenLabs, PlayHT voice cloning and multilingual dubbing pipelines.' }
];

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
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const lowerTitle = title.toLowerCase();

  // Dynamic API Resolver based on Section Title
  const apiHelpers = useMemo(() => {
    if (lowerTitle.includes('service')) {
      return { get: getServices, create: createService, delete: deleteService };
    }
    if (lowerTitle.includes('portfolio') || lowerTitle.includes('project')) {
      return { get: getProjects, create: createProject, delete: deleteProject };
    }
    if (lowerTitle.includes('course') || lowerTitle.includes('training')) {
      return { get: getCourses, create: createCourse, delete: deleteCourse };
    }
    if (lowerTitle.includes('blog') || lowerTitle.includes('article')) {
      return { get: getBlogs, create: createBlog, delete: deleteBlog };
    }
    if (lowerTitle.includes('testimonial')) {
      return { get: getTestimonials, create: createTestimonial, delete: deleteTestimonial };
    }
    if (lowerTitle.includes('internship')) {
      return { get: getInternships, create: createInternship, delete: deleteInternship };
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
  }, [apiEndpoint, title, lowerTitle]);

  useEffect(() => {
    fetchItems();
  }, [apiHelpers]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await apiHelpers.get();
      const data = res.data?.data || res.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setItems(data);
      } else {
        if (lowerTitle.includes('internship')) {
          setItems(ALL_INTERNSHIPS);
        } else if (lowerTitle.includes('course')) {
          setItems([
            ...onlineBusinessModulesData.map((m) => ({ ...m, category: 'Online Business', price: m.price ? m.price.replace(/[^\d]/g, '') : 2499 })),
            ...defaultAiCourses
          ]);
        } else if (lowerTitle.includes('training')) {
          setItems(coursePricingData || []);
        } else if (lowerTitle.includes('service')) {
          setItems(Object.values(serviceRegistry) || []);
        } else if (lowerTitle.includes('portfolio') || lowerTitle.includes('project')) {
          setItems(featuredProjects.map((p) => ({ ...p, category: p.serviceCategory })));
        } else {
          setItems([]);
        }
      }
    } catch (err) {
      console.warn(`[AdminCrudPage] GET failed for ${title}, fallback to default dataset:`, err.message);
      if (lowerTitle.includes('internship')) {
        setItems(ALL_INTERNSHIPS);
      } else if (lowerTitle.includes('course')) {
        setItems([
          ...onlineBusinessModulesData.map((m) => ({ ...m, category: 'Online Business', price: m.price ? m.price.replace(/[^\d]/g, '') : 2499 })),
          ...defaultAiCourses
        ]);
      } else if (lowerTitle.includes('training')) {
        setItems(coursePricingData || []);
      } else if (lowerTitle.includes('service')) {
        setItems(Object.values(serviceRegistry) || []);
      } else if (lowerTitle.includes('portfolio') || lowerTitle.includes('project')) {
        setItems(featuredProjects.map((p) => ({ ...p, category: p.serviceCategory })));
      } else {
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = useMemo(() => {
    if (lowerTitle.includes('internship')) {
      return ['All', 'Technical', 'Non-Technical', 'Networking'];
    }
    if (lowerTitle.includes('course')) {
      return ['All', 'Online Business', 'AI Courses'];
    }
    if (lowerTitle.includes('training')) {
      return ['All', 'Technical', 'Non-Technical', 'Networking', 'AI', 'Corporate Training'];
    }
    if (lowerTitle.includes('portfolio') || lowerTitle.includes('project')) {
      return [
        'All',
        'AI & Automation',
        'Web Design & Development',
        'Software Development',
        'Cloud Computing',
        'Cyber Security',
        'Data Analysis',
        'Digital Marketing',
        'Networking',
        'Graphic Designing'
      ];
    }
    if (lowerTitle.includes('service')) {
      return ['All', 'Digital Solutions', 'Software Engineering', 'Cloud & Security', 'Marketing & Growth'];
    }

    const set = new Set();
    items.forEach((it) => {
      if (it.category) set.add(it.category);
      if (it.categoryLabel) set.add(it.categoryLabel);
      if (it.department) set.add(it.department);
    });
    if (set.size > 1) {
      return ['All', ...Array.from(set)];
    }
    return [];
  }, [items, lowerTitle]);

  const displayedItems = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter((it) => {
      const cat = (it.category || it.categoryLabel || it.department || it.tag || '').toLowerCase();
      const filter = selectedCategory.toLowerCase();
      return cat.includes(filter) || filter.includes(cat);
    });
  }, [items, selectedCategory]);

  const getCategoryCount = (cat) => {
    if (cat === 'All') return items.length;
    return items.filter((it) => {
      const itemCat = (it.category || it.categoryLabel || it.department || it.tag || '').toLowerCase();
      const target = cat.toLowerCase();
      return itemCat.includes(target) || target.includes(itemCat);
    }).length;
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

    // 1. Internships & Domain Programs
    if (lowerTitle.includes('internship') || lowerTitle.includes('career') || lowerTitle.includes('role') || lowerTitle.includes('job')) {
      return (
        <div className="admin-form-container">
          {renderFormHeader(lowerTitle.includes('internship') ? 'New Internship Program' : 'New Job Listing')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <input
                type="text"
                name="title"
                placeholder={lowerTitle.includes('internship') ? "Internship Program Title (e.g. MERN Stack Developer Intern)" : "Job title"}
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
              <select
                name="category"
                value={formData.category || 'Technical'}
                onChange={handleChange}
                required
                style={{ padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border-medium)', backgroundColor: '#ffffff', fontSize: '0.85rem' }}
              >
                <option value="Technical">Technical</option>
                <option value="Non-Technical">Non-Technical</option>
                <option value="Networking">Networking</option>
              </select>
            </div>
            <div className="form-row-2col">
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. 1 Month, 3 Months, 6 Months)"
                value={formData.duration || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="price1Month"
                placeholder="Starting Fee (e.g. ₹799)"
                value={formData.price1Month || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-row-single">
              <textarea
                name="description"
                placeholder="Program description & learning milestones"
                value={formData.description || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row-single">
              <input
                type="text"
                name="tools"
                placeholder="Tools & Tech Stack (comma-separated, e.g. React, Node.js, Express, MongoDB, Git)"
                value={formData.tools || ''}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button type="submit" disabled={submitting} className="btn-purple-gradient">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                <span>{lowerTitle.includes('internship') ? 'Add Internship Program' : 'Post Job'}</span>
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

    // 4. Courses & Training Programs
    if (lowerTitle.includes('course') || lowerTitle.includes('training')) {
      const isTraining = lowerTitle.includes('training');
      return (
        <div className="admin-form-container">
          {renderFormHeader(isTraining ? '+ Add New Training Program' : '+ Add New Course')}
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-row-2col">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {isTraining ? 'Training Program Title *' : 'Course Title *'}
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder={isTraining ? "e.g. CCNA Enterprise Routing" : "e.g. AI Coding & LLM Mastery"}
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {isTraining ? 'Training Domain Category *' : 'Course Type / Category *'}
                </label>
                <select
                  name="category"
                  value={formData.category || (isTraining ? 'Technical' : 'Online Business')}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border-medium)', backgroundColor: '#ffffff', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  {!isTraining ? (
                    <>
                      <option value="Online Business">Online Business (Dropshipping, Affiliate, E-Commerce)</option>
                      <option value="AI Courses">AI Courses (Agentic AI, LLMs, AI Tools & Automation)</option>
                    </>
                  ) : (
                    <>
                      <option value="Technical">Technical</option>
                      <option value="Non-Technical">Non-Technical</option>
                      <option value="Networking">Networking</option>
                      <option value="AI">AI</option>
                      <option value="Corporate Training">Corporate Training</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="form-row-2col">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Pricing / Fee (₹) *
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="e.g. 2499"
                  value={formData.price || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g. 1 Month, 2 Months, 3 Months"
                  value={formData.duration || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-single">
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Course Description & Syllabus Overview *
              </label>
              <textarea
                name="description"
                placeholder="Comprehensive description of the course, modules, and practical projects..."
                value={formData.description || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row-2col">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Lead Instructor Name
                </label>
                <input
                  type="text"
                  name="instructor"
                  placeholder="e.g. Dr. Vikramaditya Rao"
                  value={formData.instructor || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Thumbnail Image
                </label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => console.log('File chosen:', e.target.files[0])}
                  />
                </div>
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
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. AI Customer Chatbot & Auto Lead System"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Project Domain / Category *
                </label>
                <select
                  name="category"
                  value={formData.category || 'AI & Automation'}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border-medium)', backgroundColor: '#ffffff', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  <option value="AI & Automation">AI & Automation</option>
                  <option value="Web Design & Development">Web Design & Development</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Data Analysis & Data Science">Data Analysis & Data Science</option>
                  <option value="Digital Marketing">Digital Marketing & Ads</option>
                  <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Networking & IT Infrastructure">Networking & IT Infrastructure</option>
                  <option value="Graphic Designing">Graphic Designing & UI/UX</option>
                </select>
              </div>
            </div>

            <div className="form-row-2col">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Key Metric / Business Impact
                </label>
                <input
                  type="text"
                  name="metric"
                  placeholder="e.g. Saved 85% Manual Work Time"
                  value={formData.metric || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  name="tech"
                  placeholder="e.g. React 19, Python, n8n, OpenAI API"
                  value={formData.tech || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-single">
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Project Summary & Deliverables *
              </label>
              <textarea
                name="description"
                placeholder="Describe client requirements, architecture, solution implementation, and production results..."
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

      {/* Category Domain Filter: Mobile Dropdown + Desktop Pills */}
      {categoryOptions.length > 1 && (
        <div className="admin-category-filter-wrapper" style={{ marginBottom: '1.25rem' }}>
          {/* Mobile Dropdown Selector */}
          <div className="admin-cat-mobile-dropdown-wrap">
            <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Filter by Domain / Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="admin-cat-mobile-select"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({getCategoryCount(cat)})
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Toggle Pills */}
          <div className="admin-category-toggle-bar desktop-only-pills">
            {categoryOptions.map((cat) => {
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`admin-cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="admin-cat-count-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* List of Fetched Items */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 className="admin-records-heading" style={{ margin: 0 }}>
            Existing Records ({displayedItems.length}{selectedCategory !== 'All' ? ` of ${items.length}` : ''})
          </h3>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8b7050', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset to All ({items.length})
            </button>
          )}
        </div>
        {loading ? (
          <div className="admin-loading-spinner-box">
            <Loader2 size={26} color="#c9b59c" className="animate-spin" />
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="admin-empty-card">
            <p>No records found for category "{selectedCategory}". Use the form above to add a new record or switch categories.</p>
          </div>
        ) : (
          <div className="admin-records-grid">
            {displayedItems.map((item) => {
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

                    {(item.description || item.text || item.overview || item.duration) && (
                      <p className="admin-record-desc">
                        {item.description || item.text || item.overview || `Duration: ${item.duration} • Curriculum verified.`}
                      </p>
                    )}

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
