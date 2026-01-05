import Banner from '@/modules/promotions/_components/banner/Banner'
import SpecialOffers from '@/modules/promotions/_components/special-offer/SpecialOffers'
import OngoingPromotions from '@/modules/promotions/_components/ongoing-promotions/OngoingPromotions'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/configs/endpoints'
import { CouponResponse } from '@/types/coupon.type'

const getCoupon = async () => {
  const res: CouponResponse = await fetchData({
    api: `${endpoints.promotion.coupon}?lang=en&acf=true`,
  })
  return res
}

export default async function page() {
  const coupon = await getCoupon()

  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner />

      {/* Main content */}
      <div className='xsm:py-[2.5rem] xsm:gap-[1.25rem] relative w-full flex flex-col items-center gap-[5.625rem] py-[5rem]'>
        {/* Special offer just for you! */}
        <SpecialOffers data={coupon?.data} />

        {/* ongoing promotion */}
        <OngoingPromotions />
      </div>
    </main>
  )
}
