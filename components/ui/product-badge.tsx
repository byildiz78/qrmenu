"use client";

import { cn } from "@/lib/utils";
import { Clock, Flame, Leaf, Gauge } from "lucide-react";

interface ProductBadgeProps {
  icon: "time" | "spicy" | "vegetarian" | "calories";
  value: string;
  className?: string;
}

const icons = {
  time: Clock,
  spicy: Flame,
  vegetarian: Leaf,
  calories: Gauge,
};

export function ProductBadge({ icon, value, className }: ProductBadgeProps) {
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full",
        "bg-secondary/80 backdrop-blur-sm",
        "text-sm font-medium",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{value}</span>
    </div>
  );
}