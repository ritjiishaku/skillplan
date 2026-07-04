'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useModal } from '../context/ModalContext';

export default function ProjectModal() {
  const { projectContent, modalSize, closeProject } = useModal();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      closeProject();
      return;
    }
    if (e.key === 'Tab' && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [closeProject]);

  useEffect(() => {
    if (!projectContent) return;
    previousFocusRef.current = document.activeElement;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) focusable[0].focus();
      }
    });
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [projectContent, handleKeyDown]);

  if (!projectContent) return null;

  return (
    <div
      className={`modal-overlay ${projectContent ? 'active' : ''}`}
      id="projectModal"
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
      onClick={closeProject}
      ref={modalRef}
    >
      <div className={`modal-card${modalSize === 'sm' ? ' modal-card-sm' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeProject} aria-label="Close modal">&#x2715;</button>
        <div className="modal-content" id="modalContent">
          {projectContent}
        </div>
      </div>
    </div>
  );
}
