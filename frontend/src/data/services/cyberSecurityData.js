
export const cyberSecurityProjects = [
  {
    id: 'cs-proj-1',
    serviceId: 'cyber-security',
    title: 'Zero-Trust Infrastructure Penetration Testing & Auditing',
    client: 'Global FinTech Banking Network',
    metric: 'Patched 14 High-Severity Vulnerabilities Prior to Launch',
    impactLabel: '14 Critical Patches',
    image: '/assets/services/cyber-security/cs-proj-1.jpg',
    description: 'Executed black-box penetration testing and code auditing, uncovering and remediating unauthorized privilege escalation paths.',
    tech: ['Burp Suite Pro', 'Metasploit', 'OWASP ZAP', 'Nmap', 'Python']
  },
  {
    id: 'cs-proj-2',
    serviceId: 'cyber-security',
    title: 'OWASP Top 10 Web & REST API Vulnerability Patching',
    client: 'Healthcare Cloud Platform',
    metric: 'Achieved 100% Security Benchmark Rating',
    impactLabel: '100% Security Rating',
    image: '/assets/services/cyber-security/cs-proj-2.jpg',
    description: 'Hardened RESTful API endpoints against SQL injection, XSS, and broken object-level authorization (BOLA) threats.',
    tech: ['Postman Security', 'OWASP API Top 10', 'ModSecurity WAF', 'JWT']
  },
  {
    id: 'cs-proj-3',
    serviceId: 'cyber-security',
    title: 'Real-Time SIEM Log Aggregation & SOC Threat Monitoring',
    client: 'Enterprise Insurance Systems',
    metric: 'Blocked 12,000+ Automated Malicious Bot Infiltration Attempts',
    impactLabel: '12k Bot Infiltrations Blocked',
    image: '/assets/services/cyber-security/cs-proj-3.jpg',
    description: 'Configured automated Splunk SIEM log dashboards processing sub-second firewall logs and triggering instant alert playbooks.',
    tech: ['Splunk SIEM', 'Elastic SOC', 'Snort IDS/IPS', 'Python Scripts']
  },
  {
    id: 'cs-proj-4',
    serviceId: 'cyber-security',
    title: 'Palo Alto Next-Gen Firewall Subnet Micro-Segmentation',
    client: 'National Data Center Provider',
    metric: 'Isolated 100% of Internal Core Database VLANs',
    impactLabel: '100% VLAN Micro-Segmentation',
    image: '/assets/services/cyber-security/cs-proj-4.jpg',
    description: 'Deployed Palo Alto firewalls with least-privilege App-ID rules to block lateral threat movement across internal networks.',
    tech: ['Palo Alto PA-5200', 'Panorama', 'App-ID', 'Micro-Segmentation']
  },
  {
    id: 'cs-proj-5',
    serviceId: 'cyber-security',
    title: 'ISO 27001 & SOC 2 Compliance Secrets Architecture',
    client: 'Cloud Software Enterprise',
    metric: 'Passed SOC 2 Type II Audit with Zero Non-Conformances',
    impactLabel: 'SOC 2 Type II Certified',
    image: '/assets/services/cyber-security/cs-proj-5.jpg',
    description: 'Integrated HashiCorp Vault for dynamic secret generation and configured encrypted audit log archiving in AWS S3.',
    tech: ['HashiCorp Vault', 'AWS KMS', 'SOC 2 Compliance', 'Terraform']
  },
  {
    id: 'cs-proj-6',
    serviceId: 'cyber-security',
    title: 'Automated Ransomware Protection & Incident Playbook',
    client: 'Global Logistics Conglomerate',
    metric: 'Achieved 3-Minute Threat Containment & Isolation Time',
    impactLabel: '3 Min Containment Time',
    image: '/assets/services/cyber-security/cs-proj-6.jpg',
    description: 'Built automated CrowdStrike EDR isolation scripts that sever compromised endpoint network connections instantly.',
    tech: ['CrowdStrike Falcon', 'SOAR Automation', 'Python', 'Powershell']
  }
];
