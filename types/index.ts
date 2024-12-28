export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients?: string[];
  calories?: number;
  prepTime?: number;
  allergens?: string[];
  isSpicy?: boolean;
  isVegetarian?: boolean;
  rating?: number;
  isCombo?: boolean;
  Combo?: import('@/types/api').ComboGroup[];
  comboSelections?: import('@/types/combo').ComboSelections;
}