"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { ShoppingBag } from 'lucide-react';
import { CartItems } from './cart/cart-items';
import { CartTotal } from './cart/cart-total';
import { CartEmpty } from './cart/cart-empty';
import { motion } from 'framer-motion';

export function CartSheet() {
  const { items } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative bg-white/10 border-white/20 hover:bg-white/20 transition-colors"
        >
          <ShoppingBag className="h-5 w-5 text-white" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-lg">
        <SheetHeader className="space-y-3 pb-6 border-b relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
          <div className="relative">
            <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Sepetim
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              {items.length} ürün
            </p>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-auto py-6">
          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <CartItems />
          )}
        </div>
        {items.length > 0 && (
          <CartTotal />
        )}
      </SheetContent>
    </Sheet>
  );
}