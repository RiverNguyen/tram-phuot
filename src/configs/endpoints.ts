import ENV from '@/configs/env'

const ENDPOINTS = {
  tour: {
    list: '/tour/list',
    detail: 'api/v1/tour/detail',
    applyVoucher: 'api/v1/tour/voucher/apply',
    relatedTours: 'api/v1/tour/related-tours',
  },
  wordpress: {
    siteSettings: 'api/v1/site-settings',
  },
  seo: {
    rankMath: (slug: string) => `/rankmath/v1/getHead?url=${ENV.CMS!}${slug}`,
  },
  site_settings: 'api/v1/site-settings',
  home: {
    en: 'wp/v2/pages/71?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/84?_fields=acf&acf_format=standard',
  },
  contact_form: {
    form_booking_tour_vi: {
      id: '455',
      unit_tag: '42f9d6e',
    },
    form_booking_tour_en: {
      id: '456',
      unit_tag: '79372bc',
    },
  },
}

export default ENDPOINTS
