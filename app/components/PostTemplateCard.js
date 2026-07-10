'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';
import postTemplates from '@/data/post-templates.json';

const PLATFORM_ICONS = {
  twitter: 'twitter',
  linkedin: 'linkedin',
  github: 'github',
  devto: 'devto',
};

const STAGE_TEMPLATES = {
  beginner: 'journey-start',
  intermediate: 'phase-complete',
  advanced: 'project-showcase',
  project: 'project-showcase',
};

export default function PostTemplateCard({ stage, roadmapId, roadmapTitle }) {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [copied, setCopied] = useState(false);

  const templateKey = STAGE_TEMPLATES[stage] || 'journey-start';
  const template = postTemplates?.templates?.[templateKey];

  if (!template) return null;

  const platformTemplate = template.templates?.[selectedPlatform];
  if (!platformTemplate) return null;

  const fillTemplate = (text) => {
    return text
      .replace(/\{roadmapTitle\}/g, roadmapTitle || 'Tech')
      .replace(/\{role\}/g, 'Software Engineer')
      .replace(/\{duration\}/g, '18-20 months')
      .replace(/\{cost\}/g, '$0')
      .replace(/\{resources\}/g, '150+')
      .replace(/\{phaseNumber\}/g, '1')
      .replace(/\{phaseTitle\}/g, 'Foundation')
      .replace(/\{progress\}/g, '15')
      .replace(/\{day\}/g, '7')
      .replace(/\{hashtags\}/g, '#100DaysOfCode #LearnToCode')
      .replace(/\{topic1\}/g, 'Python fundamentals')
      .replace(/\{topic2\}/g, 'Software engineering principles')
      .replace(/\{topic3\}/g, 'Testing methodologies')
      .replace(/\{nextPhase\}/g, 'Core Concepts and APIs')
      .replace(/\{learnings\}/g, 'Basic syntax and problem-solving')
      .replace(/\{time\}/g, '2 hours')
      .replace(/\{takeaway\}/g, 'Consistency is key to learning')
      .replace(/\{milestoneDescription\}/g, 'Completed 25% of the roadmap')
      .replace(/\{lessons\}/g, 'Building projects is the best way to learn')
      .replace(/\{nextSteps\}/g, 'Continue with advanced topics')
      .replace(/\{milestoneExplanation\}/g, 'A significant step in the learning journey');
  };

  const handleCopy = async () => {
    const text = fillTemplate(platformTemplate);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = () => {
    const text = fillTemplate(platformTemplate);
    const encodedText = encodeURIComponent(text);
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedText}`,
      devto: `https://dev.to/new?title=${encodeURIComponent(roadmapTitle + ' Journey')}&body=${encodedText}`,
    };
    window.open(shareUrls[selectedPlatform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="template-card">
      <div className="template-header">
        <h6>{template.title}</h6>
        <p>{template.description}</p>
      </div>

      <div className="template-platforms">
        {Object.keys(template.templates).map((platform) => (
          <button
            key={platform}
            className={`template-platform-btn ${selectedPlatform === platform ? 'active' : ''}`}
            onClick={() => setSelectedPlatform(platform)}
          >
            <Icon name={PLATFORM_ICONS[platform] || 'globe'} size={14} />
            <span>{platform}</span>
          </button>
        ))}
      </div>

      <div className="template-preview">
        <pre className="template-text">{fillTemplate(platformTemplate)}</pre>
      </div>

      <div className="template-actions">
        <button className="template-copy-btn" onClick={handleCopy}>
          <Icon name={copied ? 'check' : 'copy'} size={14} />
          <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
        </button>
        <button className="template-share-btn" onClick={handleShare}>
          <Icon name="external-link" size={14} />
          <span>Share on {selectedPlatform}</span>
        </button>
      </div>

      {template.assets && (
        <div className="template-assets">
          <h6>Assets Needed</h6>
          <ul>
            {template.assets.map((asset, i) => (
              <li key={i}>
                <Icon name={asset.type === 'Screenshot' ? 'image' : 'file-code'} size={14} />
                <span>{asset.description}</span>
                {asset.required && <span className="asset-required">Required</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
