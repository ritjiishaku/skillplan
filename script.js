/* ═══════════════════════════════════════════════════════
   AI Automation Engineering — Curriculum Script
   v2026.2 · Perfected Edition
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. Initialise Lucide icons ── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    console.error('[Curriculum] Lucide not loaded.');
  }

  /* ── 2. Hide all inline project blocks (CSS already does this; JS as fallback) ── */
  document.querySelectorAll('.proj-module-block, .proj-phase-block, .proj-capstone-section')
    .forEach(b => { b.style.display = 'none'; });

  /* ── 3. Modal state ── */
  const modal        = document.getElementById('projectModal');
  const modalClose   = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  let   lastFocused  = null;

  if (!modal || !modalClose || !modalContent) {
    console.error('[Curriculum] Modal elements missing from DOM.');
    return;
  }

  /* ── Open modal ── */
  function openModal(sourceBlock) {
    lastFocused = document.activeElement;

    const clone = sourceBlock.cloneNode(true);
    clone.style.display   = 'block';
    clone.style.border    = 'none';
    clone.style.margin    = '0';
    clone.style.boxShadow = 'none';

    modalContent.innerHTML = '';
    modalContent.appendChild(clone);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    /* Re-initialise Lucide icons inside the cloned content */
    if (typeof lucide !== 'undefined') lucide.createIcons();

    /* Ensure first heading has the aria-labelledby id */
    const titleEl = modalContent.querySelector('h4, h3');
    if (titleEl) titleEl.id = 'modalTitle';

    /* Focus the close button after two animation frames */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { modalClose.focus(); });
    });
  }

  /* ── Close modal ── */
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) {
      requestAnimationFrame(() => { lastFocused.focus(); });
    }
  }

  /* ── 4. Inject "View Module Projects" button into each module card ── */
  document.querySelectorAll('.module-card').forEach(card => {
    /* Find the associated .proj-module-block that immediately follows this card */
    let block = null;
    let sibling = card.nextElementSibling;
    while (sibling) {
      if (sibling.classList.contains('proj-module-block')) { block = sibling; break; }
      if (sibling.classList.contains('module-card')) break; /* stop at next card */
      sibling = sibling.nextElementSibling;
    }
    if (!block) return; /* card with no project block — skip */

    /* Get module title for aria-label */
    const titleEl = card.querySelector('.module-title');
    const titleText = titleEl ? titleEl.textContent.trim() : 'this module';

    const btn = document.createElement('button');
    btn.className = 'proj-toggle-btn';
    btn.setAttribute('aria-label', 'View projects for: ' + titleText);
    btn.innerHTML = '<i data-lucide="sparkles"></i> View Module Projects';
    card.appendChild(btn);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openModal(block);
    });
  });

  /* Re-init icons after button injection */
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── 5. Wire up phase-level "View Phase Project" buttons (already in HTML) ── */
  document.querySelectorAll('.phase-header-row .proj-toggle-btn').forEach((btn, idx) => {
    const phase = btn.closest('.phase');
    if (!phase) {
      console.warn('[Curriculum] Phase btn #' + idx + ' has no .phase ancestor.');
      return;
    }
    const phaseBlock = phase.querySelector('.proj-phase-block, .proj-capstone-section');
    if (phaseBlock) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal(phaseBlock);
      });
    }
  });

  /* ── 6. Modal dismiss events ── */
  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  /* ── 7. Keyboard handling ── */
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    /* Tab trap inside modal */
    if (e.key === 'Tab') {
      const focusable = Array.from(
        modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.disabled && el.offsetParent !== null);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ── 8. Intersection Observer for staggered reveal ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );

    document.querySelectorAll('.phase, .bonus-section').forEach((el, i) => {
      el.style.animationPlayState = 'paused';
      el.style.animationDelay = (0.05 + i * 0.05) + 's';
      observer.observe(el);
    });
  }

  /* ── 9. iOS modal scroll lock fix ── */
  let scrollPosition = 0;

  function lockScroll() {
    scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollPosition + 'px';
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  }

  /* Patch openModal and closeModal */
  const origOpen = openModal;
  const origClose = closeModal;
  openModal = function(sourceBlock) {
    lockScroll();
    origOpen(sourceBlock);
  };
  closeModal = function() {
    unlockScroll();
    origClose();
  };
});
