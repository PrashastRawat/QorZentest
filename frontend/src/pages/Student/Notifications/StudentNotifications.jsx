import React, { useEffect, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Video,
  Sparkles,
  Trash2
} from 'lucide-react';
import { getNotifications, markNotificationRead, deleteNotification } from '../../../api/studentApi';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getNotifications();
      setNotifications(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  // Lets the sidebar badge (in StudentLayout) know it should re-fetch its
  // unread count — the two components don't otherwise share state.
  const notifyLayout = () => {
    window.dispatchEvent(new Event('qorzen:notifications-updated'));
  };

  const markAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    if (unread.length === 0) return;
    // Optimistic update, then fire the real requests.
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    notifyLayout();
    try {
      await Promise.all(unread.map((n) => markNotificationRead(n._id)));
    } catch (err) {
      console.error('Failed to mark all as read', err);
      fetchNotifications(); // re-sync with the server if something failed
      notifyLayout();
    }
  };

  const handleClickOne = async (n) => {
    if (n.read) return;
    setNotifications((prev) => prev.map((item) => (item._id === n._id ? { ...item, read: true } : item)));
    notifyLayout();
    try {
      await markNotificationRead(n._id);
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  const handleDelete = async (e, notificationId) => {
    e.stopPropagation(); // don't trigger the "mark as read" click on the row
    const previous = notifications;
    setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    notifyLayout();
    try {
      await deleteNotification(notificationId);
    } catch (err) {
      console.error('Failed to delete notification', err);
      setNotifications(previous); // roll back if the delete actually failed
      notifyLayout();
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#78716c' }}>Loading notifications...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#991b1b' }}>Something went wrong: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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

      {notifications.length === 0 && (
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>You're all caught up — no notifications yet.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map((n) => {
          const unread = !n.read;
          return (
            <div
              key={n._id}
              onClick={() => handleClickOne(n)}
              style={{
                padding: '1.15rem',
                backgroundColor: unread ? '#ffffff' : '#f9f8f6',
                border: '0.0625rem solid',
                borderColor: unread ? '#c9b59c' : '#d9cfc7',
                borderRadius: '0.875rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                boxShadow: unread ? '0 0.125rem 0.5rem rgba(201, 181, 156, 0.15)' : 'none',
                cursor: unread ? 'pointer' : 'default'
              }}
            >
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  backgroundColor: n.type === 'live_class' ? '#fee2e2' : n.type === 'grade' ? '#dcfce7' : '#efe9e3',
                  color: n.type === 'live_class' ? '#dc2626' : n.type === 'grade' ? '#166534' : '#1c1917',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {n.type === 'live_class' ? <Video size={16} /> : n.type === 'grade' ? <CheckCircle2 size={16} /> : <Bell size={16} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>{n.title}</h4>
                  <span style={{ fontSize: '0.72rem', color: '#78716c' }}>
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#44403c', lineHeight: 1.4, margin: 0 }}>
                  {n.message}
                </p>
              </div>

              <button
                onClick={(e) => handleDelete(e, n._id)}
                aria-label="Delete notification"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#a8a29e',
                  padding: '0.25rem',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentNotifications;