import { useMemo, useState } from 'react';
import { Baby, Building2, Dog, Droplets, Home, Sparkles, Store, WashingMachine } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  return {
    bundle,
    slug,
    composition,
    quantity: 1,
    isCustom: true,
  };
}

function buildAdvice(segment, area, traits) {
  if (segment === 'business') {
    if (area <= 120) {
      return [{ bundle: readyBundle('firma-podstawowa-4'), quantity: 1 }];
    }

    const mainQuantity = area > 420 ? 3 : area > 240 ? 2 : 1;
    const advice = [{ bundle: readyBundle('firma-operacyjna-8'), quantity: mainQuantity }];

    if (traits.includes('visitors') || traits.includes('sanitary')) {
      advice.push(createCustomAdvice(4, ['rece', 'wc', 'lazienka', 'dezynfekcja'], 'business-hygiene-4'));
    }

    return advice;
  }

  const advice = [{ bundle: readyBundle('starter-10'), quantity: 1 }];

  if (area > 120 || traits.includes('kids') || traits.includes('pets')) {
    advice.push(createCustomAdvice(4, [
      'podlogi',
      traits.includes('pets') ? 'dezynfekcja' : 'lazienka',
      'wc',
      traits.includes('laundry') ? 'pranie' : 'naczynia',
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
      className={`grid min-h-[92px] content-center justify-items-center gap-2 rounded-[14px] border p-3 text-center text-xs font-extrabold ${
        active ? 'border-black bg-black text-white' : 'border-border bg-white text-fg-muted'
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
    <article className="grid gap-4 rounded-[20px] border border-border bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold leading-tight">{name}</h3>
          <div className="mt-1 text-sm text-fg-muted">
            {quantityLabel(advice.quantity, lang)} · {pricing.itemCount * advice.quantity} {lang === 'en' ? 'items' : 'sztuk'}
          </div>
        </div>
        <span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">
          -{pricing.savingsPercent}%
        </span>
      </div>
      <div className="grid gap-1.5 text-sm">
        {pricing.lineItems.slice(0, 5).map((item) => (
          <div key={item.productSlug} className="flex items-center justify-between gap-3">
            <span className="font-semibold">
              {item.quantity > 1 ? `${item.quantity}x ` : ''}
              {item.product.i18n?.[lang]?.shortName ?? item.product.shortName}
            </span>
            <span className="text-fg-muted">{formatPln(item.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-fg-muted">
            {lang === 'en' ? 'One box price' : 'Cena jednego kartonu'}
          </div>
          <div className="font-display text-3xl font-black">
            {formatPln(pricing.bundlePrice, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </div>
        </div>
        <Link to={href} className="rounded-[10px] border border-black px-4 py-2.5 text-sm font-extrabold text-black no-underline">
          {lang === 'en' ? 'Open package' : 'Otwórz pakiet'}
        </Link>
      </div>
    </article>
  );
}

export default function AiAssistantSection({ lang = 'pl' }) {
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
    <section id="advisor" className="bg-surface-variant px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-[760px]">
          <span className="t-eyebrow">{lang === 'en' ? 'Package advisor' : 'Doradca paczek'}</span>
          <h2 className="t-h1 mt-3">
            {lang === 'en' ? 'Pick stock by place and consumption.' : 'Dobierz zapas do miejsca i zużycia.'}
          </h2>
          <p className="t-lead mt-4">
            {lang === 'en'
              ? 'The first rule-based segment shows the boxes and quantities worth checking before the Shoper handoff is connected.'
              : 'Pierwszy regułowy segment pokazuje paczki i liczby kartonów, które warto sprawdzić przed podpięciem koszyka Shoper.'}
          </p>
        </div>

        <div className="grid gap-6 rounded-[28px] border border-border bg-white p-6 md:p-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="grid content-start gap-7">
            <div>
              <div className="t-eyebrow mb-3">{lang === 'en' ? 'Place' : 'Miejsce'}</div>
              <div className="grid grid-cols-2 gap-2 rounded-[14px] bg-surface-container-low p-1.5">
                {[
                  { id: 'home', label: lang === 'en' ? 'Home' : 'Dom', icon: Home },
                  { id: 'business', label: lang === 'en' ? 'Business' : 'Firma', icon: Building2 },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectSegment(option.id)}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] text-sm font-extrabold ${
                      segment === option.id ? 'bg-black text-white' : 'bg-transparent text-black'
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
                  <p className="mt-1 text-sm text-fg-muted">
                    {segment === 'home'
                      ? (lang === 'en' ? 'Flat or house' : 'Mieszkanie lub dom')
                      : (lang === 'en' ? 'Cleaning area' : 'Powierzchnia obsługi')}
                  </p>
                </div>
                <div className="font-display text-4xl font-black">
                  {area} <span className="text-base text-fg-muted">m2</span>
                </div>
              </div>
              <input
                type="range"
                min={segment === 'home' ? 30 : 40}
                max={segment === 'home' ? 260 : 600}
                step={10}
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
                className="mt-4 w-full accent-black"
              />
            </div>

            <div>
              <div className="t-eyebrow mb-3">
                {segment === 'home'
                  ? (lang === 'en' ? 'Home signals' : 'Sygnały domu')
                  : (lang === 'en' ? 'Business signals' : 'Sygnały firmy')}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {options.map((option) => (
                  <TraitButton
                    key={option.id}
                    active={traits.includes(option.id)}
                    icon={<option.icon size={20} />}
                    label={lang === 'en' ? option.en : option.pl}
                    onClick={() => toggleTrait(option.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid content-start gap-4 rounded-[24px] bg-surface-container-low p-5 md:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-black text-white">
                <Sparkles size={20} />
              </span>
              <div>
                <div className="t-eyebrow">{lang === 'en' ? 'Recommendation' : 'Rekomendacja'}</div>
                <p className="text-sm text-fg-muted">
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
        </div>
      </div>
    </section>
  );
}
