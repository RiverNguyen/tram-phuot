import Image from 'next/image'
import { Breadcrumb } from '@/components/shared'
import type { PageBannerACF } from '@/interface/banner.interface'

export default function Banner({ locale, data }: { locale?: string; data?: PageBannerACF }) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    {
      label: locale === 'en' ? 'Contact' : 'Liên hệ',
      href: locale === 'en' ? '/contact' : '/lien-he',
    },
  ]

  return (
    <div className='xsm:h-[34.375rem] relative h-[36.375rem] w-full overflow-hidden'>
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
      <div className='xsm:opacity-[0.68] xsm:black-blur-[2px] xsm:top-[0] xsm:h-[19.5625rem] absolute top-[14.8125rem] left-0 h-[31.25rem] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,#000_100%)]' />
      {/* content */}
      <div className='xsm:top-[24rem] xsm:left-[1rem] xsm:gap-[1rem] absolute top-[21.9375rem] left-[7.125rem] inline-flex flex-col items-start gap-[2rem]'>
        <Breadcrumb breadcrumbItems={breadcrumbItems} />
        <h1 className='xsm:w-full xsm:text-[1.875rem] xsm:leading-[1.93125rem] xsm:tracking-[0.01875rem] xsm:font-normal w-[45.375rem] font-phu-du text-[3rem] leading-[3.09rem] tracking-[0.03rem] text-white uppercase text-shadow-[0_4.702px_4.702px_rgba(0,0,0,0.50)]'>
          {data?.banner?.title}
        </h1>
      </div>
      {/* overlay bottom */}
      <Image
        src='/uu-dai/overlay-bottom.webp'
        alt='overlay bottom'
        width={4800}
        height={153}
        className='xsm:hidden absolute top-[33.25rem] left-0 h-auto w-full object-cover'
      />
      <Image
        src='/danh-sach-tour/overlay-bottom-mb.webp'
        alt='overlay bottom'
        width={1125}
        height={87}
        className='absolute top-[32.5661rem] left-0 h-auto w-full object-cover sm:hidden'
      />
    </div>
  )
}
