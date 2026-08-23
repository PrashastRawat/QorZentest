
/**
 * ============================================================================
 * BACKEND DEVELOPER GUIDE (Hinglish Guide for Course Dataset):
 * ============================================================================
 * Course Schema for MongoDB:
 * - id: String (unique identifier)
 * - title: String (e.g. 'Cisco CCNA (200-301)')
 * - category: String (e.g. 'Networking', 'Technical', 'AI & Digital Skills')
 * - duration: String ('1 Month', '3 Months', '6 Months')
 * - price: Number (in INR)
 * - mode: String ('Online')
 * 
 * MongoDB me insert karne ke liye `db.courses.insertMany(coursePricingData)` use kar sakte hain.
 * ============================================================================
 */

export const coursePricingData = [
  // --- NETWORKING COURSES (12) ---
  { id: "net-01", title: "CCNA Automation", category: "Networking", duration: "3 Months", price: 12499 },
  { id: "net-02", title: "Ethical Hacking", category: "Networking", duration: "3 Months", price: 12999 },
  { id: "net-03", title: "CCNA", category: "Networking", duration: "3 Months", price: 11999 },
  { id: "net-04", title: "CCNA + CCNA Security", category: "Networking", duration: "6 Months", price: 15499 },
  { id: "net-05", title: "Computer Fundamentals", category: "Networking", duration: "1 Month", price: 4999 },
  { id: "net-06", title: "TCP/IP Masterclass", category: "Networking", duration: "3 Months", price: 7999 },
  { id: "net-07", title: "Cisco CCNA (200-301)", category: "Networking", duration: "3 Months", price: 13999 },
  { id: "net-08", title: "Network Engineering", category: "Networking", duration: "3 Months", price: 14499 },
  { id: "net-09", title: "CCNA + ECCNP", category: "Networking", duration: "6 Months", price: 15999 },
  { id: "net-10", title: "Cloud and Networking Pro", category: "Networking", duration: "3 Months", price: 14999 },
  { id: "net-11", title: "Network Security & Firewall Expert", category: "Networking", duration: "6 Months", price: 14499 },
  { id: "net-12", title: "Enterprise Networking Masterclass", category: "Networking", duration: "6 Months", price: 14999 },

  // --- AI, DATA & DIGITAL SKILLS ---
  { id: "ai-01", title: "AI Coding", category: "AI & Digital Skills", duration: "3 Months", price: 1499 },
  { id: "ai-02", title: "AI Automation", category: "AI & Digital Skills", duration: "3 Months", price: 1999 },
  { id: "ai-03", title: "Data Analyst", category: "AI & Digital Skills", duration: "3 Months", price: 1499 },
  { id: "ai-04", title: "Data Science (Short)", category: "AI & Digital Skills", duration: "3 Months", price: 1699 },
  { id: "ai-05", title: "UI UX", category: "AI & Digital Skills", duration: "3 Months", price: 1299 },
  { id: "ai-06", title: "Graphic designing", category: "AI & Digital Skills", duration: "3 Months", price: 1299 },
  { id: "ai-07", title: "AI video Editing", category: "AI & Digital Skills", duration: "3 Months", price: 999 },
  { id: "ai-08", title: "AI Image Genrat", category: "AI & Digital Skills", duration: "3 Months", price: 499 },
  { id: "ai-09", title: "Creative & Digital Skill", category: "AI & Digital Skills", duration: "3 Months", price: 999 },
  { id: "ai-10", title: "Marketing Skill", category: "AI & Digital Skills", duration: "3 Months", price: 999 },
  { id: "ai-11", title: "Content Creation", category: "AI & Digital Skills", duration: "3 Months", price: 1299 },
  { id: "ai-12", title: "Digital Business marketing", category: "AI & Digital Skills", duration: "3 Months", price: 1499 },
  { id: "ai-13", title: "wealth creation & Business Growth", category: "AI & Digital Skills", duration: "3 Months", price: 1499 },
  { id: "ai-14", title: "AI Presentation & Documation", category: "AI & Digital Skills", duration: "3 Months", price: 1499 },

  // --- TECHNICAL DOMAINS (31) ---
  { id: "tech-01", title: "Cyber Security", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-02", title: "App Development", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-03", title: "Data Engineering", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-04", title: "Game Development", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-05", title: ".NET Development", category: "Technical Domains", duration: "6 Months", price: 12999 },
  { id: "tech-06", title: "Business Analyst", category: "Technical Domains", duration: "3 Months", price: 9999 },
  { id: "tech-07", title: "Software Testing", category: "Technical Domains", duration: "3 Months", price: 8999 },
  { id: "tech-08", title: "Java Full Stack Development", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-09", title: "Python Development", category: "Technical Domains", duration: "3 Months", price: 9999 },
  { id: "tech-10", title: "React Development", category: "Technical Domains", duration: "3 Months", price: 8999 },
  { id: "tech-11", title: "Video Editing", category: "Technical Domains", duration: "3 Months", price: 6999 },
  { id: "tech-12", title: "Graphic Design", category: "Technical Domains", duration: "3 Months", price: 6999 },
  { id: "tech-13", title: "UI/UX Design", category: "Technical Domains", duration: "3 Months", price: 6999 },
  { id: "tech-14", title: "Digital Marketing", category: "Technical Domains", duration: "3 Months", price: 9999 },
  { id: "tech-15", title: "Advanced Excel", category: "Technical Domains", duration: "3 Months", price: 4999 },
  { id: "tech-16", title: "Flutter Development", category: "Technical Domains", duration: "6 Months", price: 12999 },
  { id: "tech-17", title: "Data Visualization (Power BI)", category: "Technical Domains", duration: "3 Months", price: 6999 },
  { id: "tech-18", title: "Data Science", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-19", title: "MEAN Stack Development", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-20", title: "MERN Stack Development", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-21", title: "Machine Learning", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-22", title: "Artificial Intelligence", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-23", title: "Data Analytics", category: "Technical Domains", duration: "3 Months", price: 9999 },
  { id: "tech-24", title: "Web Development", category: "Technical Domains", duration: "3 Months", price: 9999 },
  { id: "tech-25", title: "WordPress Development", category: "Technical Domains", duration: "3 Months", price: 4999 },
  { id: "tech-26", title: "Python Full Stack Development", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-27", title: "Full Stack Development", category: "Technical Domains", duration: "6 Months", price: 14999 },
  { id: "tech-28", title: "SEO", category: "Technical Domains", duration: "3 Months", price: 4999 },
  { id: "tech-29", title: "Frontend Development", category: "Technical Domains", duration: "3 Months", price: 8999 },
  { id: "tech-30", title: "Backend Development", category: "Technical Domains", duration: "3 Months", price: 9999 },
  { id: "tech-31", title: "MS SQL", category: "Technical Domains", duration: "3 Months", price: 4999 },

  // --- NON-TECHNICAL DOMAINS (15) ---
  { id: "nontech-01", title: "Project Management", category: "Non-Technical Domains", duration: "3 Months", price: 7999 },
  { id: "nontech-02", title: "Sales Executive", category: "Non-Technical Domains", duration: "3 Months", price: 5999 },
  { id: "nontech-03", title: "Social Media Handling", category: "Non-Technical Domains", duration: "1 Month", price: 3999 },
  { id: "nontech-04", title: "Social Media Management", category: "Non-Technical Domains", duration: "3 Months", price: 5999 },
  { id: "nontech-05", title: "Social Media Marketing", category: "Non-Technical Domains", duration: "3 Months", price: 6999 },
  { id: "nontech-06", title: "Accounting", category: "Non-Technical Domains", duration: "3 Months", price: 6999 },
  { id: "nontech-07", title: "Content Creation", category: "Non-Technical Domains", duration: "3 Months", price: 5999 },
  { id: "nontech-08", title: "BDE (Business Development Executive)", category: "Non-Technical Domains", duration: "3 Months", price: 5999 },
  { id: "nontech-09", title: "HR", category: "Non-Technical Domains", duration: "3 Months", price: 6999 },
  { id: "nontech-10", title: "Content Writing", category: "Non-Technical Domains", duration: "3 Months", price: 4999 },
  { id: "nontech-11", title: "Email Marketing", category: "Non-Technical Domains", duration: "1 Month", price: 3999 },
  { id: "nontech-12", title: "Tele Calling", category: "Non-Technical Domains", duration: "1 Month", price: 3999 },
  { id: "nontech-13", title: "Support Calling", category: "Non-Technical Domains", duration: "1 Month", price: 3999 },
  { id: "nontech-14", title: "Meta & Google Ads", category: "Non-Technical Domains", duration: "3 Months", price: 6999 },
  { id: "nontech-15", title: "BDA (Business Development Associate)", category: "Non-Technical Domains", duration: "3 Months", price: 5999 },

  // --- CORPORATE TRAINING (9) ---
  { id: "corp-01", title: "IT Department & Corporate Technology Basics", category: "Corporate Training", duration: "1 Month", price: 4999, department: "IT" },
  { id: "corp-02", title: "Human Resource Management in Corporate", category: "Corporate Training", duration: "1 Month", price: 3999, department: "HR" },
  { id: "corp-03", title: "Corporate Sales & Business Development", category: "Corporate Training", duration: "1 Month", price: 3999, department: "Sales" },
  { id: "corp-04", title: "Digital Marketing & Corporate Marketing", category: "Corporate Training", duration: "1 Month", price: 4999, department: "Marketing" },
  { id: "corp-05", title: "Corporate Finance & Accounting Basics", category: "Corporate Training", duration: "1 Month", price: 3999, department: "Finance" },
  { id: "corp-06", title: "Business Operations & Process Management", category: "Corporate Training", duration: "1 Month", price: 3999, department: "Operations" },
  { id: "corp-07", title: "Project Handling, Agile & Team Coordination", category: "Corporate Training", duration: "1 Month", price: 4999, department: "Project Management" },
  { id: "corp-08", title: "Corporate Administration & Office Management", category: "Corporate Training", duration: "1 Month", price: 3499, department: "Administration" },
  { id: "corp-09", title: "Leadership & Team Management Skills", category: "Corporate Training", duration: "1 Month", price: 4499, department: "Team Lead" }
];
