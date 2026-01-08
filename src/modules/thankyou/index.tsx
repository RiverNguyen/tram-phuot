'use client'

import BrandButton2 from '@/components/shared/BrandButton2'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function ThankYou() {
  const t = useTranslations('ThankYou')

  return (
    <div className='relative w-full h-full flex items-center justify-center min-h-screen overflow-hidden bg-[url("/uu-dai/bg.webp")] bg-cover bg-center'>
      <div className='xsm:h-[50.75rem] relative h-[50.6875rem] w-full'>
        <Image
          src='/thankyou/d-thankyou_bg.webp'
          alt=''
          width={1600}
          height={796}
          priority
          className='xsm:hidden absolute bottom-0 left-0 h-auto w-full object-cover z-[4]'
        />
        <Image
          src='/thankyou/d-thankyou_people.webp'
          alt=''
          width={1601}
          height={356}
          priority
          className='xsm:hidden absolute bottom-0 left-0 h-auto w-full object-cover z-[5]'
        />
        <Image
          src='/thankyou/d-thankyou_bg-left.webp'
          alt=''
          width={375}
          height={507}
          priority
          className='xsm:hidden absolute top-[4.5rem] left-0 w-auto h-[40.0625rem] object-cover opacity-[0.4]'
        />
        <Image
          src='/thankyou/d-thankyou-bg-right.webp'
          alt=''
          width={375}
          height={507}
          priority
          className='xsm:hidden absolute top-[5rem] right-0 w-auto h-[39.43231rem] object-cover opacity-[0.4]'
        />
        <div className='xsm:top-[15.68rem] xsm:w-[19.3125rem] z-6 absolute top-[12.13rem] left-1/2 inline-flex w-[48.0625rem] -translate-x-1/2 flex-col items-center gap-[1rem]'>
          <h2 className='xsm:text-[0.875rem] xsm:leading-[1.05rem] xsm:tracking-[0.00875rem] font-montserrat text-center text-[1rem] leading-[1.6rem] tracking-[0.04rem] text-[rgba(46,46,46,0.75)]'>
            {t('subtitle')}
          </h2>
          <h1 className='xsm:text-[2.125rem] xsm:leading-[2.3375rem] font-phu-du bg-[linear-gradient(230deg,#03328C_5.76%,#29C486_100.15%)] bg-clip-text text-center text-[3rem] leading-[3.6rem] font-bold text-transparent'>
            {t('title')}
          </h1>
          <p className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[0.03rem] font-montserrat text-center text-[0.875rem] leading-[1.3125rem] tracking-[0.04rem] text-[rgba(46,46,46,0.75)]'>
            {t('desc')}
          </p>
          <BrandButton2
            href='/'
            className='xsm:w-[10.4375rem] xsm:h-[2.45925rem] h-[3rem]'
          >
            {t('button')}
          </BrandButton2>
        </div>

        {/* bg mb */}
        <Image
          src='/thankyou/d-thankyou_bg_mb.webp'
          alt=''
          width={375}
          height={507}
          priority
          className='absolute bottom-0 left-0 h-auto w-full object-cover sm:hidden'
        />
        <Image
          src='/thankyou/d-thankyou_people_mb.webp'
          alt=''
          width={375}
          height={507}
          priority
          className='absolute bottom-0 left-0 h-auto w-full object-cover sm:hidden'
        />
      </div>
    </div>
  )
}
