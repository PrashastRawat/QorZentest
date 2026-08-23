
export const cloudComputingProjects = [
  {
    id: 'cloud-proj-1',
    serviceId: 'cloud-computing',
    title: 'AWS Multi-Region Migration & Zero-Downtime Infrastructure',
    client: 'Global FinTech Banking Group',
    metric: 'Maintained 99.999% SLA Uptime Across 12M Users',
    impactLabel: '99.999% SLA Uptime',
    image: '/assets/services/cloud-computing/cloud-proj-1.jpg',
    description: 'Migrated legacy on-premise data center servers to AWS multi-region infrastructure using Terraform Infrastructure as Code.',
    tech: ['AWS', 'Terraform', 'Docker', 'PostgreSQL Multi-AZ', 'CloudWatch']
  },
  {
    id: 'cloud-proj-2',
    serviceId: 'cloud-computing',
    title: 'Kubernetes EKS Cluster Auto-Scaling Architecture',
    client: 'High-Traffic E-Commerce Enterprise',
    metric: 'Handled 80,000+ Concurrent Requests / Sec',
    impactLabel: '80k Concurrency Scale',
    image: '/assets/services/cloud-computing/cloud-proj-2.jpg',
    description: 'Deployed Amazon EKS Kubernetes clusters with Karpenter auto-scaler nodes, reducing infrastructure costs during off-peak hours by 42%.',
    tech: ['Kubernetes EKS', 'Karpenter', 'Helm', 'Prometheus', 'Grafana']
  },
  {
    id: 'cloud-proj-3',
    serviceId: 'cloud-computing',
    title: 'Automated GitOps CI/CD Security Pipeline',
    client: 'Healthcare Software Platform',
    metric: 'Accelerated Release Cycles from 2 Weeks to 15 Mins',
    impactLabel: '15 Min Deploy Cycle',
    image: '/assets/services/cloud-computing/cloud-proj-3.jpg',
    description: 'Configured GitHub Actions CI workflows and ArgoCD GitOps continuous delivery paired with automated Trivy vulnerability scanning.',
    tech: ['GitHub Actions', 'ArgoCD', 'Trivy', 'SonarQube', 'Kubernetes']
  },
  {
    id: 'cloud-proj-4',
    serviceId: 'cloud-computing',
    title: 'Serverless Lambda Event-Driven Data Pipeline',
    client: 'Media & Streaming Enterprise',
    metric: 'Processed 5M+ Daily Video Transcoding Tasks',
    impactLabel: '5M Daily Video Tasks',
    image: '/assets/services/cloud-computing/cloud-proj-4.jpg',
    description: 'Built a serverless AWS Lambda microservice pipeline that automatically processes, transcodes, and distributes video content to CloudFront CDN.',
    tech: ['AWS Lambda', 'Amazon SQS', 'DynamoDB', 'AWS CloudFront', 'Python']
  },
  {
    id: 'cloud-proj-5',
    serviceId: 'cloud-computing',
    title: 'Hybrid Cloud AWS Direct Connect & IPsec Mesh',
    client: 'National Energy Grid Enterprise',
    metric: 'Achieved Sub-5ms Hybrid Network Latency',
    impactLabel: 'Sub-5ms Network Latency',
    image: '/assets/services/cloud-computing/cloud-proj-5.jpg',
    description: 'Architected 10 Gbps AWS Direct Connect circuits paired with encrypted BGP IPsec VPN tunnels connecting remote operational facilities.',
    tech: ['AWS Direct Connect', 'BGP Routing', 'IPsec VPN', 'Palo Alto Firewall']
  },
  {
    id: 'cloud-proj-6',
    serviceId: 'cloud-computing',
    title: 'Disaster Recovery & Multi-Region Cross-Zone Failover',
    client: 'Global Insurance Capital Group',
    metric: 'Achieved Zero Recovery Point Objective (RPO = 0)',
    impactLabel: 'RPO = 0 Disaster Recovery',
    image: '/assets/services/cloud-computing/cloud-proj-6.jpg',
    description: 'Engineered automated multi-region database replication and Route 53 DNS failover triggers to withstand regional cloud outages.',
    tech: ['AWS Route 53', 'Amazon Aurora', 'Terraform', 'Datadog', 'PagerDuty']
  }
];
