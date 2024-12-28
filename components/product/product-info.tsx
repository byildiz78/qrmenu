"use client";

import { Star } from 'lucide-react';
import { ProductBadge } from '@/components/ui/product-badge';
import { Price } from '@/components/ui/price';
import type { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        {product.rating && (
          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{product.rating}</span>
          </div>
        )}
        <p className="text-muted-foreground">{product.description}</p>
        
        <div className="mt-4">
          <Price 
            amount={product.price} 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          />
          {product.isCombo && (
            <p className="text-sm text-muted-foreground mt-1">
              * Seçimlerinize göre fiyat değişebilir
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {product.prepTime && (
          <ProductBadge icon="time" value={`${product.prepTime} dk`} />
        )}
        {product.calories && (
          <ProductBadge icon="calories" value={`${product.calories} kcal`} />
        )}
        {product.isSpicy && (
          <ProductBadge 
            icon="spicy" 
            value="Acılı" 
            className="bg-red-100 text-red-700" 
          />
        )}
        {product.isVegetarian && (
          <ProductBadge 
            icon="vegetarian" 
            value="Vejetaryen" 
            className="bg-green-100 text-green-700" 
          />
        )}
      </div>
    </>
  );
}