import Banner from '@/modules/promotions/_components/banner/Banner'
import SpecialOffers from '@/modules/promotions/_components/special-offer/WrapperSpecialOffers'
import OngoingPromotions from '@/modules/promotions/_components/ongoing-promotions/WrapperOngoingPromotions'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/configs/endpoints'
import { ICouponRes, ICouponTaxonomyRes } from '@/interface/coupon.interface'

const getCoupon = async (lang: string) => {
  const res: ICouponRes = await fetchData({
    api: `${endpoints.promotion.coupon}?lang=${lang}&acf=true&limit=9`,
  })
  return res
}

const getCouponFiltered = async ({
  lang,
  locations,
  tourType,
  paged,
}: {
  lang: string
  locations?: string
  tourType?: string
  paged?: string
}) => {
  const query = new URLSearchParams()
  query.set('lang', lang)
  query.set('acf', 'true')
  query.set('tax', 'locations,tour-type')
  query.set('limit', '9')

  if (locations) query.set('locations', locations)
  if (tourType) query.set('tour-type', tourType)
  if (paged && Number(paged) > 1) query.set('paged', paged)

  const res: ICouponRes = await fetchData({
    api: `${endpoints.promotion.coupon}?${query.toString()}`,
  })
  return res
}

const getTaxonomiesCoupon = async (lang: string) => {
  const res: ICouponTaxonomyRes = await fetchData({
    api: `${endpoints.promotion.couponTaxonomies}?lang=${lang}`,
  })
  return res
}

const getPromotionPage = async (locale: string) => {
  return await fetchData({
    api: endpoints.promotion[locale as 'en' | 'vi'],
  })
}

const getCouponSpecialOffer = async (locale: string) => {
  return await fetchData({
    api: endpoints.promotion.couponSpecialOffer,
  })
}

export default async function Promotions({
  locale,
  searchParams,
}: {
  locale: string
  searchParams?: {
    locations?: string
    ['tour-type']?: string
    paged?: string
  }
}) {
  const [coupon, taxonomies, promotionPage, couponSpecialOffer] = await Promise.all([
    getCoupon(locale),
    getTaxonomiesCoupon(locale),
    getPromotionPage(locale),
    getCouponSpecialOffer(locale),
  ])

  const hasFilters =
    !!searchParams?.locations ||
    !!searchParams?.['tour-type'] ||
    (searchParams?.paged ? Number(searchParams.paged) > 1 : false)

  const ongoingCoupon = hasFilters
    ? await getCouponFiltered({
        lang: locale,
        locations: searchParams?.locations,
        tourType: searchParams?.['tour-type'],
        paged: searchParams?.paged,
      })
    : coupon

  return (
    <main className='relative w-full h-full bg-[url("/uu-dai/bg.webp")] bg-cover bg-center'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={promotionPage?.acf}
      />

      {/* Main content */}
      <div className='relative w-full h-full'>
        <div className='xsm:py-[2.5rem] xsm:gap-0 relative w-full flex flex-col items-center gap-[5.625rem] py-[5rem]'>
          {/* Special offer just for you! */}
          <SpecialOffers data={couponSpecialOffer} />

          {/* ongoing promotion */}
          <OngoingPromotions
            data={ongoingCoupon?.data}
            taxonomies={taxonomies?.data}
            totalPages={ongoingCoupon?.totalPages}
          />
        </div>
      </div>
    </main>
  )
}
