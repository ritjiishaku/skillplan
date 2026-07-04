'use client';

import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useModal } from '../context/ModalContext';
import ContactForm from './ContactForm';
import { Icon } from '../../lib/icons';
import { ROADMAP_WEF_MAP } from '@/data/wef-rankings';
import { REQUIREMENT_CATEGORIES, ROADMAP_REQUIREMENTS } from '@/data/requirements';

const HOME_ICONS = {
  ai: (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  fullstack: (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  frontend: (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M6 9l3 3-3 3" />
    </svg>
  ),
  backend: (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  cybersecurity: (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  'data-engineering': (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  ),
  'cloud-devops': (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
    </svg>
  ),
  fintech: (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
      <line x1="12" y1="10" x2="12" y2="17" />
      <line x1="8" y1="15" x2="16" y2="15" />
    </svg>
  ),
  growth: (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  'green-tech': (
    <svg className="home-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" />
      <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M12 16v-4" />
    </svg>
  ),
};

import { TITLE_MAP as titleMap } from '@/lib/roadmaps';

import { HOME_REQ_ICONS as REQ_ICONS } from '@/lib/req-icons';

export default function HomePage({ roadmapsMeta }) {
  const router = useRouter();
  const { openProject } = useModal();

  const groupedByCategory = REQUIREMENT_CATEGORIES.map((cat) => ({
    ...cat,
    roadmaps: roadmapsMeta.filter((r) => ROADMAP_REQUIREMENTS[r.id]?.category === cat.id),
  })).filter((g) => g.roadmaps.length > 0);

  return (
    <main className="home">
      <ThemeToggle className="home-theme-toggle" />
      <section className="home-hero">
        <div className="home-hero-badge">
          <span className="home-hero-dot"></span>
          World Economic Forum aligned
        </div>
        <h1 className="home-hero-site-title">Skillplan</h1>
        <h2 className="home-hero-title">
          Free, skills-first roadmaps<br />
          to your next career
        </h2>
        <p className="home-hero-sub">
          Curated from the WEF Future of Jobs Report 2025. No degrees required.
          No paywalls. Work remotely from anywhere.
        </p>
        <div className="home-hero-stats">
          <span>10 roadmaps</span>
          <span className="home-card-dot">·</span>
          <span>130+ modules</span>
          <span className="home-card-dot">·</span>
          <span>$0 cost</span>
          <span className="home-card-dot">·</span>
          <span>Remote-ready</span>
        </div>
      </section>

      <section className="home-req-legend">
        <h2 className="home-req-legend-title">How to Choose</h2>
        <p className="home-req-legend-sub">
          Each roadmap shows what matters most for hiring. Here&apos;s what the labels mean.
        </p>
        <div className="home-req-legend-grid">
          {REQUIREMENT_CATEGORIES.map((cat) => (
            <div key={cat.id} className="home-req-legend-item">
              <div className="legend-dot-wrap">
                <span className="legend-dot" style={{ background: cat.color }}></span>
              </div>
              <div className="legend-text">
                <strong><span className="legend-icon" style={{ color: cat.color }}>{REQ_ICONS[cat.icon]}</span> {cat.label}</strong>
                <p>{cat.fullDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {groupedByCategory.map((group) => (
        <section key={group.id} className="home-grid-section">
          <div className="home-category">
            <div className="home-category-header">
              <span className="home-category-icon" style={{ color: group.color }}>{REQ_ICONS[group.icon]}</span>
              <h3 className="home-category-title">{group.label}</h3>
            </div>
            <p className="home-category-desc">{group.shortDesc}</p>
          </div>
          <div className="home-grid">
            {group.roadmaps.map((r) => {
              const wef = ROADMAP_WEF_MAP[r.id];
              const req = ROADMAP_REQUIREMENTS[r.id];
              return (
                <a
                  key={r.id}
                  className="home-card"
                  href={`/${r.id}`}
                  onClick={(e) => { e.preventDefault(); router.push(`/${r.id}`); }}
                >
                  {wef && (
                    <div className="home-card-wef">
                      <span className="home-card-wef-rank">#{wef.wefRank}</span>
                      <span className="home-card-wef-label">WEF Fastest Growing</span>
                    </div>
                  )}
                  {HOME_ICONS[r.id]}
                  <h3 className="home-card-title">{titleMap[r.id]}</h3>
                  <div className="home-card-meta">
                    <span>{r.phaseCount} phases</span>
                    <span className="home-card-dot">·</span>
                    <span>{r.meta.resources || '120+'}</span>
                    <span className="home-card-dot">·</span>
                    <span>{r.meta.duration || '14\u201316 mo'}</span>
                  </div>
                  <div className="home-card-salary">{r.meta.salaryTarget || '$120k+'}</div>
                  <div className="home-card-req">
                    <span className="home-card-req-dot" style={{ background: group.color }}></span>
                    <span className="home-card-req-label">{group.label}</span>
                    {req && req.certs.length > 0 && (
                      <span className="home-card-req-certs">{req.certs.length} cert{req.certs.length > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      ))}

      <section className="home-wef">
        <h2 className="home-wef-title">Why these roadmaps?</h2>
        <p className="home-wef-text">
          The World Economic Forum Future of Jobs Report 2025 identifies
          AI, cybersecurity, data, cloud, fintech, and software development
          as the fastest-growing skills through 2030. Every roadmap below
          maps directly to a top-10 WEF skill &mdash; and every resource is
          free, no degree required, and designed for remote work.
        </p>
        <div className="home-wef-links">
          <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer" className="home-wef-link">
            Read the report &rarr;
          </a>
        </div>
      </section>

      <section className="home-contact">
        <h2 className="home-contact-title">Get in Touch</h2>
        <p className="home-contact-text">
          Have feedback, found a bug, or want to suggest a roadmap? I&apos;d love to hear from you.
        </p>
        <div className="home-contact-actions">
          <a
            href="https://wa.me/2349064957884"
            target="_blank"
            rel="noopener noreferrer"
            className="home-contact-btn home-contact-whatsapp"
          >
            <Icon name="whatsapp" size={18} />
            WhatsApp
          </a>
          <a
            href="mailto:ritjiishaku@gmail.com"
            className="home-contact-btn home-contact-email"
          >
            <Icon name="mail" size={18} />
            Email
          </a>
          <button
            className="home-contact-btn home-contact-page"
            onClick={() => openProject(<ContactForm />, 'sm')}
          >
            More options &rarr;
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <p>Built with free resources &middot; No accounts required &middot; Zero cost</p>
      </footer>
    </main>
  );
}
