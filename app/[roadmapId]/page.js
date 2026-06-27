import { notFound } from 'next/navigation';
import RoadmapPage from '../components/Page';
import aiData from '@/data/ai.json';
import growthData from '@/data/growth.json';
import fullstackData from '@/data/fullstack.json';

export function generateStaticParams() {
  return [
    { roadmapId: 'ai' },
    { roadmapId: 'growth' },
    { roadmapId: 'fullstack' },
  ];
}

const dataMap = {
  ai: aiData,
  growth: growthData,
  fullstack: fullstackData,
};

export default async function RoadmapPageRoute({ params }) {
  const { roadmapId } = await params;
  const data = dataMap[roadmapId];

  if (!data) {
    notFound();
  }

  return <RoadmapPage data={data} roadmapId={roadmapId} />;
}
