import { useMemo, useState } from 'react';
import { Baby, Building2, Dog, Droplets, Home, Sparkles, Store, WashingMachine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { bundles } from '../../data/bundles';
import { products } from '../../data/products';
import { calculateBundlePricing, formatPln } from '../../lib/bundlePricing';

const homeTraits = [
  { id: 'pets', pl: 'Zwierzęta', en: 'Pets', icon: Dog },
  { id: 'kids', pl: 'Dzieci', en: 'Children', icon: Baby },
  { id: 'laundry', pl: 'Dużo prania', en: 'More laundry', icon: WashingMachine },
];

const businessTraits = [
  { id: 'visitors', pl: 'Ruch klientów', en: 'Visitor traffic', icon: Store },
  { id: 'sanitary', pl: 'Sanitariaty', en: 'Restrooms', icon: Droplets },
  { id: 'kitchen', pl: 'Kuchnia', en: 'Kitchen', icon: WashingMachine },
];

function readyBundle(slug) {
  return bundles.find((bundle) => bundle.slug === slug);
}

function quantityLabel(quantity, lang) {
  return lang === 'en' ? `${quantity} box${quantity === 1 ? '' : 'es'}` : `${quantity} ${quantity === 1 ? 'karton' : 'kartony'}`;
}

function createCustomAdvice(size, composition, slug) {
  const bundle = readyBundle(`wybierz-sam-${size}`);
  return { bundle, slug, composition, quantity: 1, isCustom: true };
}

function buildAdvice(segment, area, traits) {
  if (segment === 'business') {
    if (area <= 120) return [{ bundle: readyBundle('firma-podstawowa-4'), quantity: 1 }];
    const mainQuantity = area > 420 ? 3 : area > 240 ? 2 : 1;
    const advice = [{ bundle: readyBundle('firma-operacyjna-8'), quantity: mainQuantity }];
    if (traits.includes('visitors') || traits.includes('sanitary')) {
      advice.push(createCustomAdvice(4, ['myciarak', 'wc', 'lazienki', 'odkamieniania'], 'business-hygiene-4'));
    }
    return advice;
  }

  const advice = [{ bundle: readyBundle('komplet-12'), quantity: 1 }];
  if (area > 120 || traits.includes('kids') || traits.includes('pets')) {
    advice.push(createCustomAdvice(4, [
      'podlog',
      traits.includes('pets') ? 'odkamieniania' : 'lazienki',
      'wc',
      traits.includes('laundry') ? 'prania' : 'naczyn',
    ], 'home-refill-4'));
  }
  if (area > 190 && traits.includes('laundry')) {
    advice.push({ bundle: readyBundle('dom-pelny-8'), quantity: 1 });
  }
  return advice;
}

function TraitButton({ active, icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid min-h-[84px] content-center justify-items-center gap-2 rounded-[8px] border p-3 text-center text-[12px] font-bold transition duration-300 ${
        active
          ? 'border-fg bg-fg text-bg'
          : 'border-border bg-bg text-fg'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function AdviceCard({ advice, lang }) {
  const pricing = calculateBundlePricing({
    bundle: advice.bundle,
    composition: advice.composition ?? advice.bundle.composition,
    products,
  });
  const name = advice.isCustom
    ? (lang === 'en' ? `Suggested custom box ${advice.bundle.size}` : `Sugerowana paczka własna ${advice.bundle.size}`)
    : advice.bundle.i18n?.[lang]?.displayName ?? advice.bundle.name;
  const href = advice.isCustom ? `/pakiety/wlasna-paczka/${advice.bundle.size}` : `/pakiety/${advice.bundle.slug}`;

  return (
    <article className="soft-panel grid gap-4 bg-white p-5 text-fg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[17px] font-extrabold uppercase leading-tight">{name}</h3>
          <div className="mt-1 text-[13px] text-fg-muted">
            {quantityLabel(advice.quantity, lang)} · {pricing.itemCount * advice.quantity} {lang === 'en' ? 'items' : 'sztuk'}
          </div>
        </div>
        <span className="rounded-full border px-3 py-1 text-[12px] font-bold border-border-strong">
          -{pricing.savingsPercent}%
        </span>
      </div>

      <div className="grid gap-2">
        {pricing.lineItems.slice(0, 5).map((item) => (
          <div key={item.productSlug} className="flex items-center gap-3">
            <span className="h-8 w-6 overflow-hidden rounded-sm">
              <img src={item.product.image} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="flex-1 text-[13px] font-semibold">
              {item.quantity > 1 ? `${item.quantity}x ` : ''}
              {item.product.i18n?.[lang]?.shortName ?? item.product.shortName}
            </span>
            <span className="t-caption">{formatPln(item.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 border-t pt-4 border-border">
        <div>
          <div className="t-caption font-bold uppercase">{lang === 'en' ? 'Box price' : 'Cena kartonu'}</div>
          <div className="mt-1 text-[28px] font-extrabold leading-none">
            {formatPln(pricing.bundlePrice, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </div>
        </div>
        <Link to={href} className="ui-button ui-button--ghost min-h-10 px-4 py-2 text-[12px]">
          {lang === 'en' ? 'Open package' : 'Otwórz pakiet'}
        </Link>
      </div>
    </article>
  );
}

export default function AiAssistantSection({ lang = 'pl' }) {
  const reducedMotion = useReducedMotion();
  const [segment, setSegment] = useState('home');
  const [area, setArea] = useState(85);
  const [traits, setTraits] = useState(['kids']);
  const options = segment === 'home' ? homeTraits : businessTraits;
  const advice = useMemo(() => buildAdvice(segment, area, traits), [area, segment, traits]);

  function selectSegment(nextSegment) {
    setSegment(nextSegment);
    setArea(nextSegment === 'home' ? 85 : 180);
    setTraits([]);
  }

  function toggleTrait(id) {
    setTraits((current) => current.includes(id)
      ? current.filter((trait) => trait !== id)
      : [...current, id]);
  }

  return (
    <section id="advisor" className="section-shell surface-muted overflow-hidden">
      <div className="wide-wrap">
        <Motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-[900px]"
        >
          <span className="t-eyebrow">{lang === 'en' ? 'Package advisor' : 'Doradca paczek'}</span>
          <h2 className="t-h1 mt-5">
            {lang === 'en' ? 'Pick stock by place and consumption.' : 'Dobierz zapas do miejsca i zużycia.'}
          </h2>
          <p className="t-lead mt-6 max-w-[700px]">
            {lang === 'en'
              ? 'The first rule-based segment shows the boxes and quantities worth checking before the Shoper handoff is connected.'
              : 'Pierwszy regułowy segment pokazuje paczki i liczby kartonów, które warto sprawdzić przed podpięciem koszyka Shoper.'}
          </p>
        </Motion.div>

        <Motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 52 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="soft-panel grid content-start gap-8 p-5 md:p-8">
            <div>
              <div className="t-eyebrow mb-4">{lang === 'en' ? 'Place' : 'Miejsce'}</div>
              <div className="grid grid-cols-2 gap-2 rounded-[8px] p-1.5 bg-bg-muted">
                {[
                  { id: 'home', label: lang === 'en' ? 'Home' : 'Dom', icon: Home },
                  { id: 'business', label: lang === 'en' ? 'Business' : 'Firma', icon: Building2 },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectSegment(option.id)}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border-0 text-[13px] font-bold transition duration-300 ${
                      segment === option.id ? 'bg-fg text-bg' : 'bg-transparent text-fg'
                    }`}
                  >
                    <option.icon size={17} />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="t-eyebrow">{lang === 'en' ? 'Area' : 'Metraż'}</div>
                  <p className="t-caption mt-2">
                    {segment === 'home'
                      ? (lang === 'en' ? 'Flat or house' : 'Mieszkanie lub dom')
                      : (lang === 'en' ? 'Cleaning area' : 'Powierzchnia obsługi')}
                  </p>
                </div>
                <div className="text-[42px] font-extrabold leading-none">
                  {area} <span className="text-[15px] text-fg-subtle">m2</span>
                </div>
              </div>
              <input
                type="range"
                min={segment === 'home' ? 30 : 40}
                max={segment === 'home' ? 260 : 600}
                step={10}
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
                className="mt-5 w-full accent-black"
              />
            </div>

            <div>
              <div className="t-eyebrow mb-4">
                {segment === 'home'
                  ? (lang === 'en' ? 'Home signals' : 'Sygnały domu')
                  : (lang === 'en' ? 'Business signals' : 'Sygnały firmy')}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {options.map((option) => (
                  <TraitButton
                    key={option.id}
                    active={traits.includes(option.id)}
                    icon={<option.icon size={19} />}
                    label={lang === 'en' ? option.en : option.pl}
                    onClick={() => toggleTrait(option.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="surface-ink media-frame grid content-start gap-5 p-5 md:p-8">
            <div className="mb-2 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-fg">
                <Sparkles size={20} />
              </span>
              <div>
                <div className="t-eyebrow">{lang === 'en' ? 'Recommendation' : 'Rekomendacja'}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                  {segment === 'business'
                    ? (lang === 'en' ? 'Stock weighted for operations.' : 'Zapas ważony pod pracę firmy.')
                    : (lang === 'en' ? 'Starter first, then flexible refills.' : 'Najpierw starter, potem elastyczne uzupełnienia.')}
                </p>
              </div>
            </div>
            {advice.map((item) => (
              <AdviceCard key={item.slug ?? item.bundle.slug} advice={item} lang={lang} />
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
