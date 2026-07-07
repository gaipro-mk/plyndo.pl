import { useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'plyndo-cookie-consent';

export default function CookieConsent({ lang = 'pl' }) {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  }

  if (!visible) return null;

  const copy = lang === 'en'
    ? {
        text: 'We use essential cookies to keep the site working. See our privacy policy for details.',
        accept: 'Accept',
        policy: 'Privacy policy',
      }
    : {
        text: 'Używamy niezbędnych plików cookie, aby strona działała poprawnie. Szczegóły w polityce prywatności.',
        accept: 'Akceptuję',
        policy: 'Polityka prywatności',
      };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={lang === 'en' ? 'Cookie consent' : 'Zgoda na pliki cookie'}
      className="fixed bottom-0 left-0 right-0 z-[80] border-t px-6 py-4 shadow-lg"
      style={{ background: 'var(--color-bg-raised)', borderColor: 'var(--color-border)' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="m-0 max-w-[720px] text-[13px] leading-relaxed text-fg-muted">
          {copy.text}{' '}
          <Link to="/polityka-prywatnosci" className="font-medium text-fg-base underline-offset-2 hover:underline">
            {copy.policy}
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 cursor-pointer rounded-full border-none px-5 py-2.5 text-[13px] font-medium"
          style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
