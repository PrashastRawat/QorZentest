import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServiceHero from '../../components/Services/ServiceHero';
import ServiceFrameworkSection from '../../components/Services/ServiceFrameworkSection';
import ServiceProjectsGrid from '../../components/Services/ServiceProjectsGrid';
import { getProjectsByCategory } from '../../data/projectsData';
import { getServiceBySlug } from '../../api/serviceApi';

const ServiceDetail = () => {
  const { serviceId, serviceSlug: rawSlug } = useParams();
  const serviceSlug = rawSlug || serviceId;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchService = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await getServiceBySlug(serviceSlug);
        if (isMounted) {
          setService(res.data.data);
        }
      } catch (err) {
        if (isMounted) {
          setNotFound(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (serviceSlug) {
      fetchService();
    } else {
      setNotFound(true);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [serviceSlug]);

  if (loading) {
    return (
      <div className="service-detail-page">
        <p style={{ textAlign: 'center', padding: '4rem 0' }}>Loading service details...</p>
      </div>
    );
  }

  if (notFound || !service) {
    return (
      <div className="service-detail-page">
        <p style={{ textAlign: 'center', padding: '4rem 0' }}>
          Sorry, we couldn't find that service. Please check the link or browse our services from the homepage.
        </p>
      </div>
    );
  }

  const categoryProjectsList = getProjectsByCategory(serviceSlug);

  return (
    <div className="service-detail-page">
      <ServiceHero service={service} />
      <ServiceFrameworkSection service={service} />
      <ServiceProjectsGrid projects={categoryProjectsList} serviceSlug={serviceSlug} />
    </div>
  );
};

export default ServiceDetail;