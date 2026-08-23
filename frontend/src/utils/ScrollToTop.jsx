import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Utility Component
 * Automatically resets the browser viewport scroll position to top (0, 0)
 * whenever the route pathname changes (e.g. clicking footer links).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Smooth scroll to top on route change
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
