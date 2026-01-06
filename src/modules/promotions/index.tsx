import Banner from '@/modules/promotions/_components/banner/Banner'
import SpecialOffers from '@/modules/promotions/_components/special-offer/SpecialOffersList'
import OngoingPromotions from '@/modules/promotions/_components/ongoing-promotions/OngoingPromotionsList'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/configs/endpoints'
import { CouponResponse, CouponTaxonomyResponse } from '@/types/coupon.type'
import Image from 'next/image'

const getCoupon = async (lang: string) => {
  const res: CouponResponse = await fetchData({
    api: `${endpoints.promotion.coupon}?lang=${lang}&acf=true&limit=9`,
  })
  return res
}

const getTaxonomiesCoupon = async (lang: string) => {
  const res: CouponTaxonomyResponse = await fetchData({
    api: `${endpoints.promotion.couponTaxonomies}?lang=${lang}`,
  })
  return res
}

export default async function Promotions({ locale }: { locale: string }) {
  const [coupon, taxonomies] = await Promise.all([getCoupon(locale), getTaxonomiesCoupon(locale)])

  return (
    <main className='relative w-full h-full bg-[url("/uu-dai/bg.webp")] bg-cover bg-center'>
      {/* Banner */}
      <Banner />

      {/* Main content */}
      <div className='relative w-full h-full'>
        <div className='xsm:py-[2.5rem] xsm:gap-[1.25rem] relative w-full flex flex-col items-center gap-[5.625rem] py-[5rem]'>
          {/* Special offer just for you! */}
          <SpecialOffers data={coupon?.data} />

          {/* ongoing promotion */}
          <OngoingPromotions
            data={coupon?.data}
            taxonomies={taxonomies?.data}
            locale={locale}
            totalPages={coupon?.totalPages}
            total={coupon?.total}
          />
        </div>
      </div>
    </main>
  )
}
