

export const mockStudentUser = {
  id: 'STU-94821',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@student.qorzen.in',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
  phone: '+91 98765 43210',
  batch: 'QorZen Full Stack & AI Cohort 2026',
  batchTiming: 'Weekdays (Mon, Tue, Wed, Thur)',
  enrollmentDate: 'January 15, 2026',
  attendanceRate: '94%',
  overallGrade: 'A+',
  completedAssignments: 18,
  totalAssignments: 22,
  earnedCertificates: 2
};

export const mockEnrolledCourses = [
  {
    id: 'course-ai-agentic',
    title: 'AI Agentic Workflows & LangChain Architecture',
    category: 'AI & Automation',
    instructor: 'Dr. Vikramaditya Rao (Principal AI Engineer)',
    progress: 78,
    totalModules: 12,
    completedModules: 9,
    nextLesson: 'Building Multi-Agent RAG with Pinecone Vector DB',
    duration: '6 Months',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    status: 'In Progress'
  },
  {
    id: 'course-fullstack-mern',
    title: 'Full Stack MERN & Cloud Architecture',
    category: 'Technical Domains',
    instructor: 'Er. Rajesh Singhania (Lead Architect)',
    progress: 92,
    totalModules: 16,
    completedModules: 15,
    nextLesson: 'Deploying Dockerized Microservices on AWS EKS',
    duration: '6 Months',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    status: 'Almost Completed'
  },
  {
    id: 'course-cisco-ccna',
    title: 'Cisco CCNA (200-301) & Enterprise Network Automation',
    category: 'Networking',
    instructor: 'Pooja Verma (CCIE Certified)',
    progress: 45,
    totalModules: 10,
    completedModules: 4,
    nextLesson: 'OSPF Multi-Area Routing & Subnetting Labs',
    duration: '4 Months',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
    status: 'In Progress'
  }
];

export const mockCurriculumLessons = [
  {
    id: 'les-101',
    module: 'Module 9: Vector Search & Embeddings',
    title: 'Building Multi-Agent RAG with Pinecone Vector DB',
    duration: '48 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isCompleted: false,
    resources: ['Session-Slides.pdf', 'LangChain-Architecture-Code.zip', 'Lab-Exercise-09.docx'],
    summary: 'Master the principles of dense retrieval, OpenAI text-embedding-3-small, Pinecone index partitioning, and LangChain RetrievalQA chains.'
  },
  {
    id: 'les-102',
    module: 'Module 9: Vector Search & Embeddings',
    title: 'Hybrid Keyword + Semantic Search Strategies',
    duration: '35 mins',
    isCompleted: true
  },
  {
    id: 'les-103',
    module: 'Module 10: Multi-Agent Orchestration',
    title: 'CrewAI vs AutoGen: Comparing Agent Frameworks',
    duration: '52 mins',
    isCompleted: false
  },
  {
    id: 'les-104',
    module: 'Module 10: Multi-Agent Orchestration',
    title: 'Building a Autonomous Financial Research Crew',
    duration: '60 mins',
    isCompleted: false
  }
];

export const mockAssignments = [
  {
    id: 'asg-01',
    courseId: 'course-ai-agentic',
    courseName: 'AI Agentic Workflows',
    title: 'Build a Self-Correcting Python Code Generation Agent',
    dueDate: 'Feb 28, 2026',
    status: 'Pending',
    marks: '100 pts',
    description: 'Implement a LangGraph state graph with a generator LLM and a sandbox evaluator LLM to test unit tests iteratively.'
  },
  {
    id: 'asg-02',
    courseId: 'course-fullstack-mern',
    courseName: 'Full Stack MERN',
    title: 'Design Scalable Rate-Limiting Middleware with Redis',
    dueDate: 'Feb 22, 2026',
    status: 'Submitted',
    marks: '50 pts',
    grade: '48/50 (A+)',
    feedback: 'Excellent clean code with sliding window token bucket implementation!'
  },
  {
    id: 'asg-03',
    courseId: 'course-cisco-ccna',
    courseName: 'Cisco CCNA (200-301)',
    title: 'Packet Tracer Lab: Configure VLAN Trunking & Inter-VLAN Routing',
    dueDate: 'March 05, 2026',
    status: 'Pending',
    marks: '100 pts',
    description: 'Design topology in Cisco Packet Tracer with 4 VLANs, Subinterfaces, and Router-on-a-Stick configuration.'
  }
];

export const mockLiveClasses = [
  {
    id: 'live-01',
    title: 'Live Lab: Multi-Agent Deployment & Docker Containers',
    instructor: 'Dr. Vikramaditya Rao',
    date: 'Today, 7:00 PM IST',
    duration: '90 Mins',
    status: 'Upcoming Today',
    meetingLink: 'https://meet.google.com/qorzen-live-lab',
    isLiveNow: false,
    batch: 'Weekdays Batch A'
  },
  {
    id: 'live-02',
    title: 'Masterclass: Preparing for Senior React & Node.js System Design Interviews',
    instructor: 'Er. Rajesh Singhania',
    date: 'Tomorrow, 6:30 PM IST',
    duration: '120 Mins',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/qorzen-system-design',
    isLiveNow: false,
    batch: 'All Cohorts'
  },
  {
    id: 'live-03',
    title: 'Networking Troubleshooting & Wireshark Packet Analysis',
    instructor: 'Pooja Verma',
    date: 'Recorded Session (Feb 18, 2026)',
    duration: '75 Mins',
    status: 'Recorded',
    recordingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isLiveNow: false,
    batch: 'Networking Specialization'
  }
];

export const mockCertificates = [
  {
    id: 'CERT-QOR-88210',
    title: 'Certificate of Excellence: Advanced Web Technologies & API Design',
    issueDate: 'January 10, 2026',
    grade: 'Distinction (96%)',
    credentialId: 'QORZEN-CERT-2026-88210',
    issuer: 'QorZen Technologies Learning Council',
    pdfUrl: '#',
    status: 'Verified'
  },
  {
    id: 'CERT-QOR-77491',
    title: 'Professional Certification: Python for Automation & Data Engineering',
    issueDate: 'December 20, 2025',
    grade: 'Grade A (91%)',
    credentialId: 'QORZEN-CERT-2025-77491',
    issuer: 'QorZen Technologies Academy',
    pdfUrl: '#',
    status: 'Verified'
  }
];

export const mockNotifications = [
  {
    id: 'notif-01',
    title: 'Live Lab Reminder',
    message: 'Your practical live session on Multi-Agent Deployment starts today at 7:00 PM IST.',
    time: '2 hours ago',
    type: 'class',
    unread: true
  },
  {
    id: 'notif-02',
    title: 'Assignment Graded',
    message: 'Your submission for "Rate-Limiting Middleware" has been graded: 48/50 (Grade A+).',
    time: '1 day ago',
    type: 'grade',
    unread: true
  },
  {
    id: 'notif-03',
    title: 'New Course Resource Added',
    message: 'Dr. Vikramaditya added Session-Slides.pdf for Module 9 in AI Agentic Workflows.',
    time: '2 days ago',
    type: 'resource',
    unread: false
  },
  {
    id: 'notif-04',
    title: 'Internship Placement Drive',
    message: 'Registration for QorZen Spring 2026 Industry Internship is open for enrolled students.',
    time: '3 days ago',
    type: 'announcement',
    unread: false
  }
];
