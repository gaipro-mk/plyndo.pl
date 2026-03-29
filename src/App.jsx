import { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import TrustSection from './components/sections/TrustSection';
import AiAssistantSection from './components/sections/AiAssistantSection';
import ProductGridSection from './components/sections/ProductGridSection';
import ValueSection from './components/sections/ValueSection';
import PlansSection from './components/sections/PlansSection';
import OperationsSection from './components/sections/OperationsSection';
import SubscriptionGuideSection from './components/sections/SubscriptionGuideSection';
import FaqSection from './components/sections/FaqSection';
import WaitlistSection from './components/sections/WaitlistSection';

function App() {
  const [lang, setLang] = useState('pl');
  const [theme, setTheme] = useState('system'); // 'light', 'dark', 'system'
  const [fontScale, setFontScale] = useState('md'); // 'sm', 'md', 'lg'
  const [resolution, setResolution] = useState('desktop'); // 'mobile', 'tablet', 'desktop'

  const getActiveTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  // Apply root configurations based on state
  useEffect(() => {
    document.documentElement.lang = lang;
    
    // Theme application
    const activeTheme = getActiveTheme();
    document.documentElement.setAttribute('data-theme', activeTheme);

    // Favicon follows active in-app theme for browser tab/address bar contrast.
    const favicon = document.getElementById('app-favicon');
    if (favicon) {
      favicon.setAttribute('href', activeTheme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg');
    }
    
    // Font scale application
    document.documentElement.setAttribute('data-font-scale', fontScale);
  }, [lang, theme, fontScale]);

  const activeTheme = getActiveTheme();

  // Handle constraints for the resolution switcher
  const getContainerStyles = () => {
    switch(resolution) {
      case 'mobile':
        return 'max-w-[375px] mx-auto overflow-x-hidden border-x border-outline-variant/30 shadow-2xl h-[812px] overflow-y-auto mt-20 relative no-scrollbar';
      case 'tablet':
        return 'max-w-[768px] mx-auto overflow-x-hidden border-x border-outline-variant/30 shadow-2xl h-[1024px] overflow-y-auto mt-20 relative no-scrollbar';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  const getWrapperStyles = () => {
    if (resolution === 'desktop') return 'min-h-screen bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed';
    
    return 'min-h-screen bg-surface-container-lowest text-on-background font-body flex items-start justify-center pt-8 pb-8 !px-4 selection:bg-primary-fixed selection:text-on-primary-fixed';
  };

  return (
    <div id="top" className={getWrapperStyles()}>
      <TopNav 
        lang={lang} setLang={setLang}
        theme={theme} setTheme={setTheme}
        fontScale={fontScale} setFontScale={setFontScale}
        resolution={resolution} setResolution={setResolution}
        activeTheme={activeTheme}
      />
      
      <div className={`bg-background transition-all duration-300 ${getContainerStyles()}`}>
        <main>
          <HeroSection lang={lang} />
          <TrustSection lang={lang} />
          <AiAssistantSection lang={lang} />
          <ProductGridSection lang={lang} />
          <ValueSection lang={lang} />
          <PlansSection lang={lang} />
          <OperationsSection lang={lang} />
          <SubscriptionGuideSection lang={lang} />
          <FaqSection lang={lang} />
          <WaitlistSection lang={lang} />
        </main>
        <Footer lang={lang} activeTheme={activeTheme} />
      </div>
    </div>
  );
}

export default App;
