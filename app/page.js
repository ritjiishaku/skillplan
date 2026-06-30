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
];

export default function Home() {
  return <HomePage roadmapsMeta={roadmapsMeta} />;
}
