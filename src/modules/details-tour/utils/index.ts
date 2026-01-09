import { PaxType } from '@/enums'

export type PaxQuantityType = {
  adults: number
  children58: number
  children14: number
}

export type PriceBreakdownItemType = {
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type CalculateProvisionalPriceResultType = {
  pricePerPaxTypes: Record<PaxType, PriceBreakdownItemType>
  provisionalPrice: number
}

/**
 * Calculate provisional price based on pax quantity and base adult price.
 * Rule:
 * - Adults (>= 9 years): 100% base price
 * - Children 5–8 years: 75% base price
 * - Children 1–4 years: first child free, from second child: 50% base price
 */
export function calculateProvisionalPriceByPaxQuantity(
  paxQuantity: PaxQuantityType,
  baseAdultPrice: number,
): CalculateProvisionalPriceResultType {
  const safeBasePrice = Number.isFinite(baseAdultPrice) ? baseAdultPrice : 0

  const unitPrice = {
    adults: safeBasePrice,
    children58: safeBasePrice * 0.75,
    children14: safeBasePrice * 0.5,
  }

  const adultsQuantity = Math.max(paxQuantity.adults || 0, 0)
  const children58Quantity = Math.max(paxQuantity.children58 || 0, 0)
  const children14Quantity = Math.max(paxQuantity.children14 || 0, 0)

  const adultsTotal = adultsQuantity * unitPrice.adults
  const children58Total = children58Quantity * unitPrice.children58
  const chargeableChildren14 = children14Quantity > 1 ? children14Quantity - 1 : 0
  const children14Total = chargeableChildren14 * unitPrice.children14

  const pricePerPaxTypes: Record<PaxType, PriceBreakdownItemType> = {
    [PaxType.ADULTS]: {
      quantity: adultsQuantity,
      unitPrice: unitPrice.adults,
      totalPrice: adultsTotal,
    },
    [PaxType.CHILDREN_58]: {
      quantity: children58Quantity,
      unitPrice: unitPrice.children58,
      totalPrice: children58Total,
    },
    [PaxType.CHILDREN_14]: {
      quantity: children14Quantity,
      unitPrice: unitPrice.children14,
      totalPrice: children14Total,
    },
  }

  const provisionalPrice = Math.max(
    Object.values(pricePerPaxTypes).reduce((acc, item) => acc + item.totalPrice, 0),
    0,
  )

  return {
    pricePerPaxTypes,
    provisionalPrice,
  }
}
