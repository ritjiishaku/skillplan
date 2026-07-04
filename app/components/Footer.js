'use client';

import { useModal } from '../context/ModalContext';
import ContactForm from './ContactForm';
import { Icon } from '../../lib/icons';

export default function Footer() {
  const { openProject } = useModal();

  return (
    <footer>
      <div className="footer-text">Skillplan &middot; 10 Roadmaps &middot; All Free &middot; No Degree Needed</div>
      <div className="footer-text footer-attr">Built by Ritji Ishaku &copy; 2026</div>
      <div className="footer-badge">
        <span className="footer-badge-dot"></span>
        $0 spent &middot; Zero paywalls
      </div>
      <div className="footer-contact">
        <a href="https://wa.me/2349064957884" target="_blank" rel="noopener noreferrer" className="footer-contact-link" aria-label="WhatsApp">
          <Icon name="whatsapp" size={16} />
        </a>
        <a href="mailto:ritjiishaku@gmail.com" className="footer-contact-link" aria-label="Email">
          <Icon name="mail" size={16} />
        </a>
        <button
          className="footer-contact-link footer-contact-page"
          onClick={() => openProject(<ContactForm />, 'sm')}
          aria-label="Open contact form"
        >
          Contact
        </button>
      </div>
    </footer>
  );
}
