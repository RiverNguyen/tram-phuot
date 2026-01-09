'use client'

import { useTranslations } from 'next-intl'

type QuantitySelectorProps = {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}

const QuantitySelector = ({ quantity, onDecrease, onIncrease }: QuantitySelectorProps) => {
  const t = useTranslations('DetailHotelPage')
  return (
    <div className='flex items-center space-x-[0.625rem]'>
      <button
        type='button'
        onClick={onDecrease}
        className='size-[1.875rem] flex-center rounded-full border border-[#ddd] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
        disabled={quantity === 0}
        aria-label='Decrease room quantity'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='2'
          viewBox='0 0 12 2'
          fill='none'
          className='w-[0.58rem] h-auto'
        >
          <path
            d='M1 1H10.3333'
            stroke='#2E2E2E'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <p className='text-[#2e2e2e] text-[0.75rem] font-semibold leading-[1.6] tracking-[-0.0075rem]'>
        {quantity} {t('textRoom')}
      </p>
      <button
        type='button'
        onClick={onIncrease}
        className='size-[1.875rem] flex-center rounded-full border border-[#ddd] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
        aria-label='Increase room quantity'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          className='size-4'
        >
          <path
            d='M4 8H12'
            stroke='#2E2E2E'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8 12V4'
            stroke='#2E2E2E'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  )
}

export default QuantitySelector
