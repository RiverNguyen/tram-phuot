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

  // Fetch dynamic content with error handling
  const fetchSlugs = async (api: string) => {
    try {
      return await fetchData({ api })
    } catch (error) {
      console.error(`Failed to fetch slugs from ${api}:`, error)
      return null
    }
  }

  const [tourEn, tourVi, hotelEn, hotelVi, blogEn, blogVi, couponEn, couponVi] = await Promise.all([
    fetchSlugs('api/v1/slugs?post_type=tour&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=tour&lang=vi'),
    fetchSlugs('api/v1/slugs?post_type=hotels&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=hotels&lang=vi'),
    fetchSlugs('api/v1/slugs?post_type=post&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=post&lang=vi'),
    fetchSlugs('api/v1/slugs?post_type=coupon&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=coupon&lang=vi'),
  ])

  // Helper to get slug from either string or object
  const getSlug = (item: any): string | null => {
    if (typeof item === 'string') return item
    if (item?.slug) return item.slug
    return null
  }

  const generatePageStaticTour = (prefix: string, tours: any[], locale: string) => {
    if (!tours || tours?.length === 0 || !Array.isArray(tours)) {
      return []
    }
    return tours
      .map((tour: any) => {
        const slug = getSlug(tour)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter(
        (item): item is { url: string; lastModified: Date; priority: number } => item !== null,
      )
  }

  const generatePageStaticHotel = (prefix: string, hotels: any[], locale: string) => {
    if (!hotels || hotels?.length === 0 || !Array.isArray(hotels)) {
      return []
    }
    return hotels
      .map((hotel: any) => {
        const slug = getSlug(hotel)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter(
        (item): item is { url: string; lastModified: Date; priority: number } => item !== null,
      )
  }

  const generatePageStaticBlog = (prefix: string, posts: any[], locale: string) => {
    if (!posts || posts?.length === 0 || !Array.isArray(posts)) {
      return []
    }
    return posts
      .map((post: any) => {
        const slug = getSlug(post)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter(
        (item): item is { url: string; lastModified: Date; priority: number } => item !== null,
      )
  }

  const generatePageStaticCoupon = (prefix: string, coupons: any[], locale: string) => {
    if (!coupons || coupons?.length === 0 || !Array.isArray(coupons)) {
      return []
    }
    return coupons
      .map((coupon: any) => {
        const slug = getSlug(coupon)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter(
        (item): item is { url: string; lastModified: Date; priority: number } => item !== null,
      )
  }

  // Handle different possible response structures
  // API might return { tours: [...] } or directly [...]
  const getTours = (data: any) => data?.tours || data?.data || (Array.isArray(data) ? data : [])
  const getHotels = (data: any) => data?.hotels || data?.data || (Array.isArray(data) ? data : [])
  const getPosts = (data: any) => data?.posts || data?.data || (Array.isArray(data) ? data : [])
  const getCoupons = (data: any) => data?.coupons || data?.data || (Array.isArray(data) ? data : [])

  const generatePageStaticTourEn = generatePageStaticTour('tours', getTours(tourEn), '')
  const generatePageStaticTourVi = generatePageStaticTour('danh-sach-tour', getTours(tourVi), '/vi')

  const generatePageStaticHotelEn = generatePageStaticHotel('hotels', getHotels(hotelEn), '')
  const generatePageStaticHotelVi = generatePageStaticHotel(
    'danh-sach-khach-san',
    getHotels(hotelVi),
    '/vi',
  )

  const generatePageStaticBlogEn = generatePageStaticBlog('blogs', getPosts(blogEn), '')
  const generatePageStaticBlogVi = generatePageStaticBlog(
    'danh-sach-tin-tuc',
    getPosts(blogVi),
    '/vi',
  )

  const generatePageStaticCouponEn = generatePageStaticCoupon('coupon', getCoupons(couponEn), '')
  const generatePageStaticCouponVi = generatePageStaticCoupon('uu-dai', getCoupons(couponVi), '/vi')

  return [
    // Static pages first
    ...generatePageStaticEn,
    ...generatePageStaticVi,
    // Dynamic pages after
    ...generatePageStaticTourEn,
    ...generatePageStaticTourVi,
    ...generatePageStaticHotelEn,
    ...generatePageStaticHotelVi,
    ...generatePageStaticBlogEn,
    ...generatePageStaticBlogVi,
    ...generatePageStaticCouponEn,
    ...generatePageStaticCouponVi,
  ]
}
