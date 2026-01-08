'use client'
import BrandButton2 from '@/components/shared/BrandButton2'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#FDF4ED]'>
      <Image
        src='/notfound/d-notfound_bg_mobile.webp'
        alt=''
        width={563}
        height={721}
        className='absolute right-0 bottom-0 left-0 h-[30.19663rem] w-full mask-[linear-gradient(178deg,rgba(196,196,196,0.00)_5.08%,rgba(196,196,196,0.12)_49.96%,#C4C4C4_86.5%,#C4C4C4_95.74%,rgba(93,93,93,0.00)_106.61%)] mask-alpha mask-no-repeat sm:hidden'
      />
      <Image
        src='/notfound/d-notfound_bg.webp'
        alt=''
        width={2400}
        height={1079}
        className='xsm:hidden absolute right-0 bottom-[-2rem] left-0 h-[49.75rem] w-full mask-[linear-gradient(178deg,rgba(196,196,196,0.00)_5.08%,rgba(196,196,196,0.12)_49.96%,#C4C4C4_86.5%,#C4C4C4_95.74%,rgba(93,93,93,0.00)_106.61%)] mask-alpha mask-no-repeat'
      />

      <Image
        src='/notfound/d-notfound_deco_mobile.webp'
        alt=''
        width={563}
        height={225}
        className='absolute right-0 bottom-0 left-0 z-1 h-[9.51769rem] w-full sm:hidden'
      />
      <Image
        src='/notfound/d-notfound_deco.webp'
        alt=''
        width={2399}
        height={366}
        className='xsm:hidden absolute right-0 bottom-0 left-0 z-1 h-[15.5625rem] w-full'
      />

      <div className='xsm:max-w-full xsm:pb-[5rem] relative z-2 mx-auto flex max-w-[48.0625rem] flex-col items-center space-y-4 pb-[9rem]'>
        <span className='font-montserrat xsm:text-[0.875rem] xsm:leading-[1.05rem] xsm:tracking-[0.00875rem] inline-block text-[1rem] leading-[1.5rem] tracking-[0.04rem] text-[rgba(46,46,46,0.75)] uppercase'>
          {t('error')}
        </span>
        <Image
          src='/notfound/d-404.webp'
          alt=''
          width={425}
          height={199}
          className='xsm:w-[6.5rem] h-auto w-[13.375rem]'
        />
        <h2 className='font-phu-du xsm:text-[1.5rem] xsm:font-bold xsm:leading-[1.65rem] text-center text-[3rem] leading-[3.6rem] font-medium text-[#2E2E2E] uppercase'>
          {t('title')}
        </h2>
        <p className='font-montserrat xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[0.03rem] xsm:max-w-[20rem] mx-auto max-w-[28.8125rem] text-center text-[0.875rem] leading-[1.3125rem] text-[rgba(46,46,46,0.75)]'>
          {t('desc')}
        </p>
        <BrandButton2
          href='/'
          className='xsm:h-[2.45925rem] xsm:rounded-[0.625rem] xsm:w-[10.4375rem] xsm:text-[0.75rem] xsm:text-white xsm:leading-[0.9rem] h-[3rem]'
        >
          {t('button')}
        </BrandButton2>
      </div>
    </div>
  )
}
