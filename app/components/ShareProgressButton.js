'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';
import { useModal } from '../context/ModalContext';

const PLATFORM_ICONS = {
  twitter: 'twitter',
  linkedin: 'linkedin',
  github: 'github',
  devto: 'devto',
};

function ShareModalContent({ roadmapId, roadmapTitle, completed, totalResources }) {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const progress = totalResources > 0 ? Math.round((completed.length / totalResources) * 100) : 0;

  const getStage = () => {
    if (progress === 0) return 'beginner';
    if (progress < 40) return 'beginner';
    if (progress < 70) return 'intermediate';
    if (progress < 100) return 'advanced';
    return 'completed';
  };

  const stage = getStage();

  const stageMessages = {
    beginner: 'Just getting started on my learning journey',
    intermediate: 'Making solid progress in my learning journey',
    advanced: 'Deep into advanced topics',
    completed: 'Completed the entire roadmap',
  };

  const generatePost = () => {
    const baseMessage = customMessage || stageMessages[stage];
    const templates = {
      twitter: `${baseMessage}\n\nRoadmap: ${roadmapTitle}\nProgress: ${progress}% (${completed.length}/${totalResources} resources)\n\n#100DaysOfCode #LearnToCode`,
      linkedin: `Learning Update: ${roadmapTitle}\n\n---\n\n${baseMessage}\n\nProgress: ${progress}% complete\nResources completed: ${completed.length}/${totalResources}\n\n---\n\nFollowing the Skillplan roadmap for self-paced learning.\n\n#TechCareers #SoftwareEngineering #LearningJourney`,
      devto: `# ${roadmapTitle} Progress Update\n\n## Current Status\n\n${baseMessage}\n\n**Progress:** ${progress}% complete\n**Resources completed:** ${completed.length}/${totalResources}\n\n---\n\n*Learning with Skillplan*`,
      github: `## ${roadmapTitle} Progress\n\n**Status:** ${stage.charAt(0).toUpperCase() + stage.slice(1)}\n\n${baseMessage}\n\n### Progress\n- ${progress}% complete\n- ${completed.length}/${totalResources} resources\n\n---\n\n*Guided by Skillplan*`,
    };
    return templates[selectedPlatform] || templates.twitter;
  };

  const handleCopy = async () => {
    const text = generatePost();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = () => {
    const text = generatePost();
    const encodedText = encodeURIComponent(text);
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedText}`,
      devto: `https://dev.to/new?title=${encodeURIComponent(roadmapTitle + ' Progress')}&body=${encodedText}`,
    };
    window.open(shareUrls[selectedPlatform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="share-modal-content">
      <div className="share-modal-header">
        <h4>Share Your Progress</h4>
        <p>Show the world your learning journey</p>
      </div>

      <div className="share-progress-preview">
        <div className="share-progress-ring">
          <svg viewBox="0 0 100 100">
            <circle className="share-progress-bg" cx="50" cy="50" r="45" />
            <circle
              className="share-progress-fill"
              cx="50"
              cy="50"
              r="45"
              style={{ strokeDasharray: `${progress * 2.83} ${283 - progress * 2.83}` }}
            />
          </svg>
          <span className="share-progress-percent">{progress}%</span>
        </div>
        <div className="share-progress-info">
          <span className="share-roadmap-name">{roadmapTitle}</span>
          <span className="share-stage">{stageMessages[stage]}</span>
          <span className="share-stats">{completed.length}/{totalResources} resources</span>
        </div>
      </div>

      <div className="share-platform-select">
        <h5>Share on</h5>
        <div className="share-platform-buttons">
          {Object.keys(PLATFORM_ICONS).map((platform) => (
            <button
              key={platform}
              className={`share-platform-btn ${selectedPlatform === platform ? 'active' : ''}`}
              onClick={() => setSelectedPlatform(platform)}
            >
              <Icon name={PLATFORM_ICONS[platform]} size={16} />
              <span>{platform}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="share-message-input">
        <label htmlFor="share-message">Add a personal message (optional)</label>
        <textarea
          id="share-message"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder={stageMessages[stage]}
          rows={3}
        />
      </div>

      <div className="share-preview-box">
        <h5>Preview</h5>
        <pre className="share-preview-text">{generatePost()}</pre>
      </div>

      <div className="share-actions">
        <button className="share-copy-btn" onClick={handleCopy}>
          <Icon name={copied ? 'check' : 'copy'} size={16} />
          <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
        </button>
        <button className="share-submit-btn" onClick={handleShare}>
          <Icon name="external-link" size={16} />
          <span>Share on {selectedPlatform}</span>
        </button>
      </div>
    </div>
  );
}

export default function ShareProgressButton({ roadmapId, roadmapTitle, completed, totalResources }) {
  const { openProject } = useModal();

  const handleShareClick = () => {
    openProject(
      <ShareModalContent
        roadmapId={roadmapId}
        roadmapTitle={roadmapTitle}
        completed={completed}
        totalResources={totalResources}
      />
    );
  };

  return (
    <button className="share-progress-btn" onClick={handleShareClick}>
      <Icon name="share-2" size={16} />
      <span>Share Your Progress</span>
    </button>
  );
}
