'use client';

import ResourceItem from './ResourceItem';
import { Icon } from '../lib/icons';
import { useModal } from '../context/ModalContext';
import { Sparkles } from 'lucide-react';

function ProjectModalContent({ projects }) {
  return (
    <div className="proj-module-block">
      <div className="proj-module-eyebrow">
        <span className="proj-eyebrow-label">Module Project</span>
        <span className="proj-eyebrow-after">· General &amp; Healthcare tracks</span>
      </div>
      <div className="proj-dual-grid">
        {projects.general && (
          <div className="proj-card proj-general">
            <div className="proj-card-header">
              <span className="proj-type-badge proj-badge-general">⬡ General</span>
              <h4 className="proj-card-title">{projects.general.title}</h4>
            </div>
            <p className="proj-card-desc">{projects.general.desc}</p>
            <div className="proj-section-label">What you&apos;ll build</div>
            <ul className="proj-skill-list">
              {projects.general.skills?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="proj-section-label">Stack</div>
            <div className="proj-stack-row">
              {projects.general.stack?.map((s, i) => (
                <span key={i} className="proj-stack-tag">{s}</span>
              ))}
            </div>
          </div>
        )}
        {(projects.healthcare || projects.capstone) && (
          <div className="proj-card proj-health">
            <div className="proj-card-header">
              <span className="proj-type-badge proj-badge-health">⚕ Healthcare</span>
              <h4 className="proj-card-title">{(projects.healthcare || projects.capstone).title}</h4>
            </div>
            <p className="proj-card-desc">{(projects.healthcare || projects.capstone).desc}</p>
            <div className="proj-section-label">What you&apos;ll build</div>
            <ul className="proj-skill-list">
              {(projects.healthcare || projects.capstone).skills?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="proj-section-label">Stack</div>
            <div className="proj-stack-row">
              {(projects.healthcare || projects.capstone).stack?.map((s, i) => (
                <span key={i} className="proj-stack-tag">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
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