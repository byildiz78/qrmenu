"use client";

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddToCartButtonProps {
  onClick: () => void;
  text?: string;
}

export function AddToCartButton({ onClick, text = "Sepete Ekle" }: AddToCartButtonProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        onClick={onClick}
        className="w-full rounded-full hover:scale-105 active:scale-95 transition-all duration-200 gap-2 bg-primary/90 backdrop-blur-sm hover:bg-primary"
      >
        <Plus className="h-4 w-4" />
        {text}
      </Button>
    </motion.div>
  );
}