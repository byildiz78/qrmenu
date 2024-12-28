"use client";

import { CartSheet } from '@/components/cart-sheet';
import { useCartStore } from '@/store/cart';
import { motion } from 'framer-motion';
import { Price } from '../ui/price';
import { ShoppingBag } from 'lucide-react';

export function Footer() {
  const { items, total } = useCartStore();
  const hasItems = items.length > 0;

  if (!hasItems) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-50"
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Tutar</p>
              <Price amount={total} className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent" />
            </div>
          </div>
          <CartSheet />
        </div>
      </div>
    </motion.div>
  );
}