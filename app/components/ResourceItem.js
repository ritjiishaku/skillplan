'use client';

import { useProgress } from '../context/ProgressContext';
import { useParams } from 'next/navigation';
import { Icon } from '../lib/icons';

export default function ResourceItem({ phaseNumber, resource, index }) {
  const { getCompleted, toggleResource } = useProgress();
  const params = useParams();
  const roadmapId = params?.roadmapId || 'ai';
  const completed = getCompleted(roadmapId);
  const resId = `phase-${phaseNumber}-${index}`;
  const isChecked = completed.includes(resId);

  const handleChange = (e) => {
    toggleResource(roadmapId, resId, e.target.checked);
  };

  return (
    <a className={`resource-item ${isChecked ? 'completed' : ''}`} href={resource.url} target="_blank" rel="noopener noreferrer">
      <input type="checkbox" className="resource-checkbox" checked={isChecked} onChange={handleChange} aria-label={`Mark "${resource.name}" as completed`} />
      <Icon name={resource.icon} size={14} />
      <div className="resource-info">
        <div className="resource-name">{resource.name}</div>
        <div className="resource-meta">{resource.meta}</div>
      </div>
      <span className="free-tag">Free</span>
    </a>
  );
}
