import ENV from '@/configs/env'

const ENDPOINTS = {
  taxonomies: {
    get: (locale: string, type: string) => `api/v1/taxonomies/${type}?lang=${locale}`,
  },
  tour: {
    list: 'api/v1/get-all/tour',
    taxonomies: 'api/v1/taxonomies/tour',
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
  our_stories: {
    get: (locale: string, kind: string) =>
      `api/v1/get-all/post?lang=${locale}&tax=kind&kind=${kind}&limit=8&order=DESC&orderby=date`,
  },
  review: {
    getAll: (locale: string) => `api/v1/get-all/review?lang=${locale}&acf=true`,
  },
}

export default ENDPOINTS
