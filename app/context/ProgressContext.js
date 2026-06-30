'use client';

import { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completedMap, setCompletedMap] = useState({});
  const completedRef = useRef(completedMap);
  completedRef.current = completedMap;

  const getKey = (roadmapId) => `${roadmapId}_completed`;

  const getCompleted = useCallback((roadmapId) => {
    return completedRef.current[roadmapId] || [];
  }, []);

  const loadProgress = useCallback((roadmapId) => {
    const key = getKey(roadmapId);
    const stored = localStorage.getItem(key);
    const ids = stored ? JSON.parse(stored) : [];
    setCompletedMap((prev) => ({ ...prev, [roadmapId]: ids }));
    return ids;
  }, []);

  const saveLocal = useCallback((roadmapId, ids) => {
    localStorage.setItem(getKey(roadmapId), JSON.stringify(ids));
  }, []);

  const toggleResource = useCallback((roadmapId, resId, isChecked) => {
    setCompletedMap((prev) => {
      const current = prev[roadmapId] || [];
      const next = isChecked
        ? [...current, resId]
        : current.filter((id) => id !== resId);
      saveLocal(roadmapId, next);
      return { ...prev, [roadmapId]: next };
    });
  }, [saveLocal]);

  const value = useMemo(() => ({ getCompleted, loadProgress, toggleResource }), [getCompleted, loadProgress, toggleResource]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
