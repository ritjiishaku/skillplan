/**
 * WEF Future of Jobs Report 2025 — Fastest-Growing Roles by 2030
 * Source: https://www.weforum.org/publications/the-future-of-jobs-report-2025/
 *
 * Rankings are based on projected percentage growth (surveyed 1,000+ companies,
 * 22 industry clusters, 14M+ workers).
 */

export const WEF_TOP_15 = [
  { rank: 1, role: 'Big Data Specialist', growth: 'High' },
  { rank: 2, role: 'FinTech Engineer', growth: 'High' },
  { rank: 3, role: 'AI and Machine Learning Specialist', growth: 'High' },
  { rank: 4, role: 'Software and Applications Developer', growth: 'High' },
  { rank: 5, role: 'Security Management Specialist', growth: 'High' },
  { rank: 6, role: 'Data Analyst', growth: 'High' },
  { rank: 7, role: 'Automation and Robotics Specialist', growth: 'High' },
  { rank: 8, role: 'Information Security Analyst', growth: 'High' },
  { rank: 9, role: 'Electrical and Electronics Engineer', growth: 'Medium' },
  { rank: 10, role: 'Autonomous and Electric Vehicle Specialist', growth: 'Medium' },
  { rank: 11, role: 'Renewable Energy Engineer', growth: 'Medium' },
  { rank: 12, role: 'Environmental Engineer', growth: 'Medium' },
  { rank: 13, role: 'DevOps Engineer', growth: 'High' },
  { rank: 14, role: 'Cloud Computing Specialist', growth: 'High' },
  { rank: 15, role: 'Business Intelligence Analyst', growth: 'Medium' },
];

/**
 * Maps each Skillplan roadmap to its corresponding WEF fastest-growing role(s).
 * Each roadmap gets a primary WEF rank and an optional secondary rank.
 */
export const ROADMAP_WEF_MAP = {
  ai: {
    wefRank: 3,
    wefRole: 'AI and Machine Learning Specialist',
    altRank: 1,
    altRole: 'Big Data Specialist',
    skillDemand: 'Top 1 — AI & Big Data',
    note: '86% of employers expect AI to transform their business by 2030',
  },
  fintech: {
    wefRank: 2,
    wefRole: 'FinTech Engineer',
    altRank: null,
    altRole: null,
    skillDemand: 'Top 3 — Fastest Growing',
    note: 'FinTech Engineer ranks #2 globally in projected job growth',
  },
  'data-engineering': {
    wefRank: 1,
    wefRole: 'Big Data Specialist',
    altRank: 6,
    altRole: 'Data Analyst',
    skillDemand: 'Top 1 — #1 Fastest Growing',
    note: 'Big Data Specialist is the #1 fastest-growing role by 2030',
  },
  fullstack: {
    wefRank: 4,
    wefRole: 'Software and Applications Developer',
    altRank: 13,
    altRole: 'DevOps Engineer',
    skillDemand: 'Top 5 — Core Tech',
    note: 'Software developers drive the largest net job growth in absolute numbers',
  },
  frontend: {
    wefRank: 4,
    wefRole: 'Software and Applications Developer',
    altRank: null,
    altRole: null,
    skillDemand: 'Top 5 — Core Tech',
    note: 'Digital access expansion fuels demand for web/app developers',
  },
  backend: {
    wefRank: 4,
    wefRole: 'Software and Applications Developer',
    altRank: 14,
    altRole: 'Cloud Computing Specialist',
    skillDemand: 'Top 5 — Core Tech',
    note: 'Backend roles map to both app development and cloud infrastructure',
  },
  cybersecurity: {
    wefRank: 5,
    wefRole: 'Security Management Specialist',
    altRank: 8,
    altRole: 'Information Security Analyst',
    skillDemand: 'Top 10 — Dual Role',
    note: 'Two security roles in top 15, driven by geopolitics and cyber threats',
  },
  'cloud-devops': {
    wefRank: 13,
    wefRole: 'DevOps Engineer',
    altRank: 14,
    altRole: 'Cloud Computing Specialist',
    skillDemand: 'Top 15 — Dual Role',
    note: 'Cloud & DevOps combined are among the fastest-growing specializations',
  },
  growth: {
    wefRank: 15,
    wefRole: 'Business Intelligence Analyst',
    altRank: 6,
    altRole: 'Data Analyst',
    skillDemand: 'Top 15 — Analytics',
    note: 'Growth engineering combines BI analytics with conversion optimization',
  },
  'green-tech': {
    wefRank: 10,
    wefRole: 'Autonomous & Electric Vehicle Specialist',
    altRank: 11,
    altRole: 'Renewable Energy Engineer',
    skillDemand: 'Top 15 — Triple Role',
    note: 'Three WEF top-15 roles + #10 fastest-growing skill (Environmental Stewardship)',
  },
};
