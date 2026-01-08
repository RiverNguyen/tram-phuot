import Image from 'next/image'
import BrandButton from '@/components/shared/BrandButton'

export default function FeturedNews() {
  return (
    <div className='xsm:gap-[1.25rem] flex w-full flex-col gap-[2rem]'>
      <h2 className='xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du text-[3rem] leading-[3rem] font-medium text-[#2E2E2E] uppercase'>
        Fetured News
      </h2>
      {/* featured news card */}
      <div className='xsm:flex-col xsm:gap-[1.25rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] flex items-center gap-[2.5rem]'>
        <Image
          src='/blogs/d-blog-item-1.webp'
          alt='featured news'
          width={799}
          height={478}
          className='xsm:h-[15.3125rem] xsm:rounded-none h-[29.875rem] flex-1 rounded-[1.25rem]'
        />
        <div className='xsm:w-full xsm:px-[0.875rem] xsm:pt-0 xsm:pb-[1.25rem] w-[35.0625rem] py-[1.75rem]'>
          <div className='xsm:mb-[1rem] mb-[2.5rem]'>
            {/* taxonomies and date */}
            <div className='xsm: font-montserrat flex items-center gap-[0.625rem] text-[0.875rem] leading-[0.625rem] font-semibold tracking-[-0.00875rem]'>
              <span className='text-[#F56E0A]'>Featured</span>
              <span className='size-[0.25rem] rounded-full bg-[#3B3943]'></span>
              <span className='text-[rgba(46,46,46,0.60)]'>12/01/2026</span>
            </div>
            {/* title */}
            <h3 className='xsm:mt-[0.625rem] xsm:mb-[0.75rem] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du my-[1.25rem] line-clamp-3 text-[2.125rem] leading-[2.3375rem] font-medium text-[#1F4D37]'>
              The Secretary Hau A Lenh attended the memorial service for Heroes and Martyrs.
            </h3>
            {/* description */}
            <p className='xsm:line-clamp-4 xsm:text-[0.875rem] xsm:leading-[1.3125rem] font-montserrat line-clamp-8 text-[1rem] leading-[1.5rem] text-[rgba(46,46,46,0.75)]'>
              BHG - On 26 April, the People's Council of Ha Giang Province issued Resolution
              159/NQ-HĐND regarding the approval of the plan to reorganise the administrative units
              of Tuyen Quang Province and Ha Giang Province. Below is the full text of the
              Resolution.
            </p>
          </div>

          {/* desktop button */}
          <BrandButton
            variant='blueGradient'
            classNameButtonContainer='xsm:hidden w-[9.0625rem] px-[1rem] py-[1.0625rem]'
          >
            See detail
          </BrandButton>
          {/* mobile button */}
          <button className='font-montserrat text-[0.875rem] leading-[1.1.05rem] tracking-[0.00875rem] text-[rgba(46,46,46,0.75)] sm:hidden'>
            See detail →
          </button>
        </div>
      </div>
    </div>
  )
}
