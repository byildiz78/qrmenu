// Collection of food-related Unsplash images
const mockProductImages = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  'https://images.unsplash.com/photo-1565299507177-b0ac66763828',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
];

const mockCategoryImages = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1541014741259-de529411b96a',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
  'https://images.unsplash.com/photo-1551024506-0341cb19b9f3',
];

let currentProductIndex = 0;
let currentCategoryIndex = 0;

export function getNextProductImage(): string {
  const image = mockProductImages[currentProductIndex];
  currentProductIndex = (currentProductIndex + 1) % mockProductImages.length;
  return `${image}?q=80&w=1080`;
}

export function getNextCategoryImage(): string {
  const image = mockCategoryImages[currentCategoryIndex];
  currentCategoryIndex = (currentCategoryIndex + 1) % mockCategoryImages.length;
  return `${image}?q=80&w=1080`;
}