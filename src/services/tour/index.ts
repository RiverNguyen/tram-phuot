import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ITaxonomyRes } from '@/interface/taxonomy.interface'
import { ITourRes } from '@/interface/tour.interface'
import { ApplyVoucherPayloadType } from '@/types/details-tour.type'

const tourService = {
  getTours: async ({
    locale,
    locations,
    tourType,
    tourDuration,
    page = '1',
    limit = 8,
  }: {
    locale: string
    locations?: string
    tourType?: string
    tourDuration?: string
    page?: string
    limit?: number
  }): Promise<ITourRes> => {
    const params = new URLSearchParams({
      lang: locale,
      acf: 'price_person',
      paged: page,
      limit: String(limit),
      order: 'DESC',
      orderby: 'date',
    })

    const taxMap: Record<string, string | undefined> = {
      locations,
      'tour-type': tourType,
      'tour-duration': tourDuration,
    }

    // Build taxonomy-related params so that:
    // /api/v1/get-all/tour?lang=en&acf=price_person&paged=1&limit=8&order=DESC&orderby=date
    // &tax=locations,tour-duration&locations=dak-lak&tour-duration=2-days-1-night
    const activeTaxes: string[] = []

    Object.entries(taxMap).forEach(([tax, value]) => {
      if (value) {
        activeTaxes.push(tax)
        params.append(tax, value)
      }
    })

    if (activeTaxes.length) {
      params.set('tax', activeTaxes.join(','))
    }

    return await fetchData({
      api: `${ENDPOINTS.tour.list}?${params.toString()}`,
    })
  },
  getTaxonomies: async (locale: string): Promise<ITaxonomyRes> => {
    return await fetchData({
      api: `${ENDPOINTS.tour.taxonomies}?lang=${locale}`,
    })
  },
  getDetailTour: async (slug: string, locale: string, post_type: string) => {
    return await fetchData({
      api: `${ENDPOINTS.tour.detail}?slug=${slug}&locale=${locale}&post_type=${post_type}`,
    })
  },
  applyVoucher: async (payload: ApplyVoucherPayloadType) => {
    return await fetchData({
      api: ENDPOINTS.tour.applyVoucher,
      method: 'POST',
      option: {
        body: JSON.stringify(payload),
      },
    })
  },
  getRelatedTours: async (
    slug: string,
    locale: string,
    fields: string = '',
    postTypeKey: string = '',
  ) => {
    return await fetchData({
      api: `${ENDPOINTS.tour.relatedTours}?slug=${slug}&locale=${locale}&fields=${fields}&post=${postTypeKey}`,
    })
  },
  getTourCoupons: async (slug: string, locale: string, postTypeKey: string) => {
    return await fetchData({
      api: `${ENDPOINTS.tour.coupons}?slug=${slug}&locale=${locale}&post_type=${postTypeKey}`,
    })
  },
}

export default tourService
