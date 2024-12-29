"use client";

import { ComboGroup, ComboItem } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Price } from '@/components/ui/price';
import { Minus, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ComboGroupItemProps {
  item: ComboItem;
  group: ComboGroup;
  quantity: number;
  onSelect: (quantity: number) => void;
}

export function ComboGroupItem({ item, group, quantity, onSelect }: ComboGroupItemProps) {
  const canIncrease = group.MaxQuantity === 0 || quantity < group.MaxQuantity;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-3 sm:p-4">
          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-base sm:text-lg mb-0.5">{item.MenuItemText}</h4>
            {item.Description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.Description}
              </p>
            )}
            {item.ExtraPriceTakeOut_TL > 0 && (
              <Price 
                amount={item.ExtraPriceTakeOut_TL} 
                className="text-sm text-primary font-medium mt-1"
              />
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-1 sm:gap-2 bg-secondary/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              disabled={quantity === 0}
              onClick={() => onSelect(Math.max(0, quantity - 1))}
              className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-background/50"
            >
              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <span className="w-6 sm:w-8 text-center tabular-nums font-medium text-sm sm:text-base">
              {quantity}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              disabled={!canIncrease}
              onClick={() => onSelect(quantity + 1)}
              className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-background/50"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}