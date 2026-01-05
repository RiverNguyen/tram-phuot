'use client'
import Image from 'next/image'
import ICCopy from '@/components/icons/ICCopy'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { CouponItem } from '@/types/coupon.type'

export default function SpecialOffersCard({ offer }: { offer: CouponItem }) {
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

  if (offer.acf.private) return null

  return (
    <div className='xsm:w-[20.0625rem] xsm:h-[8.94919rem] xsm:drop-shadow-[0_2.832px_11.329px_rgba(0,0,0,0.12)] shrink-0 relative w-[28.33331rem] h-[13.5rem] drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)] rounded-[1.25rem]'>
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
        <div className='xsm:top-[2.8652rem] xsm:left-[14.8254rem] xms:h-[3.625rem] absolute top-[4.0461rem] left-[20.9375rem] h-[5.25rem] flex flex-col text-white font-phu-du font-bold tracking-normal'>
          <div className='xsm:text-[1rem] text-[1.46738rem] leading-[90%]'>Giảm</div>
          <div
            className={cn(
              'xsm:text-[3.25rem] text-[4.69563rem] leading-[90%]',
              Number(offer?.acf?.percent_sale) > 9 ? 'ml-[-0.9375rem]' : '',
            )}
          >
            {offer?.acf?.percent_sale}%
          </div>
        </div>
        {/* line */}
        <div className='xsm:top-[0.9358rem] xsm:left-[12.9265rem] xsm:w-[0.04425rem] xsm:h-[7.42838rem] absolute top-[1.3125rem] left-[18.25rem] w-[0.0625rem] h-[10.875rem] bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)]' />
        {/* content */}
        <div className='xsm:top-[0.6184rem] xsm:left-[0.7053rem] xsm:w-[11.75rem] xsm:h-[7.75rem] z-[1] absolute top-[1.0625rem] left-[1rem] flex w-[16.5625rem] h-[11.3125rem] flex-col justify-between items-start'>
          <div className='xsm:gap-[0.5rem] flex flex-col items-start gap-[0.625rem] self-stretch'>
            {/* tag */}
            <div className='xsm:h-[0.96857rem] xsm:py-[0.26556rem] xsm:px-[0.35406rem] xsm:rounded-[0.177rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] h-[1.25rem] flex py-[0.375rem] px-[0.5rem] items-center justify-center rounded-[0.25rem] bg-[#F56E0A] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
              {offer?.taxonomies?.locations[0]?.name}
            </div>
            {/* title */}
            <h3 className='xsm:text-[0.875rem] xsm:leading-[0.625rem] xsm:tracking-normal line-clamp-1 self-stretch text-[#2E2E2E] font-phu-du text-[1.25rem] font-bold leading-[1.5rem] tracking-[0.025rem]'>
              {offer?.title}
            </h3>
            <div className='xsm:gap-[0.625rem] flex flex-col gap-[0.875rem] self-stretch'>
              <div className='xsm:gap-[0.26556rem] xsm:text-[0.625rem] xsm:leading-[0.4375rem] xsm:tracking-[-0.00625rem] flex items-start gap-[0.375rem] text-[#2E2E2E] font-montserrat text-[0.875rem] font-medium leading-[1.4rem] tracking-[-0.00875rem] opacity-[0.48]'>
                <span>Ngày áp dụng:</span>
                <span>{offer?.acf?.booking_time?.start}</span>
              </div>
              <div className='xsm:h-[1.14559rem] xsm:p-[0.35406rem] xsm:rounded-[0.177rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] w-fit h-[1.5rem] flex p-[0.5rem] justify-center items-center rounded-[0.25rem] bg-[#2BAB7D] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
                {offer?.acf?.for_whom}
              </div>
            </div>
          </div>
          <div className='xsm:gap-[0.44256rem] flex flex-col items-start justify-center gap-[0.625rem]'>
            <h4 className='xsm:text-[0.625rem] xsm:leading-[0.4375rem] xsm:tracking-[-0.00625rem] text-[#2E2E2E] font-montserrat text-[0.875rem] font-medium leading-[1.4rem] tracking-[-0.00875rem] opacity-[0.48]'>
              Promotion code:
            </h4>
            <div className='xsm:gap-[1.16981rem] flex items-center gap-[0.75rem]'>
              <span className='xsm:max-w-[4.375rem] xsm:text-[0.75rem] xsm:leading-[0.5rem] xsm:tracking-[-0.0075rem] max-w-[7.5rem] truncate text-[#1F4D37] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
                {offer?.acf?.code}
              </span>
              <button
                type='button'
                onClick={() => handleCopy(offer?.acf?.code, offer?.id)}
                className='xsm:h-[1.40381rem] xsm:py-[0.23394rem] xsm:px-[0.35094rem] xsm:gap-[0.35094rem] xsm:rounded-[0.177rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] shrink-0 h-[1.375rem] flex py-[0.25rem] px-[0.5rem] items-center gap-[0.375rem] rounded-[0.25rem] bg-[rgba(0,0,0,0.60)] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem] cursor-pointer'
              >
                <ICCopy className='xsm:size-[0.58088rem] size-[0.875rem]' />
                {copiedId === offer?.id ? 'Đã sao chép' : 'Sao chép mã'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
