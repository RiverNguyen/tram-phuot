import { unstable_cache } from 'next/cache'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ICouponRes, ICouponTaxonomyRes } from '@/interface/coupon.interface'

// Cache taxonomies by locale - không thay đổi khi filter
// Cache trong 5 phút (300 giây) để tối ưu performance
const getCachedTaxonomies = (locale: string) =>
  unstable_cache(
    async (): Promise<ICouponTaxonomyRes> => {
      return await fetchData({
        api: `${ENDPOINTS.promotion.couponTaxonomies}?lang=${locale}`,
      })
    },
    [`coupon-taxonomies-${locale}`],
    {
      tags: [`coupon-taxonomies-${locale}`],
      revalidate: 300, // 5 phút
    },
  )()

// Cache promotion page by locale - không thay đổi khi filter
const getCachedPromotionPage = (locale: string) =>
  unstable_cache(
    async () => {
      return await fetchData({
        api: ENDPOINTS.promotion[locale as 'en' | 'vi'],
      })
    },
    [`promotion-page-${locale}`],
    {
      tags: [`promotion-page-${locale}`],
      revalidate: 300, // 5 phút
    },
  )()

// Cache special offer - không thay đổi khi filter
const getCachedCouponSpecialOffer = (locale: string) =>
  unstable_cache(
    async () => {
      try {
        const endpoint =
          locale === 'en'
            ? ENDPOINTS.promotion.couponSpecialOfferEn
            : ENDPOINTS.promotion.couponSpecialOfferVi

        const response = await fetchData({ api: endpoint })
        return Array.isArray(response) ? response : []
      } catch {
        return []
      }
    },
    [`coupon-special-offer-${locale}`],
    {
      tags: [`coupon-special-offer-${locale}`],
      revalidate: 300, // 5 phút
    },
  )()

// Cache coupons by query parameters - cache khi quay lại filter cũ
const getCachedCoupons = (
  locale: string,
  locations: string,
  tourType: string,
  paged: string,
  limit: number,
) => {
  const query = new URLSearchParams()
  query.set('lang', locale)
  query.set('acf', 'true')
  query.set('tax', 'locations,tour-type')
  query.set('limit', String(limit))

  if (locations) query.set('locations', locations)
  if (tourType) query.set('tour-type', tourType)
  if (paged && Number(paged) > 1) query.set('paged', paged)

  const cacheKey = `coupons-${locale}-${locations || 'none'}-${tourType || 'none'}-${paged || '1'}-${limit}`

  return unstable_cache(
    async (): Promise<ICouponRes> => {
      return await fetchData({
        api: `${ENDPOINTS.promotion.coupon}?${query.toString()}`,
      })
    },
    [cacheKey],
    {
      tags: [cacheKey],
      revalidate: 300,
    },
  )()
}

const couponService = {
  getCoupons: async ({
    locale,
    locations = '',
    tourType = '',
    paged = '1',
    limit = 9,
  }: {
    locale: string
    locations?: string
    tourType?: string
    paged?: string
    limit?: number
  }): Promise<ICouponRes> => {
    return getCachedCoupons(locale, locations, tourType, paged, limit)
  },
  getTaxonomies: async (locale: string): Promise<ICouponTaxonomyRes> => {
    return getCachedTaxonomies(locale)
  },
  getPromotionPage: async (locale: string) => {
    return getCachedPromotionPage(locale)
  },
  getCouponSpecialOffer: async (locale: string) => {
    return getCachedCouponSpecialOffer(locale)
  },
}

export default couponService
