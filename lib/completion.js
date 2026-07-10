export function isPhaseComplete(phase, completed) {
  if (!phase?.modules || !Array.isArray(completed)) return false;
  const phaseResources = phase.modules.flatMap((mod, mi) =>
    (mod.resources || []).map((_, ri) => `phase-${phase.number}-${mi}-${ri}`)
  );
  return phaseResources.length > 0 && phaseResources.every(id => completed.includes(id));
}

export function isModuleComplete(phaseNumber, module, moduleIndex, completed) {
  if (!module?.resources || !Array.isArray(completed)) return false;
  return module.resources.every((_, ri) =>
    completed.includes(`phase-${phaseNumber}-${moduleIndex}-${ri}`)
  );
}

export function getPhaseProgress(phase, completed) {
  if (!phase?.modules || !Array.isArray(completed)) {
    return { total: 0, completed: 0, percentage: 0 };
  }
  const total = phase.modules.reduce((sum, mod) => sum + (mod.resources?.length || 0), 0);
  const completedCount = phase.modules.flatMap((mod, mi) =>
    (mod.resources || []).filter((_, ri) =>
      completed.includes(`phase-${phase.number}-${mi}-${ri}`)
    )
  ).length;
  return {
    total,
    completed: completedCount,
    percentage: total > 0 ? Math.round((completedCount / total) * 100) : 0
  };
}

export function getModuleProgress(phaseNumber, module, moduleIndex, completed) {
  if (!module?.resources || !Array.isArray(completed)) {
    return { total: 0, completed: 0, percentage: 0 };
  }
  const total = module.resources.length;
  const completedCount = module.resources.filter((_, ri) =>
    completed.includes(`phase-${phaseNumber}-${moduleIndex}-${ri}`)
  ).length;
  return {
    total,
    completed: completedCount,
    percentage: total > 0 ? Math.round((completedCount / total) * 100) : 0
  };
}

export function generatePhaseShareText(phase, roadmapTitle, completed) {
  const guide = phase.socialMediaGuide;
  const hashtags = guide?.suggestedHashtags?.join(' ') || '#100DaysOfCode #LearnToCode';
  const milestone = guide?.milestonePost || `Completed Phase ${phase.number}: ${phase.title}!`;

  return `${milestone}\n\nRoadmap: ${roadmapTitle}\n\n${hashtags}`;
}

export function generateModuleShareText(module, phaseNumber, roadmapTitle) {
  return `Completed module: ${module.title}\n\nLearning ${roadmapTitle} - Phase ${phaseNumber}\n\n#100DaysOfCode #LearnToCode`;
}
