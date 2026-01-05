'use client'
import BrandButton2 from '@/components/shared/BrandButton2'
import useIsMobile from '@/hooks/use-is-mobile'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function NotFound() {
  const { isLoading, isMobile } = useIsMobile()
  const t = useTranslations('NotFound')

  return (
    <div className='relative bg-[#FDF4ED] h-screen w-full flex items-center justify-center overflow-hidden'>
      {!isLoading &&
        (isMobile ? (
          <Image
            src='/notfound/notfound_bg_mobile.webp'
            alt=''
            width={563}
            height={721}
            className='absolute bottom-0 left-0 right-0 w-full h-[30.19663rem] mask-[linear-gradient(178deg,rgba(196,196,196,0.00)_5.08%,rgba(196,196,196,0.12)_49.96%,#C4C4C4_86.5%,#C4C4C4_95.74%,rgba(93,93,93,0.00)_106.61%)] mask-no-repeat mask-alpha'
          />
        ) : (
          <Image
            src='/notfound/notfound_bg.webp'
            alt=''
            width={2400}
            height={1079}
            className='absolute bottom-[-2rem] left-0 right-0 w-full h-[49.75rem] mask-[linear-gradient(178deg,rgba(196,196,196,0.00)_5.08%,rgba(196,196,196,0.12)_49.96%,#C4C4C4_86.5%,#C4C4C4_95.74%,rgba(93,93,93,0.00)_106.61%)] mask-no-repeat mask-alpha'
          />
        ))}
      {!isLoading &&
        (isMobile ? (
          <Image
            src='/notfound/notfound_deco_mobile.webp'
            alt=''
            width={563}
            height={225}
            className='absolute bottom-0 left-0 right-0 h-[9.51769rem] w-full z-1'
          />
        ) : (
          <Image
            src='/notfound/notfound_deco.webp'
            alt=''
            width={2399}
            height={366}
            className='absolute bottom-0 left-0 right-0 h-[15.5625rem] w-full z-1'
          />
        ))}

      <div className='relative flex flex-col items-center space-y-4 max-w-[48.0625rem] mx-auto xsm:max-w-full pb-[9rem] xsm:pb-[5rem] z-2'>
        <span className='inline-block font-montserrat text-[1rem] leading-[1.5rem] tracking-[0.04rem] uppercase text-[rgba(46,46,46,0.75)] xsm:text-[0.875rem] xsm:leading-[1.05rem] xsm:tracking-[0.00875rem]'>
          {t('error')}
        </span>
        <Image
          src='/notfound/404.webp'
          alt=''
          width={425}
          height={199}
          className='w-[13.375rem] h-auto xsm:w-[6.5rem]'
        />
        <h2 className='font-phu-du text-[3rem] font-medium leading-[3.6rem] text-center uppercase text-[#2E2E2E] xsm:text-[1.5rem] xsm:font-bold xsm:leading-[1.65rem]'>
          {t('title')}
        </h2>
        <p className='font-montserrat text-[0.875rem] leading-[1.3125rem] text-[rgba(46,46,46,0.75)] max-w-[28.8125rem] mx-auto text-center xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[0.03rem] xsm:max-w-[20rem]'>
          {t('desc')}
        </p>
        <BrandButton2
          href='/'
          className='h-[3rem] xsm:h-[2.45925rem] xsm:rounded-[0.625rem] xsm:w-[10.4375rem] xsm:text-[0.75rem] xsm:text-white xsm:leading-[0.9rem]'
        >
          {t('button')}
        </BrandButton2>
      </div>
    </div>
  )
}
