import Banner from '@/modules/promotions/_components/Banner'
import SpecialOffers from '@/modules/promotions/_components/SpecialOffers'
import WrapperOngoingPromotions from '@/modules/promotions/_components/WrapperOngoingPromotions'

export default function page() {
  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner />

      {/* Main content */}
      <div className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative w-full max-w-[87.5rem] mx-auto flex flex-col items-center gap-[5.625rem] py-[5rem]'>
        {/* Special offer just for you! */}
        <SpecialOffers />

        {/* ongoing promotion */}
        <WrapperOngoingPromotions />
      </div>
    </main>
  )
}
