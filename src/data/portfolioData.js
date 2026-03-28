// ─── Personal Info ────────────────────────────────────────────────────────────
export const person = {
  name:       'Suhaib Ashraf',
  title:      'Aspiring Data Analyst | AI/ML Learner',
  email:      'ashrafsuhaib674@gmail.com',
  phone:      '+91 9795478165',
  github:     'https://github.com/suhaib890',
  linkedin:   'https://www.linkedin.com/in/suhaib-ashraf01',
  location:   'India 🇮🇳',
  tagline:    'Transforming raw data into intelligent decisions.',
  bio:        'Suhaib Ashraf is an aspiring Data Analyst and AI/ML learner with hands-on experience in Python, SQL, Power BI, and Machine Learning. Passionate about working with data, building intelligent systems, and solving real-world problems using data-driven approaches. A quick learner, highly motivated, and focused on building a strong career in data analytics and artificial intelligence.',
  available:  true,
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Home',           path: '/'               },
  { label: 'About',          path: '/about'          },
  { label: 'Skills',         path: '/skills'         },
  { label: 'Projects',       path: '/projects'       },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Contact',        path: '/contact'        },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills = {
  core: [
    { name: 'Python',            level: 82, icon: '🐍' },
    { name: 'SQL',               level: 88, icon: '🗄️' },
    { name: 'Power BI',          level: 80, icon: '📊' },
    { name: 'Machine Learning',  level: 72, icon: '🤖' },
    { name: 'Data Analysis',     level: 85, icon: '🔬' },
    { name: 'Excel',             level: 90, icon: '📗' },
  ],
  technical: {
    'Data & Analytics':  ['SQL', 'PostgreSQL', 'MySQL', 'Power BI', 'Tableau', 'Excel Advanced'],
    'Programming & ML':  ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    'Tools & Platforms': ['Jupyter Notebook', 'VS Code', 'Git/GitHub', 'Google Colab'],
    'Soft Skills':       ['Data Storytelling', 'Problem Solving', 'Communication', 'Critical Thinking'],
  },
};

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'Sales Performance Dashboard',
    description: 'Interactive Power BI dashboard analyzing 2M+ sales records, identifying top revenue channels and seasonal trends with 15% efficiency improvement.',
    tools: ['Power BI', 'SQL', 'Excel'],
    demo: '#', github: 'https://github.com/suhaib890',
    tag: 'Dashboard',
  },
  {
    id: 2,
    title: 'Customer Churn Predictor',
    description: 'Python ML model predicting customer churn with 89% accuracy using logistic regression and random forest algorithms on telecom data.',
    tools: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn'],
    demo: '#', github: 'https://github.com/suhaib890',
    tag: 'ML Model',
  },
  {
    id: 3,
    title: 'E-Commerce SQL Analytics',
    description: 'Deep-dive SQL analysis of e-commerce database with complex CTEs, window functions and cohort analysis revealing $2M revenue opportunity.',
    tools: ['SQL', 'PostgreSQL', 'Python'],
    demo: '#', github: 'https://github.com/suhaib890',
    tag: 'SQL',
  },
  {
    id: 4,
    title: 'COVID-19 Data Visualization',
    description: 'Comprehensive global COVID-19 data visualization using Python libraries, tracking vaccination rates and case trends across 150+ countries.',
    tools: ['Python', 'Matplotlib', 'Plotly', 'Pandas'],
    demo: '#', github: 'https://github.com/suhaib890',
    tag: 'Visualization',
  },
  {
    id: 5,
    title: 'HR Analytics Report',
    description: 'End-to-end HR analytics report in Excel & Power BI with attrition analysis, salary benchmarking, and workforce planning recommendations.',
    tools: ['Excel', 'Power BI', 'DAX'],
    demo: '#', github: 'https://github.com/suhaib890',
    tag: 'Analytics',
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  {
    id: 1,
    name: 'CCNA: Introduction to Networks',
    provider: 'Cisco Networking Academy',
    platform: 'Galgotias University',
    date: '01 Jun 2025',
    instructor: 'Dr. Nitin Pandey',
    category: 'Networking',
    icon: '🌐',
    skills: ['Networking Fundamentals', 'IP Addressing', 'Routing & Switching', 'Cisco IOS'],
    file: '/cert-ccna.pdf',
    featured: true,
  },
  {
    id: 2,
    name: 'Introduction to Business Analysis Using Spreadsheets: Basics',
    provider: 'Coursera Project Network',
    platform: 'Coursera',
    date: 'Dec 9, 2024',
    category: 'Data Analytics',
    icon: '📊',
    skills: ['Business Analysis', 'Spreadsheets', 'Data Modeling', 'Excel'],
    file: '/cert-coursera-spreadsheets.pdf',
    verifyUrl: 'https://coursera.org/verify/40XAW8PEMNPP',
    featured: true,
  },
  {
    id: 3,
    name: 'Python Full Stack Developer Virtual Internship',
    provider: 'EduSkills Academy / AICTE',
    platform: 'National Internship Portal',
    date: 'April – June 2025',
    duration: '10 Weeks',
    category: 'Internship',
    icon: '🐍',
    skills: ['Python', 'Full Stack Development', 'Web Development', 'AICTE Certified'],
    file: '/cert-python-fullstack.pdf',
    featured: true,
  },
  {
    id: 4,
    name: 'Embedded System Developer Virtual Internship',
    provider: 'Microchip Technology Inc. / EduSkills',
    platform: 'National Internship Portal',
    date: 'October – December 2025',
    duration: '10 Weeks',
    category: 'Internship',
    icon: '🔧',
    skills: ['Embedded Systems', 'Microchip Technology', 'Hardware Programming', 'AICTE Certified'],
    file: '/cert-microchip.pdf',
    featured: true,
  },
];


export const education = [
  {
    id: 1,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Galgotias University',
    location: 'Greater Noida, Uttar Pradesh',
    duration: '2023 – 2026',
    passingYear: '2026 (Expected)',
    status: 'Pursuing',
    label: 'Currently Pursuing',
    description: 'Currently pursuing BCA with a strong focus on Data Science, Artificial Intelligence, Machine Learning, Database Management, Python Programming, and Data Structures. Actively building real-world data projects and expanding skills in AI/ML.',
    subjects: ['Python', 'Data Structures', 'DBMS', 'Machine Learning', 'AI Fundamentals'],
  },
  {
    id: 2,
    degree: 'Class XII — Intermediate',
    institution: 'MSI Inter College',
    location: 'Gorakhpur, Uttar Pradesh',
    duration: '2021 – 2023',
    passingYear: '2023',
    status: 'Completed',
    label: 'Passed 2023',
    description: 'Successfully completed Intermediate (Class XII) from MSI Inter College, Gorakhpur. Built a strong foundation in core Science and Mathematics subjects.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
  },
  {
    id: 3,
    degree: 'Class X — High School',
    institution: 'MSI Inter College',
    location: 'Gorakhpur, Uttar Pradesh',
    duration: '2019 – 2021',
    passingYear: '2021',
    status: 'Completed',
    label: 'Passed 2021',
    description: 'Completed High School (Class X) from MSI Inter College, Gorakhpur with excellent academic performance and a solid foundation across all core subjects.',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = [
  { value: 5,  suffix: '+',  label: 'Projects Built'  },
  { value: 6,  suffix: '+',  label: 'Certifications'  },
  { value: 3,  suffix: '+',  label: 'Years Learning'  },
  { value: 10, suffix: 'K+', label: 'Lines of Code'   },
];
