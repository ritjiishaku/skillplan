'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';
import PostTemplateCard from './PostTemplateCard';

const STAGE_ICONS = {
  beginner: 'rocket',
  intermediate: 'target',
  advanced: 'award',
  project: 'check-circle',
};

export default function StagePostingGuide({ stages, roadmapId, roadmapTitle }) {
  const [expandedStage, setExpandedStage] = useState('beginner');

  if (!stages) return null;

  return (
    <div className="stage-guide">
      <div className="stage-guide-header">
        <h4>What to Post at Each Stage</h4>
        <p>Content ideas and templates for your learning journey</p>
      </div>

      <div className="stage-accordion">
        {Object.entries(stages).map(([stageKey, stage]) => (
          <div key={stageKey} className={`stage-item ${expandedStage === stageKey ? 'expanded' : ''}`}>
            <button
              className="stage-header"
              onClick={() => setExpandedStage(expandedStage === stageKey ? null : stageKey)}
            >
              <div className="stage-header-left">
                <Icon name={STAGE_ICONS[stageKey] || 'info'} size={16} />
                <div className="stage-header-text">
                  <h5>{stage.label}</h5>
                  <span className="stage-description">{stage.description}</span>
                </div>
              </div>
              <div className="stage-header-right">
                <span className="stage-frequency">{stage.frequency}</span>
                <Icon name={expandedStage === stageKey ? 'check' : 'rocket'} size={14} />
              </div>
            </button>

            {expandedStage === stageKey && (
              <div className="stage-content">
                <div className="stage-section">
                  <h6>What to Post</h6>
                  <ul className="stage-list">
                    {stage.whatToPost?.map((item, i) => (
                      <li key={i}>
                        <Icon name="check-circle" size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="stage-section">
                  <h6>Best Platforms</h6>
                  <div className="stage-tags">
                    {stage.bestPlatforms?.map((platform, i) => (
                      <span key={i} className="stage-tag">{platform}</span>
                    ))}
                  </div>
                </div>

                <div className="stage-section">
                  <h6>Tips</h6>
                  <ul className="stage-list tips">
                    {stage.tips?.map((tip, i) => (
                      <li key={i}>
                        <Icon name="info" size={14} />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="stage-section">
                  <h6>Assets You Need</h6>
                  <ul className="stage-list assets">
                    {stage.assetsNeeded?.map((asset, i) => (
                      <li key={i}>
                        <Icon name="image" size={14} />
                        <span>{asset}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="stage-templates">
                  <h6>Post Templates</h6>
                  <PostTemplateCard
                    stage={stageKey}
                    roadmapId={roadmapId}
                    roadmapTitle={roadmapTitle}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
