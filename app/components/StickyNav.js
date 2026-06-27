'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function StickyNav() {
  const router = useRouter();
  const pathname = usePathname();
  const current = pathname === '/' ? 'ai' : pathname.slice(1);
  const linksRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhase, setActivePhase] = useState(null);

  const roadmaps = [
    { id: 'ai', label: 'AI Automation' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'growth', label: 'Growth Engineer' },
  ];

  const phaseCounts = { ai: 8, fullstack: 8, growth: 11 };
  const phaseCount = phaseCounts[current] || 8;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const nav = document.getElementById('sticky-nav');
    if (!nav) return;
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const links = linksRef.current;
    if (!links) return;

    const nav = document.getElementById('sticky-nav');
    const navHeight = nav ? nav.offsetHeight : 56;

    const clearActive = () => {
      links.querySelectorAll('a').forEach((l) => l.classList.remove('active'));
      setActivePhase(null);
    };

    const headerObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) clearActive(); },
      { threshold: 0 }
    );
    const header = document.querySelector('header');
    if (header) headerObserver.observe(header);

    const phaseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            setActivePhase(id);
            links.querySelectorAll('a').forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: `-${navHeight}px 0px -65% 0px`, threshold: 0 }
    );
    document.querySelectorAll('.phase').forEach((el) => phaseObserver.observe(el));

    return () => {
      if (header) headerObserver.unobserve(header);
      phaseObserver.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen, closeMenu]);

  const handleNav = (href) => {
    closeMenu();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const phases = Array.from({ length: phaseCount }, (_, i) => ({
    num: String(i + 1).padStart(2, '0'),
    href: `#phase-${String(i + 1).padStart(2, '0')}`,
  }));

  return (
    <nav className="sticky-nav" id="sticky-nav" aria-label="Main navigation">
      <div className="sticky-nav-inner">
        <div className="sticky-nav-brand">
          <svg className="nav-logo" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
          </svg>
          <select className="roadmap-select" value={current} onChange={(e) => { closeMenu(); router.push(`/${e.target.value}`); }} aria-label="Select roadmap">
            {roadmaps.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>

        <ul className="sticky-nav-links" ref={linksRef}>
          {phases.map((p) => (
            <li key={p.num}>
              <a href={p.href} onClick={closeMenu}>
                <span className="phase-link-num">{p.num}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="sticky-nav-actions">
          <div className="progress-counter-pill" id="progress-counter-pill" aria-live="polite">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span id="progress-percent">0%</span>
          </div>
          <ThemeToggle />
          <button className="nav-hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`} ref={menuRef} role="dialog" aria-modal="true" aria-label="Phase navigation">
        <div className="nav-mobile-menu-header">Jump to Phase</div>
        <div className="nav-mobile-phases">
          {phases.map((p) => (
            <a key={p.num} href={p.href} className={`nav-mobile-phase-link${activePhase === p.href.slice(1) ? ' active' : ''}`} onClick={() => handleNav(p.href)}>
              <span className="nav-mobile-phase-num">{p.num}</span>
              <span className="nav-mobile-phase-label">Phase {p.num}</span>
              {activePhase === p.href.slice(1) && (
                <svg className="nav-mobile-phase-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>

      {menuOpen && <div className="nav-mobile-overlay" onClick={closeMenu} />}
    </nav>
  );
}
