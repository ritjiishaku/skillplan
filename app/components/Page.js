'use client';

import { useEffect, useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import PhaseSection from './PhaseSection';
import ProgressBar from './ProgressBar';
import { ProjectCard, getNiches, NicheAccordion } from './ProjectCard';
import SocialMediaGuide from './SocialMediaGuide';
import { ROADMAP_WEF_MAP } from '@/data/wef-rankings';
import { ROADMAP_REQUIREMENTS, REQUIREMENT_CATEGORIES } from '@/data/requirements';
import { REQ_ICONS } from '@/lib/req-icons';
import socialMediaGuideData from '@/data/social-media-guide.json';
import { isPhaseComplete } from '@/lib/completion';

const ALLOWED_TAGS = ['br', 'em', 'strong', 'span'];
const ALLOWED_ATTR = [];

function sanitizeHtml(html) {
  return html.replace(/<[^>]*>/g, (tag) => {
    const match = tag.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/);
    if (!match) return '';
    const tagName = match[1].toLowerCase();
    if (ALLOWED_TAGS.includes(tagName)) return tag;
    return '';
  });
}

export default function RoadmapPage({ data, roadmapId }) {
  const { getCompleted, loadProgress } = useProgress();
  const wef = ROADMAP_WEF_MAP[roadmapId];
  const req = ROADMAP_REQUIREMENTS[roadmapId];
  const reqCategory = req ? REQUIREMENT_CATEGORIES.find((c) => c.id === req.category) : null;

  useEffect(() => {
    loadProgress(roadmapId);
  }, [roadmapId, loadProgress]);

  const completed = getCompleted(roadmapId);
  const totalResources = useMemo(() => {
    if (!data?.phases) return 0;
    return data.phases.reduce((sum, phase) => {
      return sum + (phase.modules || []).reduce((s, mod) => s + (mod.resources || []).length, 0);
    }, 0);
  }, [data]);

  if (!data) return null;

  const niches = data.projects ? getNiches(data.projects) : [];
  const sanitizedTitle = sanitizeHtml(data.titleDisplay);

  return (
    <>
      <ProgressBar completed={completed.length} total={totalResources} />

      <header>
        <div className="header-grid" aria-hidden="true"></div>
        <div className="header-glow"></div>

        <div className="free-banner">{data.banner}</div>

        <h1 dangerouslySetInnerHTML={{ __html: sanitizedTitle }}></h1>
        <p className="subtitle">{data.subtitle}</p>

        <div className="meta-row">
          <div className="meta-item"><span className="meta-label">Duration</span><span className="meta-value">{data.meta?.duration}</span></div>
          <div className="meta-item"><span className="meta-label">Total Cost</span><span className="meta-value accent">{data.meta?.cost}</span></div>
          <div className="meta-item"><span className="meta-label">Resources</span><span className="meta-value">{data.meta?.resources}</span></div>
          <div className="meta-item"><span className="meta-label">Avg. Salary Target</span><span className="meta-value">{data.meta?.salaryTarget}</span></div>
        </div>

        {wef && (
          <div className="wef-ranking-banner">
            <div className="wef-ranking-header">
              <div className="wef-ranking-badge">
                <span className="wef-ranking-number">#{wef.wefRank}</span>
                <span className="wef-ranking-text">{wef.wefRole}</span>
              </div>
              <span className="wef-ranking-context">WEF Fastest Growing Role by 2030</span>
              {wef.altRank && (
                <div className="wef-ranking-alt">
                  <span className="wef-alt-badge">Also #{wef.altRank} {wef.altRole}</span>
                </div>
              )}
            </div>
            <div className="wef-ranking-details">
              <p className="wef-demand">{wef.skillDemand}</p>
              <p className="wef-note">{wef.note}</p>
            </div>
            <a
              href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="wef-source-link"
            >
              Source: WEF Future of Jobs Report 2025 &rarr;
            </a>
          </div>
        )}

        {req && reqCategory && (
          <div className="requirements-banner">
            <div className="req-header">
              <span className="req-category-badge" style={{ borderColor: reqCategory.color, color: reqCategory.color }}>
                <span className="req-badge-icon">{REQ_ICONS[reqCategory.icon]}</span> {reqCategory.label}
              </span>
              <span className="req-category-desc">{reqCategory.shortDesc}</span>
            </div>

            <div className="req-grid">
              <div className="req-item">
                <div className="req-item-label">
                  <span className="req-item-icon">{REQ_ICONS['graduation-cap']}</span>
                  <span>Degree</span>
                </div>
                <div className={`req-item-value req-degree-${req.degree}`}>
                  {req.degree === 'not-required' && 'Not Required'}
                  {req.degree === 'preferred' && 'Preferred by Some'}
                  {req.degree === 'required' && 'Required'}
                </div>
                <p className="req-item-note">{req.degreeNote}</p>
              </div>

              <div className="req-item">
                <div className="req-item-label">
                  <span className="req-item-icon">{REQ_ICONS.briefcase}</span>
                  <span>Portfolio</span>
                </div>
                <div className="req-priority-dots">
                  {['critical', 'important', 'helpful'].map((level) => (
                    <span key={level} className={`req-dot ${req.portfolio === level ? 'req-dot-active' : ''}`}></span>
                  ))}
                  <span className="req-priority-label">{req.portfolio === 'critical' ? 'Critical' : req.portfolio === 'important' ? 'Important' : 'Helpful'}</span>
                </div>
              </div>

              <div className="req-item">
                <div className="req-item-label">
                  <span className="req-item-icon">{REQ_ICONS.clock}</span>
                  <span>Experience</span>
                </div>
                <div className="req-priority-dots">
                  {['critical', 'important', 'helpful'].map((level) => (
                    <span key={level} className={`req-dot ${req.experience === level ? 'req-dot-active' : ''}`}></span>
                  ))}
                  <span className="req-priority-label">{req.experience === 'critical' ? 'Critical' : req.experience === 'important' ? 'Important' : 'Helpful'}</span>
                </div>
              </div>
            </div>

            {req.certs.length > 0 && (
              <div className="req-certs">
                <h4 className="req-certs-title">Recommended Certifications</h4>
                <div className="req-certs-list">
                  {req.certs.map((cert, i) => (
                    <div key={i} className="req-cert-item">
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="req-cert-name">
                        {cert.name}
                        <svg className="req-cert-link-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14L21 3"/><path d="M21 3h-6"/><path d="M21 3v6"/></svg>
                      </a>
                      <span className="req-cert-cost">{cert.cost}</span>
                      <span className={`req-cert-priority priority-${cert.priority}`}>{cert.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      <main id="main-content">
        {data.phases?.map((phase, i) => (
          <div key={i}>
            <PhaseSection
              phase={phase}
              completed={completed}
              roadmapId={roadmapId}
              roadmapTitle={data.titleDisplay?.replace(/<[^>]*>/g, '') || ''}
            />
            {i < data.phases.length - 1 && (
              <div className="phase-connector">
                {isPhaseComplete(phase, completed)
                  ? 'Phase complete - Share your progress!'
                  : 'Phase complete - Next phase'}
              </div>
            )}
          </div>
        ))}
      </main>

      {data.projects && (
        <section className="proj-capstone-section">
          <div className="proj-capstone-header">
            <div className="proj-capstone-glow"></div>
            <div className="proj-capstone-eyebrow">
              <div className="proj-capstone-badge">Final Capstone Project</div>
              <span className="proj-capstone-sub">General project required - Choose one niche to specialize in</span>
            </div>
          </div>
          {data.projects.general && (
            <div className="accordion-general">
              <ProjectCard project={data.projects.general} badge="General" badgeClass="proj-badge-general" />
            </div>
          )}
          {niches.length > 0 && <NicheAccordion projects={data.projects} />}
        </section>
      )}

      <SocialMediaGuide
        guide={socialMediaGuideData}
        roadmapId={roadmapId}
        roadmapTitle={data.titleDisplay?.replace(/<[^>]*>/g, '') || ''}
        completed={completed}
        totalResources={totalResources}
      />
    </>
  );
}
