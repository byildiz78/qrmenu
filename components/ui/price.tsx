interface PriceProps {
  amount: number;
  className?: string;
}

export function Price({ amount, className }: PriceProps) {
  return (
    <span className={className}>
      {amount.toFixed(2)} ₺
    </span>
  );
}