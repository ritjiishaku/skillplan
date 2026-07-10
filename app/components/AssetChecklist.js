'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';

const ASSET_CATEGORIES = {
  screenshots: {
    label: 'Screenshots',
    icon: 'image',
    items: [
      { name: 'Development environment', description: 'VS Code, terminal, or IDE setup', required: true },
      { name: 'Working application', description: 'Screenshot of your running project', required: true },
      { name: 'Code snippets', description: 'Key code with syntax highlighting', required: true },
      { name: 'Progress bar', description: 'Screenshot of your learning progress', required: false },
    ]
  },
  diagrams: {
    label: 'Diagrams',
    icon: 'file-code',
    items: [
      { name: 'Architecture diagram', description: 'System or project structure', required: false },
      { name: 'Flow chart', description: 'Process or workflow visualization', required: false },
      { name: 'Data model', description: 'Database or data structure diagram', required: false },
    ]
  },
  media: {
    label: 'Media',
    icon: 'play',
    items: [
      { name: 'Demo GIF', description: 'Animated demo of your project', required: true },
      { name: 'Demo video', description: 'Screen recording walkthrough', required: false },
      { name: 'Profile photo', description: 'Professional headshot or avatar', required: true },
    ]
  },
  graphics: {
    label: 'Graphics',
    icon: 'sparkles',
    items: [
      { name: 'Banner image', description: 'Social media profile banner', required: false },
      { name: 'Project logo', description: 'Custom logo for your project', required: false },
      { name: 'Social card', description: 'Preview image for sharing links', required: false },
    ]
  }
};

export default function AssetChecklist({ roadmapId }) {
  const [checkedAssets, setCheckedAssets] = useState({});

  const handleToggle = (category, index) => {
    const key = `${category}-${index}`;
    setCheckedAssets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getCompletionStats = () => {
    let total = 0;
    let checked = 0;
    Object.entries(ASSET_CATEGORIES).forEach(([cat, data]) => {
      data.items.forEach((item, i) => {
        total++;
        if (checkedAssets[`${cat}-${i}`]) checked++;
      });
    });
    return { total, checked, percentage: Math.round((checked / total) * 100) };
  };

  const stats = getCompletionStats();

  return (
    <div className="asset-checklist">
      <div className="asset-checklist-header">
        <h5>Asset Checklist</h5>
        <p>Prepare these assets for your social media posts</p>
      </div>

      <div className="asset-progress">
        <div className="asset-progress-bar">
          <div
            className="asset-progress-fill"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
        <span className="asset-progress-text">
          {stats.checked}/{stats.total} assets ready ({stats.percentage}%)
        </span>
      </div>

      <div className="asset-categories">
        {Object.entries(ASSET_CATEGORIES).map(([catKey, category]) => (
          <div key={catKey} className="asset-category">
            <div className="asset-category-header">
              <Icon name={category.icon} size={16} />
              <h6>{category.label}</h6>
            </div>
            <ul className="asset-items">
              {category.items.map((item, i) => {
                const isChecked = checkedAssets[`${catKey}-${i}`] || false;
                return (
                  <li key={i} className={`asset-item ${isChecked ? 'checked' : ''}`}>
                    <button
                      className="asset-checkbox"
                      onClick={() => handleToggle(catKey, i)}
                      aria-label={`Mark ${item.name} as ready`}
                    >
                      {isChecked && <Icon name="check" size={12} />}
                    </button>
                    <div className="asset-item-content">
                      <span className="asset-item-name">{item.name}</span>
                      <span className="asset-item-desc">{item.description}</span>
                    </div>
                    {item.required && <span className="asset-required-badge">Required</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="asset-tools">
        <h6>Recommended Tools</h6>
        <div className="asset-tools-list">
          <a href="https://carbon.now.sh" target="_blank" rel="noopener noreferrer" className="asset-tool">
            <Icon name="external-link" size={12} />
            <span>Carbon</span>
            <span className="asset-tool-desc">Code screenshots</span>
          </a>
          <a href="https://excalidraw.com" target="_blank" rel="noopener noreferrer" className="asset-tool">
            <Icon name="external-link" size={12} />
            <span>Excalidraw</span>
            <span className="asset-tool-desc">Diagrams</span>
          </a>
          <a href="https://canva.com" target="_blank" rel="noopener noreferrer" className="asset-tool">
            <Icon name="external-link" size={12} />
            <span>Canva</span>
            <span className="asset-tool-desc">Graphics</span>
          </a>
          <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="asset-tool">
            <Icon name="external-link" size={12} />
            <span>Figma</span>
            <span className="asset-tool-desc">Design</span>
          </a>
        </div>
      </div>
    </div>
  );
}
