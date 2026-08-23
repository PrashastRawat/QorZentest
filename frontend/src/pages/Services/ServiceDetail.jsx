import React from 'react';
import { useParams } from 'react-router-dom';
import ServiceHero from '../../components/Services/ServiceHero';
import ServiceFrameworkSection from '../../components/Services/ServiceFrameworkSection';
import ServiceProjectsGrid from '../../components/Services/ServiceProjectsGrid';
import { getProjectsByCategory } from '../../data/projectsData';
import { serviceRegistry } from '../../data/services/serviceRegistryData';

const ServiceDetail = () => {
  const { serviceId, serviceSlug: rawSlug } = useParams();
  const serviceSlug = rawSlug || serviceId || 'cloud-computing';

  // Lookup service details from serviceRegistryData or construct dynamic fallback
  const service = serviceRegistry[serviceSlug] || {
    title: serviceSlug ? serviceSlug.replace('-', ' ').toUpperCase() : 'Enterprise IT Service',
    categoryName: 'Corporate IT Capability',
    tagline: 'Production-grade enterprise technology solutions engineered for scale and high ROI.',
    description: `We deliver specialized ${serviceSlug ? serviceSlug.replace('-', ' ') : 'IT'} solutions tailored for high-availability enterprise environments, ensuring strict SLA compliance and technical excellence.`,
    capabilities: [
      'Enterprise Architecture & Scalability',
      'RESTful Microservices & Cloud Integrations',
      'Zero-Downtime Deployment & CI/CD Pipelines',
      'Security Encryption & RBAC Compliance',
      '24/7 SLA Performance Support'
    ]
  };

  // Fetch category-specific projects array
  const categoryProjectsList = getProjectsByCategory(serviceSlug);

  return (
    <div className="service-detail-page">
      {/* Section 1: Hero Banner */}
      <ServiceHero service={service} />

      {/* Section 2: Strategic Approach, 4-Step Methodology & Techniques Framework */}
      <ServiceFrameworkSection service={service} />

      {/* Section 3: Category Specific Projects Grid */}
      <ServiceProjectsGrid projects={categoryProjectsList} serviceSlug={serviceSlug} />
    </div>
  );
};

export default ServiceDetail;
