/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchData from '@/fetches/fetchData'
import ENV from '@/configs/env'

export default async function sitemap() {
  const baseUrl = ENV.DOMAIN
  const lastModified = new Date()

  const generatePageStaticEn = [''].flatMap((locale) =>
    ['', '/about-us', '/contact', '/blogs', '/tours', '/hotels', '/promotions'].map((path) => ({
      url: `${baseUrl}${locale}${path}`,
      lastModified,
      priority: path === '' ? 1 : 0.9,
    })),
  )

  const generatePageStaticVi = ['/vi'].flatMap((locale) =>
    [
      '',
      '/ve-chung-toi',
      '/lien-he',
      '/danh-sach-tin-tuc',
      '/danh-sach-khach-san',
      '/uu-dai',
      '/danh-sach-tour',
    ].map((path) => ({
      url: `${baseUrl}${locale}${path}`,
      lastModified,
      priority: path === '' ? 1 : 0.9,
    })),
  )

  const [tourEn, tourVi, hotelEn, hotelVi, blogEn, blogVi, couponEn, couponVi] = await Promise.all([
    fetchData({
      api: 'api/v1/slugs?post_type=tour&lang=en',
    }),
    fetchData({
      api: 'api/v1/slugs?post_type=tour&lang=vi',
    }),
    fetchData({
      api: 'api/v1/slugs?post_type=hotels&lang=en',
    }),
    fetchData({
      api: 'api/v1/slugs?post_type=hotels&lang=vi',
    }),
    fetchData({
      api: 'api/v1/slugs?post_type=post&lang=en',
    }),
    fetchData({
      api: 'api/v1/slugs?post_type=post&lang=vi',
    }),
    fetchData({
      api: 'api/v1/slugs?post_type=coupon&lang=en',
    }),
    fetchData({
      api: 'api/v1/slugs?post_type=coupon&lang=vi',
    }),
  ])

  const generatePageStaticTour = (prefix: string, tours: any[], locale: string) => {
    if (!tours || tours?.length === 0 || !Array.isArray(tours)) {
      return []
    }
    return tours.map((tour: any) => ({
      url: `${baseUrl}${locale}/${prefix}/${tour.slug}`,
      lastModified,
      priority: 0.8,
    }))
  }

  const generatePageStaticHotel = (prefix: string, hotels: any[], locale: string) => {
    if (!hotels || hotels?.length === 0 || !Array.isArray(hotels)) {
      return []
    }
    return hotels.map((hotel: any) => ({
      url: `${baseUrl}${locale}/${prefix}/${hotel.slug}`,
      lastModified,
      priority: 0.8,
    }))
  }

  const generatePageStaticBlog = (prefix: string, posts: any[], locale: string) => {
    if (!posts || posts?.length === 0 || !Array.isArray(posts)) {
      return []
    }
    return posts.map((post: any) => ({
      url: `${baseUrl}${locale}/${prefix}/${post.slug}`,
      lastModified,
      priority: 0.8,
    }))
  }

  const generatePageStaticCoupon = (prefix: string, coupons: any[], locale: string) => {
    if (!coupons || coupons?.length === 0 || !Array.isArray(coupons)) {
      return []
    }
    return coupons.map((coupon: any) => ({
      url: `${baseUrl}${locale}/${prefix}/${coupon.slug}`,
      lastModified,
      priority: 0.8,
    }))
  }

  const generatePageStaticTourEn = generatePageStaticTour('tours', tourEn?.tours, '')
  const generatePageStaticTourVi = generatePageStaticTour('danh-sach-tour', tourVi?.tours, '/vi')

  const generatePageStaticHotelEn = generatePageStaticHotel('hotels', hotelEn?.hotels, '')
  const generatePageStaticHotelVi = generatePageStaticHotel(
    'danh-sach-khach-san',
    hotelVi?.hotels,
    '/vi',
  )

  const generatePageStaticBlogEn = generatePageStaticBlog('blog', blogEn?.posts, '')
  const generatePageStaticBlogVi = generatePageStaticBlog('danh-sach-tin-tuc', blogVi?.posts, '/vi')

  const generatePageStaticCouponEn = generatePageStaticCoupon('coupon', couponEn?.coupons, '')
  const generatePageStaticCouponVi = generatePageStaticCoupon('uu-dai', couponVi?.coupons, '/vi')

  return [
    ...generatePageStaticTourEn,
    ...generatePageStaticTourVi,
    ...generatePageStaticHotelEn,
    ...generatePageStaticHotelVi,
    ...generatePageStaticBlogEn,
    ...generatePageStaticBlogVi,
    ...generatePageStaticCouponEn,
    ...generatePageStaticCouponVi,
    ...generatePageStaticEn,
    ...generatePageStaticVi,
  ]
}
