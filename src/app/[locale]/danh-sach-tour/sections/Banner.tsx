import Image from 'next/image'
import BreadcrumbCustom from '@/components/BreadcrumCustom'

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Tour List', href: '/danh-sach-tour' },
]

export default function Banner() {
  return (
    <div className='xsm:h-[43.25rem] relative w-full h-[36.375rem]'>
      <Image
        src='/danh-sach-tour/banner.webp'
        alt='banner'
        width={4800}
        height={1786}
        className='w-full h-auto object-cover xsm:hidden'
      />
      <Image
        src='/danh-sach-tour/banner-mb.webp'
        alt='banner mb'
        width={1125}
        height={1608}
        className='w-full h-auto object-cover sm:hidden'
      />
      {/* overlay */}
      <div className='xsm:top-[0] xsm:h-[43.25rem] absolute top-[16.8125rem] left-0 w-full h-[19.5625rem] opacity-[0.68] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(2,3,5,0.08)_13.88%,#192842_100%)] backdrop-blur-[2px]' />
      {/* content */}
      <div className='xsm:top-[34.1875rem] xsm:left-[0.9375rem] xsm:gap-[0.75rem] absolute top-[24.6875rem] left-[7.125rem] inline-flex flex-col items-start gap-[2rem]'>
        <BreadcrumbCustom
          items={breadcrumbItems}
          classNameItem='xsm:text-[0.875rem] xsm:leading-[1.3125rem] text-[rgba(255,255,255,0.60)] font-montserrat text-[1rem] leading-[1.2rem]'
          classNameLastItem='xsm:text-[0.875rem] xsm:leading-[1.3125rem] text-white font-montserrat text-[1rem] leading-[1.2rem] font-bold'
          classNameSeparator='xsm:text-[0.875rem] xsm:leading-[1.3125rem] text-[rgba(255,255,255,0.60)] font-montserrat text-[1rem] leading-[1.2rem]'
        />
        <h1 className='xsm:text-[1.875rem] xsm:leading-[2.25rem] xsm:tracking-[0.01875rem] xsm:font-normal text-white text-shadow-[0_4.702px_4.702px_rgba(0,0,0,0.50)] font-phudu text-[3rem] leading-[3.09rem] tracking-[-0.03rem] uppercase'>
          Your Next Adventure Starts Here
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
        src='/danh-sach-tour/overlay-bottom-mb.webp'
        alt='overlay bottom'
        width={1125}
        height={87}
        className='absolute top-[41.2499rem] left-0 w-full h-auto object-cover sm:hidden'
      />
    </div>
  )
}
