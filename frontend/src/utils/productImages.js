const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80';

const AUTH_IMAGE =
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80';

const IMAGE_BY_KEYWORD = [
  { keys: ['laptop', 'xps', 'dell'], url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
  { keys: ['iphone', 'phone', 'smartphone', 'apple'], url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80' },
  { keys: ['speaker', 'philips'], url: 'https://images.unsplash.com/photo-1545454675-3531b543be6d?w=800&q=80' },
  { keys: ['watch', 'wrist'], url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80' },
  { keys: ['coat', 'jacket'], url: 'https://images.unsplash.com/photo-1539533018447-66fcce3288ad?w=800&q=80' },
  { keys: ['bike', 'bicycle', 'mountain'], url: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&q=80' },
  { keys: ['t-shirt', 'shirt', 'tee'], url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
  { keys: ['jean', 'denim'], url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80' },
  { keys: ['sneaker', 'shoe', 'footwear'], url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
  { keys: ['backpack', 'bag'], url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
];

const CATEGORY_IMAGES = {
  Electronics: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80',
  Clothing: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
  Accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  Sports: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
  Footwear: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
};

function needsFallback(url) {
  if (!url) return true;
  return (
    url.includes('placeholder.com') ||
    url.startsWith('/images/') ||
    url.startsWith('/image/')
  );
}

function matchByName(name) {
  const lower = (name || '').toLowerCase();
  for (const entry of IMAGE_BY_KEYWORD) {
    if (entry.keys.some((key) => lower.includes(key))) {
      return entry.url;
    }
  }
  return null;
}

export function getProductImageUrl(product) {
  if (!product) return DEFAULT_IMAGE;

  const { imageUrl, name, category } = product;

  if (!needsFallback(imageUrl)) {
    return imageUrl;
  }

  return (
    matchByName(name) ||
    CATEGORY_IMAGES[category] ||
    DEFAULT_IMAGE
  );
}

export { DEFAULT_IMAGE, HERO_IMAGE, AUTH_IMAGE, CATEGORY_IMAGES };
