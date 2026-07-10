'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';
import { generatePhaseShareText } from '@/lib/completion';

const PLATFORM_ICONS = {
  twitter: 'twitter',
  linkedin: 'linkedin',
  github: 'github',
  devto: 'devto',
};

export default function PhaseSocialPrompt({ phase, roadmapTitle }) {
  const [copiedPlatform, setCopiedPlatform] = useState(null);

  const guide = phase.socialMediaGuide;
  if (!guide) return null;

  const handleCopy = async (platform) => {
    const text = generatePhaseShareText(phase, roadmapTitle);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPlatform(platform);
      setTimeout(() => setCopiedPlatform(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform) => {
    const text = generatePhaseShareText(phase, roadmapTitle);
    const encodedText = encodeURIComponent(text);
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedText}`,
      devto: `https://dev.to/new?title=${encodeURIComponent(`Phase ${phase.number} Complete`)}&body=${encodedText}`,
    };
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="phase-social-prompt">
      <div className="phase-social-prompt-header">
        <Icon name="share-2" size={16} />
        <h5>{guide.milestonePost || `Phase ${phase.number} Complete!`}</h5>
      </div>

      {guide.whatToPost && guide.whatToPost.length > 0 && (
        <ul className="phase-social-prompt-ideas">
          {guide.whatToPost.map((idea, i) => (
            <li key={i}>
              <Icon name="check-circle" size={12} />
              <span>{idea}</span>
            </li>
          ))}
        </ul>
      )}

      {guide.suggestedHashtags && guide.suggestedHashtags.length > 0 && (
        <div className="phase-social-prompt-hashtags">
          {guide.suggestedHashtags.map((tag, i) => (
            <span key={i} className="phase-social-prompt-tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="phase-social-prompt-actions">
        {['twitter', 'linkedin'].map((platform) => (
          <button
            key={platform}
            className={`phase-social-prompt-btn ${copiedPlatform === platform ? 'copied' : ''}`}
            onClick={() => handleCopy(platform)}
          >
            <Icon name={copiedPlatform === platform ? 'check' : 'copy'} size={12} />
            <span>{copiedPlatform === platform ? 'Copied!' : `Copy for ${platform}`}</span>
          </button>
        ))}
        <button
          className="phase-social-prompt-btn"
          onClick={() => handleShare('twitter')}
        >
          <Icon name="external-link" size={12} />
          <span>Share on Twitter</span>
        </button>
      </div>
    </div>
  );
}
