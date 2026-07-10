'use client';

import { createContext, useContext, useState, useCallback, useRef, useMemo, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completedMap, setCompletedMap] = useState({});
  const completedRef = useRef(completedMap);

  useEffect(() => {
    completedRef.current = completedMap;
  }, [completedMap]);

  const getKey = (roadmapId) => `${roadmapId}_completed`;

  const getCompleted = useCallback((roadmapId) => {
    return completedMap[roadmapId] || [];
  }, [completedMap]);

  const loadProgress = useCallback((roadmapId) => {
    const key = getKey(roadmapId);
    let ids = [];
    try {
      const stored = localStorage.getItem(key);
      ids = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(ids)) ids = [];
    } catch {
      ids = [];
    }
    setCompletedMap((prev) => ({ ...prev, [roadmapId]: ids }));
    return ids;
  }, []);

  const saveLocal = useCallback((roadmapId, ids) => {
    try {
      localStorage.setItem(getKey(roadmapId), JSON.stringify(ids));
    } catch {
      // localStorage full or unavailable
    }
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
