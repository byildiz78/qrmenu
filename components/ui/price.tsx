export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(price);
}

export function Price({ amount }: { amount: number }) {
  return <span className="font-medium">{formatPrice(amount)}</span>;
}