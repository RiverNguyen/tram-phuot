import Image from 'next/image'
import BreadcrumbCustom from '@/components/BreadcrumCustom'

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Promotions', href: '/uu-dai' },
]

export default function Banner() {
  return (
    <div className='xsm:h-[33.875rem] relative w-full h-[36.375rem]'>
      <Image
        src='/uu-dai/banner.webp'
        alt='banner'
        width={4800}
        height={1786}
        className='w-full h-auto object-cover xsm:hidden'
      />
      <Image
        src='/uu-dai/banner-mb.webp'
        alt='banner mb'
        width={1125}
        height={1608}
        className='w-full h-auto object-cover sm:hidden'
      />
      {/* overlay */}
      <div className='xsm:top-[14.8125rem] xsm:h-[19.5625rem] absolute top-[12.375rem] left-0 w-full h-[24rem] opacity-[0.68] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(2,3,5,0.08)_13.88%,#192842_100%)] backdrop-blur-[2px]' />
      {/* content */}
      <div className='xsm:top-[27.4375rem] xsm:left-[1rem] xsm:gap-[1rem] absolute top-[24.6875rem] left-[7.125rem] inline-flex flex-col items-start gap-[2rem]'>
        <BreadcrumbCustom
          items={breadcrumbItems}
          classNameItem='xsm:text-[0.875rem] xsm:leading-[1.3125rem] text-[rgba(255,255,255,0.60)] font-montserrat text-[1rem] leading-[1.2rem]'
          classNameLastItem='xsm:text-[0.875rem] xsm:leading-[1.3125rem] text-white font-montserrat text-[1rem] leading-[1.2rem] font-bold'
          classNameSeparator='xsm:text-[0.875rem] xsm:leading-[1.3125rem] text-[rgba(255,255,255,0.60)] font-montserrat text-[1rem] leading-[1.2rem]'
        />
        <h1 className='xsm:text-[1.25rem] xsm:leading-[1.375rem] xsm:tracking-normal xsm:font-medium text-white text-shadow-[0_4.702px_4.702px_rgba(0,0,0,0.50)] font-phu-du text-[3rem] leading-[3.09rem] tracking-[-0.03rem] uppercase'>
          Make Every Trip More Affordable
        </h1>
      </div>
      {/* overlay bottom */}
      <Image
        src='/uu-dai/overlay-bottom.webp'
        alt='overlay bottom'
        width={4800}
        height={153}
        className='absolute top-[33.25rem] left-0 w-full h-auto object-cover xsm:hidden'
      />
      <Image
        src='/uu-dai/overlay-bottom-mb.webp'
        alt='overlay bottom'
        width={1125}
        height={87}
        className='absolute top-[32.5661rem] left-0 w-full h-auto object-cover sm:hidden'
      />
    </div>
  )
}
