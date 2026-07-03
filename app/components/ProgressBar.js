'use client';

import { useEffect } from 'react';

export default function ProgressBar({ completed = 0, total = 0 }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    const el = document.getElementById('progress-percent');
    if (el) el.textContent = `${percent}%`;
  }, [percent]);

  return (<>
    <div className="sticky-progress-container" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
    <div className="progress-bar-fixed" aria-live="polite">
      <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
      <span className="progress-bar-label">{percent}%</span>
    </div>
  </>);
}
