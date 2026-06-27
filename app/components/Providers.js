'use client';

import { ThemeProvider } from '../context/ThemeContext';
import { ModalProvider } from '../context/ModalContext';
import { ProgressProvider } from '../context/ProgressContext';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ModalProvider>
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
