"use client";

import { ComboGroup as ComboGroupType, ComboItem } from '@/types/api';
import { ComboSelections } from '@/types/combo';
import { Badge } from '@/components/ui/badge';
import { ComboGroupItem } from './combo-group-item';
import { useLanguageStore } from '@/store/language';

interface ComboGroupProps {
  group: ComboGroupType;
  selections: ComboSelections;
  onSelect: (groupName: string, item: ComboItem, quantity: number) => void;
  progress: number;
}

export function ComboGroup({ group, selections, onSelect, progress }: ComboGroupProps) {
  const currentSelections = selections[group.GroupName] || [];
  const totalQuantity = currentSelections.reduce((sum, s) => sum + s.quantity, 0);
  const { t } = useLanguageStore();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">{group.GroupName}</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={group.IsForcedGroup ? "default" : "secondary"} className="text-xs sm:text-sm">
              {group.IsForcedGroup ? t.product.requiredSelection : t.product.optional}
            </Badge>
            {group.MaxQuantity > 0 && (
              <Badge variant="outline" className="text-xs sm:text-sm">
                {t.product.maximum}: {group.MaxQuantity}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs sm:text-sm">
              {totalQuantity} / {group.MaxQuantity || '∞'}
            </Badge>
          </div>
        </div>

        <div className="w-full sm:w-32 h-2 rounded-full bg-secondary overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {group.Items.map((item) => (
          <ComboGroupItem
            key={item.MenuItemKey}
            item={item}
            group={group}
            quantity={currentSelections.find(s => s.item.MenuItemKey === item.MenuItemKey)?.quantity || 0}
            onSelect={(quantity) => onSelect(group.GroupName, item, quantity)}
          />
        ))}
      </div>
    </div>
  );
}