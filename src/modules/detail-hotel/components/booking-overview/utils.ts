// Helper function to normalize price (convert 3.5 to 3500 if needed)
export const normalizePrice = (price: number): number => {
  const numPrice = Number(price)
  // If the number is less than 100 and has decimal places, it might be in "thousands" format (e.g., 3.5 = 3500)
  if (numPrice < 100 && numPrice % 1 !== 0) {
    return Math.round(numPrice * 1000)
  }
  return Math.round(numPrice)
}

// Format USD currency
export const formatUSD = (amount: number): string => {
  const normalizedAmount = normalizePrice(amount)
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(normalizedAmount)
}
