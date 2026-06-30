'use client';

import ModuleCard from './ModuleCard';
import { Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';

function PhaseProjectContent({ phase }) {
  const p = phase.projects;
  if (!p) return null;

  return (
    <div className="proj-phase-block">
      <div className="proj-phase-eyebrow">
        <span className="proj-phase-num">{phase.number}</span>
        <span className="proj-phase-label">Phase Project — {phase.title}</span>
      </div>
      <div className="proj-dual-grid">
        {p.general && (
          <div className="proj-card proj-general">
            <div className="proj-card-header">
              <span className="proj-type-badge proj-badge-general">⬡ General</span>
              <h4 className="proj-card-title">{p.general.title}</h4>
            </div>
            <p className="proj-card-desc">{p.general.desc}</p>
            <div className="proj-section-label">What you&apos;ll build</div>
            <ul className="proj-skill-list">
              {p.general.skills?.map((s, si) => (
                <li key={si}>{s}</li>
              ))}
            </ul>
            <div className="proj-section-label">Stack</div>
            <div className="proj-stack-row">
              {p.general.stack?.map((s, si) => (
                <span key={si} className="proj-stack-tag">{s}</span>
              ))}
            </div>
          </div>
        )}
        {(p.healthcare || p.capstone) && (
          <div className="proj-card proj-health">
            <div className="proj-card-header">
              <span className="proj-type-badge proj-badge-health">⚕ Healthcare</span>
              <h4 className="proj-card-title">{(p.healthcare || p.capstone).title}</h4>
            </div>
            <p className="proj-card-desc">{(p.healthcare || p.capstone).desc}</p>
            <div className="proj-section-label">What you&apos;ll build</div>
            <ul className="proj-skill-list">
              {(p.healthcare || p.capstone).skills?.map((s, si) => (
                <li key={si}>{s}</li>
              ))}
            </ul>
            <div className="proj-section-label">Stack</div>
            <div className="proj-stack-row">
              {(p.healthcare || p.capstone).stack?.map((s, si) => (
                <span key={si} className="proj-stack-tag">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
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