'use client'

interface CounterProps {
  label: string
  value: number
  onDecrease: () => void
  onIncrease: () => void
  decreaseAriaLabel: string
  increaseAriaLabel: string
}

export const Counter = ({
  label,
  value,
  onDecrease,
  onIncrease,
  decreaseAriaLabel,
  increaseAriaLabel,
}: CounterProps) => {
  return (
    <div className='space-y-2'>
      <p className='text-[#2e2e2e] text-[0.875rem] font-phu-du font-bold leading-[1.3]'>
        {label}
      </p>
      <div className='flex items-center justify-between bg-[#f8f8f8] rounded-[3.5625rem] p-2'>
        <button
          onClick={onDecrease}
          className='size-[1.75rem] rounded-full bg-white border border-[#ddd] flex items-center justify-center text-[#2e2e2e] hover:bg-gray-50 transition-colors'
          aria-label={decreaseAriaLabel}
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
        <span className='text-[#2e2e2e] font-phu-du font-bold leading-[1.1]'>
          {value}
        </span>
        <button
          onClick={onIncrease}
          className='size-[1.75rem] rounded-full bg-white border border-[#ddd] flex items-center justify-center text-[#2e2e2e] hover:bg-gray-50 transition-colors cursor-pointer'
          aria-label={increaseAriaLabel}
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
  )
}




