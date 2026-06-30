'use client';

import { useEffect, useCallback } from 'react';
import { useModal } from '../context/ModalContext';

export default function ProjectModal() {
  const { projectContent, closeProject } = useModal();

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeProject();
  }, [closeProject]);

  useEffect(() => {
    if (!projectContent) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [projectContent, handleKeyDown]);

  if (!projectContent) return null;

  return (
    <div
      className={`modal-overlay ${projectContent ? 'active' : ''}`}
      id="projectModal"
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
      onClick={closeProject}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeProject} aria-label="Close modal">&#x2715;</button>
        <div className="modal-content" id="modalContent">
          {projectContent}
        </div>
      </div>
    </div>
  );
}
