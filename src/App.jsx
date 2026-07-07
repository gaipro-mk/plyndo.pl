import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import RouteEffects from './components/layout/RouteEffects';
import CookieConsent from './components/layout/CookieConsent';
import SchemaMarkup from './components/layout/SchemaMarkup';
import HeroSection from './components/sections/HeroSection';
import OperationsSection from './components/sections/OperationsSection';
import PlansSection from './components/sections/PlansSection';
import ProductGridSection from './components/sections/ProductGridSection';
import ValueSection from './components/sections/ValueSection';
import AboutSection from './components/sections/AboutSection';
import TrustSection from './components/sections/TrustSection';
import FaqSection from './components/sections/FaqSection';

const BundlePage = lazy(() => import('./pages/BundlePage'));
const CustomBundlePage = lazy(() => import('./pages/CustomBundlePage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BusinessPage = lazy(() => import('./pages/BusinessPage'));
const HomeAudiencePage = lazy(() => import('./pages/HomeAudiencePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 pt-[120px]" aria-live="polite">
      <span className="text-[13px] text-fg-muted">Ładowanie…</span>
    </div>
  );
}

function resolveActiveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

function HomePage({ lang }) {
  return (
    <main id="main">
      <HeroSection lang={lang} />
      <OperationsSection lang={lang} />
      <PlansSection lang={lang} />
      <ProductGridSection lang={lang} />
      <ValueSection lang={lang} />
      <TrustSection lang={lang} />
      <AboutSection lang={lang} />
      <FaqSection lang={lang} />
    </main>
  );
}

function App() {
  const [lang, setLang] = useState('pl');
  const [theme, setTheme] = useState('system');
  const [fontScale, setFontScale] = useState('md');

  useEffect(() => {
    document.documentElement.lang = lang;
    const activeTheme = resolveActiveTheme(theme);
    document.documentElement.setAttribute('data-theme', activeTheme);
    const favicon = document.getElementById('app-favicon');
    if (favicon) {
      favicon.setAttribute('href', activeTheme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg');
    }
    document.documentElement.setAttribute('data-font-scale', fontScale);
  }, [lang, theme, fontScale]);

  const activeTheme = resolveActiveTheme(theme);

  return (
    <div id="top" className="min-h-screen w-full" style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
        {lang === 'en' ? 'Skip to content' : 'Przejdź do treści'}
      </a>
      <SchemaMarkup />
      <RouteEffects lang={lang} />
      <TopNav
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        fontScale={fontScale}
        setFontScale={setFontScale}
        activeTheme={activeTheme}
      />

      <div className="w-full">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/dla-domu" element={<HomeAudiencePage lang={lang} />} />
            <Route path="/dla-firm" element={<BusinessPage lang={lang} />} />
            <Route path="/produkt/:slug" element={<ProductPage lang={lang} activeTheme={activeTheme} />} />
            <Route path="/produkty/:slug" element={<ProductPage lang={lang} activeTheme={activeTheme} />} />
            <Route path="/product/:slug" element={<ProductPage lang={lang} activeTheme={activeTheme} />} />
            <Route path="/pakiety/wlasna-paczka/:size" element={<CustomBundlePage lang={lang} />} />
            <Route path="/pakiety/:slug" element={<BundlePage lang={lang} />} />
            <Route path="/o-marce" element={<AboutPage lang={lang} />} />
            <Route path="/kontakt" element={<InfoPage lang={lang} />} />
            <Route path="/regulamin" element={<InfoPage lang={lang} />} />
            <Route path="/polityka-prywatnosci" element={<InfoPage lang={lang} />} />
            <Route path="/reklamacje" element={<InfoPage lang={lang} />} />
            <Route path="/producent" element={<InfoPage lang={lang} />} />
            <Route path="/prasa" element={<InfoPage lang={lang} />} />
            <Route path="*" element={<NotFoundPage lang={lang} />} />
          </Routes>
        </Suspense>
        <Footer lang={lang} activeTheme={activeTheme} />
      </div>
      <CookieConsent lang={lang} />
    </div>
  );
}

export default App;
