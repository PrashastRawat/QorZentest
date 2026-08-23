

import { aiAutomationProjects } from './aiAutomationData';
import { webDesignProjects } from './webDesignData';
import { cloudComputingProjects } from './cloudComputingData';
import { digitalMarketingProjects } from './digitalMarketingData';
import { seoProjects } from './seoData';
import { softwareDevProjects } from './softwareDevData';
import { networkingProjects } from './networkingData';
import { dataAnalysisProjects } from './dataAnalysisData';
import { graphicDesignProjects } from './graphicDesignData';
import { socialMediaProjects } from './socialMediaData';
import { cyberSecurityProjects } from './cyberSecurityData';
import { serviceRegistry } from './serviceRegistryData';

// Re-export individual service arrays
export {
  aiAutomationProjects,
  webDesignProjects,
  cloudComputingProjects,
  digitalMarketingProjects,
  seoProjects,
  softwareDevProjects,
  networkingProjects,
  dataAnalysisProjects,
  graphicDesignProjects,
  socialMediaProjects,
  cyberSecurityProjects,
  serviceRegistry
};

// Master Category Projects Map for projectsData.js & ServiceProjectsGrid compatibility
export const categoryProjectsMap = {
  'ai-automation': aiAutomationProjects,
  'web-design': webDesignProjects,
  'cloud-computing': cloudComputingProjects,
  'digital-marketing': digitalMarketingProjects,
  'seo': seoProjects,
  'software-development': softwareDevProjects,
  'networking': networkingProjects,
  'networking-it': networkingProjects,
  'data-analysis': dataAnalysisProjects,
  'graphic-designing': graphicDesignProjects,
  'social-media-marketing': socialMediaProjects,
  'social-media': socialMediaProjects,
  'cyber-security': cyberSecurityProjects
};
