'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import ICTrashcan from '@/components/icons/ICTrashcan'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItemCustom } from '@/components/ui/radio-group'
import { ICouponTaxonomy } from '@/interface/coupon.interface'
import { mapTaxonomyToFilter } from './mapTaxonomyToFilter'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

type CouponFilter = {
  locations: string
  'tour-type': string[]
}

interface FilterDrawerProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  taxonomies: ICouponTaxonomy[]
  filters: CouponFilter
  onApply: (next: CouponFilter) => void
  onReset: () => void
}

export default function FilterDrawer({ open, onOpenChange, taxonomies, filters, onApply, onReset }: FilterDrawerProps) {
  const t = useTranslations('ListCouponPage')
  const filtersMap = mapTaxonomyToFilter(taxonomies)

  const selectedDestination = filters.locations || undefined
  const selectedTypeTours = filters['tour-type'] || []

  const [draftDestination, setDraftDestination] = useState<string | undefined>(selectedDestination)

  const [draftTypeTours, setDraftTypeTours] = useState<string[]>(selectedTypeTours)

  useEffect(() => {
    if (!open) return

    setDraftDestination(selectedDestination)
    setDraftTypeTours([...selectedTypeTours])
  }, [open, selectedDestination, selectedTypeTours])

  const handleTypeTourChange = (value: string, checked: boolean) => {
    setDraftTypeTours((prev) => {
      if (checked) {
        return prev.includes(value) ? prev : [...prev, value]
      }
      return prev.filter((v) => v !== value)
    })
  }

  const handleDestinationChange = (value: string) => {
    setDraftDestination(value)
  }

  const handleApply = () => {
    onApply({
      locations: draftDestination || '',
      'tour-type': draftTypeTours,
    })
    onOpenChange(false)
  }

  const handleReset = () => {
    setDraftDestination(undefined)
    setDraftTypeTours([])

    onReset()

    onOpenChange(false)
  }

  return (
    <DrawerProvider
      open={open}
      setOpen={onOpenChange}
      showDrawerDrag={false}
    >
      <div className='relative flex w-full pt-[1.5rem] flex-col justify-center items-start gap-[1.5rem] rounded-t-[0.5rem] bg-white'>
        {/* close */}
        <button
          type='button'
          onClick={() => onOpenChange(false)}
          className='size-[2rem] flex items-center justify-center absolute top-[0.8125rem] right-[1rem] backdrop-blur-[40.77px]'
        >
          <ICCloseButton className='size-[0.8rem]' />
        </button>
        {/* content */}
        <div className='flex flex-col items-start gap-[1.25rem] self-stretch'>
          <h3 className='flex px-[1rem] flex-col self-stretch font-phu-du text-[1.125rem] font-bold leading-[1.2375rem] bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-transparent'>
            {t('category')}
          </h3>
          <div className='flex px-[1rem] flex-col items-start gap-[1.25rem] self-stretch'>
            <div className='flex flex-col items-start gap-[0.875rem] self-stretch'>
              <h4 className='text-[#2E2E2E] font-phu-du text-[0.875rem] font-bold leading-[1.1375rem]'>
                {t('destination')}
              </h4>
              <RadioGroup
                value={draftDestination || ''}
                onValueChange={handleDestinationChange}
                className='flex w-full flex-col items-start gap-[0.75rem]'
              >
                {filtersMap?.locations?.map((option) => (
                  <div
                    key={option.value}
                    className='flex items-center gap-[0.5rem]'
                  >
                    <RadioGroupItemCustom
                      value={option.value}
                      id={`destination-${option.value}`}
                    />
                    <Label
                      htmlFor={`destination-${option.value}`}
                      className='line-clamp-1 text-[#303030] font-montserrat text-[0.875rem] leading-[1.3125rem] cursor-pointer'
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className='flex flex-col items-start gap-[0.875rem] self-stretch'>
              <h4 className='text-[#2E2E2E] font-phu-du text-[0.875rem] font-bold leading-[1.1375rem]'>
                {t('typeTour')}
              </h4>
              <div className='flex w-full flex-col items-start gap-[0.75rem]'>
                {filtersMap['tour-type']?.map((option) => (
                  <div
                    key={option.value}
                    className='flex items-center gap-[0.5rem]'
                  >
                    <Checkbox
                      id={`typeTour-${option.value}`}
                      checked={draftTypeTours.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleTypeTourChange(option.value, checked === true)
                      }
                      className='h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[#2e2e2e]/40 data-[state=checked]:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] data-[state=checked]:border-none'
                    />
                    <Label
                      htmlFor={`typeTour-${option.value}`}
                      className='line-clamp-1 text-[#303030] font-montserrat text-[0.875rem] leading-[1.3125rem] cursor-pointer'
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className='flex px-[1rem] pt-[1.25rem] pb-[1rem] gap-[0.75rem] self-stretch border-t-[0.5px] border-t-[rgba(46,46,46,0.40)]'>
          <button
            type='button'
            onClick={handleApply}
            className='flex h-[2.5rem] py-[0.625rem] px-[1.875rem] justify-center items-center gap-[0.625rem] flex-1 rounded-[0.625rem] bg-[linear-gradient(50deg,#03328C_-18.36%,#00804D_82.62%)] text-[#F9EAD5] font-montserrat text-[0.75rem] font-semibold leading-[0.9rem] uppercase'
          >
            {t('apply')}
          </button>
          <button
            type='button'
            onClick={handleReset}
            className='flex h-[2.5rem] py-[0.75rem] justify-center items-center gap-[0.25rem] rounded-[0.5rem]'
          >
            <ICTrashcan className='size-[1rem] text-[#2E2E2E]' />
            {t('reset')}
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
