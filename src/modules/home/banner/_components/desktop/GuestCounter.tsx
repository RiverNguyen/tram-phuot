'use client'

import { ICChevron } from '@/components/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

interface GuestCounterProps {
  adults: number
  children: number
  onAdultsChange: (value: number) => void
  onChildrenChange: (value: number) => void
}

export const GuestCounter = ({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
}: GuestCounterProps) => {
  const t = useTranslations('HomePage.banner')
  const locale = useLocale()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex items-end space-x-4 cursor-pointer',
            locale === 'vi' ? 'ml-1' : 'ml-[1.375rem]',
          )}
        >
          <div className='space-y-1'>
            <p className='text-[#2e2e2e] text-[0.875rem] leading-[1.6]'>{t('numberOfGuests')}</p>
            <div className='flex items-center space-x-2'>
              <p className='text-[2.125rem] font-medium leading-[0.9] font-phu-du text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
                {(adults + children).toString().padStart(2, '0')}
              </p>
              <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem] bg-transparent'>
                {adults} {adults === 1 ? t('adult') : t('adults')}
                {children > 0 && `, ${children} ${children === 1 ? t('child') : t('children')}`}
              </p>
            </div>
          </div>
          <ICChevron className='size-4 text-black opacity-24' />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className='w-[14rem] py-[0.9375rem] ml-[-2rem] rounded-[0.25rem]'
        side='bottom'
        align='start'
      >
        <div className='space-y-6'>
          {/* ADULTS Counter */}
          <div className='space-y-2'>
            <p className='text-[#2e2e2e] text-[0.875rem] font-phu-du font-bold leading-[1.3]'>
              {adults === 1 ? t('adult') : t('adults')}
            </p>
            <div className='flex items-center justify-between bg-[#f8f8f8] rounded-[3.5625rem] p-2'>
              <button
                onClick={() => onAdultsChange(Math.max(0, adults - 1))}
                className='size-[1.75rem] rounded-full bg-white border border-[#ddd] flex items-center justify-center text-[#2e2e2e] hover:bg-gray-50 transition-colors'
                aria-label='Decrease adults'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  className='size-[0.875rem]'
                >
                  <path
                    d='M2.91797 7H11.0846'
                    stroke='#2E2E2E'
                    strokeWidth='1.75'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <span className='text-[#2e2e2e] font-phu-du font-bold leading-[1.1]'>{adults}</span>
              <button
                onClick={() => onAdultsChange(adults + 1)}
                className='size-[1.75rem] rounded-full bg-white border border-[#ddd] flex items-center justify-center text-[#2e2e2e] hover:bg-gray-50 transition-colors'
                aria-label='Increase adults'
              >
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-[0.875rem]'
                >
                  <path
                    d='M3.5 7H10.5'
                    stroke='#2E2E2E'
                    strokeWidth='1.3125'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7 10.5V3.5'
                    stroke='#2E2E2E'
                    strokeWidth='1.3125'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* CHILD Counter */}
          <div className='space-y-2'>
            <p className='text-[#2e2e2e] text-[0.875rem] font-phu-du font-bold leading-[1.3]'>
              {t('children')}
            </p>
            <div className='flex items-center justify-between bg-[#f8f8f8] rounded-[3.5625rem] p-2'>
              <button
                onClick={() => onChildrenChange(Math.max(0, children - 1))}
                className='size-[1.75rem] rounded-full bg-white border border-[#ddd] flex items-center justify-center text-[#2e2e2e] hover:bg-gray-50 transition-colors'
                aria-label='Decrease children'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  className='size-[0.875rem]'
                >
                  <path
                    d='M2.91797 7H11.0846'
                    stroke='#2E2E2E'
                    strokeWidth='1.75'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <span className='text-[#2e2e2e] font-phu-du font-bold leading-[1.1]'>{children}</span>
              <button
                onClick={() => onChildrenChange(children + 1)}
                className='size-[1.75rem] rounded-full bg-white border border-[#ddd] flex items-center justify-center text-[#2e2e2e] hover:bg-gray-50 transition-colors cursor-pointer'
                aria-label='Increase children'
              >
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-[0.875rem]'
                >
                  <path
                    d='M3.5 7H10.5'
                    stroke='#2E2E2E'
                    strokeWidth='1.3125'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7 10.5V3.5'
                    stroke='#2E2E2E'
                    strokeWidth='1.3125'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
