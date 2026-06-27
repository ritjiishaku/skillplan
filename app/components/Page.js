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
    </>
  );
}
