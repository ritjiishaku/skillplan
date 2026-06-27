'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [projectContent, setProjectContent] = useState(null);

  const openProject = useCallback((content) => setProjectContent(content), []);
  const closeProject = useCallback(() => setProjectContent(null), []);

  return (
    <ModalContext.Provider value={{ projectContent, openProject, closeProject }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
