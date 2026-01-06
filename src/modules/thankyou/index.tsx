'use client'

import { BrandButton } from '@/components/shared'
import useIsMobile from '@/hooks/use-is-mobile'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function ThankYou() {
  const { isLoading, isMobile } = useIsMobile()
  const t = useTranslations('ThankYou')

  return (
    <div className='relative bg-[#FDF4ED] w-full overflow-hidden xsm:-mb-[3.25rem]'>
      {!isLoading && !isMobile && (
        <Image
          src='/thankyou/d-thankyou_deco_left.webp'
          alt=''
          width={956}
          height={1029}
          className='absolute top-[9.87rem] left-0 h-[42.87231rem] pointer-events-none select-none w-auto'
        />
      )}
      {!isLoading && !isMobile && (
        <Image
          src='/thankyou/d-thankyou_deco_right.webp'
          alt=''
          width={1170}
          height={1310}
          className='absolute top-[7.44rem] right-0 h-[42.87231rem] pointer-events-none select-none w-auto'
        />
      )}
      <div className='relative max-w-[81.25rem] pt-[10.75rem] pb-[5.5rem] xsm:pt-[7.5rem] xsm:pb-0 w-full mx-auto text-center z-1'>
        <h1 className='font-phu-du text-[2rem] font-medium leading-[2rem] text-[#2E2E2E] mb-[2.5rem] xsm:mb-[1.5rem] xsm:text-[1.25rem] xsm:leading-[1.375rem] xsm:max-w-[14.0625rem] mx-auto'>
          {t('title')}
        </h1>
        <div className='relative sm:p-4 sm:rounded-[0.75rem] sm:bg-white w-full sm:h-[30.1875rem] sm:pt-[5.91rem] overflow-hidden'>
          <div className='relative space-y-[1.5rem] text-center z-1'>
            <h2 className='font-phu-du text-[2.25rem] font-medium leading-[2.7rem] bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)] bg-clip-text text-transparent xsm:max-w-[14.5625rem] mx-auto xsm:text-[2rem] xsm:leading-[2rem] xsm:mb-[1.25rem]'>
              {t('subtitle')}
            </h2>
            <p className='font-montserrat text-[0.875rem] mx-auto leading-[1.3125rem] text-[rgba(46,46,46,0.75)] max-w-[22.25rem] text-center xsm:max-w-[16.625rem]'>
              {t('desc')}
            </p>
            <div className='xsm:px-4'>
              <BrandButton
                href='/'
                variant='blueGradient'
                classNameButtonContainer='w-[12.875rem] xsm:w-full mx-auto'
              >
                {t('button')}
              </BrandButton>
            </div>
          </div>
          {!isLoading &&
            (isMobile ? (
              <Image
                src='/thankyou/d-thankyou_image_mobile.webp'
                alt=''
                width={563}
                height={402}
                className='w-full h-auto rounded-[0_0_0.5rem_0.5rem] mask-[linear-gradient(183deg,rgba(196,196,196,0.00)_-14.69%,#B8B8B8_52.78%,rgba(94,94,94,0.00)_97.94%)] mask-no-repeat mask-alpha'
              />
            ) : (
              <Image
                src='/thankyou/d-thankyou_image.webp'
                alt=''
                width={1943}
                height={483}
                className='absolute bottom-0 left-0 right-0 h-[20.125rem] w-full object-cover mask-[linear-gradient(180deg,rgba(196,196,196,0.00)_0%,#B8B8B8_59.9%,#5E5E5E_100%)] mask-no-repeat mask-alpha'
              />
            ))}
        </div>
      </div>
    </div>
  )
}
