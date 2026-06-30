'use client';

import { useEffect, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import PhaseSection from './PhaseSection';
import ProgressBar from './ProgressBar';

export default function RoadmapPage({ data, roadmapId }) {
  const { getCompleted, loadProgress } = useProgress();

  useEffect(() => {
    loadProgress(roadmapId);
  }, [roadmapId]);

  const completed = getCompleted(roadmapId);
  const totalResources = useMemo(() => {
    if (!data?.phases) return 0;
    return data.phases.reduce((sum, phase) => {
      return sum + (phase.modules || []).reduce((s, mod) => s + (mod.resources || []).length, 0);
    }, 0);
  }, [data]);

  if (!data) return null;

  return (
    <>
      <ProgressBar completed={completed.length} total={totalResources} />

      <header>
        <div className="header-grid" aria-hidden="true"></div>
        <div className="header-glow"></div>

        <div className="free-banner">{data.banner}</div>

        <h1 dangerouslySetInnerHTML={{ __html: data.titleDisplay }}></h1>
        <p className="subtitle">{data.subtitle}</p>

        <div className="meta-row">
          <div className="meta-item"><span className="meta-label">Duration</span><span className="meta-value">{data.meta?.duration}</span></div>
          <div className="meta-item"><span className="meta-label">Total Cost</span><span className="meta-value accent">{data.meta?.cost}</span></div>
          <div className="meta-item"><span className="meta-label">Resources</span><span className="meta-value">{data.meta?.resources}</span></div>
          <div className="meta-item"><span className="meta-label">Avg. Salary Target</span><span className="meta-value">{data.meta?.salaryTarget}</span></div>
        </div>
      </header>

      <main id="main-content">
        {data.phases?.map((phase, i) => (
          <div key={i}>
            <PhaseSection phase={phase} />
            {i < data.phases.length - 1 && (
              <div className="phase-connector">↓ Phase complete · Next phase</div>
            )}
          </div>
        ))}
      </main>

      {data.projects && (
        <section className="proj-capstone-section">
          <div className="proj-capstone-header">
            <div className="proj-capstone-glow"></div>
            <div className="proj-capstone-eyebrow">
              <div className="proj-capstone-badge">🎯 Final Capstone Project</div>
              <span className="proj-capstone-sub">Encompasses all phases of this roadmap</span>
            </div>
          </div>
          <div className="proj-dual-grid">
            {data.projects.general && (
              <div className="proj-card proj-general">
                <div className="proj-card-header">
                  <span className="proj-type-badge proj-badge-general">⬡ General</span>
                  <h4 className="proj-card-title">{data.projects.general.title}</h4>
                </div>
                <p className="proj-card-desc">{data.projects.general.desc}</p>
                <div className="proj-section-label">What you&apos;ll build</div>
                <ul className="proj-skill-list">
                  {data.projects.general.skills?.map((s, si) => (
                    <li key={si}>{s}</li>
                  ))}
                </ul>
                <div className="proj-section-label">Stack</div>
                <div className="proj-stack-row">
                  {data.projects.general.stack?.map((s, si) => (
                    <span key={si} className="proj-stack-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {(data.projects.healthcare || data.projects.capstone) && (
              <div className="proj-card proj-health">
                <div className="proj-card-header">
                  <span className="proj-type-badge proj-badge-health">⚕ Healthcare</span>
                  <h4 className="proj-card-title">{(data.projects.healthcare || data.projects.capstone).title}</h4>
                </div>
                <p className="proj-card-desc">{(data.projects.healthcare || data.projects.capstone).desc}</p>
                <div className="proj-section-label">What you&apos;ll build</div>
                <ul className="proj-skill-list">
                  {(data.projects.healthcare || data.projects.capstone).skills?.map((s, si) => (
                    <li key={si}>{s}</li>
                  ))}
                </ul>
                <div className="proj-section-label">Stack</div>
                <div className="proj-stack-row">
                  {(data.projects.healthcare || data.projects.capstone).stack?.map((s, si) => (
                    <span key={si} className="proj-stack-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
