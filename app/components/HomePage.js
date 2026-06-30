'use client';

import { useRouter } from 'next/navigation';
import { Bot, Layers, Monitor, Server, Shield, BarChart3, Cloud, Wallet, TrendingUp } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import aiData from '@/data/ai.json';
import fullstackData from '@/data/fullstack.json';
import frontendData from '@/data/frontend.json';
import backendData from '@/data/backend.json';
import cybersecurityData from '@/data/cybersecurity.json';
import dataEngineeringData from '@/data/data-engineering.json';
import cloudDevopsData from '@/data/cloud-devops.json';
import fintechData from '@/data/fintech.json';
import growthData from '@/data/growth.json';

const roadmapIcons = {
  ai: Bot,
  fullstack: Layers,
  frontend: Monitor,
  backend: Server,
  cybersecurity: Shield,
  'data-engineering': BarChart3,
  'cloud-devops': Cloud,
  fintech: Wallet,
  growth: TrendingUp,
};

const roadmaps = [
  { id: 'ai', data: aiData },
  { id: 'fullstack', data: fullstackData },
  { id: 'frontend', data: frontendData },
  { id: 'backend', data: backendData },
  { id: 'cybersecurity', data: cybersecurityData },
  { id: 'data-engineering', data: dataEngineeringData },
  { id: 'cloud-devops', data: cloudDevopsData },
  { id: 'fintech', data: fintechData },
  { id: 'growth', data: growthData },
];

function RoadmapCard({ id, data }) {
  const router = useRouter();
  const Icon = roadmapIcons[id];

  const titleMap = {
    'ai': 'AI Automation Engineering',
    'fullstack': 'Full-Stack Engineering',
    'frontend': 'Frontend Engineering',
    'backend': 'Backend Engineering',
    'cybersecurity': 'Cybersecurity Engineering',
    'data-engineering': 'Data Engineering & Analytics',
    'cloud-devops': 'Cloud/DevOps Engineering',
    'fintech': 'Fintech Engineering',
    'growth': 'Growth Engineering',
  };

  const meta = data?.meta || {};
  const phaseCount = data?.phases?.length || 8;

  return (
    <a
      className="home-card"
      href={`/${id}`}
      onClick={(e) => { e.preventDefault(); router.push(`/${id}`); }}
    >
      {Icon && <Icon className="home-card-icon" strokeWidth={1.5} />}
      <h3 className="home-card-title">{titleMap[id]}</h3>
      <div className="home-card-meta">
        <span>{phaseCount} phases</span>
        <span className="home-card-dot">·</span>
        <span>{meta.resources || '120+'}</span>
        <span className="home-card-dot">·</span>
        <span>{meta.duration || '14\u201316 mo'}</span>
      </div>
      <div className="home-card-salary">{meta.salaryTarget || '$120k+'}</div>
    </a>
  );
}

export default function HomePage() {
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
          <span>9 roadmaps</span>
          <span className="home-card-dot">·</span>
          <span>130+ modules</span>
          <span className="home-card-dot">·</span>
          <span>$0 cost</span>
          <span className="home-card-dot">·</span>
          <span>Remote-ready</span>
        </div>
      </section>

      <section className="home-grid-section">
        <div className="home-grid">
          {roadmaps.map((r) => (
            <RoadmapCard key={r.id} id={r.id} data={r.data} />
          ))}
        </div>
      </section>

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

      <footer className="home-footer">
        <p>Built with free resources &middot; No accounts required &middot; Zero cost</p>
      </footer>
    </main>
  );
}
