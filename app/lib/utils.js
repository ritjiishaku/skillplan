export function id(name) {
  return document.getElementById(name);
}

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 4000);
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  const missing = [];
  if (password.length < 8) missing.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) missing.push('One uppercase letter');
  if (!/[a-z]/.test(password)) missing.push('One lowercase letter');
  if (!/[0-9]/.test(password)) missing.push('One number');
  return missing;
}

export function friendlyError(err) {
  const msg = err?.message || String(err);
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) return 'Network issue. Check your connection.';
  return msg;
}

export function clearFieldErrors() {
  document.querySelectorAll('.field-error').forEach((el) => el.classList.remove('field-error'));
  const errEl = document.getElementById('auth-error');
  if (errEl) errEl.style.display = 'none';
}
