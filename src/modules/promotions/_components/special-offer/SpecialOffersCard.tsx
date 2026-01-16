'use client'
import Image from 'next/image'
import ICCopy from '@/components/icons/ICCopy'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ICoupon } from '@/interface/coupon.interface'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SpecialOffersCard({ offer }: { offer: ICoupon }) {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const t = useTranslations('ListCouponPage')
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
        {/* percent or price discount */}
        {((offer?.acf?.select === 'percent' && offer?.acf?.percent_sale) ||
          (offer?.acf?.select === 'price' && offer?.acf?.price_discount)) && (
          <div className='xsm:w-[7.1rem] absolute top-0 right-0 w-[10.08rem] h-full text-center'>
            <div className='z-1 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white font-phu-du font-bold tracking-normal'>
              <div
                className={cn(
                  'xsm:text-[1rem] text-[1.46738rem] leading-[90%]',
                  offer?.acf?.select === 'percent' ? '' : '',
                )}
              >
                {t('discount')}
              </div>
              <div className='xsm:text-[3.25rem] text-[4.69563rem] leading-[90%]'>
                {offer?.acf?.select === 'percent'
                  ? offer?.acf?.percent_sale
                  : offer?.acf?.price_discount}
                {offer?.acf?.select === 'percent' ? '%' : '$'}
              </div>

              <div className='text-[0.875rem] font-medium leading-[150%]'>OFF</div>

              <div className='xsm:w-[5.375rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
                {t('minApplication')} {offer?.acf?.minimum_total_price}$
              </div>
            </div>
          </div>
        )}
        {/* line */}
        <div className='xsm:top-[0.9358rem] xsm:left-[12.9265rem] xsm:w-[0.04425rem] xsm:h-[7.42838rem] absolute top-[1.3125rem] left-[18.25rem] w-[0.0625rem] h-[10.875rem] bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)]' />
        {/* content */}
        <div className='xsm:top-[0.6184rem] xsm:left-[0.7053rem] xsm:w-[11.75rem] xsm:h-[7.75rem] z-[1] absolute top-[1.0625rem] left-[1rem] flex w-[16.5625rem] h-[11.3125rem] flex-col justify-between items-start'>
          <div className='xsm:gap-[0.5rem] flex flex-col items-start gap-[0.625rem] self-stretch'>
            {/* tag */}
            {offer?.taxonomies?.locations?.[0] && (
              <div className='xsm:h-[0.96857rem] xsm:py-[0.26556rem] xsm:px-[0.35406rem] xsm:rounded-[0.177rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] h-[1.25rem] flex py-[0.375rem] px-[0.5rem] items-center justify-center rounded-[0.25rem] bg-[#F56E0A] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
                {offer?.taxonomies?.locations?.[0]?.name}
              </div>
            )}
            {/* title */}
            <h3 className='xsm:text-[0.875rem] xsm:leading-[1.1375rem] xsm:tracking-normal line-clamp-1 self-stretch text-[#2E2E2E] font-phu-du text-[1.25rem] font-bold leading-[1.5rem] tracking-[0.025rem]'>
              {offer?.title}
            </h3>
            <div className='xsm:gap-[0.58494rem] flex flex-col gap-[0.875rem] self-stretch'>
              {offer?.acf?.time_goes?.start && (
                <div className='whitespace-nowrap xsm:gap-[0.26556rem] xsm:text-[0.625rem] xsm:leading-[0.4375rem] xsm:tracking-[-0.00625rem] flex items-start gap-[0.375rem] text-[#2E2E2E] font-montserrat text-[0.875rem] font-medium leading-[0.625rem] tracking-[-0.00875rem] opacity-[0.48]'>
                  <span>{t('applicable')}:</span>
                  <span>
                    {offer?.acf?.time_goes?.start}{' '}
                    {offer?.acf?.time_goes?.end ? `- ${offer?.acf?.time_goes?.end}` : ''}
                  </span>
                </div>
              )}
              {offer?.acf?.for_whom && (
                <div className='xsm:h-[1.14559rem] xsm:p-[0.35406rem] xsm:rounded-[0.177rem] w-fit h-[1.5rem] flex p-[0.5rem] justify-center items-center rounded-[0.25rem] bg-[#2BAB7D]'>
                  <span className='xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] max-w-full line-clamp-1 text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem]'>
                    {offer?.acf?.for_whom}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* promotion code */}
          {offer?.acf?.code && (
            <div className='xsm:gap-[0.44256rem] flex flex-col items-start justify-center gap-[0.625rem]'>
              <h4 className='xsm:text-[0.625rem] xsm:leading-[0.4375rem] xsm:tracking-[-0.00625rem] text-[#2E2E2E] font-montserrat text-[0.875rem] font-medium leading-[0.625rem] tracking-[-0.00875rem] opacity-[0.48]'>
                {t('code')}:
              </h4>
              <div className='xsm:gap-[1.16981rem] flex items-center gap-[0.75rem]'>
                <span className='xsm:max-w-[4.375rem] xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:tracking-[-0.0075rem] max-w-[7.5rem] truncate text-[#1F4D37] font-montserrat text-[0.875rem] font-semibold leading-[1.4rem] tracking-[-0.00875rem]'>
                  {offer?.acf?.code}
                </span>
                <Tooltip open={copiedId === offer.id}>
                  <TooltipTrigger asChild>
                    <button
                      type='button'
                      onClick={() => handleCopy(offer.acf.code, offer.id)}
                      className='xsm:h-[1.40381rem] xsm:py-[0.23394rem] xsm:px-[0.35094rem] xsm:gap-[0.35094rem] xsm:rounded-[0.177rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] shrink-0 h-[1.375rem] flex py-[0.25rem] px-[0.5rem] items-center gap-[0.375rem] rounded-[0.25rem] bg-[rgba(9,37,23,0.63)] text-white font-montserrat text-[0.75rem] font-medium leading-[1.2rem] tracking-[-0.0075rem] cursor-pointer'
                    >
                      {copiedId === offer.id ? (
                        <Check className='xsm:size-[0.58088rem] size-[0.875rem]' />
                      ) : (
                        <ICCopy className='xsm:size-[0.58088rem] size-[0.875rem]' />
                      )}
                      {t('copy')}
                    </button>
                  </TooltipTrigger>

                  <TooltipContent
                    side='top'
                    className='bg-[#2BAB7D]'
                  >
                    {t('copied')}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
