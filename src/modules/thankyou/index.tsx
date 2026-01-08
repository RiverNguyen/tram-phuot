'use client'

import { BrandButton } from '@/components/shared'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function ThankYou() {
  const t = useTranslations('ThankYou')

  return (
    <div className='xsm:-mb-[3.25rem] relative w-full overflow-hidden bg-[#FDF4ED]'>
      <Image
        src='/thankyou/d-thankyou_deco_left.webp'
        alt=''
        width={956}
        height={1029}
        className='xsm:hidden pointer-events-none absolute top-[9.87rem] left-0 h-[42.87231rem] w-auto select-none'
      />
      <Image
        src='/thankyou/d-thankyou_deco_right.webp'
        alt=''
        width={1170}
        height={1310}
        className='xsm:hidden pointer-events-none absolute top-[7.44rem] right-0 h-[42.87231rem] w-auto select-none'
      />
      <div className='xsm:pt-[7.5rem] xsm:pb-0 relative z-1 mx-auto w-full max-w-[81.25rem] pt-[10.75rem] pb-[5.5rem] text-center'>
        <h1 className='font-phu-du xsm:mb-[1.5rem] xsm:text-[1.25rem] xsm:leading-[1.375rem] xsm:max-w-[14.0625rem] mx-auto mb-[2.5rem] text-[2rem] leading-[2rem] font-medium text-[#2E2E2E]'>
          {t('title')}
        </h1>
        <div className='relative w-full overflow-hidden sm:h-[30.1875rem] sm:rounded-[0.75rem] sm:bg-white sm:p-4 sm:pt-[5.91rem]'>
          <div className='relative z-1 space-y-[1.5rem] text-center'>
            <h2 className='font-phu-du xsm:max-w-[14.5625rem] xsm:text-[2rem] xsm:leading-[2rem] xsm:mb-[1.25rem] mx-auto bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)] bg-clip-text text-[2.25rem] leading-[2.7rem] font-medium text-transparent'>
              {t('subtitle')}
            </h2>
            <p className='font-montserrat xsm:max-w-[16.625rem] mx-auto max-w-[22.25rem] text-center text-[0.875rem] leading-[1.3125rem] text-[rgba(46,46,46,0.75)]'>
              {t('desc')}
            </p>
            <div className='xsm:px-4'>
              <BrandButton
                type={{
                  variant: 'link',
                  href: '/',
                }}
                variant='blueGradient'
                classNameButtonContainer='w-[12.875rem] xsm:w-full mx-auto'
              >
                {t('button')}
              </BrandButton>
            </div>
          </div>

          <Image
            src='/thankyou/d-thankyou_image_mobile.webp'
            alt=''
            width={563}
            height={402}
            className='h-auto w-full rounded-[0_0_0.5rem_0.5rem] mask-[linear-gradient(183deg,rgba(196,196,196,0.00)_-14.69%,#B8B8B8_52.78%,rgba(94,94,94,0.00)_97.94%)] mask-alpha mask-no-repeat sm:hidden'
          />
          <Image
            src='/thankyou/d-thankyou_image.webp'
            alt=''
            width={1943}
            height={483}
            className='xsm:hidden absolute right-0 bottom-0 left-0 h-[20.125rem] w-full mask-[linear-gradient(180deg,rgba(196,196,196,0.00)_0%,#B8B8B8_59.9%,#5E5E5E_100%)] mask-alpha mask-no-repeat object-cover'
          />
        </div>
      </div>
    </div>
  )
}
