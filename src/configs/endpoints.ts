import ENV from '@/configs/env'

const ENDPOINTS = {
  thank_you: {
    rank_math: {
      en: '/thank-you',
      vi: '/cam-on',
    },
  },
  hotel: {
    getDetail: (slug: string) => `api/v1/get-detail/hotels?slug=${slug}`,
    getCoupons: (slug: string) => `api/v1/coupons?slug=${slug}&post_type=hotels`,
    applyVoucher: 'api/v1/hotel/voucher/apply',
    list: 'api/v1/get-all/hotels',
    taxonomies: 'api/v1/taxonomies/hotels',
    detail: 'api/v1/hotels/detail',
    relatedHotels: 'api/v1/hotels/related-hotels',
    en: 'wp/v2/pages/559?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/562?_fields=acf&acf_format=standard',
    coupons: 'api/v1/coupons',
    rank_math: {
      en: '/hotel-list',
      vi: '/danh-sach-khach-san',
    },
    rank_math_detail: {
      en: (slug: string) => `/hotels/${slug}`,
      vi: (slug: string) => `/vi/hotels/${slug}`,
    },
  },
  taxonomy: {
    get: (locale: string, taxonomy: string) =>
      `api/v1/taxonomy?taxonomy=${taxonomy}&lang=${locale}&acf=true`,
  },
  taxonomies: {
    get: (locale: string, type: string) => `api/v1/taxonomies/${type}?lang=${locale}`,
  },
  tour: {
    rank_math: {
      en: '/tour-list',
      vi: '/danh-sach-tour',
    },
    rank_math_detail: {
      en: (slug: string) => `/tour/${slug}`,
      vi: (slug: string) => `/vi/tour/${slug}`,
    },
    list: 'api/v1/get-all/tour',
    taxonomies: 'api/v1/taxonomies/tour',
    detail: 'api/v1/tour/detail',
    applyVoucher: 'api/v1/tour/voucher/apply',
    relatedTours: 'api/v1/tour/related-tours',
    en: 'wp/v2/pages/272?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/274?_fields=acf&acf_format=standard',
    coupons: 'api/v1/coupons',
  },
  blogs: {
    list: 'api/v1/get-all/post',
    taxonomies: 'api/v1/taxonomies/post',
    featuredNews: 'api/v1/page-acf?page_id=248&name=featured_news&acf=true',
    rank_math: {
      en: '/blog-list',
      vi: '/danh-sach-bai-viet',
    },
    en: 'wp/v2/pages/248?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/250?_fields=acf&acf_format=standard',
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
    rank_math: {
      en: '/homepage',
      vi: '/trang-chu',
    },
  },
  promotion: {
    coupon: 'api/v1/get-all/coupon',
    couponTaxonomies: 'api/v1/taxonomies/coupon',
    couponSpecialOffer: 'api/v1/page-acf?page_id=410&name=coupon&acf=true',
    en: 'wp/v2/pages/410?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/412?_fields=acf&acf_format=standard',
    rank_math: {
      en: '/promotions',
      vi: '/khuyen-mai',
    },
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
    form_contact_vi: {
      id: '617',
      unit_tag: 'bb29756',
    },
    form_contact_en: {
      id: '616',
      unit_tag: 'ade750c',
    },
    form_booking_hotel_en: {
      id: '644',
      unit_tag: '646954a',
    },
    form_booking_hotel_vi: {
      id: '649',
      unit_tag: 'bafab39',
    },
  },
  contact: {
    en: 'wp/v2/pages/160?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/163?_fields=acf&acf_format=standard',
    form_booking_hotel_en: {
      id: '644',
      unit_tag: '646954a',
    },
    form_booking_hotel_vi: {
      id: '649',
      unit_tag: 'bafab39',
    },
    rank_math: {
      en: '/contact',
      vi: '/lien-he',
    },
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
