export const formatPrice = (price: number) => {
    const formatPrice = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(price);

    return formatPrice
}

export function stringToNumber(str: string): number {
  return parseFloat(str.replace(/,/g, ''));
}