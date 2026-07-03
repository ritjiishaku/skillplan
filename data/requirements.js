/**
 * Degree & Certification Requirements for each Skillplan roadmap.
 * Based on industry research (2025 job postings, hiring surveys, employer data).
 */

export const REQUIREMENT_CATEGORIES = [
  {
    id: 'just-build',
    label: 'Just Build Projects',
    color: '#22c55e',
    icon: 'target',
    shortDesc: 'No degree. No certs. Your work speaks.',
    fullDesc: 'Employers want to see what you can build. A strong portfolio of deployed projects matters more than any credential.',
  },
  {
    id: 'projects-certs',
    label: 'Projects + Certs Boost',
    color: '#3b82f6',
    icon: 'award',
    shortDesc: 'No degree needed. Certs help.',
    fullDesc: 'No degree required. Industry certifications strengthen your resume and can help you stand out, but aren\'t mandatory.',
  },
  {
    id: 'certs-replace-degree',
    label: 'Certs Replace Degree',
    color: '#f59e0b',
    icon: 'scale',
    shortDesc: 'Strong certs accepted instead of a degree.',
    fullDesc: 'Certifications carry significant weight. AWS/GCP/Azure certs can substitute for a degree in most hiring situations.',
  },
  {
    id: 'degree-helps',
    label: 'Degree Helps',
    color: '#ef4444',
    icon: 'graduation-cap',
    shortDesc: 'Some employers want degrees. Not all.',
    fullDesc: 'Many employers prefer degrees, especially for analyst and engineer roles. Certs + strong portfolio can still get you hired.',
  },
];

export const ROADMAP_REQUIREMENTS = {
  // ── Portfolio-First ──
  'fullstack': {
    category: 'just-build',
    degree: 'not-required',
    degreeNote: 'Portfolio-driven hiring. Employers care about what you can build, not where you learned. 60%+ of hiring managers prioritize skills over degrees for software roles.',
    certs: [],
    portfolio: 'critical',
    experience: 'helpful',
  },
  'frontend': {
    category: 'just-build',
    degree: 'not-required',
    degreeNote: 'Portfolio-driven hiring. Deployed projects and open-source contributions speak louder than credentials. React/Vue skills + a strong GitHub = hired.',
    certs: [],
    portfolio: 'critical',
    experience: 'helpful',
  },
  'backend': {
    category: 'just-build',
    degree: 'not-required',
    degreeNote: 'Portfolio-driven hiring. API design skills, system architecture projects, and open-source work are the primary hiring signals.',
    certs: [],
    portfolio: 'critical',
    experience: 'helpful',
  },
  'growth': {
    category: 'just-build',
    degree: 'not-required',
    degreeNote: 'Portfolio-driven hiring. A/B testing results, conversion data, and analytics projects demonstrate competence better than any credential.',
    certs: [],
    portfolio: 'critical',
    experience: 'helpful',
  },

  // ── Projects + Certs ──
  'ai': {
    category: 'projects-certs',
    degree: 'not-required',
    degreeNote: 'Skills-first field. Competitive, so certs can help you stand out. Strong projects and published work matter most.',
    certs: [
      { name: 'AWS Machine Learning Specialty (Retired March 2026)', cost: '$300', priority: 'medium', url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/' },
      { name: 'Google Professional ML Engineer', cost: '$200', priority: 'medium', url: 'https://cloud.google.com/learn/certification/machine-learning-engineer' },
    ],
    portfolio: 'critical',
    experience: 'important',
  },
  'fintech': {
    category: 'projects-certs',
    degree: 'not-required',
    degreeNote: 'Portfolio-driven. No specific certifications required. Financial compliance knowledge helps but can be learned on the job.',
    certs: [],
    portfolio: 'critical',
    experience: 'important',
  },
  'data-engineering': {
    category: 'projects-certs',
    degree: 'not-required',
    degreeNote: 'Portfolio matters more than formal education. ~60% of job postings say "degree or equivalent experience." Certifications can accelerate your job hunt.',
    certs: [
      { name: 'AWS Certified Data Engineer', cost: '$150', priority: 'high', url: 'https://aws.amazon.com/certification/certified-data-engineer-associate/' },
      { name: 'Google Professional Data Engineer', cost: '$200', priority: 'high', url: 'https://cloud.google.com/learn/certification/data-engineer' },
      { name: 'Azure Data Engineer Associate', cost: '$165', priority: 'medium', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-engineer/' },
    ],
    portfolio: 'critical',
    experience: 'important',
  },
  'green-tech': {
    category: 'projects-certs',
    degree: 'not-required',
    degreeNote: 'Emerging field. Skills and projects matter most. Certifications are new but growing in recognition.',
    certs: [
      { name: 'UN CC:Learn Climate Change', cost: 'Free', priority: 'medium', url: 'https://www.uncclearn.org/courses/introductory-e-course-on-climate-change/' },
      { name: 'AWS Sustainability Specialty', cost: '$150', priority: 'medium', url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/17696/sustainability-transformation-with-aws' },
    ],
    portfolio: 'critical',
    experience: 'important',
  },

  // ── Certs Replace Degree ──
  'cloud-devops': {
    category: 'certs-replace-degree',
    degree: 'not-required',
    degreeNote: '60%+ of hiring managers consider skills over degrees. 89% of cloud job postings mention certifications as preferred or required. AWS/GCP/Azure certs can replace degree checkboxes on resumes.',
    certs: [
      { name: 'AWS Solutions Architect', cost: '$150', priority: 'high', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
      { name: 'Certified Kubernetes Administrator', cost: '$395', priority: 'high', url: 'https://www.cncf.io/training/certification/cka/' },
      { name: 'HashiCorp Terraform Associate', cost: '$70', priority: 'medium', url: 'https://developer.hashicorp.com/certifications/terraform-associate' },
      { name: 'GCP Professional Cloud Architect', cost: '$200', priority: 'medium', url: 'https://cloud.google.com/learn/certification/cloud-architect' },
    ],
    portfolio: 'important',
    experience: 'important',
  },

  // ── Degree Helps ──
  'cybersecurity': {
    category: 'degree-helps',
    degree: 'preferred',
    degreeNote: 'Most regulated path in tech. Many employers require a degree OR Security+ certification + experience. DoD 8570/8140 mandates certs for government/defense roles. Degree holders earn 15–30% more over their careers.',
    certs: [
      { name: 'CompTIA Security+', cost: '$404', priority: 'critical', url: 'https://www.comptia.org/certifications/security' },
      { name: 'Certified Ethical Hacker (CEH)', cost: '$1,199', priority: 'high', url: 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/' },
      { name: 'CISSP', cost: '$749', priority: 'senior', url: 'https://www.isc2.org/Certifications/CISSP' },
    ],
    portfolio: 'helpful',
    experience: 'important',
  },
};
