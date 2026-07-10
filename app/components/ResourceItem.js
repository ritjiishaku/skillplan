'use client';

import { useProgress } from '../context/ProgressContext';

function ResourceItem({ phaseNumber, resource, index, completed, roadmapId }) {
  const { toggleResource } = useProgress();
  const resId = `phase-${phaseNumber}-${index}`;
  const isChecked = completed.includes(resId);

  const handleChange = (e) => {
    e.stopPropagation();
    toggleResource(roadmapId, resId, e.target.checked);
  };

  const handleClick = (e) => {
    if (e.target.type === 'checkbox') {
      e.preventDefault();
    }
  };

  return (
    <a className={`resource-item ${isChecked ? 'completed' : ''}`} href={resource.url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      <input type="checkbox" className="resource-checkbox" checked={isChecked} onChange={handleChange} onClick={(e) => e.stopPropagation()} aria-label={`Mark "${resource.name}" as completed`} />
      <div className="resource-info">
        <div className="resource-name">{resource.name}</div>
        <div className="resource-meta">{resource.meta}</div>
      </div>
      <span className="free-tag">Free</span>
    </a>
  );
}

export default ResourceItem;
