'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const phases = document.querySelectorAll('.phase');
    phases.forEach((el) => { el.style.animationPlayState = 'paused'; });
    const phaseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            phaseObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    phases.forEach((el) => phaseObserver.observe(el));

    const cards = document.querySelectorAll('.module-card');
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((el) => cardObserver.observe(el));

    const fadeEls = document.querySelectorAll('.bonus-card, .reading-card, .schedule-card');
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach((el) => fadeObserver.observe(el));

    return () => {
      phaseObserver.disconnect();
      cardObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
