import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Video,
  FileText,
  Sparkles
} from 'lucide-react';
import { mockNotifications } from '../../../data/studentMockData';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
            <Sparkles size={13} color="#8b7050" />
            <span>Classroom Feed</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
            Notifications & Announcements
          </h1>
        </div>

        <button
          onClick={markAllRead}
          style={{
            padding: '0.45rem 0.85rem',
            backgroundColor: '#efe9e3',
            color: '#1c1917',
            border: '0.0625rem solid #d9cfc7',
            borderRadius: '0.5rem',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: '1.15rem',
              backgroundColor: n.unread ? '#ffffff' : '#f9f8f6',
              border: '0.0625rem solid',
              borderColor: n.unread ? '#c9b59c' : '#d9cfc7',
              borderRadius: '0.875rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              boxShadow: n.unread ? '0 0.125rem 0.5rem rgba(201, 181, 156, 0.15)' : 'none'
            }}
          >
            <div
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                backgroundColor: n.type === 'class' ? '#fee2e2' : n.type === 'grade' ? '#dcfce7' : '#efe9e3',
                color: n.type === 'class' ? '#dc2626' : n.type === 'grade' ? '#166534' : '#1c1917',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {n.type === 'class' ? <Video size={16} /> : n.type === 'grade' ? <CheckCircle2 size={16} /> : <Bell size={16} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1c1917' }}>{n.title}</h4>
                <span style={{ fontSize: '0.72rem', color: '#78716c' }}>{n.time}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#44403c', lineHeight: 1.4, margin: 0 }}>
                {n.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentNotifications;
