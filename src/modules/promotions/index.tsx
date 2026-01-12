import Banner from '@/modules/promotions/_components/banner/Banner'
import SpecialOffers from '@/modules/promotions/_components/special-offer/WrapperSpecialOffers'
import OngoingPromotions from '@/modules/promotions/_components/ongoing-promotions/WrapperOngoingPromotions'
import couponService from '@/services/coupon'

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
    couponService.getCoupons({ locale }),
    couponService.getTaxonomies(locale),
    couponService.getPromotionPage(locale),
    couponService.getCouponSpecialOffer(locale),
  ])

  const hasFilters =
    !!searchParams?.locations ||
    !!searchParams?.['tour-type'] ||
    (searchParams?.paged ? Number(searchParams.paged) > 1 : false)

  const ongoingCoupon = hasFilters
    ? await couponService.getCoupons({
        locale,
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
          <SpecialOffers data={couponSpecialOffer} text1={promotionPage?.acf?.text_1}/>

          {/* ongoing promotion */}
          <OngoingPromotions
            data={ongoingCoupon?.data}
            taxonomies={taxonomies?.data}
            totalPages={ongoingCoupon?.totalPages}
            text2={promotionPage?.acf?.text_2}
          />
        </div>
      </div>
    </main>
  )
}
