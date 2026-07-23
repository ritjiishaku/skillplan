import { notFound } from 'next/navigation';
import RoadmapPage from '../components/Page';
import { ROADMAP_IDS } from '../../lib/roadmaps.js';
import { ROADMAP_WEF_MAP } from '../../data/wef-rankings.js';
import { ROADMAP_REQUIREMENTS } from '../../data/requirements.js';

const dataImports = {
  ai: () => import('@/data/ai.json'),
  growth: () => import('@/data/growth.json'),
  fullstack: () => import('@/data/fullstack.json'),
  frontend: () => import('@/data/frontend.json'),
  backend: () => import('@/data/backend.json'),
  cybersecurity: () => import('@/data/cybersecurity.json'),
  'data-engineering': () => import('@/data/data-engineering.json'),
  'cloud-devops': () => import('@/data/cloud-devops.json'),
  fintech: () => import('@/data/fintech.json'),
  'green-tech': () => import('@/data/green-tech.json'),
};

export function generateStaticParams() {
  return ROADMAP_IDS.map((roadmapId) => ({ roadmapId }));
}

const titleMap = {
  ai: 'AI Automation Engineering',
  fullstack: 'Full-Stack Engineering',
  frontend: 'Frontend Engineering',
  backend: 'Backend Engineering',
  cybersecurity: 'Cybersecurity Engineering',
  'data-engineering': 'Data Engineering & Analytics',
  'cloud-devops': 'Cloud/DevOps Engineering',
  fintech: 'Fintech Engineering',
  growth: 'Growth Engineering',
  'green-tech': 'Green Tech / Climate Tech Engineering',
};

export async function generateMetadata({ params }) {
  const { roadmapId } = await params;
  if (!ROADMAP_IDS.includes(roadmapId)) return {};
  const title = titleMap[roadmapId] || roadmapId;

  let resources = '100+';
  try {
    const importer = dataImports[roadmapId];
    if (importer) {
      const mod = await importer();
      const data = mod.default || mod;
      if (data?.meta?.resources) resources = data.meta.resources;
    }
  } catch {}

  const description = `Free, skills-first ${title} roadmap. 8 phases, ${resources} free resources, milestone projects, progress tracking. No degree needed.`;
  const url = `https://ritji.xyz/${roadmapId}`;

  return {
    title: `${title} — Skillplan`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — Skillplan`,
      description,
      url,
      siteName: 'Skillplan',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Skillplan`,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function RoadmapPageRoute({ params }) {
  const { roadmapId } = await params;

  if (!ROADMAP_IDS.includes(roadmapId)) {
    notFound();
  }

  const importer = dataImports[roadmapId];
  if (!importer) notFound();

  const mod = await importer();
  const data = mod.default || mod;

  if (!data) notFound();

  const wef = ROADMAP_WEF_MAP[roadmapId];
  const req = ROADMAP_REQUIREMENTS[roadmapId];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: titleMap[roadmapId],
    description: data.subtitle,
    provider: {
      '@type': 'Organization',
      name: 'Skillplan',
      url: 'https://ritji.xyz',
    },
    isAccessibleForFree: true,
    url: `https://ritji.xyz/${roadmapId}`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: data.meta?.duration,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RoadmapPage data={data} roadmapId={roadmapId} />
    </>
  );
}
