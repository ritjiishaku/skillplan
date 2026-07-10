'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';
import profileBuilder from '@/data/profile-builder.json';

const PLATFORM_ICONS = {
  twitter: 'twitter',
  linkedin: 'linkedin',
  github: 'github',
  devto: 'devto',
};

export default function ProfileBuilder({ roadmapId, roadmapTitle }) {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [copiedBio, setCopiedBio] = useState(false);

  const roadmapProfile = profileBuilder?.roadmapProfiles?.[roadmapId];
  const platformGuide = profileBuilder?.profileOptimization?.[selectedPlatform];

  if (!roadmapProfile || !platformGuide) return null;

  const bioTemplate = roadmapProfile.bioTemplates?.[selectedPlatform] || '';
  const filledBio = bioTemplate
    .replace(/\{topics\}/g, roadmapProfile.profileKeywords?.slice(0, 3).join(', ') || 'tech')
    .replace(/\{focus\}/g, roadmapProfile.profileKeywords?.[0] || 'technology')
    .replace(/\{projects\}/g, 'real-world projects')
    .replace(/\{timeline\}/g, '18-20 month');

  const handleCopyBio = async () => {
    try {
      await navigator.clipboard.writeText(filledBio);
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
    } catch (err) {
      console.error('Failed to copy bio:', err);
    }
  };

  return (
    <div className="profile-builder">
      <div className="profile-builder-header">
        <h5>Build Your Tech Brand</h5>
        <p>Optimize your social media profiles for {roadmapTitle}</p>
      </div>

      <div className="profile-platform-tabs">
        {Object.keys(PLATFORM_ICONS).map((platform) => (
          <button
            key={platform}
            className={`profile-platform-tab ${selectedPlatform === platform ? 'active' : ''}`}
            onClick={() => setSelectedPlatform(platform)}
          >
            <Icon name={PLATFORM_ICONS[platform]} size={14} />
            <span>{platform}</span>
          </button>
        ))}
      </div>

      <div className="profile-bio-section">
        <div className="profile-bio-header">
          <h6>Suggested Bio</h6>
          <button className="profile-bio-copy" onClick={handleCopyBio}>
            <Icon name={copiedBio ? 'check' : 'copy'} size={14} />
            <span>{copiedBio ? 'Copied!' : 'Copy Bio'}</span>
          </button>
        </div>
        <div className="profile-bio-preview">
          <p>{filledBio}</p>
        </div>
      </div>

      <div className="profile-keywords">
        <h6>Keywords to Include</h6>
        <div className="profile-keyword-tags">
          {roadmapProfile.profileKeywords?.map((keyword, i) => (
            <span key={i} className="profile-keyword-tag">{keyword}</span>
          ))}
        </div>
      </div>

      <div className="profile-content-pillars">
        <h6>Content Pillars</h6>
        <ul className="profile-pillars-list">
          {roadmapProfile.contentPillars?.map((pillar, i) => (
            <li key={i}>
              <Icon name="check-circle" size={14} />
              <span>{pillar}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-optimization">
        <h6>{selectedPlatform} Profile Optimization</h6>
        {platformGuide.sections?.map((section, i) => (
          <div key={i} className="profile-section">
            <div className="profile-section-name">{section.name}</div>
            <ul className="profile-section-tips">
              {section.tips?.map((tip, j) => (
                <li key={j}>
                  <Icon name="info" size={12} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="profile-banner-tips">
        <h6>Profile Picture & Banner Tips</h6>
        <div className="profile-banner-content">
          <div className="profile-tip">
            <Icon name="user" size={14} />
            <span>{roadmapProfile.profilePictureTips}</span>
          </div>
          <div className="profile-tip">
            <Icon name="image" size={14} />
            <span>{roadmapProfile.bannerTips}</span>
          </div>
        </div>
      </div>

      {platformGuide.tools && (
        <div className="profile-tools">
          <h6>Recommended Tools</h6>
          <div className="profile-tools-list">
            {platformGuide.tools.map((tool, i) => (
              <a
                key={i}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-tool"
              >
                <Icon name="external-link" size={12} />
                <span className="profile-tool-name">{tool.name}</span>
                <span className="profile-tool-purpose">{tool.purpose}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
