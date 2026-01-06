import { CouponTaxonomy, CouponTaxonomies } from '@/types/coupon.type'

export type FilterOption = {
  label: string
  value: string
}

export type CouponFilterMap = Partial<Record<keyof CouponTaxonomies, FilterOption[]>>

const COUPON_TAXONOMY_KEYS: (keyof CouponTaxonomies)[] = ['locations', 'tour-type']

function isCouponTaxonomyKey(key: string): key is keyof CouponTaxonomies {
  return COUPON_TAXONOMY_KEYS.includes(key as keyof CouponTaxonomies)
}

export function mapTaxonomyToFilter(data: CouponTaxonomy[] = []): CouponFilterMap {
  return data.reduce((acc, item) => {
    if (!isCouponTaxonomyKey(item.taxonomy)) return acc

    acc[item.taxonomy] = item.terms.map((term) => ({
      label: term.name,
      value: term.slug,
    }))

    return acc
  }, {} as CouponFilterMap)
}
