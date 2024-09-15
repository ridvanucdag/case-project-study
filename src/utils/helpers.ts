export function formatCurrency(amount: number) {
  const formattedAmount = new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formattedAmount} ₺`;
}
