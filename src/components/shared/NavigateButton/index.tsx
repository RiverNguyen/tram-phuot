'use client'

import { cn } from '@/lib/utils'
import React from 'react'

type NavigateButtonVariant = 'left' | 'right'

interface NavigateButtonProps {
  variant?: NavigateButtonVariant
  onClick?: () => void
  className?: string
}

export default function NavigateButton({
  variant = 'right',
  className,
  onClick,
}: NavigateButtonProps) {
  const handleClickButton = () => {
    if (!onClick) return
    onClick()
  }
  return (
    <button
      onClick={handleClickButton}
      className={cn(
        'bg-orange xsm:size-8 xsm:rounded-[0.5rem] flex-center size-9 cursor-pointer rounded-[0.5625rem]',
        className,
      )}
    >
      <IconArrowRight
        className={cn('xsm:w-2 xsm:h-[0.66669rem] h-3 w-2.25', variant === 'left' && 'rotate-180')}
      />
    </button>
  )
}

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={9}
      height={12}
      viewBox='0 0 9 12'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_1771_15520)'>
        <path
          d='M0.858887 1.48438L6.95434 6.11692L0.858887 10.4026'
          stroke='#DED8C5'
          strokeWidth='2.04545'
        />
        <path
          d='M0.858887 1.48438L6.95434 6.11692L0.858887 10.4026'
          stroke='white'
          strokeWidth='2.04545'
        />
      </g>
      <defs>
        <clipPath id='clip0_1771_15520'>
          <rect
            width={9}
            height={12}
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  )
}
