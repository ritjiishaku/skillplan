'use client';

import ModuleCard from './ModuleCard';
import { Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { ProjectCard, getNiches, NicheAccordion } from './ProjectCard';

function PhaseProjectContent({ phase }) {
  const p = phase.projects;
  if (!p) return null;
  const niches = getNiches(p);

  return (
    <div className="proj-phase-block">
      <div className="proj-phase-eyebrow">
        <span className="proj-phase-num">{phase.number}</span>
        <span className="proj-phase-label">Phase Project — {phase.title}</span>
      </div>
      {p.general && (
        <div className="accordion-general">
          <ProjectCard project={p.general} badge="⬡ General" badgeClass="proj-badge-general" />
        </div>
      )}
      {niches.length > 0 && <NicheAccordion projects={p} />}
    </div>
  );
}

export default function PhaseSection({ phase }) {
  const { openProject } = useModal();

  const handlePhaseProjectClick = () => {
    openProject(<PhaseProjectContent phase={phase} />);
  };

  return (
    <section className="phase" id={`phase-${phase.number}`}>
      <div className="phase-header-row">
        <div className="phase-header">
          <div className="phase-number">{phase.number}</div>
          <div className="phase-meta">
            <div className={`phase-badge ${phase.badge}`}>{phase.badgeLabel}</div>
            <h2 className="phase-title">{phase.title}</h2>
            <div className="phase-duration">{phase.duration}</div>
          </div>
        </div>
        {phase.projects && (
          <button className="proj-toggle-btn" onClick={handlePhaseProjectClick}>
            <Sparkles size={14} /> View Phase Project
          </button>
        )}
      </div>

      <div className="modules-grid">
        {phase.modules.map((mod, i) => (
          <ModuleCard key={i} phaseNumber={phase.number} module={mod} moduleIndex={i} />
        ))}
      </div>
    </section>
  );
}
