import Banner from './sections/banner/Banner'
import SpecialOffers from './sections/special-offer/SpecialOffers'
import OngoingPromotions from './sections/ongoing-promotions/OngoingPromotions'

export default function page() {
  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner />

      {/* Main content */}
      <div className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative w-full flex flex-col items-center gap-[5.625rem] py-[5rem]'>
        {/* Special offer just for you! */}
        <SpecialOffers />

        {/* ongoing promotion */}
        <OngoingPromotions />
      </div>
    </main>
  )
}
