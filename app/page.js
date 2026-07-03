import HomePage from './components/HomePage';
import aiData from '@/data/ai.json';
import fullstackData from '@/data/fullstack.json';
import frontendData from '@/data/frontend.json';
import backendData from '@/data/backend.json';
import cybersecurityData from '@/data/cybersecurity.json';
import dataEngineeringData from '@/data/data-engineering.json';
import cloudDevopsData from '@/data/cloud-devops.json';
import fintechData from '@/data/fintech.json';
import growthData from '@/data/growth.json';
import greenTechData from '@/data/green-tech.json';
import { ROADMAP_WEF_MAP } from '@/data/wef-rankings';

const roadmapsMeta = [
  { id: 'ai', meta: aiData.meta, phaseCount: aiData.phases.length },
  { id: 'fullstack', meta: fullstackData.meta, phaseCount: fullstackData.phases.length },
  { id: 'frontend', meta: frontendData.meta, phaseCount: frontendData.phases.length },
  { id: 'backend', meta: backendData.meta, phaseCount: backendData.phases.length },
  { id: 'cybersecurity', meta: cybersecurityData.meta, phaseCount: cybersecurityData.phases.length },
  { id: 'data-engineering', meta: dataEngineeringData.meta, phaseCount: dataEngineeringData.phases.length },
  { id: 'cloud-devops', meta: cloudDevopsData.meta, phaseCount: cloudDevopsData.phases.length },
  { id: 'fintech', meta: fintechData.meta, phaseCount: fintechData.phases.length },
  { id: 'growth', meta: growthData.meta, phaseCount: growthData.phases.length },
  { id: 'green-tech', meta: greenTechData.meta, phaseCount: greenTechData.phases.length },
].sort((a, b) => {
  const rankA = ROADMAP_WEF_MAP[a.id]?.wefRank ?? 99;
  const rankB = ROADMAP_WEF_MAP[b.id]?.wefRank ?? 99;
  return rankA - rankB;
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Skillplan',
  url: 'https://ritji.xyz',
  description: 'Free, skills-first engineering roadmaps aligned to the WEF Future of Jobs Report 2025. No paywalls. No degrees required.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ritji.xyz/{search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const metadata = {
  title: 'Skillplan — Free Roadmaps to Your Next Career',
  description: '9 skills-first roadmaps aligned to the WEF Future of Jobs Report 2025. AI, Full-Stack, Frontend, Backend, Cybersecurity, Data, Cloud/DevOps, Fintech, and Growth Engineering — all free, no degree needed, remote-ready.',
  alternates: { canonical: 'https://ritji.xyz' },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage roadmapsMeta={roadmapsMeta} />
    </>
  );
}
