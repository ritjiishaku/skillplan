'use client';

import ModuleCard from './ModuleCard';
import { Sparkles } from 'lucide-react';

export default function PhaseSection({ phase }) {
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
        <button className="proj-toggle-btn" data-phase={phase.number}>
          <Sparkles size={14} /> View Phase Project
        </button>
      </div>

      <div className="modules-grid">
        {phase.modules.map((mod, i) => (
          <ModuleCard key={i} phaseNumber={phase.number} module={mod} moduleIndex={i} />
        ))}
      </div>

      {phase.modules[0]?.projects && (
        <div className="proj-phase-block" data-phase={phase.number}>
          <div className="proj-phase-eyebrow">
            <span className="proj-phase-num">Phase {phase.number}</span>
            <span className="proj-phase-label">Final Project — Phase {phase.number}</span>
          </div>
          <div className="proj-dual-grid">
            <div className="proj-card proj-general">
              <div className="proj-card-header">
                <span className="proj-type-badge proj-badge-general">⬡ General</span>
                <h4 className="proj-card-title">{phase.modules[0].projects.general.title}</h4>
              </div>
              <p className="proj-card-desc">{phase.modules[0].projects.general.desc}</p>
              <div className="proj-section-label">What you'll build</div>
              <ul className="proj-skill-list">
                {phase.modules[0].projects.general.skills?.map((s, si) => (
                  <li key={si}>{s}</li>
                ))}
              </ul>
              <div className="proj-section-label">Stack</div>
              <div className="proj-stack-row">
                {phase.modules[0].projects.general.stack?.map((s, si) => (
                  <span key={si} className="proj-stack-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="proj-card proj-health">
              <div className="proj-card-header">
                <span className="proj-type-badge proj-badge-health">🏗️ Capstone</span>
                <h4 className="proj-card-title">{phase.modules[0].projects.capstone?.title || phase.modules[0].projects.healthcare?.title}</h4>
              </div>
              <p className="proj-card-desc">{phase.modules[0].projects.capstone?.desc || phase.modules[0].projects.healthcare?.desc}</p>
              <div className="proj-section-label">What you'll build</div>
              <ul className="proj-skill-list">
                {(phase.modules[0].projects.capstone?.skills || phase.modules[0].projects.healthcare?.skills || []).map((s, si) => (
                  <li key={si}>{s}</li>
                ))}
              </ul>
              <div className="proj-section-label">Stack</div>
              <div className="proj-stack-row">
                {(phase.modules[0].projects.capstone?.stack || phase.modules[0].projects.healthcare?.stack || []).map((s, si) => (
                  <span key={si} className="proj-stack-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
