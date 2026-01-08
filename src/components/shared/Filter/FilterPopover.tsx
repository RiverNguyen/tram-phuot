'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItemCustom } from '@/components/ui/radio-group'
import { ICChevron } from '@/components/icons'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('ListCouponPage')
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
      return `${selectedValues.length} ${t('selected')}`
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
          'font-montserrat flex h-[2.75rem] flex-1 items-center justify-between rounded-[0.625rem] border-none bg-white px-[1rem] py-[0.75rem] text-[0.875rem] leading-[1.4rem] font-bold tracking-[0.035rem] text-[#2E2E2E] uppercase shadow-none ring-0 outline-none focus:ring-0 focus:ring-offset-0',
          className,
        )}
      >
        <div className='flex items-center gap-[0.25rem]'>
          <span className='font-normal text-[rgba(46,46,46,0.60)] uppercase'>{label}:</span>
          <span>{getDisplayText() || t('all')}</span>
        </div>
        <ICChevron className='h-auto w-[0.825rem] text-[#A1A1A1]' />
      </PopoverTrigger>
      <PopoverContent className='flex w-[var(--radix-popover-trigger-width)] flex-col items-start gap-[0.25rem] rounded-[1rem] bg-white py-[0.75rem] pr-[1rem] pl-[0.75rem] shadow-[7px_10px_34.3px_0_rgba(0,0,0,0.12)]'>
        {isRadio ? (
          <RadioGroup
            value={selectedValue}
            onValueChange={handleRadioChange}
            className='w-full'
          >
            <label
              htmlFor={`radio-all`}
              className={cn(
                'flex cursor-pointer items-center gap-[0.625rem] self-stretch rounded-tl-[1rem] rounded-br-[1rem] px-[0.75rem] py-[1rem] lg:hover:bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                selectedValue === '' &&
                  'bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
              )}
            >
              <RadioGroupItemCustom
                value={''}
                id={`radio-all`}
              />
              <span className='font-montserrat line-clamp-1 text-[0.875rem] leading-[1.3125rem] text-[#303030]'>
                {t('all')}
              </span>
            </label>
            {options.map((option) => (
              <label
                htmlFor={`${label}-${option.value}`}
                key={option.value}
                className={cn(
                  'flex cursor-pointer items-center gap-[0.625rem] self-stretch rounded-tl-[1rem] rounded-br-[1rem] px-[0.75rem] py-[1rem] lg:hover:bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                  selectedValue === option.value &&
                    'bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                )}
              >
                <RadioGroupItemCustom
                  value={option.value}
                  id={`${label}-${option.value}`}
                />
                <span className='font-montserrat line-clamp-1 text-[0.875rem] leading-[1.3125rem] text-[#303030]'>
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
                    'flex cursor-pointer items-center gap-[0.625rem] self-stretch rounded-tl-[1rem] rounded-br-[1rem] px-[0.75rem] py-[1rem] lg:hover:bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
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
                    className='h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[#2e2e2e]/40 data-[state=checked]:border-none data-[state=checked]:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)]'
                  />
                  <span
                    id={`${label}-${option.value}`}
                    className='font-montserrat line-clamp-1 text-[0.875rem] leading-[1.3125rem] text-[#303030]'
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
