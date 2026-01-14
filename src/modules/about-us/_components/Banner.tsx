import Image from 'next/image'
import { Breadcrumb } from '@/components/shared'
import type { PageBannerACF } from '@/interface/banner.interface'

export default function Banner({ locale, data }: { locale?: string; data?: PageBannerACF }) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    {
      label: locale === 'en' ? 'About us' : 'Về chúng tôi',
      href: locale === 'en' ? '/about-us' : '/ve-chung-toi',
    },
  ]

  return (
    <div className='xsm:h-[43.25rem] relative h-[54.375rem] w-full'>
      <Image
        src={data?.banner?.background_pc?.url || '/about-us/d-banner-pc.png'}
        alt='banner'
        width={1600}
        height={582}
        priority
        className='xsm:hidden h-[52.1875rem] w-full object-cover'
      />
      <Image
        src={data?.banner?.background_mobile?.url || '/about-us/d-banner-mobile.png'}
        alt='banner mb'
        width={375}
        height={692}
        priority
        className='h-auto w-full object-cover sm:hidden'
      />
      {/* overlay */}
      {/*<div className='xsm:top-[0] xsm:h-[43.25rem] absolute top-[16.8125rem] left-0 h-[19.5625rem] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(2,3,5,0.08)_13.88%,#192842_100%)] opacity-[0.68] backdrop-blur-[2px]' />*/}
      {/* content */}
      <div className='xsm:top-[7.25rem] xsm:left-[1rem] xsm:gap-[0.75rem] absolute top-[10.25rem] left-[6.25rem] inline-flex flex-col items-start gap-[2rem] w-[46.875rem] xsm:w-[21.4375rem]'>
        <Breadcrumb breadcrumbItems={breadcrumbItems} />
        <h1 className='xsm:text-[1.875rem] xsm:leading-[2.25rem] xsm:tracking-[0.01875rem] xsm:font-normal font-phu-du text-[3rem] leading-[3.09rem] tracking-[-0.03rem] text-white uppercase text-shadow-[0_4.702px_4.702px_rgba(0,0,0,0.50)] line-clamp-4'>
          {data?.banner?.title}
        </h1>
      </div>
      {/* overlay bottom */}
      <div className='xsm:hidden w-[104.67619rem] h-[36.85738rem] absolute bottom-[-4.04rem] left-0 z-4'>
        <Image
          src={'/about-us/d-stock-2.webp'}
          alt='overview-stock'
          fill
          className='object-cover w-full h-full rotate-[-1.79deg] pointer-events-none'
        />
      </div>
      <Image
        src={'/about-us/journey/d-paper.webp'}
        alt='overview-paper'
        width={1440}
        height={500}
        className='xsm:hidden w-auto h-[15.1875rem] object-cover absolute bottom-[4.36rem] left-0 z-10 pointer-events-none '
      />
    </div>
  )
}
