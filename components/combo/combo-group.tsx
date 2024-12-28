"use client";

import { ComboGroup as ComboGroupType, ComboItem } from '@/types/api';
import { ComboSelections } from '@/types/combo';
import { Badge } from '@/components/ui/badge';
import { ComboGroupItem } from './combo-group-item';

interface ComboGroupProps {
  group: ComboGroupType;
  selections: ComboSelections;
  onSelect: (groupName: string, item: ComboItem, quantity: number) => void;
}

export function ComboGroup({ group, selections, onSelect }: ComboGroupProps) {
  const currentSelections = selections[group.GroupName] || [];
  const totalQuantity = currentSelections.reduce((sum, s) => sum + s.quantity, 0);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{group.GroupName}</h3>
          <p className="text-sm text-muted-foreground">
            {group.IsForcedGroup ? 'Zorunlu Seçim' : 'Opsiyonel'}
            {group.MaxQuantity > 0 && ` • Maksimum ${group.MaxQuantity} adet`}
          </p>
        </div>
        <Badge variant="outline">
          {totalQuantity} / {group.MaxQuantity || '∞'}
        </Badge>
      </div>

      <div className="grid gap-4">
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