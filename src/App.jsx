import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import RouteEffects from './components/layout/RouteEffects';
import HeroSection from './components/sections/HeroSection';
import TrustSection from './components/sections/TrustSection';
import ProductGridSection from './components/sections/ProductGridSection';
import ValueSection from './components/sections/ValueSection';
import PlansSection from './components/sections/PlansSection';
import OperationsSection from './components/sections/OperationsSection';
import AudienceSection from './components/sections/AudienceSection';
import AiAssistantSection from './components/sections/AiAssistantSection';
import FaqSection from './components/sections/FaqSection';
import BundlePage from './pages/BundlePage';
import CustomBundlePage from './pages/CustomBundlePage';
import InfoPage from './pages/InfoPage';
import ProductPage from './pages/ProductPage';

function resolveActiveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

function HomePage({ lang }) {
  return (
    <main>
      <HeroSection lang={lang} />
      <TrustSection lang={lang} />
      <ProductGridSection lang={lang} />
      <ValueSection lang={lang} />
      <PlansSection lang={lang} />
      <AudienceSection lang={lang} />
      <OperationsSection lang={lang} />
      <AiAssistantSection lang={lang} />
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
      <RouteEffects lang={lang} />
      <TopNav 
        lang={lang} setLang={setLang}
        theme={theme} setTheme={setTheme}
        fontScale={fontScale} setFontScale={setFontScale}
        activeTheme={activeTheme}
      />
      
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/product/:slug" element={<ProductPage lang={lang} />} />
          <Route path="/pakiety/wlasna-paczka/:size" element={<CustomBundlePage lang={lang} />} />
          <Route path="/pakiety/:slug" element={<BundlePage lang={lang} />} />
          <Route path="/:page" element={<InfoPage lang={lang} />} />
        </Routes>
        <Footer lang={lang} activeTheme={activeTheme} />
      </div>
    </div>
  );
}

export default App;
