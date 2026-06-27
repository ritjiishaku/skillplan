'use client';

import ResourceItem from './ResourceItem';
import { Icon } from '../lib/icons';

export default function ModuleCard({ phaseNumber, module, moduleIndex }) {
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
      </div>
    </div>
  );
}
