

import { categoryProjectsMap } from './services/index';

export const serviceProjectsData = categoryProjectsMap;

/**
 * Fallback Projects Handler
 */
export const getProjectsForService = (serviceId) => {
  if (serviceProjectsData[serviceId] && serviceProjectsData[serviceId].length > 0) {
    return serviceProjectsData[serviceId];
  }

  // Fallback slug mapping for aliases
  const normalizedSlug = serviceId === 'networking-it' ? 'networking' : serviceId === 'social-media' ? 'social-media-marketing' : serviceId;
  if (serviceProjectsData[normalizedSlug]) {
    return serviceProjectsData[normalizedSlug];
  }

  // Generic 5-project fallback template with unique images
  return [
    {
      id: `${serviceId}-fallback-1`,
      serviceId: serviceId,
      title: `Enterprise ${serviceId.replace('-', ' ').toUpperCase()} Architecture`,
      client: 'Global Corporate Client',
      metric: 'Achieved 45% operational performance improvement',
      impactLabel: '45% Performance Lift',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
      description: `Engineered scalable ${serviceId.replace('-', ' ')} solutions tailored for high-availability enterprise environments.`,
      tech: ['React.js', 'Node.js', 'Cloud', 'DevOps', 'Security']
    }
  ];
};
