'use client';

import { useModal } from '../context/ModalContext';

export default function ProjectModal() {
  const { projectContent, closeProject } = useModal();

  if (!projectContent) return null;

  return (
    <div className={`modal-overlay ${projectContent ? 'active' : ''}`} id="projectModal" role="dialog" aria-modal="true" aria-label="Project details">
      <div className="modal-card">
        <button className="modal-close" onClick={closeProject} aria-label="Close modal">&#x2715;</button>
        <div className="modal-content" id="modalContent">
          {projectContent}
        </div>
      </div>
    </div>
  );
}
