'use client'

import { ICChevron } from '@/components/icons'

interface FieldItemProps {
  label: string
  value: React.ReactNode
  onClick: () => void
}

export const FieldItem = ({ label, value, onClick }: FieldItemProps) => {
  return (
    <div
      className='flex items-end justify-between mx-4 w-[8.75rem] cursor-pointer'
      onClick={onClick}
    >
      <div className='space-y-2'>
        <p className='text-[#2e2e2e]/75 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
          {label}
        </p>
        {value}
      </div>
      <ICChevron className='size-4 text-black opacity-24' />
    </div>
  )
}







