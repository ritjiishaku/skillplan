/* ═══════════════════════════════════════════════════════
   AI Automation Engineering — Curriculum Script
   v2026.3 · Cloud Sync Edition (Supabase)
   ═══════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://hbexvzqtgiiizcuzwyifa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZXh2enF0Z2lpemN1end5aWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTM5OTMsImV4cCI6MjA5NDMyOTk5M30.9zI49DU7iET37Qvx3hXKGuVT-GQ7L2UphqvYPShGzM0';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', function () {

  /* ── 0. Helper Functions ── */
  function id(name) { return document.getElementById(name); }

  /* ── 1. Progress Tracker Class ── */
  class ProgressTracker {
    constructor() {
      this.user = null;
      this.completed = JSON.parse(localStorage.getItem('ae_completed')) || [];
      this.resources = Array.from(document.querySelectorAll('.resource-item'));
      this.isSyncing = false;
      this.currentTab = 'signin';
      
      this.initUI();
      this.injectCheckboxes();
      this.updateProgress();
      this.checkSession();
      this.bindEvents();
      this.checkRecoveryMode();
    }

    initUI() {
      // Modals
      this.loginModal = id('loginModal');
      this.accountModal = id('accountModal');
      
      // Triggers
      this.loginTrigger = id('login-trigger');
      this.userProfile = id('user-profile');
      this.profileToggle = document.querySelector('.user-profile-toggle');
      
      // Displays
      this.usernameDisplay = id('username-display');
      this.accEmail = id('acc-email');
      this.accName = id('acc-name');
      this.syncIndicator = id('sync-indicator');
      
      // Progress UI
      this.progressBar = id('global-progress');
      this.progressText = id('progress-percent');
    }

    async checkSession() {
      const { data: { session } } = await sb.auth.getSession();
      if (session) {
        this.user = session.user;
        await this.loadUserProfile();
        this.showLoggedIn();
        await this.syncWithCloud();
      }
    }

    async loadUserProfile() {
      if (!this.user) return;
      const { data, error } = await sb
        .from('profiles')
        .select('full_name')
        .eq('id', this.user.id)
        .single();
      
      if (data) {
        this.user.full_name = data.full_name;
      }
    }

    injectCheckboxes() {
      this.resources.forEach(item => {
        const resId = this.getResourceId(item);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'resource-checkbox';
        checkbox.checked = this.completed.includes(resId);
        
        if (checkbox.checked) item.classList.add('completed');

        item.prepend(checkbox);

        checkbox.addEventListener('change', async (e) => {
          await this.toggleResource(resId, checkbox.checked, item);
        });
      });
    }

    getResourceId(item) {
      const phase = item.closest('.phase')?.id || 'misc';
      const name = item.querySelector('.resource-name')?.textContent || 'unnamed';
      return `${phase}-${name}`.replace(/\s+/g, '-').toLowerCase();
    }

    async toggleResource(resId, isChecked, item) {
      if (isChecked) {
        if (!this.completed.includes(resId)) this.completed.push(resId);
        item.classList.add('completed');
      } else {
        this.completed = this.completed.filter(c => c !== resId);
        item.classList.remove('completed');
      }
      
      this.saveLocal();
      this.updateProgress();
      
      if (this.user) {
        await this.pushToCloud();
      }
    }

    updateProgress() {
      const total = this.resources.length;
      const done = this.completed.length;
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;
      
      if (this.progressBar) this.progressBar.style.width = `${percent}%`;
      if (this.progressText) this.progressText.textContent = `${percent}%`;
    }

    saveLocal() {
      localStorage.setItem('ae_completed', JSON.stringify(this.completed));
    }

    showLoggedIn() {
      if (this.loginTrigger) this.loginTrigger.style.display = 'none';
      if (this.userProfile) this.userProfile.style.display = 'block';
      if (this.usernameDisplay) this.usernameDisplay.textContent = this.user.full_name || this.user.email.split('@')[0];
      
      // Update Account Modal
      if (this.accEmail) this.accEmail.textContent = this.user.email;
      if (this.accName) this.accName.textContent = this.user.full_name || 'Not set';
    }

    showLoggedOut() {
      if (this.loginTrigger) this.loginTrigger.style.display = 'flex';
      if (this.userProfile) this.userProfile.style.display = 'none';
      this.user = null;
    }

    async syncWithCloud() {
      if (!this.user) return;
      this.setSyncing(true);

      try {
        // 1. Pull cloud data
        const { data, error } = await sb
          .from('progress')
          .select('completed_ids')
          .eq('id', this.user.id)
          .single();

        let cloudIds = (data && data.completed_ids) ? data.completed_ids : [];

        // 2. Merge with local data (The "Guest Migration" logic)
        const localIds = JSON.parse(localStorage.getItem('ae_completed')) || [];
        const combined = Array.from(new Set([...cloudIds, ...localIds]));
        
        this.completed = combined;
        this.saveLocal();
        this.updateCheckboxes();
        this.updateProgress();

        // 3. Push back merged state to cloud if local had more
        if (localIds.length > 0) {
          await this.pushToCloud();
        }
      } catch (err) {
        console.error('[Sync] Failed:', err);
      } finally {
        this.setSyncing(false);
      }
    }

    async pushToCloud() {
      if (!this.user || this.isSyncing) return;
      this.setSyncing(true);

      try {
        const { error } = await sb
          .from('progress')
          .upsert({ 
            id: this.user.id, 
            completed_ids: this.completed,
            updated_at: new Date().toISOString()
          });
        
        if (error) throw error;
      } catch (err) {
        console.error('[Push] Failed:', err);
      } finally {
        this.setSyncing(false);
      }
    }

    setSyncing(state) {
      this.isSyncing = state;
      if (this.syncIndicator) {
        state ? this.syncIndicator.classList.add('syncing') : this.syncIndicator.classList.remove('syncing');
      }
    }

    updateCheckboxes() {
      document.querySelectorAll('.resource-checkbox').forEach(cb => {
        const item = cb.closest('.resource-item');
        const resId = this.getResourceId(item);
        cb.checked = this.completed.includes(resId);
        cb.checked ? item.classList.add('completed') : item.classList.remove('completed');
      });
    }

    togglePassword(btnId, inputId) {
      id(btnId)?.addEventListener('click', (e) => {
        const passInput = id(inputId);
        const isPass = passInput.type === 'password';
        passInput.type = isPass ? 'text' : 'password';
        const container = e.currentTarget;
        const oldIcon = container.querySelector('[data-lucide]');
        if (oldIcon) {
          const newIcon = document.createElement('i');
          newIcon.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
          container.replaceChild(newIcon, oldIcon);
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
      });
    }

    showView(view) {
      id('auth-form-view').style.display = 'none';
      id('forgot-password-form').style.display = 'none';
      id('reset-password-form').style.display = 'none';
      id(view).style.display = 'block';
      id('auth-error').style.display = 'none';
    }

    bindEvents() {
      // Login Modal Toggle
      this.loginTrigger?.addEventListener('click', () => {
        this.loginModal.classList.add('active');
        id('user-email').focus();
      });

      id('loginModalClose')?.addEventListener('click', () => {
        this.loginModal.classList.remove('active');
      });

      // Account Modal Toggle
      this.profileToggle?.addEventListener('click', () => {
        this.accountModal.classList.add('active');
      });

      id('accountModalClose')?.addEventListener('click', () => {
        this.accountModal.classList.remove('active');
      });

      // Auth Tabs
      id('tab-signin')?.addEventListener('click', () => this.switchTab('signin'));
      id('tab-signup')?.addEventListener('click', () => this.switchTab('signup'));

      // Auth Form Submission
      id('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleAuth();
      });

      // Logout
      id('logout-btn')?.addEventListener('click', async () => {
        await sb.auth.signOut();
        this.showLoggedOut();
        this.accountModal.classList.remove('active');
      });

      // Password Visibility Toggles
      this.togglePassword('password-toggle', 'user-password');
      this.togglePassword('confirm-password-toggle', 'user-confirm-password');
      this.togglePassword('new-password-toggle', 'new-password');
      this.togglePassword('confirm-new-password-toggle', 'confirm-new-password');

      // Forgot Password
      id('forgot-password-btn')?.addEventListener('click', () => {
        this.showView('forgot-password-form');
        id('reset-email').focus();
      });

      id('back-to-auth-btn')?.addEventListener('click', () => {
        this.showView('auth-form-view');
      });

      // Forgot Password Form
      id('forgot-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleForgotPassword();
      });

      // Reset Password Form
      id('reset-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleResetPassword();
      });

      // Delete Data
      id('delete-data-btn')?.addEventListener('click', async () => {
        if (confirm('Are you sure? This will permanently clear your progress from the cloud.')) {
          const { error } = await sb.from('progress').delete().eq('id', this.user.id);
          if (!error) {
            alert('Cloud progress cleared.');
            this.completed = [];
            this.saveLocal();
            this.updateCheckboxes();
            this.updateProgress();
          }
        }
      });
    }

    switchTab(tab) {
      this.currentTab = tab;
      const signinTab = id('tab-signin');
      const signupTab = id('tab-signup');
      const signupFields = id('signup-fields');
      const signupConfirm = id('signup-confirm');
      const forgotRow = id('forgot-password-row');
      const authHeader = id('auth-header');
      const submitBtn = id('auth-submit-btn');

      if (tab === 'signup') {
        signinTab.classList.remove('active');
        signupTab.classList.add('active');
        signupFields.style.display = 'block';
        signupConfirm.style.display = 'block';
        forgotRow.style.display = 'none';
        authHeader.querySelector('h2').textContent = 'Create Account';
        authHeader.querySelector('p').textContent = 'Join the curriculum and track your path.';
        submitBtn.textContent = 'Create Account';
      } else {
        signinTab.classList.add('active');
        signupTab.classList.remove('active');
        signupFields.style.display = 'none';
        signupConfirm.style.display = 'none';
        forgotRow.style.display = 'block';
        authHeader.querySelector('h2').textContent = 'Welcome Back';
        authHeader.querySelector('p').textContent = 'Sign in to sync your progress across all devices.';
        submitBtn.textContent = 'Sign In';
      }
    }

    async handleAuth() {
      const email = id('user-email').value;
      const password = id('user-password').value;
      const fullName = id('user-full-name').value;
      const errorEl = id('auth-error');
      
      errorEl.style.display = 'none';

      try {
        if (this.currentTab === 'signup') {
          const confirmPassword = id('user-confirm-password').value;
          if (password !== confirmPassword) {
            errorEl.textContent = 'Passwords do not match.';
            errorEl.style.display = 'block';
            return;
          }

          const { data, error } = await sb.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } }
          });
          if (error) throw error;
          
          if (data.user) {
            await sb.from('profiles').insert({ id: data.user.id, full_name: fullName });
            alert('Account created! Please check your email for confirmation.');
          }
        } else {
          const { data, error } = await sb.auth.signInWithPassword({ email, password });
          if (error) throw error;
          this.user = data.user;
          await this.loadUserProfile();
          this.showLoggedIn();
          await this.syncWithCloud();
        }
        
        this.loginModal.classList.remove('active');
      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
      }
    }

    async handleForgotPassword() {
      const email = id('reset-email').value;
      const errorEl = id('auth-error');
      errorEl.style.display = 'none';

      try {
        const { error } = await sb.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;

        alert('Check your email for the password reset link.');
        this.showView('auth-form-view');
      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
      }
    }

    async handleResetPassword() {
      const newPassword = id('new-password').value;
      const confirmPassword = id('confirm-new-password').value;
      const errorEl = id('auth-error');
      errorEl.style.display = 'none';

      if (newPassword !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match.';
        errorEl.style.display = 'block';
        return;
      }

      try {
        const { error } = await sb.auth.updateUser({ password: newPassword });
        if (error) throw error;

        alert('Password updated successfully!');
        this.loginModal.classList.remove('active');
        this.showView('auth-form-view');
      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
      }
    }

    checkRecoveryMode() {
      const hash = window.location.hash;
      if (hash && hash.includes('type=recovery')) {
        this.loginModal.classList.add('active');
        this.showView('reset-password-form');
        window.location.hash = '';
      }
    }
  }

  /* ── 2. Instantiate Tracker ── */
  const tracker = new ProgressTracker();

  /* ── 3. Modal & UI Logic (Consolidated) ── */
  const projectModal = id('projectModal');
  const modalClose = id('modalClose');
  const modalContent = id('modalContent');
  let lastFocused = null;

  function openModal(sourceBlock) {
    lastFocused = document.activeElement;
    const clone = sourceBlock.cloneNode(true);
    clone.style.display = 'block';
    modalContent.innerHTML = '';
    modalContent.appendChild(clone);
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    const titleEl = modalContent.querySelector('h4, h3');
    if (titleEl) titleEl.id = 'modalTitle';
    requestAnimationFrame(() => modalClose.focus());
  }

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  modalClose?.addEventListener('click', closeModal);
  projectModal?.addEventListener('click', (e) => { if (e.target === projectModal) closeModal(); });

  /* Project Toggles */
  document.querySelectorAll('.module-card').forEach(card => {
    let block = null;
    let sibling = card.nextElementSibling;
    while (sibling) {
      if (sibling.classList.contains('proj-module-block')) { block = sibling; break; }
      if (sibling.classList.contains('module-card')) break;
      sibling = sibling.nextElementSibling;
    }
    if (!block) return;
    const btn = document.createElement('button');
    btn.className = 'proj-toggle-btn';
    btn.innerHTML = '<i data-lucide="sparkles"></i> View Projects';
    card.appendChild(btn);
    btn.addEventListener('click', (e) => { e.stopPropagation(); openModal(block); });
  });

  document.querySelectorAll('.phase-header-row .proj-toggle-btn').forEach(btn => {
    const phase = btn.closest('.phase');
    const block = phase?.querySelector('.proj-phase-block, .proj-capstone-section');
    if (block) btn.addEventListener('click', (e) => { e.stopPropagation(); openModal(block); });
  });

  /* ── 4. Initialise Icons ── */
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ── 5. Keyboard Access ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  /* ── 6. Reveal Animations ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.phase').forEach((el, i) => {
      el.style.animationPlayState = 'paused';
      el.style.animationDelay = `${i * 0.1}s`;
      observer.observe(el);
    });
  }
});
