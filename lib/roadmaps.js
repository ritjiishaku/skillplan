export const ROADMAP_LIST = [
  { id: 'ai', label: 'AI Automation Engineering' },
  { id: 'fullstack', label: 'Full-Stack Engineering' },
  { id: 'frontend', label: 'Frontend Engineering' },
  { id: 'backend', label: 'Backend Engineering' },
  { id: 'cybersecurity', label: 'Cybersecurity Engineering' },
  { id: 'data-engineering', label: 'Data Engineering' },
  { id: 'cloud-devops', label: 'Cloud/DevOps Engineering' },
  { id: 'fintech', label: 'Fintech Engineering' },
  { id: 'growth', label: 'Growth Engineering' },
  { id: 'green-tech', label: 'Green Tech / Climate Tech Engineering' },
];

export const ROADMAP_IDS = ROADMAP_LIST.map((r) => r.id);

export const PHASE_COUNTS = {
  ai: 8, fullstack: 8, frontend: 8, backend: 8,
  cybersecurity: 8, 'data-engineering': 8, 'cloud-devops': 8,
  fintech: 8, growth: 11, 'green-tech': 8,
};

export const TITLE_MAP = Object.fromEntries(
  ROADMAP_LIST.map((r) => [r.id, r.label])
);
