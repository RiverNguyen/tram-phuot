import ENV from '@/configs/env'

const ENDPOINTS = {
  tour: {
    list: '/tour/list',
    detail: 'api/v1/tour/detail',
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
  promotion: {
    coupon: 'api/v1/get-all/coupon',
    couponTaxonomies: 'api/v1/taxonomies/coupon',
  },
}

export default ENDPOINTS
