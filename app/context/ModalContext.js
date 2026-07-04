'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [projectContent, setProjectContent] = useState(null);
  const [modalSize, setModalSize] = useState(null);

  const openProject = useCallback((content, size = null) => {
    setProjectContent(content);
    setModalSize(size);
  }, []);
  const closeProject = useCallback(() => {
    setProjectContent(null);
    setModalSize(null);
  }, []);

  return (
    <ModalContext.Provider value={{ projectContent, modalSize, openProject, closeProject }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
