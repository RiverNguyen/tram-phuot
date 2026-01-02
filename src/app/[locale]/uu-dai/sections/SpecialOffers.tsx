'use client'

import { useState } from 'react'
import Image from 'next/image'
import ICCopy from '@/components/icon/ICCopy'
import { cn } from '@/lib/utils'

const SPECIAL_OFFERS = [
  {
    id: 1,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 20,
    code: 'ABCD12345',
  },
  {
    id: 2,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 5,
    code: 'ABCD12345',
  }
]

export default function SpecialOffers() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const handleCopy = async (code: string, id: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)

      // reset text sau 2s
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  return (
    <div className='xsm:gap-[1.25rem] flex flex-col items-start gap-[2.5rem] self-stretch'>
      <h2 className='xsm:w-full xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] w-[35.8125rem] text-[#2E2E2E] font-phu-du text-[2.125rem] font-medium leading-[2.3375rem]'>
        Special offer just for you!
      </h2>
      <div className='xsm:grid-cols-1 xsm:gap-[1rem] w-full grid grid-cols-3 gap-[1.25rem]'>
        {/* card */}
        {SPECIAL_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className='xsm:w-full xsm:h-[9.5625rem] xsm:drop-shadow-[0_3.026px_12.106px_rgba(0,0,0,0.12)] relative w-[28.33331rem] h-[13.5rem] drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)] rounded-[1.25rem]'
          >
            <div className='relative w-full h-full rounded-[1.25rem] overflow-hidden'>
              <Image
                src='/uu-dai/bg-card-left.webp'
                alt='bg card left'
                fill
                className='object-cover xsm:hidden'
              />
              <Image
                src='/uu-dai/bg-card-left-mb.webp'
                alt='bg card left mb'
                fill
                className='object-cover sm:hidden'
              />
              <Image
                src='/uu-dai/bg-card-right.webp'
                alt='bg card right'
                fill
                className='object-cover xsm:hidden'
              />
              <Image
                src='/uu-dai/bg-card-right-mb.webp'
                alt='bg card right mb'
                fill
                className='object-cover sm:hidden'
              />
              {/* percent */}
              <div className='xsm:top-[3.0615rem] xsm:left-[15.8416rem] xms:h-[3.875rem] absolute top-[4.0461rem] left-[20.9375rem] h-[5.25rem] flex flex-col text-white font-phu-du font-bold tracking-normal'>
                <div className='xsm:text-[1.11025rem] text-[1.46738rem] leading-[90%]'>Giảm</div>
                <div className={cn('xsm:text-[3.5rem] text-[4.69563rem] leading-[90%]', offer.discountPercent > 9 ? 'ml-[-0.9375rem]' : '')}>
                  {offer.discountPercent}%
                </div>
              </div>
              {/* line */}
              <div className='xsm:top-[1rem] xsm:left-[13.8125rem] xsm:w-[0.04731rem] xsm:h-[7.9375rem] absolute top-[1.3125rem] left-[18.25rem] w-[0.0625rem] h-[10.875rem] bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)]' />
              {/* content */}
              <div className='xsm:top-[0.8125rem] xsm:left-[0.75rem] xsm:w-[12.5625rem] xsm:h-[8.0625rem] z-[1] absolute top-[1.0625rem] left-[1rem] flex w-[16.5625rem] h-[11.3125rem] flex-col justify-between items-start'>
                <div className='xsm:gap-[0.375rem] flex flex-col items-start gap-[0.625rem] self-stretch'>
                  {/* tag */}
                  <div className='xsm:h-[1.00496rem] xsm:py-[0.28375rem] xsm:px-[0.37831rem] xsm:rounded-[0.18913rem] h-[1.25rem] flex py-[0.375rem] px-[0.5rem] items-center justify-center rounded-[0.25rem] bg-[#F56E0A] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
                    {offer.location}
                  </div>
                  {/* title */}
                  <h3 className='xsm:text-[0.875rem] xsm:leading-[1.05rem] xsm:tracking-[0.0175rem] line-clamp-1 self-stretch text-[#2E2E2E] font-phu-du text-[1.25rem] font-bold leading-[1.5rem] tracking-[0.025rem]'>
                    {offer.title}
                  </h3>
                  <div className='xsm:gap-[0.625rem] flex flex-col gap-[0.875rem] self-stretch'>
                    <div className='xsm:gap-[0.28375rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] flex items-start gap-[0.375rem] text-[#2E2E2E] font-montserrat text-[0.875rem] font-medium leading-[1.4rem] tracking-[-0.00875rem] opacity-[0.48]'>
                      <span>Ngày áp dụng:</span>
                      <span>{offer.applyDate}</span>
                    </div>
                    <div className='xsm:h-[1.13162rem] xsm:p-[0.37831rem] xsm:rounded-[0.18913rem] xsm:text-[0.5rem] xsm:leading-[0.8rem] xsm:tracking-[-0.005rem] w-fit h-[1.5rem] flex p-[0.5rem] justify-center items-center rounded-[0.25rem] bg-[#2BAB7D] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
                      {offer.benefit}
                    </div>
                  </div>
                </div>
                <div className='xsm:gap-[0.47288rem] flex flex-col items-start justify-center gap-[0.625rem]'>
                  <h4 className='xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] text-[#2E2E2E] font-montserrat text-[0.875rem] font-medium leading-[1.4rem] tracking-[-0.00875rem] opacity-[0.48]'>
                    Promotion code:
                  </h4>
                  <div className='xsm:gap-[0.56744rem] flex items-center gap-[0.75rem]'>
                    <span className='xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] max-w-[7.5rem] truncate text-[#1F4D37] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
                      {offer.code}
                    </span>
                    <button
                      type='button'
                      onClick={() => handleCopy(offer.code, offer.id)}
                      className='xsm:h-[1.04035rem] xsm:py-[0.18913rem] xsm:px-[0.37831rem] xsm:gap-[0.28375rem] xsm:rounded-[0.18913rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] shrink-0 h-[1.375rem] flex py-[0.25rem] px-[0.5rem] items-center gap-[0.375rem] rounded-[0.25rem] bg-[rgba(0,0,0,0.60)] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem] cursor-pointer'
                    >
                      <ICCopy className='size-[0.875rem] xsm:size-[0.66206rem]' />
                      {copiedId === offer.id ? 'Đã sao chép' : 'Sao chép mã'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
