import React from 'react';
import { X, Edit3, FileCheck2, Video, Users, Trash2, FileText } from 'lucide-react';

/**
 * Detail box shown when an admin clicks a row in the Courses/Training/
 * Internships table. Pure presentation — every action is delegated back
 * up to AdminCrudPage via the callback props, so this component doesn't
 * need to know about any API calls itself.
 */
export default function AdminItemDetailModal({
  item,
  itemType, // 'course' | 'training' | 'internship'
  onClose,
  onEdit,
  onDelete,
  onOpenLiveClass,   // course/training only
  onOpenAssignments, // course only
  onOpenApplications,// internship only (CV applications, existing feature)
  onOpenStudents,
}) {
  if (!item) return null;

  const priceDisplay =
    itemType === 'internship'
      ? `₹${item.price1Month || 0}/1mo · ₹${item.price3Month || 0}/3mo · ₹${item.price6Month || 0}/6mo`
      : item.price
      ? `₹${item.price}`
      : null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', zIndex: 99999
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem',
          width: '100%', maxWidth: '36rem', maxHeight: '85vh', overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{item.title}</h3>
            {item.category && (
              <span style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 700 }}>{item.category}</span>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {item.instructor && (
          <p style={{ fontSize: '0.85rem', margin: '0.3rem 0' }}>
            <strong>Instructor:</strong> {item.instructor}
          </p>
        )}
        {item.duration && (
          <p style={{ fontSize: '0.85rem', margin: '0.3rem 0' }}>
            <strong>Duration:</strong> {item.duration}
          </p>
        )}
        {priceDisplay && (
          <p style={{ fontSize: '0.85rem', margin: '0.3rem 0' }}>
            <strong>Price:</strong> {priceDisplay}
          </p>
        )}
        {item.description && (
          <p style={{ fontSize: '0.85rem', color: '#44403c', margin: '0.6rem 0', lineHeight: 1.5 }}>
            {item.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <button type="button" onClick={onEdit} className="btn-admin-edit">
            <Edit3 size={14} />
            <span>Edit</span>
          </button>

          {(itemType === 'course' || itemType === 'training') && (
            <button type="button" onClick={onOpenLiveClass} className="btn-admin-edit">
              <Video size={14} />
              <span>Live Class</span>
            </button>
          )}

          {itemType === 'course' && (
            <button type="button" onClick={onOpenAssignments} className="btn-admin-edit">
              <FileCheck2 size={14} />
              <span>Assignments</span>
            </button>
          )}

          {itemType === 'internship' && (
            <button type="button" onClick={onOpenApplications} className="btn-admin-edit">
              <FileText size={14} />
              <span>Applications</span>
            </button>
          )}

          <button type="button" onClick={onOpenStudents} className="btn-admin-edit">
            <Users size={14} />
            <span>Students</span>
          </button>

          <button type="button" onClick={onDelete} className="btn-admin-delete">
            <Trash2 size={14} />
            <span>Delete Record</span>
          </button>
        </div>
      </div>
    </div>
  );
}