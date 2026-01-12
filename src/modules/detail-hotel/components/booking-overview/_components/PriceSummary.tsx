'use client'

import { useTranslations } from 'next-intl'

type PriceSummaryProps = {
  provisionalAmount: number
  voucherDiscount: number
  totalAmount: number
  formatUSD: (amount: number) => string
}

export default function PriceSummary({
  provisionalAmount,
  voucherDiscount,
  totalAmount,
  formatUSD,
}: PriceSummaryProps) {
  const t = useTranslations('DetailHotelPage')
  return (
    <div className='space-y-4 pt-2'>
      <div className='flex items-center justify-between'>
        <p className='text-[#2E2E2E]/75 text-[0.875rem] leading-[1.2] tracking-[0.00875rem]'>
          {t('textProvisional')}
        </p>
        <p className='text-[#2E2E2E]/75 text-[0.875rem] leading-[1.2] tracking-[0.00875rem]'>
          {formatUSD(provisionalAmount)} USD
        </p>
      </div>
      {voucherDiscount > 0 && (
        <>
          <div className='flex items-center justify-between'>
            <p className='text-[#2E2E2E]/75 text-[0.875rem] leading-[1.2] tracking-[0.00875rem]'>
              {t('textVoucher')}
            </p>
            <p className='text-[#2E2E2E]/75 text-[0.875rem] leading-[1.2] tracking-[0.00875rem]'>
              - {formatUSD(voucherDiscount)} USD
            </p>
          </div>
        </>
      )}
      <div className='h-[0.05rem] w-full bg-[#EDEDED]'></div>
      <div className='flex items-center justify-between'>
        <p className='text-[#2E2E2E] leading-[1.3] font-phu-du font-bold tracking-[-0.00875rem] uppercase'>
          {t('textTotal')}
        </p>
        <p className='font-phu-du text-[1.75rem] leading-[2.0625rem] font-bold tracking-[-0.03125rem] text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)]'>
          {formatUSD(totalAmount)} USD
        </p>
      </div>
    </div>
  )
}
