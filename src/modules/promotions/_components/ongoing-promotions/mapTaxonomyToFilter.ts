import { ICouponTaxonomies, ICouponTaxonomy } from '@/interface/coupon.interface'

export type FilterOption = {
  label: string
  value: string
}

export type CouponFilterMap = Partial<Record<keyof CouponTaxonomies, FilterOption[]>>

type CouponTaxonomies = ICouponTaxonomies

const COUPON_TAXONOMY_KEYS: (keyof CouponTaxonomies)[] = ['locations', 'tour-type']

function isCouponTaxonomyKey(key: string): key is keyof CouponTaxonomies {
  return COUPON_TAXONOMY_KEYS.includes(key as keyof CouponTaxonomies)
}

export function mapTaxonomyToFilter(data: ICouponTaxonomy[] = []): CouponFilterMap {
  return data.reduce((acc, item) => {
    if (!isCouponTaxonomyKey(item.taxonomy)) return acc

    acc[item.taxonomy] = item.terms.map((term) => ({
      label: term.name,
      value: term.slug,
    }))

    return acc
  }, {} as CouponFilterMap)
}
