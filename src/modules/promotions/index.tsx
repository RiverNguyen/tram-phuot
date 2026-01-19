import Banner from '@/modules/promotions/_components/banner/Banner'
import SpecialOffers from '@/modules/promotions/_components/special-offer/WrapperSpecialOffers'
import OngoingPromotions from '@/modules/promotions/_components/ongoing-promotions/WrapperOngoingPromotions'
import couponService from '@/services/coupon'

export default async function Promotions({ locale }: { locale: string }) {
  const [ongoingCoupon, taxonomies, promotionPage, couponSpecialOffer] = await Promise.all([
    couponService.getCoupons({ locale }),
    couponService.getTaxonomies(locale),
    couponService.getPromotionPage(locale),
    couponService.getCouponSpecialOffer(locale),
  ])

  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={promotionPage?.acf}
      />

      {/* Main content */}
      <div className='relative w-full h-full bg-[url("/uu-dai/bg.webp")] bg-cover bg-top xsm:bg-contain'>
        <div className='xsm:py-[2.5rem] xsm:gap-0 relative w-full flex flex-col items-center gap-[5.625rem] py-[5rem]'>
          {/* Special offer just for you! */}
          <SpecialOffers data={couponSpecialOffer} text1={promotionPage?.acf?.text_1}/>

          {/* ongoing promotion */}
          <OngoingPromotions
            couponRes={ongoingCoupon}
            taxonomies={taxonomies?.data}
            locale={locale}
            text2={promotionPage?.acf?.text_2}
          />
        </div>
      </div>
    </main>
  )
}
