const PLN_MINOR_UNITS = 100;

function toMinorUnits(amount) {
  if (!Number.isFinite(amount)) {
    throw new TypeError('Expected a finite money amount.');
  }

  return Math.round(amount * PLN_MINOR_UNITS);
}

function fromMinorUnits(amount) {
  return amount / PLN_MINOR_UNITS;
}

function readListPrice(product) {
  const amount = typeof product.listPrice === 'number'
    ? product.listPrice
    : product.listPrice?.amount;

  if (!Number.isFinite(amount)) {
    throw new TypeError(`Product "${product.slug}" does not have a numeric list price.`);
  }

  return amount;
}

function createProductIndex(productCatalog) {
  if (productCatalog instanceof Map) {
    return productCatalog;
  }

  if (!Array.isArray(productCatalog)) {
    throw new TypeError('Expected products to be an array or Map.');
  }

  return new Map(productCatalog.map((product) => [product.slug, product]));
}

function readCompositionItem(item) {
  if (typeof item === 'string') {
    return { productSlug: item, quantity: 1 };
  }

  if (!item || typeof item !== 'object') {
    throw new TypeError('Composition items must be product slugs or item objects.');
  }

  return {
    productSlug: item.productSlug ?? item.slug,
    quantity: item.quantity ?? 1
  };
}

function toCompositionItems(composition) {
  if (Array.isArray(composition)) {
    return composition;
  }

  if (composition && typeof composition === 'object') {
    return Object.entries(composition).map(([productSlug, quantity]) => ({
      productSlug,
      quantity
    }));
  }

  if (composition == null) {
    return [];
  }

  throw new TypeError('Expected composition to be an array or object.');
}

function roundPercent(percent) {
  return Math.round(percent * 100) / 100;
}

export function normalizeComposition(composition) {
  const quantities = new Map();

  for (const item of toCompositionItems(composition)) {
    const { productSlug, quantity } = readCompositionItem(item);

    if (typeof productSlug !== 'string' || productSlug.length === 0) {
      throw new TypeError('Composition items need a product slug.');
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new TypeError(`Composition quantity for "${productSlug}" must be a non-negative integer.`);
    }

    if (quantity === 0) {
      continue;
    }

    quantities.set(productSlug, (quantities.get(productSlug) ?? 0) + quantity);
  }

  return [...quantities.entries()].map(([productSlug, quantity]) => ({
    productSlug,
    quantity
  }));
}

export function getCompositionLineItems(composition, productCatalog) {
  const productIndex = createProductIndex(productCatalog);

  return normalizeComposition(composition).map(({ productSlug, quantity }) => {
    const product = productIndex.get(productSlug);

    if (!product) {
      throw new RangeError(`Unknown product slug "${productSlug}" in bundle composition.`);
    }

    const unitListPrice = readListPrice(product);

    return {
      product,
      productSlug,
      quantity,
      unitListPrice,
      listValue: fromMinorUnits(toMinorUnits(unitListPrice) * quantity)
    };
  });
}

export function calculateListValue(composition, productCatalog) {
  const listValueMinorUnits = getCompositionLineItems(composition, productCatalog)
    .reduce((total, lineItem) => total + toMinorUnits(lineItem.listValue), 0);

  return fromMinorUnits(listValueMinorUnits);
}

export function getDiscountRate(discountRule) {
  if (typeof discountRule === 'number') {
    if (discountRule < 0 || discountRule > 1) {
      throw new RangeError('Discount rate must be between 0 and 1.');
    }

    return discountRule;
  }

  if (discountRule?.type !== 'percentage') {
    throw new TypeError('Only percentage discount rules are supported.');
  }

  return getDiscountRate(discountRule.rate);
}

export function calculateBundlePrice(listValue, discountRule) {
  const discountRate = getDiscountRate(discountRule);
  const listValueMinorUnits = toMinorUnits(listValue);
  const bundlePriceMinorUnits = Math.round(listValueMinorUnits * (1 - discountRate));

  return fromMinorUnits(bundlePriceMinorUnits);
}

export function calculateSavings(listValue, bundlePrice) {
  const listValueMinorUnits = toMinorUnits(listValue);
  const bundlePriceMinorUnits = toMinorUnits(bundlePrice);
  const savingsMinorUnits = Math.max(0, listValueMinorUnits - bundlePriceMinorUnits);

  return {
    savingsAmount: fromMinorUnits(savingsMinorUnits),
    savingsPercent: listValueMinorUnits === 0
      ? 0
      : roundPercent((savingsMinorUnits / listValueMinorUnits) * 100)
  };
}

export function calculateBundlePricing({
  bundle,
  composition = bundle?.composition,
  discountRule = bundle?.discountRule,
  products
}) {
  const lineItems = getCompositionLineItems(composition, products);
  const listValueMinorUnits = lineItems
    .reduce((total, lineItem) => total + toMinorUnits(lineItem.listValue), 0);
  const listValue = fromMinorUnits(listValueMinorUnits);
  const bundlePrice = calculateBundlePrice(listValue, discountRule);
  const savings = calculateSavings(listValue, bundlePrice);

  return {
    composition: lineItems.map(({ productSlug, quantity }) => ({ productSlug, quantity })),
    lineItems,
    itemCount: lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0),
    listValue,
    bundlePrice,
    ...savings,
    savingsRate: savings.savingsPercent / 100,
    discountRate: getDiscountRate(discountRule),
    currency: bundle?.currency ?? 'PLN'
  };
}

export function formatPln(amount, locale = 'pl-PL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(fromMinorUnits(toMinorUnits(amount)));
}
