import Image from 'next/image'
import { Breadcrumb } from '@/components/shared'
import type { PageBannerACF } from '@/interface/banner.interface'

export default function Banner({ locale, data }: { locale?: string; data?: PageBannerACF }) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    {
      label: locale === 'en' ? 'Tour List' : 'Danh sách tour',
      href: locale === 'en' ? '/tours' : '/danh-sach-tour',
    },
  ]

  return (
    <div className='xsm:h-[43.25rem] relative h-[36.375rem] w-full'>
      <Image
        src={data?.banner?.background_pc?.url || ''}
        alt='banner'
        width={1600}
        height={582}
        priority
        className='xsm:hidden h-auto w-full object-cover'
      />
      <Image
        src={data?.banner?.background_mobile?.url || ''}
        alt='banner mb'
        width={375}
        height={692}
        priority
        className='h-auto w-full object-cover sm:hidden'
      />
      {/* overlay */}
      <div className='xsm:top-[0] xsm:h-[43.25rem] absolute top-[16.8125rem] left-0 h-[19.5625rem] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(2,3,5,0.08)_13.88%,#192842_100%)] opacity-[0.68] backdrop-blur-[2px]' />
      {/* content */}
      <div className='xsm:top-[34.1875rem] xsm:left-[0.9375rem] xsm:gap-[0.75rem] absolute top-[24.6875rem] left-[7.125rem] inline-flex flex-col items-start gap-[2rem]'>
        <Breadcrumb breadcrumbItems={breadcrumbItems} />
        <h1 className='xsm:text-[1.875rem] xsm:leading-[2.25rem] xsm:tracking-[0.01875rem] xsm:font-normal font-phu-du text-[3rem] leading-[3.09rem] tracking-[-0.03rem] text-white uppercase text-shadow-[0_4.702px_4.702px_rgba(0,0,0,0.50)]'>
          {data?.banner?.title}
        </h1>
      </div>
      {/* overlay bottom */}
      <Image
        src='/uu-dai/overlay-bottom.webp'
        alt='overlay bottom'
        width={4800}
        height={153}
        className='xsm:hidden absolute top-[33.3rem] left-0 h-auto w-full object-cover'
      />
      <Image
        src='/danh-sach-tour/overlay-bottom-mb.webp'
        alt='overlay bottom'
        width={1125}
        height={87}
        className='absolute top-[41.2499rem] left-0 h-auto w-full object-cover sm:hidden'
      />
    </div>
  )
}
