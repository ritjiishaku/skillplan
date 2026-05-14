/* ═══════════════════════════════════════════════════════
   AI Automation Engineering — Curriculum Script
   v2026.2 · Perfected Edition
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 0. Helper Functions ── */
  function id(name) { return document.getElementById(name); }

  /* ── 1. Progress Tracker ── */
  class ProgressTracker {
    constructor() {
      this.user = JSON.parse(localStorage.getItem('ae_user')) || null;
      this.completed = JSON.parse(localStorage.getItem('ae_completed')) || [];
      this.resources = Array.from(document.querySelectorAll('.resource-item'));
      
      this.initUI();
      this.injectCheckboxes();
      this.updateProgress();
      this.bindEvents();
    }

    initUI() {
      this.loginModal = id('loginModal');
      this.loginTrigger = id('login-trigger');
      this.userProfile = id('user-profile');
      this.usernameDisplay = id('username-display');
      this.loginForm = id('login-form');
      this.progressBar = id('global-progress');
      this.progressText = id('progress-percent');

      if (this.user) {
        this.showLoggedIn();
      }
    }

    injectCheckboxes() {
      this.resources.forEach(item => {
        const resId = this.getResourceId(item);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'resource-checkbox';
        checkbox.checked = this.completed.includes(resId);
        
        if (checkbox.checked) {
          item.classList.add('completed');
        }

        item.prepend(checkbox);

        checkbox.addEventListener('change', (e) => {
          this.toggleResource(resId, checkbox.checked, item);
        });
      });
    }

    getResourceId(item) {
      const phase = item.closest('.phase')?.id || 'misc';
      const name = item.querySelector('.resource-name')?.textContent || 'unnamed';
      return `${phase}-${name}`.replace(/\s+/g, '-').toLowerCase();
    }

    toggleResource(resId, isChecked, item) {
      if (isChecked) {
        if (!this.completed.includes(resId)) this.completed.push(resId);
        item.classList.add('completed');
      } else {
        this.completed = this.completed.filter(c => c !== resId);
        item.classList.remove('completed');
      }
      this.save();
      this.updateProgress();
    }

    updateProgress() {
      const total = this.resources.length;
      const done = this.completed.length;
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;
      
      if (this.progressBar) this.progressBar.style.width = `${percent}%`;
      if (this.progressText) this.progressText.textContent = `${percent}%`;
    }

    showLoggedIn() {
      if (this.loginTrigger) this.loginTrigger.style.display = 'none';
      if (this.userProfile) this.userProfile.style.display = 'block';
      if (this.usernameDisplay) this.usernameDisplay.textContent = this.user.name;
    }

    bindEvents() {
      if (this.loginTrigger) {
        this.loginTrigger.addEventListener('click', () => {
          this.loginModal.classList.add('active');
          id('user-name').focus();
        });
      }

      id('loginModalClose')?.addEventListener('click', () => {
        this.loginModal.classList.remove('active');
      });

      if (this.loginForm) {
        this.loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const nameInput = id('user-name');
          if (nameInput) {
            this.user = { name: nameInput.value, joined: new Date().toISOString() };
            localStorage.setItem('ae_user', JSON.stringify(this.user));
            this.showLoggedIn();
            this.loginModal.classList.remove('active');
          }
        });
      }
    }

    save() {
      localStorage.setItem('ae_completed', JSON.stringify(this.completed));
    }
  }

  const tracker = new ProgressTracker();

  /* ── 2. Initialise Lucide icons ── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    console.error('[Curriculum] Lucide not loaded.');
  }

  /* ── 3. Hide all inline project blocks (CSS already does this; JS as fallback) ── */
  document.querySelectorAll('.proj-module-block, .proj-phase-block, .proj-capstone-section')
    .forEach(b => { b.style.display = 'none'; });

  /* ── 4. Modal state ── */
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

  /* ── 5. Inject "View Module Projects" button into each module card ── */
  document.querySelectorAll('.module-card').forEach(card => {
    let block = null;
    let sibling = card.nextElementSibling;
    while (sibling) {
      if (sibling.classList.contains('proj-module-block')) { block = sibling; break; }
      if (sibling.classList.contains('module-card')) break; 
      sibling = sibling.nextElementSibling;
    }
    if (!block) return; 

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

  /* ── 6. Wire up phase-level "View Phase Project" buttons (already in HTML) ── */
  document.querySelectorAll('.phase-header-row .proj-toggle-btn').forEach((btn, idx) => {
    const phase = btn.closest('.phase');
    if (!phase) return;
    const phaseBlock = phase.querySelector('.proj-phase-block, .proj-capstone-section');
    if (phaseBlock) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal(phaseBlock);
      });
    }
  });

  /* ── 7. Modal dismiss events ── */
  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  /* ── 8. Keyboard handling ── */
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

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

  /* ── 9. Intersection Observer for staggered reveal ── */
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

  /* ── 10. iOS modal scroll lock fix ── */
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
