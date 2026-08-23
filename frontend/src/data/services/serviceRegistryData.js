
export const serviceRegistry = {
  'ai-automation': {
    id: 'ai-automation',
    title: 'AI & Automation Engineering',
    categoryLabel: 'Artificial Intelligence & Workflow Automation',
    tagline: 'Empower your enterprise with multi-agent workflows, custom LLM integrations, and RAG search pipelines.',
    overview: 'We engineer custom agentic AI systems that transform routine corporate workflows into autonomous engines. From LangChain multi-agent orchestration to high-throughput RAG document retrieval and OCR invoice processing, our solutions reduce operational overhead while guaranteeing security.',
    capabilities: [
      'Multi-Agent LLM Orchestration (LangChain, CrewAI)',
      'Vector Search & RAG Knowledge Retrieval (Pinecone)',
      'Automated Document OCR & Receipt Parsing (Textract)',
      'n8n & Zapier Workflow Integration Webhooks',
      'Predictive Machine Learning & Demand Forecasting'
    ],
    approach: 'We take an AI-Native, Safety-First approach. Rather than relying on simple wrappers, we build custom agentic pipelines backed by enterprise vector databases (Pinecone), local/open-source LLMs (Llama 3), and strict data sanitization guardrails.',
    methodology: [
      { step: '01', title: 'Workflow Audit & Feasibility', desc: 'Identify repetitive high-cost enterprise bottlenecks suitable for autonomous AI agent execution.' },
      { step: '02', title: 'Vector Indexing & RAG Architecture', desc: 'Index corporate knowledge bases, PDFs, and database records into high-dimensional vector embeddings.' },
      { step: '03', title: 'Multi-Agent Orchestration Sprints', desc: 'Develop specialized LangChain / CrewAI agents with dedicated tool execution permissions.' },
      { step: '04', title: 'Guardrail Testing & Production Release', desc: 'Deploy NeMo guardrails, PII redaction filters, and automated n8n webhook triggers.' }
    ],
    techniques: [
      { title: 'Retrieval-Augmented Generation (RAG)', desc: 'Prevents LLM hallucinations by injecting verified enterprise vector embeddings into real-time context prompts.' },
      { title: 'Multi-Agent Task Delegation', desc: 'Assigns complex tasks to isolated agents (e.g. Researcher -> Writer -> Reviewer) for higher accuracy.' },
      { title: 'Asynchronous Webhook Automation', desc: 'Uses n8n and Redis queues to handle high-throughput background tasks without UI latency.' },
      { title: 'Zero-Data-Retention Safeguards', desc: 'Ensures corporate data remains strictly isolated without model training leakage.' }
    ],
    whyThisWay: 'Off-the-shelf AI chatbots lack enterprise security and hallucinate on custom corporate data. Our vector RAG architecture and agentic delegation guarantee sub-second accuracy, 100% data privacy, and up to 85% reduction in manual operational overhead.'
  },

  'data-analysis': {
    id: 'data-analysis',
    title: 'Data Analysis & Data Science',
    categoryLabel: 'Enterprise Data Science & Telemetry',
    tagline: 'Transform raw corporate data streams into predictive business intelligence and actionable executive telemetry.',
    overview: 'Our data science engineers build automated ETL data pipelines in Apache Airflow and Snowflake, interactive Power BI executive dashboards, and machine learning customer churn models to give your decision-makers real-time visibility.',
    capabilities: [
      'Executive Telemetry & Financial BI Dashboards (Power BI, Tableau)',
      'Machine Learning Customer Churn & Retention Models',
      'Snowflake & Apache Airflow Data Warehouse Pipelines',
      'Real-Time Apache Kafka Telemetry & Stream Processing',
      'HIPAA-Compliant Healthcare Patient Outcome Analytics'
    ],
    approach: 'We enforce Single Source of Truth (SSOT) data modeling. Raw data streams are ingested via automated Apache Airflow pipelines into centralized Snowflake warehouses, cleaned using dbt transformations, and served via sub-second BI dashboards.',
    methodology: [
      { step: '01', title: 'Data Source Audit & Schema Mapping', desc: 'Map all transactional databases, CRM events, and third-party APIs into a unified schema.' },
      { step: '02', title: 'ETL Pipeline Architecture', desc: 'Configure Apache Airflow orchestration DAGs and dbt data transformations in Snowflake.' },
      { step: '03', title: 'Predictive Model Training', desc: 'Train Scikit-Learn and PyTorch models for churn prediction and revenue forecasting.' },
      { step: '04', title: 'Dashboard Deployment & Access Control', desc: 'Build interactive Power BI / Looker dashboards with role-based access control (RBAC).' }
    ],
    techniques: [
      { title: 'Automated dbt Transformations', desc: 'Transforms raw SQL staging data into optimized analytical data marts for instant queries.' },
      { title: 'Apache Kafka Stream Processing', desc: 'Ingests sub-second event logs for real-time fraud detection and operational monitoring.' },
      { title: 'Cohort & RFM Analysis', desc: 'Segments user bases by Recency, Frequency, and Monetary metrics to maximize customer lifetime value.' },
      { title: 'Anomaly Detection Algorithms', desc: 'Uses Isolation Forests to automatically flag financial irregularities and outlier events.' }
    ],
    whyThisWay: 'Legacy static reporting causes data silos and slow decision cycles. Our automated ETL and telemetry pipelines provide C-suite executives with sub-second, verified data insights, ensuring faster strategic pivots and zero manual spreadsheet errors.'
  },

  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing & Performance Growth',
    categoryLabel: 'Omnichannel B2B Growth & CRO',
    tagline: 'Accelerate qualified B2B customer acquisition with intent-targeted search ads, ABM, and GA4 telemetry.',
    overview: 'We execute data-driven digital marketing campaigns designed strictly for revenue conversion. By combining Meta & Google Search ad management with server-side GA4 attribution and A/B landing page optimization, we deliver measurable ROI.',
    capabilities: [
      'Omnichannel Meta & Google Performance Ads',
      'Account-Based Marketing (ABM) Executive Campaigns',
      'Conversion Rate Optimization (CRO) Multivariate Testing',
      'Automated Behavioral Lead Nurturing Email Engines',
      'GA4 Multi-Touch Server-Side Attribution Dashboards'
    ],
    approach: 'We utilize an Intent-Driven, Data-Verified Growth Framework. Campaigns are targeted strictly at high-intent B2B search terms and LinkedIn decision-makers, while server-side GA4 attribution tracks full-funnel customer acquisition costs.',
    methodology: [
      { step: '01', title: 'Ideal Customer Profile (ICP) Research', desc: 'Define high-margin buyer personas and map executive search intent across acquisition channels.' },
      { step: '02', title: 'Campaign Setup & Server-Side Tracking', desc: 'Configure GTM server-side tagging, Meta Pixel API, and GA4 custom events for 100% attribution.' },
      { step: '03', title: 'High-Converting Landing Page Design', desc: 'Build speed-optimized landing pages with clear value propositions and low-friction lead capture.' },
      { step: '04', title: 'Continuous CRO & Algorithmic Scaling', desc: 'Run weekly VWO multivariate A/B tests to scale top-performing ad copy and bidding strategies.' }
    ],
    techniques: [
      { title: 'Account-Based Marketing (ABM)', desc: 'Pinpoints specific Fortune 500 decision-makers on LinkedIn with tailored value propositions.' },
      { title: 'Server-Side GA4 Attribution', desc: 'Bypasses browser ad-blockers and iOS privacy restrictions for 100% accurate ad spend tracking.' },
      { title: 'Multivariate Conversion Rate Optimization', desc: 'Tests headline copy, form fields, and CTA buttons to systematically increase conversion rates.' },
      { title: 'Behavioral Email Lead Nurturing', desc: 'Triggers automated email sequences based on user website interactions and content downloads.' }
    ],
    whyThisWay: 'Generic spray-and-pray ad campaigns waste marketing budgets on unqualified clicks. Our intent-driven targeting and server-side telemetry guarantee zero ad spend waste and deliver verified sales-qualified leads with high ROAS.'
  },

  'web-design': {
    id: 'web-design',
    title: 'Web Design & Frontend Development',
    categoryLabel: 'Enterprise Web Applications & Design Systems',
    tagline: 'Craft sub-second, accessible web applications powered by React 19, Next.js, and custom design systems.',
    overview: 'Our web design team builds lightning-fast, high-converting B2B web engines. Prioritizing 98+ Google Lighthouse scores, modular component libraries, responsive UX micro-interactions, and dark mode, we deliver memorable web experiences.',
    capabilities: [
      'Headless Next.js & React 19 Enterprise Portals',
      'Custom Component Libraries & Accessible Design Systems',
      'High-Converting B2B Corporate Web Engines',
      'Interactive Real-Time Telemetry Dashboard Screens',
      'Multi-Tenant Learning Management & Streaming Platforms'
    ],
    approach: 'We follow a Component-Driven, Mobile-First Web Architecture. We build modular, reusable React 19 component libraries governed by strict design tokens, ensuring sub-second page loads and 100% responsiveness across all mobile and desktop devices.',
    methodology: [
      { step: '01', title: 'UX Research & Wireframing', desc: 'Conduct user journey mapping and create interactive Figma low-fidelity prototypes.' },
      { step: '02', title: 'Design System & Token Definition', desc: 'Establish single-source-of-truth typography, color variables, grid layouts, and micro-interactions.' },
      { step: '03', title: 'Modular React Component Development', desc: 'Develop clean, reusable React 19 components with Framer Motion animations and ARIA accessibility.' },
      { step: '04', title: 'Lighthouse Audit & Production Deploy', desc: 'Optimize Core Web Vitals (LCP, CLS, INP) for 95+ performance scores and launch on Vercel/AWS.' }
    ],
    techniques: [
      { title: 'Server-Driven UI Rendering', desc: 'Leverages Next.js App Router for server-rendered HTML delivery, maximizing SEO and speed.' },
      { title: 'Fluid CSS Clamp Scaling', desc: 'Ensures typography and grid layouts adapt dynamically without breaking layouts on small screens.' },
      { title: 'Atomic Design Architecture', desc: 'Organizes components into Atoms, Molecules, and Organisms for maximum code reusability.' },
      { title: 'Core Web Vitals Optimization', desc: 'Minimizes JavaScript bundle size and compresses assets for instant sub-second page loads.' }
    ],
    whyThisWay: 'Monolithic legacy page builders create bloated, slow websites that rank poorly on Google and frustrate users. Our React 19 component architecture guarantees 98+ Lighthouse speed, total design consistency, and frictionless conversion flows.'
  },

  'software-development': {
    id: 'software-development',
    title: 'Software Development & Custom ERP',
    categoryLabel: 'Custom Cloud Applications & SaaS',
    tagline: 'Architect resilient cloud ERP platforms, SaaS microservices, and cross-platform mobile apps built for scale.',
    overview: 'We develop bespoke software applications tailored to complex enterprise requirements. Whether building inventory management ERPs, Stripe billing microservices, or offline-first React Native field apps, we enforce 100% data integrity.',
    capabilities: [
      'Full-Stack Cloud ERP & Inventory Management Systems',
      'Scalable Microservices SaaS Billing & Payment Gateways',
      'HIPAA-Compliant Electronic Health Records (EHR)',
      'Real-Time Warehouse & IoT Telemetry Dashboards',
      'Offline-First React Native Mobile Field Service Apps'
    ],
    approach: 'We enforce Domain-Driven Design (DDD) & Microservices Decoupling. Core business logic is encapsulated in isolated services communicated via RESTful APIs and gRPC, preventing monolithic failure points and ensuring horizontal scalability.',
    methodology: [
      { step: '01', title: 'Domain Modeling & API Architecture', desc: 'Map enterprise data relationships and define OpenAPI REST/GraphQL contracts.' },
      { step: '02', title: 'Database Schema & Cache Design', desc: 'Architect PostgreSQL relational tables paired with Redis in-memory caching for sub-millisecond lookups.' },
      { step: '03', title: 'Agile Microservice Development', desc: 'Build decoupled Node.js/Python services with 100% unit test coverage.' },
      { step: '04', title: 'Automated Security & Cloud Release', desc: 'Execute automated CI/CD security scanning, Docker containerization, and zero-downtime rolling deploys.' }
    ],
    techniques: [
      { title: 'Event-Driven Microservices', desc: 'Uses RabbitMQ / Kafka event queues to process background jobs asynchronously without API blocking.' },
      { title: 'ACID-Compliant Relational Storage', desc: 'Enforces strict transactional guarantees in PostgreSQL for financial and inventory data.' },
      { title: 'JWT & OAuth2 RBAC Authorization', desc: 'Implements role-based access controls to safeguard sensitive enterprise endpoints.' },
      { title: 'Containerized Deployment (Docker/K8s)', desc: 'Packages applications into portable containers for seamless deployment across any cloud.' }
    ],
    whyThisWay: 'Off-the-shelf software forces enterprises into rigid workflows and expensive licensing fees. Our custom microservices architecture gives you 100% IP ownership, infinite customizability, and zero performance bottlenecks.'
  },

  'graphic-designing': {
    id: 'graphic-designing',
    title: 'Graphic Designing & Brand UI/UX',
    categoryLabel: 'Brand Identity & Visual Architecture',
    tagline: 'Establish commanding corporate visual identities, Figma design token systems, and 3D motion graphics.',
    overview: 'Our design studio translates technical complexity into elegant visual design assets. From complete brand identity guidelines to 200+ component Figma UI libraries and interactive 3D product motion graphics, we elevate your brand standard.',
    capabilities: [
      'Corporate Brand Identity Systems & Style Guides',
      '200+ Component Figma Design Libraries & Tokens',
      'Interactive 3D Motion Graphics & Video Visuals',
      'Modern Vector Asset Libraries & Deck Collateral',
      'Mobile App High-Fidelity Interactive UI Prototypes'
    ],
    approach: 'We practice Human-Centered Design System Architecture. Visual assets are not created as static graphics, but as structured, tokens-based design libraries that align brand identity seamlessly across digital and print collateral.',
    methodology: [
      { step: '01', title: 'Brand Discovery & Competitor Audit', desc: 'Analyze target audience demographics, brand positioning, and industry visual trends.' },
      { step: '02', title: 'Identity System & Token Creation', desc: 'Define color palettes, typography scales, iconography sets, and brand guidelines.' },
      { step: '03', title: 'Figma Component Library Development', desc: 'Build interactive UI component kits with autolayout and variant states.' },
      { step: '04', title: 'Asset Export & Handoff', desc: 'Export production-ready SVG assets, 3D motion renders, and developer handoff documentation.' }
    ],
    techniques: [
      { title: 'Figma Auto-Layout & Variants', desc: 'Builds responsive component kits that scale fluidly across screen dimensions.' },
      { title: '3D Spline / Blender Motion Renders', desc: 'Creates eye-catching 3D product visual assets that increase engagement.' },
      { title: 'Accessible Color Contrast Styling', desc: 'Ensures all brand color pairings meet WCAG AA/AAA legibility standards.' },
      { title: 'Scalable Vector Asset Libraries', desc: 'Delivers zero-pixelation SVG graphics for crisp rendering on high-DPI displays.' }
    ],
    whyThisWay: 'Inconsistent visual branding undermines consumer trust and dilutes brand equity. Our systematic design token approach guarantees 100% brand consistency, faster developer handoffs, and visual superiority over competitors.'
  },

  'seo': {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    categoryLabel: 'Programmatic & Technical SEO',
    tagline: 'Dominate organic search rankings with technical crawl audits, JSON-LD schema, and topical authority hubs.',
    overview: 'We deploy technical and programmatic SEO strategies that scale organic search impressions. By fixing JavaScript rendering, implementing structured data schema, and optimizing Core Web Vitals, we convert searchers into leads.',
    capabilities: [
      'Programmatic Technical SEO & Crawl Budget Audits',
      'JSON-LD Product, Review & Organization Schema',
      'Local Business Profile Expansion & Geo-Targeting',
      'Core Web Vitals Speed & Mobile Rendering Optimization',
      'Topical Authority Content Hub & Pillar Architecture'
    ],
    approach: 'We execute a Technical-First, Topical Authority SEO Strategy. We resolve underlying site architecture issues, optimize Core Web Vitals, and deploy structured schema before creating targeted topical content hubs.',
    methodology: [
      { step: '01', title: 'Technical Crawl & Log Audit', desc: 'Audit site crawl budget, broken redirects, canonical tags, and mobile rendering using Screaming Frog.' },
      { step: '02', title: 'JSON-LD Schema Implementation', desc: 'Embed rich snippet schema markup for Organization, Products, FAQs, and Breadcrumbs.' },
      { step: '03', title: 'Keyword Intent & Pillar Mapping', desc: 'Structure content into high-authority topical clusters linked to primary service landing pages.' },
      { step: '04', title: 'Backlink Authority & Ranking Tracking', desc: 'Acquire high-DA contextual editorial links and track daily ranking movements in Ahrefs.' }
    ],
    techniques: [
      { title: 'JSON-LD Structured Data Schema', desc: 'Communicates site content directly to Google search bots for enhanced rich search snippets.' },
      { title: 'Crawl Budget Optimization', desc: 'Eliminates duplicate content paths and optimizes robots.txt for faster bot indexing.' },
      { title: 'Topical Authority Clustering', desc: 'Groups related articles around core pillar pages to establish domain expertise.' },
      { title: 'Core Web Vitals Performance Tuning', desc: 'Optimizes LCP, CLS, and INP metrics to meet Google ranking signals.' }
    ],
    whyThisWay: 'Shallow keyword stuffing and low-quality spam links lead to Google ranking penalties. Our technical schema architecture and topical content hubs build permanent, defensible organic search dominance.'
  },

  'social-media-marketing': {
    id: 'social-media-marketing',
    title: 'Social Media Marketing & Community',
    categoryLabel: 'Social Growth & Thought Leadership',
    tagline: 'Build an engaged social media presence through short-form video reels, LinkedIn posts, and social listening.',
    overview: 'We turn social channels into B2B lead drivers. Through viral video reel editing, executive LinkedIn thought leadership, multi-platform publishing automation, and real-time sentiment listening, we build active brand communities.',
    capabilities: [
      'Viral Short-Form Reel Production & Strategy',
      'B2B LinkedIn Executive Thought Leadership Writing',
      'Multi-Platform Content Calendar Automation (Metricool, n8n)',
      'Influencer & Brand Partnership Campaign Tracking',
      'Real-Time Community Management & Social Listening AI'
    ],
    approach: 'We utilize an Executive Thought Leadership & Short-Form Video Strategy. We convert complex industry insights into engaging LinkedIn carousel posts and high-velocity short-form video reels that build authority and trust.',
    methodology: [
      { step: '01', title: 'Audience Demographics & Voice Audit', desc: 'Analyze target community interests, platform habits, and competitor engagement.' },
      { step: '02', title: 'Content Pillar & Calendar Creation', desc: 'Establish monthly posting schedules covering educational, promotional, and social proof topics.' },
      { step: '03', title: 'Short-Form Reel & Graphic Editing', desc: 'Produce high-converting video reels with dynamic captions and engaging visual hooks.' },
      { step: '04', title: 'Automated Publishing & Community Growth', desc: 'Automate post scheduling and engage in real-time comment moderation and lead outreach.' }
    ],
    techniques: [
      { title: 'LinkedIn B2B Carousel Formatting', desc: 'Uses visual slide decks to increase dwell time and engagement on professional feeds.' },
      { title: 'Short-Form Kinetic Video Editing', desc: 'Applies fast-paced cuts, sound design, and animated text captions to maximize retention.' },
      { title: 'Automated Multi-Channel Publishing', desc: 'Schedules posts across LinkedIn, Twitter/X, Instagram, and YouTube simultaneously.' },
      { title: 'Social Listening Sentiment Analysis', desc: 'Monitors brand mentions and industry keywords to capture warm sales opportunities.' }
    ],
    whyThisWay: 'Generic stock imagery and irregular posting fail to engage modern decision-makers. Our executive thought leadership and short-form video strategy build genuine human trust and consistent incoming brand inquiries.'
  },

  'cloud-computing': {
    id: 'cloud-computing',
    title: 'Cloud Computing & DevOps Solutions',
    categoryLabel: 'Enterprise Cloud Architecture & CI/CD',
    tagline: 'Deploy resilient AWS multi-region infrastructures, Kubernetes clusters, and automated GitOps CI/CD pipelines.',
    overview: 'Our DevOps engineers build 99.999% uptime cloud architectures on AWS. Leveraging Terraform IaC, Kubernetes EKS auto-scaling, serverless Lambda microservices, and cross-region disaster recovery, we secure your cloud backend.',
    capabilities: [
      'AWS Multi-Region Infrastructure Migration (Terraform IaC)',
      'Kubernetes EKS Auto-Scaling Cluster Setup (Karpenter)',
      'Serverless Lambda Event Microservices Architecture',
      'Hybrid Cloud AWS Direct Connect & IPsec VPN Mesh',
      'Automated GitOps CI/CD Security Pipelines (GitHub Actions, ArgoCD)'
    ],
    approach: 'We practice Infrastructure as Code (IaC) & Zero-Trust Cloud Architecture. All cloud environments are defined declaratively in Terraform, version-controlled in Git, and deployed via automated GitOps pipelines with 99.999% uptime SLAs.',
    methodology: [
      { step: '01', title: 'Cloud Infrastructure Audit & Cost Assessment', desc: 'Analyze existing server workloads, security vulnerabilities, and monthly cloud spend.' },
      { step: '02', title: 'Terraform IaC Blueprinting', desc: 'Write modular Terraform scripts for VPC subnets, IAM policies, and RDS databases.' },
      { step: '03', title: 'Kubernetes EKS & CI/CD Pipeline Setup', desc: 'Deploy EKS clusters with Karpenter auto-scaling and ArgoCD automated GitOps deployments.' },
      { step: '04', title: 'Disaster Recovery & 24/7 Monitoring', desc: 'Configure multi-region failover, Datadog APM metrics, and automated PagerDuty alerts.' }
    ],
    techniques: [
      { title: 'Declarative Terraform Infrastructure as Code', desc: 'Eliminates manual cloud console edits, making infrastructure 100% reproducible and auditable.' },
      { title: 'Kubernetes Karpenter Auto-Scaling', desc: 'Dynamically provisions optimal EC2 compute nodes in seconds based on active workload demand.' },
      { title: 'GitOps Continuous Deployment (ArgoCD)', desc: 'Syncs cluster state directly with Git repositories, preventing unauthorized cloud drifts.' },
      { title: 'Multi-Region Cross-Zone Failover', desc: 'Replicates data across isolated AWS availability zones for zero data loss (RPO/RTO = 0).' }
    ],
    whyThisWay: 'Manual server configuration leads to downtime, configuration drift, and bloated monthly bills. Our Terraform IaC and Kubernetes auto-scaling guarantee 99.999% uptime SLA while reducing monthly infrastructure costs by up to 45%.'
  },

  'cyber-security': {
    id: 'cyber-security',
    title: 'Cyber Security & Infrastructure Auditing',
    categoryLabel: 'Zero-Trust Cyber Security & Auditing',
    tagline: 'Protect corporate assets with OWASP penetration testing, SIEM log monitoring, and ISO 27001 compliance.',
    overview: 'We safeguard digital infrastructure against advanced cyber threats. Conducting rigorous black-box penetration tests, configuring Palo Alto firewalls, automating SOC log monitoring in Splunk, and managing encrypted secrets in Vault.',
    capabilities: [
      'Zero-Trust Infrastructure Penetration Testing & Auditing',
      'OWASP Top 10 Web & API Vulnerability Patching',
      'Real-Time SIEM Log Aggregation & SOC Threat Monitoring',
      'Palo Alto Next-Gen Firewall Subnet Micro-Segmentation',
      'ISO 27001 / SOC 2 Compliance Logging & HashiCorp Vault'
    ],
    approach: 'We implement a Defense-in-Depth, Zero-Trust Architecture. We assume network compromise and enforce strict identity verification, micro-segmentation, encryption at rest and in transit, and continuous SIEM threat monitoring.',
    methodology: [
      { step: '01', title: 'Vulnerability Assessment & Pen Testing', desc: 'Conduct automated scanning and manual OWASP penetration testing across networks and APIs.' },
      { step: '02', title: 'Zero-Trust Network Micro-Segmentation', desc: 'Isolate database subnets and enforce Palo Alto firewall least-privilege security policies.' },
      { step: '03', title: 'SIEM Log Monitoring & Vault Secrets Integration', desc: 'Aggregate logs into Splunk SOC dashboards and store all API keys in HashiCorp Vault.' },
      { step: '04', title: 'Compliance Certification & Incident Plan', desc: 'Deliver ISO 27001 / SOC 2 audit reports and establish automated incident response playbooks.' }
    ],
    techniques: [
      { title: 'Zero-Trust Network Access (ZTNA)', desc: 'Requires continuous authentication and device posture verification for every network request.' },
      { title: 'HashiCorp Vault Secrets Encryption', desc: 'Centralizes and encrypts sensitive database credentials, preventing source code secret leaks.' },
      { title: 'OWASP Top 10 Hardening', desc: 'Remediates SQL injections, XSS vulnerabilities, and unauthorized privilege escalation paths.' },
      { title: 'Real-Time SIEM Threat Aggregation', desc: 'Correlates security event logs using machine learning to detect and block breach attempts instantly.' }
    ],
    whyThisWay: 'Relying on simple perimeter firewalls leaves enterprises vulnerable to internal breaches and ransomware. Our Zero-Trust micro-segmentation and Vault encryption ensure complete security compliance and zero data breaches.'
  },

  'networking': {
    id: 'networking',
    title: 'Networking & Infrastructure Engineering',
    categoryLabel: 'Enterprise Software-Defined Networking',
    tagline: 'Architect 10 Gbps Cisco SD-WAN meshes, high-density Wi-Fi 6 campus networks, and ZTNA remote access.',
    overview: 'Our network engineers build redundant enterprise networks. From multi-branch Cisco SD-WAN failover meshes to data center spine-leaf VXLAN fabrics and zero-trust remote access, we ensure low latency connectivity.',
    capabilities: [
      'Enterprise Software-Defined WAN (Cisco SD-WAN Mesh)',
      'High-Density Wi-Fi 6 Campus Access & RADIUS 802.1X',
      'Data Center Spine-Leaf Network Fabrics (VXLAN EVPN)',
      'Zero-Trust Network Access (ZTNA) Micro-Segmentation',
      'Enterprise VoIP & Unified Communications Setup (Cisco CUCM)'
    ],
    approach: 'We design Redundant, High-Throughput Software-Defined Networks. By deploying dual-ISP failover SD-WAN meshes and spine-leaf data center fabrics, we guarantee uninterrupted multi-gigabit connectivity.',
    methodology: [
      { step: '01', title: 'Site Heatmap & Bandwidth Audit', desc: 'Perform physical site surveys, RF spectrum analysis, and WAN bandwidth utilization mapping.' },
      { step: '02', title: 'Cisco SD-WAN & VXLAN Architecture', desc: 'Design dual-headend SD-WAN hub policies and VXLAN EVPN data center spine-leaf fabrics.' },
      { step: '03', title: 'Hardware Deployment & RADIUS Setup', desc: 'Install enterprise Cisco switches, Wi-Fi 6 APs, and configure 802.1X network authentication.' },
      { step: '04', title: 'Failover Testing & SNMP Telemetry', desc: 'Simulate ISP fiber cuts to verify sub-second WAN failover and monitor network health in SolarWinds.' }
    ],
    techniques: [
      { title: 'Cisco SD-WAN Dynamic Path Control', desc: 'Automatically routes critical application traffic over the fastest WAN path in real time.' },
      { title: 'VXLAN EVPN Spine-Leaf Fabric', desc: 'Provides scalable Layer 2 adjacency across Layer 3 networks with minimal latency.' },
      { title: '802.1X RADIUS Authentication', desc: 'Enforces strict device-level network access control before granting VLAN access.' },
      { title: 'Dual-ISP Sub-Second Failover', desc: 'Combines MPLS and Fiber broadband connections to maintain continuous uptime.' }
    ],
    whyThisWay: 'Legacy static WAN connections suffer from single-point-of-failure outages and high MPLS costs. Our Cisco SD-WAN dynamic mesh guarantees sub-second failover and multi-gigabit throughput at a fraction of traditional operating costs.'
  },

  // Aliases for route slugs
  'networking-it': {
    id: 'networking-it',
    title: 'Networking & Infrastructure Engineering',
    categoryLabel: 'Enterprise Software-Defined Networking',
    tagline: 'Architect 10 Gbps Cisco SD-WAN meshes, high-density Wi-Fi 6 campus networks, and ZTNA remote access.',
    overview: 'Our network engineers build redundant enterprise networks.',
    capabilities: ['Cisco SD-WAN Mesh', 'Wi-Fi 6 Campus Access', 'Zero-Trust ZTNA'],
    approach: 'Redundant SD-WAN Architecture',
    methodology: [
      { step: '01', title: 'Bandwidth Audit', desc: 'Audit network utilization and site topology.' },
      { step: '02', title: 'SD-WAN Design', desc: 'Design dual-ISP WAN failover policies.' },
      { step: '03', title: 'Hardware Installation', desc: 'Deploy Cisco switches and Wi-Fi 6 access points.' },
      { step: '04', title: 'Failover Verification', desc: 'Verify zero-downtime ISP failover switching.' }
    ],
    techniques: [
      { title: 'Cisco SD-WAN Mesh', desc: 'Dynamic WAN routing.' },
      { title: '802.1X RADIUS', desc: 'Network identity verification.' }
    ],
    whyThisWay: 'Guarantees sub-second WAN failover and zero network downtime.'
  },

  'social-media': {
    id: 'social-media',
    title: 'Social Media Marketing & Community',
    categoryLabel: 'Social Growth & Thought Leadership',
    tagline: 'Build an engaged social media presence through short-form video reels, LinkedIn posts, and social listening.',
    overview: 'We turn social channels into B2B lead drivers.',
    capabilities: ['Short-Form Video Reels', 'LinkedIn Leadership', 'Community Management'],
    approach: 'Executive Thought Leadership Strategy',
    methodology: [
      { step: '01', title: 'Brand Audit', desc: 'Analyze channel demographics.' },
      { step: '02', title: 'Content Calendar', desc: 'Plan monthly posting schedules.' },
      { step: '03', title: 'Video Production', desc: 'Edit short-form reels.' },
      { step: '04', title: 'Publishing Automation', desc: 'Automate post distribution.' }
    ],
    techniques: [
      { title: 'LinkedIn Carousels', desc: 'Engaging visual slide decks.' },
      { title: 'Short-Form Reels', desc: 'Fast-paced video editing.' }
    ],
    whyThisWay: 'Builds authentic executive authority and consistent organic leads.'
  }
};
