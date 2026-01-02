import ICElipse from '@/components/icon/ICElipse'
import Banner from './sections/Banner'
import TourList from './sections/TourList'

export default function page() {
  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner />

      {/* Main content */}
      <div className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative w-full h-full max-w-[87.5rem] mx-auto flex flex-col items-center gap-[3.75rem] pt-[5rem] pb-[3.75rem]'>
        {/* Tour list */}
        <TourList />
        {/* pagination */}
        <div className='flex items-center gap-[0.625rem]'>
          <div className='flex items-center justify-center size-[2rem] rounded-full bg-[rgba(4,52,36,0.10)] text-[#043424] font-montserrat text-[0.875rem] leading-[1.3125rem] hover:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] hover:text-white transition-all duration-300 cursor-pointer'>
            1
          </div>
          <div className='flex items-center justify-center size-[2rem] rounded-full bg-[rgba(4,52,36,0.10)] text-[#043424] font-montserrat text-[0.875rem] leading-[1.3125rem] hover:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] hover:text-white transition-all duration-300 cursor-pointer'>
            2
          </div>
          <div className='flex gap-[0.33331rem]'>
            <ICElipse className='size-[0.25rem] text-[#043424]' />
            <ICElipse className='size-[0.25rem] text-[#043424]' />
            <ICElipse className='size-[0.25rem] text-[#043424]' />
          </div>
          <div className='flex items-center justify-center size-[2rem] rounded-full bg-[rgba(4,52,36,0.10)] text-[#043424] font-montserrat text-[0.875rem] leading-[1.3125rem] hover:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] hover:text-white transition-all duration-300 cursor-pointer'>
            10
          </div>
        </div>
      </div>
    </main>
  )
}
