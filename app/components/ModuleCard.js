'use client';

import ResourceItem from './ResourceItem';
import { Icon } from '../lib/icons';
import { useModal } from '../context/ModalContext';
import { Sparkles } from 'lucide-react';
import { ProjectCard, getNiches, NicheAccordion } from './ProjectCard';

function ProjectModalContent({ projects }) {
  const niches = getNiches(projects);

  return (
    <div className="proj-module-block">
      <div className="proj-module-eyebrow">
        <span className="proj-eyebrow-label">Module Project</span>
        <span className="proj-eyebrow-after">· General + Choose Your Niche</span>
      </div>
      {projects.general && (
        <div className="accordion-general">
          <ProjectCard project={projects.general} badge="⬡ General" badgeClass="proj-badge-general" />
        </div>
      )}
      {niches.length > 0 && <NicheAccordion projects={projects} />}
    </div>
  );
}

export default function ModuleCard({ phaseNumber, module, moduleIndex }) {
  const { openProject } = useModal();
  const projects = module.projects;

  const handleProjectClick = () => {
    openProject(<ProjectModalContent projects={projects} />);
  };

  return (
    <div className={`module-card ${module.accentClass || 'a2'}`}>
      <div className="module-top">
        <Icon name={module.icon} size={16} />
        <h3 className="module-title">{module.title}</h3>
        <ul className="module-topics">
          {module.topics.map((topic, t) => (
            <li key={t}>{topic}</li>
          ))}
        </ul>
      </div>
      <div className="module-resources">
        <div className="resources-label">🆓 Free Resources</div>
        {module.resources.map((res, r) => (
          <ResourceItem key={r} phaseNumber={phaseNumber} resource={res} index={`${moduleIndex}-${r}`} />
        ))}
        {projects && (
          <button className="proj-toggle-btn" onClick={handleProjectClick}>
            <Sparkles size={14} /> View Module Project
          </button>
        )}
      </div>
    </div>
  );
}
