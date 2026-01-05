'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItemCustom } from '@/components/ui/radio-group'
import { ICChevron } from '@/components/icons'

interface FilterPopoverProps {
  label: string
  options: Array<{ value: string; label: string }>
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  variant?: 'radio' | 'checkbox'
}

export default function FilterPopover({
  label,
  options,
  value,
  onValueChange,
  variant = 'radio',
  className,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false)
  const isRadio = variant === 'radio'
  const selectedValue = isRadio ? (value as string | undefined) || '' : ''
  const selectedValues = !isRadio ? (value as string[] | undefined) || [] : []

  const getDisplayText = () => {
    if (isRadio) {
      const selectedOption = options.find((opt) => opt.value === selectedValue)
      return selectedOption?.label || ''
    } else {
      if (selectedValues.length === 0) return ''
      if (selectedValues.length === 1) {
        const selectedOption = options.find((opt) => opt.value === selectedValues[0])
        return selectedOption?.label || ''
      }
      return `${selectedValues.length} selected`
    }
  }

  const handleRadioChange = (newValue: string) => {
    onValueChange?.(newValue)
    setOpen(false)
  }

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      const newValues = [...selectedValues, optionValue]
      onValueChange?.(newValues)
    } else {
      const newValues = selectedValues.filter((v) => v !== optionValue)
      onValueChange?.(newValues)
    }
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        className={cn(
          'flex h-[2.75rem] py-[0.75rem] px-[1rem] justify-between items-center flex-1 rounded-[0.625rem] bg-white shadow-none ring-0 border-none outline-none focus:ring-0 focus:ring-offset-0 text-[#2E2E2E] font-montserrat text-[0.875rem] font-bold leading-[1.4rem] tracking-[0.035rem] uppercase',
          className,
        )}
      >
        <div className='flex items-center gap-[0.25rem]'>
          <span className='text-[rgba(46,46,46,0.60)] font-normal uppercase'>{label}:</span>
          <span className={cn(!getDisplayText() && 'text-[rgba(46,46,46,0.60)]')}>
            {getDisplayText() || 'Select'}
          </span>
        </div>
        <ICChevron className='w-[0.825rem] h-auto text-[#A1A1A1]' />
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] flex pl-[0.75rem] py-[0.75rem] pr-[1rem] flex-col items-start gap-[0.25rem] rounded-[1rem] bg-white shadow-[7px_10px_34.3px_0_rgba(0,0,0,0.12)]'>
        {isRadio ? (
          <RadioGroup
            value={selectedValue}
            onValueChange={handleRadioChange}
            className='w-full'
          >
            {options.map((option) => (
              <label
                htmlFor={`${label}-${option.value}`}
                key={option.value}
                className={cn(
                  'flex py-[1rem] px-[0.75rem] items-center gap-[0.625rem] self-stretch rounded-tl-[1rem] rounded-br-[1rem] lg:hover:bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                  selectedValue === option.value &&
                    'bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                )}
              >
                <RadioGroupItemCustom
                  value={option.value}
                  id={`${label}-${option.value}`}
                />
                <span className='line-clamp-1 text-[#303030] font-montserrat text-[0.875rem] leading-[1.3125rem] cursor-pointer'>
                  {option.label}
                </span>
              </label>
            ))}
          </RadioGroup>
        ) : (
          <>
            {options.map((option) => {
              const isChecked = selectedValues.includes(option.value)
              return (
                <label
                  htmlFor={`${label}-${option.value}`}
                  key={option.value}
                  className={cn(
                    'flex py-[1rem] px-[0.75rem] items-center gap-[0.625rem] self-stretch rounded-tl-[1rem] rounded-br-[1rem] lg:hover:bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                    isChecked &&
                      'bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                  )}
                >
                  <Checkbox
                    id={`${label}-${option.value}`}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.value, checked === true)
                    }
                    className='h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[#2e2e2e]/40 data-[state=checked]:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] data-[state=checked]:border-none'
                  />
                  <span
                    id={`${label}-${option.value}`}
                    className='line-clamp-1 text-[#303030] font-montserrat text-[0.875rem] leading-[1.3125rem] cursor-pointer'
                  >
                    {option.label}
                  </span>
                </label>
              )
            })}
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
