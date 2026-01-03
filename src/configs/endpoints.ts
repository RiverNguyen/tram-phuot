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
}

export default ENDPOINTS
