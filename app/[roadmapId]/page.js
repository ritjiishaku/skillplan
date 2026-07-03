import { notFound } from 'next/navigation';
import RoadmapPage from '../components/Page';
import aiData from '@/data/ai.json';
import growthData from '@/data/growth.json';
import fullstackData from '@/data/fullstack.json';
import frontendData from '@/data/frontend.json';
import backendData from '@/data/backend.json';
import cybersecurityData from '@/data/cybersecurity.json';
import dataEngineeringData from '@/data/data-engineering.json';
import cloudDevopsData from '@/data/cloud-devops.json';
import fintechData from '@/data/fintech.json';
import greenTechData from '@/data/green-tech.json';

export function generateStaticParams() {
  return [
    { roadmapId: 'ai' },
    { roadmapId: 'growth' },
    { roadmapId: 'fullstack' },
    { roadmapId: 'frontend' },
    { roadmapId: 'backend' },
    { roadmapId: 'cybersecurity' },
    { roadmapId: 'data-engineering' },
    { roadmapId: 'cloud-devops' },
    { roadmapId: 'fintech' },
    { roadmapId: 'green-tech' },
  ];
}

const dataMap = {
  ai: aiData,
  growth: growthData,
  fullstack: fullstackData,
  frontend: frontendData,
  backend: backendData,
  cybersecurity: cybersecurityData,
  'data-engineering': dataEngineeringData,
  'cloud-devops': cloudDevopsData,
  fintech: fintechData,
  'green-tech': greenTechData,
};

export default async function RoadmapPageRoute({ params }) {
  const { roadmapId } = await params;
  const data = dataMap[roadmapId];

  if (!data) {
    notFound();
  }

  return <RoadmapPage data={data} roadmapId={roadmapId} />;
}
