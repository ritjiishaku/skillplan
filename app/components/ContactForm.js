'use client';

import { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';

const WHATSAPP_NUMBER = '2349064957884';
const EMAIL = 'ritjiishaku@gmail.com';

const TYPE_OPTIONS = [
  { value: 'feedback', label: 'Feedback' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'general', label: 'General' },
];

export default function ContactForm() {
  const { closeProject } = useModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('feedback');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const validate = () => {
    const errs = {};
    if (!message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setType('feedback');
    setMessage('');
    setErrors({});
  };

  const buildWhatsAppUrl = () => {
    const parts = [];
    if (name.trim()) parts.push(`Name: ${name.trim()}`);
    if (email.trim()) parts.push(`Email: ${email.trim()}`);
    parts.push(`Type: ${TYPE_OPTIONS.find((o) => o.value === type)?.label}`);
    parts.push(`Message: ${message.trim()}`);
    const text = encodeURIComponent(parts.join('\n'));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(`[Skillplan] ${TYPE_OPTIONS.find((o) => o.value === type)?.label}`);
    const bodyParts = [];
    if (name.trim()) bodyParts.push(`Name: ${name.trim()}`);
    if (email.trim()) bodyParts.push(`Email: ${email.trim()}`);
    bodyParts.push(`Type: ${TYPE_OPTIONS.find((o) => o.value === type)?.label}`);
    bodyParts.push(`\n${message.trim()}`);
    const body = encodeURIComponent(bodyParts.join('\n'));
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmitWhatsApp = () => {
    if (!validate()) return;
    window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    setSent('whatsapp');
    resetForm();
    timerRef.current = setTimeout(() => { closeProject(); }, 1500);
  };

  const handleSubmitEmail = () => {
    if (!validate()) return;
    window.location.href = buildMailtoUrl();
    setSent('email');
    resetForm();
    timerRef.current = setTimeout(() => { closeProject(); }, 1500);
  };

  if (sent) {
    return (
      <div className="contact-form-wrapper contact-sent">
        <div className="contact-sent-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <p className="contact-sent-text">
          {sent === 'whatsapp' ? 'Opening WhatsApp...' : 'Opening email...'}
        </p>
      </div>
    );
  }

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form-header">
        <div className="contact-form-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="contact-form-title">Get in Touch</h2>
          <p className="contact-form-subtitle">
            Feedback, suggestions, or bugs — I&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="contact-field-row">
          <div className="contact-field">
            <label htmlFor="contact-name">Name <span className="contact-optional">(optional)</span></label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email <span className="contact-optional">(optional)</span></label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="contact-type">Type</label>
          <select id="contact-type" value={type} onChange={(e) => setType(e.target.value)}>
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="contact-field">
          <label htmlFor="contact-message">
            Message
            {errors.message && <span className="contact-error" role="status" aria-live="polite">{errors.message}</span>}
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((prev) => ({ ...prev, message: '' })); }}
            placeholder="Tell me what's on your mind..."
            rows={5}
            maxLength={1000}
            className={errors.message ? 'contact-input-error' : ''}
          />
        </div>

        <div className="contact-actions">
          <button type="button" className="contact-btn contact-btn-whatsapp" onClick={handleSubmitWhatsApp}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send via WhatsApp
          </button>
          <button type="button" className="contact-btn contact-btn-email" onClick={handleSubmitEmail}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Send via Email
          </button>
        </div>
      </form>
    </div>
  );
}
