'use client'

import ICMinus from '@/components/icons/ICMinus'
import ICPlus from '@/components/icons/ICPlus'
import type { ControllerRenderProps } from 'react-hook-form'

type NumberStepperFieldProps = {
  label: string
  field: ControllerRenderProps<any, any>
}

export default function NumberStepperField({ label, field }: NumberStepperFieldProps) {
  const value = Number(field.value || 0)

  const handleDecrease = () => {
    const next = Math.max(0, value - 1)
    field.onChange(String(next))
  }

  const handleIncrease = () => {
    const next = value + 1
    field.onChange(String(next))
  }

  return (
    <div className='p-[0.6875rem_0.5rem_0.6875rem_1rem] h-[3.25rem] rounded-[0.75rem] border border-[#ededed] bg-[#f5f5f5] flex items-center justify-between xsm:flex-col xsm:h-auto xsm:items-start xsm:px-2 xsm:py-[0.6875rem]'>
      <p className='text-[0.875rem] leading-[1.6] font-semibold tracking-[0.00875rem] text-[#2E2E2E]'>
        {label}
      </p>
      <div className='flex items-center space-x-2 xsm:mt-3 xsm:w-full xsm:justify-between xsm:p-2 xsm:rounded-[0.75rem] xsm:bg-white'>
        <button
          type='button'
          onClick={handleDecrease}
          className='size-[2rem] xsm:rounded-[0.75rem] flex-center rounded-full bg-white border border-[#ddd] hover:bg-gray-50 transition-colors transform duration-300'
        >
          <ICMinus className='size-4' />
        </button>
        <span className='text-[#2e2e2e] text-[0.875rem] leading-[1.6] font-semibold tracking-[-0.00875rem]'>
          {value.toString().padStart(2, '0')}
        </span>
        <button
          type='button'
          onClick={handleIncrease}
          className='size-[2rem] xsm:rounded-[0.75rem] flex-center rounded-full bg-white border border-[#ddd] hover:bg-gray-50 transition-colors transform duration-300'
        >
          <ICPlus className='size-4' />
        </button>
      </div>
    </div>
  )
}
