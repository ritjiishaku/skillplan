'use client';

import { useState } from 'react';

export function ProjectCard({ project, badge, badgeClass }) {
  return (
    <div className="proj-card">
      <div className="proj-card-header">
        <span className={`proj-type-badge ${badgeClass}`}>{badge}</span>
        <h4 className="proj-card-title">{project.title}</h4>
      </div>
      <p className="proj-card-desc">{project.desc}</p>
      <div className="proj-section-label">What you&apos;ll build</div>
      <ul className="proj-skill-list">
        {project.skills?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <div className="proj-section-label">Stack</div>
      <div className="proj-stack-row">
        {project.stack?.map((s, i) => (
          <span key={i} className="proj-stack-tag">{s}</span>
        ))}
      </div>
    </div>
  );
}

export function getNiches(projects) {
  if (projects.niches) return projects.niches;
  const niches = [];
  const src = projects.healthcare || projects.capstone;
  if (src) {
    niches.push({
      id: 'healthcare',
      name: 'Healthcare',
      tagline: 'Clinical and medical technology applications',
      ...src,
    });
  }
  return niches;
}

export function NicheAccordion({ projects }) {
  const [openNiche, setOpenNiche] = useState(null);
  const niches = getNiches(projects);

  if (niches.length === 0) return null;

  return (
    <div className="accordion-container">
      <div className="accordion-label">Choose Your Niche — Pick one that aligns with your goals</div>
      <div className="accordion">
        {niches.map((niche) => (
          <div
            key={niche.id}
            className={`accordion-item${openNiche === niche.id ? ' open' : ''}`}
          >
            <button
              className="accordion-header"
              onClick={() => setOpenNiche(openNiche === niche.id ? null : niche.id)}
              aria-expanded={openNiche === niche.id}
            >
              <span className="accordion-header-left">
                <span className="accordion-name">{niche.name}</span>
                <span className="accordion-tagline">{niche.tagline}</span>
              </span>
              <span className={`accordion-chevron${openNiche === niche.id ? ' rotated' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            <div className="accordion-body">
              <div className="accordion-body-inner">
                <div className="accordion-card-wrapper">
                  <ProjectCard project={niche} badge={`⬡ ${niche.name}`} badgeClass="proj-badge-health" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
