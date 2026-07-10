'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';

export default function PlatformSelector({ platforms, recommended, roadmapId, nicheHashtags }) {
  const [selectedPlatform, setSelectedPlatform] = useState(recommended[0] || 'twitter');

  const platform = platforms?.[selectedPlatform];
  if (!platform) return null;

  const hashtags = platform.hashtags?.[roadmapId] || [];
  const nicheTags = nicheHashtags || {};

  return (
    <div className="platform-selector">
      <div className="platform-selector-header">
        <h4>Choose Your Platforms</h4>
        <p>Select the platforms that best fit your learning style and goals</p>
      </div>

      <div className="platform-tabs">
        {Object.entries(platforms).map(([key, p]) => (
          <button
            key={key}
            className={`platform-tab ${selectedPlatform === key ? 'active' : ''} ${recommended.includes(key) ? 'recommended' : ''}`}
            onClick={() => setSelectedPlatform(key)}
          >
            <Icon name={p.icon} size={16} />
            <span>{p.name}</span>
            {recommended.includes(key) && <span className="platform-badge">Recommended</span>}
          </button>
        ))}
      </div>

      <div className="platform-details">
        <div className="platform-detail-header">
          <Icon name={platform.icon} size={24} />
          <h5>{platform.name}</h5>
        </div>

        <div className="platform-section">
          <h6>Best For</h6>
          <ul className="platform-list">
            {platform.bestFor?.map((item, i) => (
              <li key={i}>
                <Icon name="check-circle" size={14} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {platform.characterLimit && (
          <div className="platform-section">
            <h6>Character Limit</h6>
            <span className="platform-character-limit">{platform.characterLimit.toLocaleString()} characters</span>
          </div>
        )}

        <div className="platform-section">
          <h6>Content Types</h6>
          <div className="platform-tags">
            {platform.contentTypes?.map((type, i) => (
              <span key={i} className="platform-tag">{type}</span>
            ))}
          </div>
        </div>

        {hashtags.length > 0 && (
          <div className="platform-section">
            <h6>Recommended Hashtags</h6>
            <div className="platform-tags">
              {hashtags.map((tag, i) => (
                <span key={i} className="platform-tag hashtag">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {Object.keys(nicheTags).length > 0 && (
          <div className="platform-section">
            <h6>Niche Hashtags</h6>
            {Object.entries(nicheTags).map(([niche, tags]) => (
              <div key={niche} className="niche-hashtags">
                <span className="niche-label">{niche}:</span>
                <div className="platform-tags">
                  {tags.map((tag, i) => (
                    <span key={i} className="platform-tag hashtag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="platform-section">
          <h6>Tips for Success</h6>
          <ul className="platform-list tips">
            {platform.tips?.map((tip, i) => (
              <li key={i}>
                <Icon name="info" size={14} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
