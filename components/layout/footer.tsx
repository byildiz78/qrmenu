"use client";

import { CartSheet } from '@/components/cart-sheet';
import { useCartStore } from '@/store/cart';
import { useLanguageStore } from '@/store/language';
import { motion } from 'framer-motion';
import { Price } from '../ui/price';
import { ShoppingBag } from 'lucide-react';

export function Footer() {
  const { items, total } = useCartStore();
  const { t } = useLanguageStore();
  const hasItems = items.length > 0;

  if (!hasItems) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <CartSheet className="w-full">
        <div className="bg-background/95 backdrop-blur-lg border-t shadow-lg hover:bg-secondary/5 transition-all duration-300">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.common.total}</p>
                  <Price amount={total} className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent" />
                </div>
              </div>
              <div className="relative hover:scale-105 transition-transform">
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {items.length}
                </div>
                <ShoppingBag className="h-6 w-6" />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
        </div>
      </CartSheet>
    </motion.div>
  );
}