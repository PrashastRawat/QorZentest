

export const navigateToDashboard = (user, navigate) => {
  const isProduction = typeof window !== 'undefined' && 
    window.location.hostname.includes('qorzen-technologies.in') && 
    !window.location.hostname.includes('localhost');

  const role = user?.role || 'student';

  if (role === 'admin') {
    if (isProduction) {
      window.location.href = 'https://admin.qorzen-technologies.in';
    } else if (navigate) {
      navigate('/admin/dashboard');
    } else {
      window.location.href = '/admin/dashboard';
    }
  } else {
    // Student Dashboard
    if (isProduction) {
      window.location.href = 'https://classroom.qorzen-technologies.in';
    } else if (navigate) {
      navigate('/dashboard');
    } else {
      window.location.href = '/dashboard';
    }
  }
};

export default navigateToDashboard;
