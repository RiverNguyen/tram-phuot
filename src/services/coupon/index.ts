import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ICouponRes, ICouponTaxonomyRes } from '@/interface/coupon.interface'

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
    const query = new URLSearchParams()
    query.set('lang', locale)
    query.set('acf', 'true')
    query.set('tax', 'locations,tour-type')
    query.set('limit', String(limit))

    if (locations) query.set('locations', locations)
    if (tourType) query.set('tour-type', tourType)
    if (paged && Number(paged) > 1) query.set('paged', paged)

    return await fetchData({
      api: `${ENDPOINTS.promotion.coupon}?${query.toString()}`,
    })
  },
  getTaxonomies: async (locale: string): Promise<ICouponTaxonomyRes> => {
    return await fetchData({
      api: `${ENDPOINTS.promotion.couponTaxonomies}?lang=${locale}`,
    })
  },
  getPromotionPage: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.promotion[locale as 'en' | 'vi'],
    })
  },
  getCouponSpecialOffer: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.promotion.couponSpecialOffer,
    })
  },
}

export default couponService
