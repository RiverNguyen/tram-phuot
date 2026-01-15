'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItemCustom } from '@/components/ui/radio-group'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export type FilterOption = {
  label: string
  value: string
}

export type FilterSection = {
  type: 'radio' | 'checkbox'
  key: string
  title: string
  options: FilterOption[]
}

interface FilterDrawerProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  sections: FilterSection[]
  filters: Record<string, string | string[]>
  onApply: (filters: Record<string, string | string[]>) => void
  onReset: () => void
}

export default function FilterDrawer2({
  open,
  onOpenChange,
  sections,
  filters,
  onApply,
  onReset,
}: FilterDrawerProps) {
  const t = useTranslations('ListCouponPage')

  // Initialize draft state from filters
  const [draftFilters, setDraftFilters] = useState<Record<string, string | string[]>>(() => {
    const initial: Record<string, string | string[]> = {}
    sections.forEach((section) => {
      initial[section.key] = filters[section.key] || (section.type === 'checkbox' ? [] : '')
    })
    return initial
  })

  // Reset draft state when drawer opens
  useEffect(() => {
    if (!open) return

    const reset: Record<string, string | string[]> = {}
    sections.forEach((section) => {
      reset[section.key] = filters[section.key] || (section.type === 'checkbox' ? [] : '')
    })
    setDraftFilters(reset)
  }, [open, filters, sections])

  const handleRadioChange = (key: string, value: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    setDraftFilters((prev) => {
      const currentValues = (prev[key] as string[]) || []
      if (checked) {
        return {
          ...prev,
          [key]: currentValues.includes(value) ? currentValues : [...currentValues, value],
        }
      }
      return {
        ...prev,
        [key]: currentValues.filter((v) => v !== value),
      }
    })
  }

  const handleApply = () => {
    onApply(draftFilters)
    onOpenChange(false)
  }

  const handleReset = () => {
    const reset: Record<string, string | string[]> = {}
    sections.forEach((section) => {
      reset[section.key] = section.type === 'checkbox' ? [] : ''
    })
    setDraftFilters(reset)
    onReset()
    onOpenChange(false)
  }

  return (
    <DrawerProvider
      open={open}
      setOpen={onOpenChange}
    >
      <div className='relative flex w-full flex-col items-start justify-center gap-[1.5rem] rounded-t-[0.5rem] bg-white pt-[1.5rem]'>
        {/* close */}
        <button
          type='button'
          onClick={() => onOpenChange(false)}
          className='absolute top-[0.8125rem] right-[1rem] flex size-[2rem] items-center justify-center backdrop-blur-[40.77px]'
        >
          <ICCloseButton className='size-[0.8rem]' />
        </button>
        {/* content */}
        <div className='flex flex-col items-start gap-[1.25rem] self-stretch'>
          <h3 className='font-phu-du flex flex-col self-stretch bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text px-[1rem] text-[1.125rem] leading-[1.2375rem] font-bold text-transparent'>
            {t('category')}
          </h3>
          <div className='flex flex-col items-start gap-[1.25rem] self-stretch px-[1rem]'>
            {sections.map((section) => {
              const draftValue = draftFilters[section.key]

              return (
                <div
                  key={section.key}
                  className='flex flex-col items-start gap-[0.875rem] self-stretch'
                >
                  <h4 className='font-phu-du text-[0.875rem] leading-[1.1375rem] font-bold text-[#2E2E2E]'>
                    {section.title}
                  </h4>
                  {section.type === 'radio' ? (
                    <RadioGroup
                      value={(draftValue as string) || ''}
                      onValueChange={(value) => handleRadioChange(section.key, value)}
                      className='flex w-full flex-col items-start gap-[0.75rem]'
                    >
                      {section.options.map((option) => (
                        <div
                          key={option.value}
                          className='flex items-center gap-[0.5rem]'
                        >
                          <RadioGroupItemCustom
                            value={option.value}
                            id={`${section.key}-${option.value}`}
                          />
                          <Label
                            htmlFor={`${section.key}-${option.value}`}
                            className='font-montserrat line-clamp-1 cursor-pointer text-[0.875rem] leading-[1.3125rem] text-[#303030]'
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className='flex w-full flex-col items-start gap-[0.75rem]'>
                      {section.options.map((option) => {
                        const checkedValues = (draftValue as string[]) || []
                        const isChecked = checkedValues.includes(option.value)

                        return (
                          <div
                            key={option.value}
                            className='flex items-center gap-[0.5rem]'
                          >
                            <Checkbox
                              id={`${section.key}-${option.value}`}
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(section.key, option.value, checked === true)
                              }
                              className='h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[#2e2e2e]/40 data-[state=checked]:border-none data-[state=checked]:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)]'
                            />
                            <Label
                              htmlFor={`${section.key}-${option.value}`}
                              className='font-montserrat line-clamp-1 cursor-pointer text-[0.875rem] leading-[1.3125rem] text-[#303030]'
                            >
                              {option.label}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        {/* button */}
        <div className='flex gap-[0.75rem] self-stretch border-t-[0.5px] border-t-[rgba(46,46,46,0.40)] px-[1rem] pt-[1.25rem] pb-[1rem]'>
          <button
            type='button'
            onClick={handleReset}
            className='flex h-[2.5rem] items-center justify-center gap-[0.25rem] rounded-[0.5rem] py-[0.75rem] text-[0.75rem] text-[#FF2019] leading-[1.05rem] tracking-[0.01875rem] uppercase '
          >
            <ICTrashcan className='size-[1rem]' />
            {t('reset')}
          </button>
          <button
            type='button'
            onClick={handleApply}
            className='font-montserrat flex h-[2.5rem] flex-1 items-center justify-center gap-[0.625rem] rounded-[0.625rem] bg-[linear-gradient(50deg,#03328C_-18.36%,#00804D_82.62%)] px-[1.875rem] py-[0.625rem] text-[0.75rem] leading-[0.9rem] font-semibold text-[#F9EAD5] uppercase'
          >
            {t('apply')}
          </button>
        </div>
      </div>
    </DrawerProvider>
  )
}

const ICCloseButton = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      {...props}
    >
      <path
        d='M0.289885 11.0342C-0.0940168 11.4181 -0.101852 12.0998 0.29772 12.4993C0.705126 12.8989 1.38675 12.8911 1.76282 12.515L6.40098 7.87685L11.0313 12.5072C11.423 12.8989 12.0968 12.8989 12.4964 12.4993C12.896 12.0919 12.896 11.426 12.5042 11.0342L7.87391 6.40392L12.5042 1.76576C12.896 1.37402 12.9038 0.700236 12.4964 0.300665C12.0968 -0.0989062 11.423 -0.0989062 11.0313 0.29283L6.40098 4.92315L1.76282 0.29283C1.38675 -0.0910714 0.697291 -0.106741 0.29772 0.300665C-0.101852 0.700236 -0.0940168 1.38969 0.289885 1.76576L4.92021 6.40392L0.289885 11.0342Z'
        fill='#2E2E2E'
      />
    </svg>
  )
}
