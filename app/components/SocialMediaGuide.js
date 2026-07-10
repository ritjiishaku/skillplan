'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';
import PlatformSelector from './PlatformSelector';
import StagePostingGuide from './StagePostingGuide';
import ProfileBuilder from './ProfileBuilder';
import ShareProgressButton from './ShareProgressButton';

const TABS = [
  { id: 'platforms', label: 'Platforms', icon: 'globe' },
  { id: 'posting', label: 'What to Post', icon: 'file-text' },
  { id: 'profile', label: 'Build Profile', icon: 'user' },
];

export default function SocialMediaGuide({ guide, roadmapId, roadmapTitle, completed, totalResources }) {
  const [activeTab, setActiveTab] = useState('platforms');
  const [isExpanded, setIsExpanded] = useState(false);

  const roadmapData = guide?.roadmapSpecific?.[roadmapId] || {};
  const recommendedPlatforms = roadmapData.recommendedPlatforms || Object.keys(guide?.platforms || {});

  return (
    <section className="social-guide" id="social-media-guide">
      <button
        className="social-guide-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="social-guide-content"
      >
        <div className="social-guide-header-left">
          <div className="social-guide-icon">
            <Icon name="share-2" size={18} />
          </div>
          <div className="social-guide-header-text">
            <h3 className="social-guide-title">Share Your Journey</h3>
            <p className="social-guide-subtitle">Build your tech brand and share progress on social media</p>
          </div>
        </div>
        <div className="social-guide-toggle">
          <Icon name={isExpanded ? 'check' : 'rocket'} size={14} />
          <span>{isExpanded ? 'Guide Open' : 'Open Guide'}</span>
        </div>
      </button>

      {isExpanded && (
        <div className="social-guide-content" id="social-guide-content">
          <div className="social-guide-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`social-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon name={tab.icon} size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="social-guide-body">
            {activeTab === 'platforms' && (
              <PlatformSelector
                platforms={guide?.platforms}
                recommended={recommendedPlatforms}
                roadmapId={roadmapId}
                nicheHashtags={roadmapData.nicheHashtags}
              />
            )}
            {activeTab === 'posting' && (
              <StagePostingGuide
                stages={guide?.stages}
                roadmapId={roadmapId}
                roadmapTitle={roadmapTitle}
              />
            )}
            {activeTab === 'profile' && (
              <ProfileBuilder
                roadmapId={roadmapId}
                roadmapTitle={roadmapTitle}
              />
            )}
          </div>

          <div className="social-guide-footer">
            <ShareProgressButton
              roadmapId={roadmapId}
              roadmapTitle={roadmapTitle}
              completed={completed}
              totalResources={totalResources}
            />
          </div>
        </div>
      )}
    </section>
  );
}
