import { useState, useEffect } from 'react';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import TrustSection from './components/sections/TrustSection';
import AiAssistantSection from './components/sections/AiAssistantSection';
import ProductGridSection from './components/sections/ProductGridSection';
import SubscriptionGuideSection from './components/sections/SubscriptionGuideSection';

function App() {
  const [lang, setLang] = useState('pl');

  // Set html lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <TopNav lang={lang} setLang={setLang} />
      
      <main>
        <HeroSection lang={lang} />
        <TrustSection lang={lang} />
        <AiAssistantSection lang={lang} />
        <ProductGridSection lang={lang} />
        <SubscriptionGuideSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}

export default App;
