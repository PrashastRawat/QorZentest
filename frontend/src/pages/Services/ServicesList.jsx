import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getPublicServices } from '../../api/serviceApi';
import '../Home/Home.css';
import './ServicesList.css';

const truncate = (text, max = 110) => {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
};

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const res = await getPublicServices();
        const data = res.data?.data || res.data || [];
        if (isMounted) setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('[ServicesList] Failed to load services:', err);
        if (isMounted) {
          setError('Unable to load services right now. Please try again later.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="services-list-section">
      <div className="container">
        <div className="global-section-header">
          <span className="section-subtitle">
            <Sparkles size={14} style={{ marginRight: '0.35rem' }} />
            All Our Capabilities
          </span>
          <h1 className="section-title">Our Services</h1>
          <p className="section-desc">
            Explore the full range of IT, AI, and digital solutions we offer - click any service to see how we can help your business grow.
          </p>
        </div>

        {loading && <div className="services-list-status">Loading services...</div>}

        {!loading && error && (
          <div className="services-list-status error">{error}</div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="services-list-status">No services found.</div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="services-cards-grid">
            {services.map((service, index) => {
              const blurb = service.tagline || truncate(service.description);
              const linkTarget = service.slug || service._id;
              const featureTags = Array.isArray(service.features)
                ? service.features.slice(0, 4)
                : [];

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="b2b-service-card"
                >
                  {service.categoryLabel && (
                    <span className="services-list-category-pill">
                      {service.categoryLabel}
                    </span>
                  )}

                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{blurb}</p>

                  {featureTags.length > 0 && (
                    <div className="service-tags-wrap">
                      {featureTags.map((tag) => (
                        <span key={tag} className="service-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <Link to={`/services/${linkTarget}`} className="service-link-btn">
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesList;