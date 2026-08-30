import React, { useState, useEffect } from 'react';
import { X, Video, Loader2, Trash2 } from 'lucide-react';
import { getLiveClassesForItem, createLiveClass, deleteLiveClass } from '../../../api/adminApi';

export default function AdminLiveClassesModal({ item, itemType, onClose }) {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    durationMinutes: 60,
    meetingLink: '',
  });

  useEffect(() => {
    fetchLiveClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, itemType]);

  const fetchLiveClasses = async () => {
    try {
      setLoading(true);
      const res = await getLiveClassesForItem(itemType, item._id);
      setLiveClasses(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load live classes', err);
      setLiveClasses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.scheduledAt || !formData.meetingLink) {
      alert('Title, scheduled time, and meeting link are required.');
      return;
    }
    setSubmitting(true);
    try {
      await createLiveClass({
        title: formData.title,
        description: formData.description,
        itemType,
        itemId: item._id,
        scheduledAt: formData.scheduledAt,
        durationMinutes: formData.durationMinutes || 60,
        meetingLink: formData.meetingLink,
      });
      setFormData({ title: '', description: '', scheduledAt: '', durationMinutes: 60, meetingLink: '' });
      fetchLiveClasses();
    } catch (err) {
      alert(`Error scheduling live class: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this live class?')) return;
    try {
      await deleteLiveClass(id);
      fetchLiveClasses();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 99999 }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem', width: '100%', maxWidth: '38rem', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
            Live Classes — {item.title} <span style={{ fontWeight: 500, color: '#78716c', fontSize: '0.8rem' }}>({itemType})</span>
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Loader2 className="animate-spin" />
          </div>
        ) : liveClasses.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#78716c' }}>No live classes scheduled yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {liveClasses.map((lc) => (
              <div key={lc._id} style={{ border: '1px solid #d9cfc7', borderRadius: '0.75rem', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong>{lc.title}</strong>
                  <p style={{ fontSize: '0.78rem', color: '#78716c', margin: '0.2rem 0' }}>
                    {new Date(lc.scheduledAt).toLocaleString()} · {lc.durationMinutes} min
                  </p>
                  <a href={lc.meetingLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem' }}>
                    {lc.meetingLink}
                  </a>
                </div>
                <button onClick={() => handleDelete(lc._id)} style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer' }}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem' }}>+ Schedule Live Class</h4>
        <p style={{ fontSize: '0.75rem', color: '#78716c', marginBottom: '0.5rem' }}>
          Every student enrolled in this {itemType} will be notified automatically.
        </p>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <input
            type="text"
            placeholder="Session title"
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
            required
            style={{ padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem' }}
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            style={{ padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem', fontFamily: 'inherit' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={(e) => setFormData((p) => ({ ...p, scheduledAt: e.target.value }))}
              required
              style={{ flex: 1, minWidth: '12rem', padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem' }}
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={formData.durationMinutes}
              onChange={(e) => setFormData((p) => ({ ...p, durationMinutes: e.target.value }))}
              style={{ width: '9rem', padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem' }}
            />
          </div>
          <input
            type="url"
            placeholder="Meeting link (Zoom, Meet, etc.)"
            value={formData.meetingLink}
            onChange={(e) => setFormData((p) => ({ ...p, meetingLink: e.target.value }))}
            required
            style={{ padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem' }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', backgroundColor: '#1c1917', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Video size={14} />}
            <span>Schedule</span>
          </button>
        </form>
      </div>
    </div>
  );
}