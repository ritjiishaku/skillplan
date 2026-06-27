import { Syne, DM_Mono, Fraunces } from 'next/font/google';
import './globals.css';
import Providers from './components/Providers';
import StickyNav from './components/StickyNav';
import Toast from './components/Toast';
import ProjectModal from './components/ProjectModal';
import ScrollAnimations from './components/ScrollAnimations';
import Footer from './components/Footer';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export const metadata = {
  metadataBase: new URL('https://ritji.xyz'),
  title: 'Conversion & Growth Engineering — 100% Free Curriculum',
  description: 'AI Automation Engineering, Full-Stack Software Engineering, and Conversion & Growth Engineering — 100% free, no paywalls. 8-11 phases each, all resources free.',
  openGraph: {
    title: 'Conversion & Growth Engineering — 100% Free Curriculum',
    description: 'AI Automation Engineering, Full-Stack Software Engineering, and Conversion & Growth Engineering — 100% free, no paywalls. 8-11 phases each, all resources free.',
    url: 'https://ritji.xyz',
    siteName: 'Conversion & Growth Engineering',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conversion & Growth Engineering — 100% Free Curriculum',
    description: 'AI Automation Engineering, Full-Stack Software Engineering, and Conversion & Growth Engineering — 100% free, no paywalls.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='4' fill='%23e8ff47'/><text x='16' y='22' font-size='18' text-anchor='middle' fill='%23000'>CE</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Ritji Ishaku" />
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          <StickyNav />
          <Toast />
          {children}
          <Footer />
          <ProjectModal />
          <ScrollAnimations />
        </Providers>
      </body>
    </html>
  );
}
