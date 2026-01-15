'use client'
import ICTrashcan from '@/components/icons/ICTrashcan'
import DrawerProvider from '@/components/provider/DrawerProvider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItemCustom } from '@/components/ui/radio-group'
import { Clock8, List, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import BrandButton from '../BrandButton'
import ICLocation2 from '@/components/icons/ICLocation2'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface FilterData {
  label: string
  taxonomy: string
  options: Array<{ value: string; label: string }>
  variant: 'radio' | 'checkbox'
}

interface FilterDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onReset: () => void
  onApply: () => void
  data: FilterData[]
  values: Record<string, string | string[]>
  onChange: (taxonomy: string, value: string | string[]) => void
}

export default function FilterDrawer({
  open,
  setOpen,
  onReset,
  onApply,
  data,
  values,
  onChange,
}: FilterDrawerProps) {
  const t = useTranslations('ListTourPage')
  const RADIO_VISIBLE_COUNT = 4
  const [expandedRadios, setExpandedRadios] = useState<Record<string, boolean>>({})
  const toggleRadioExpand = (taxonomy: string) => {
    setExpandedRadios((prev) => ({
      ...prev,
      [taxonomy]: !prev[taxonomy],
    }))
  }

  return (
    <DrawerProvider
      open={open}
      setOpen={setOpen}
      showDrawerDrag={false}
      className={'max-h-full overflow-hidden'}
    >
      <div className='flex w-full flex-col overflow-hidden'>
        {/* Header */}
        <div className='sticky top-0 z-10 flex h-[4.5rem] w-full items-center justify-between bg-[#E5EDF6] p-3 pt-6'>
          <span className='font-montserrat bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[0.875rem] leading-[1.1375rem] font-bold tracking-[-0.03125rem] text-transparent uppercase'>
            {t('searchFilter')}
          </span>
          <button
            type='button'
            onClick={() => setOpen(false)}
            className='flex shrink-0 items-center justify-center rounded-[0.5rem] bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] p-[0.625rem]'
          >
            <X className='size-[1rem] text-white' />
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 space-y-[0.75rem] overflow-y-auto bg-[#E5EDF6] pb-3'>
          {data.map((item, i) => {
            const isRadio = item.variant === 'radio'

            const value = values[item.taxonomy] as string
            const isExpanded = expandedRadios[item.taxonomy]
            const visibleOptions = isExpanded
              ? item.options
              : item.options.slice(0, RADIO_VISIBLE_COUNT)

            return (
              <div
                className='bg-white pt-3 rounded-[0.5rem]'
                key={i}
              >
                <div className='px-3'>
                  <div className='font-montserrat flex items-center justify-between rounded-[0.5rem] bg-[#F6F6F6] p-[0.875rem_0.625rem] text-[0.875rem] leading-[1.3125rem] font-bold text-[#07364D] uppercase'>
                    <span>{item.label}</span>
                    {item.taxonomy === 'locations' && <ICLocation2 className='size-[1.25rem]' />}
                    {item.taxonomy === 'tour-duration' && <Clock8 className='size-[1.25rem]' />}
                    {item.taxonomy === 'tour-type' && <List className='size-[1.25rem]' />}
                  </div>

                  {isRadio ? (
                    <RadioGroup
                      value={value}
                      onValueChange={(value) => onChange(item.taxonomy, value)}
                    >
                      {visibleOptions.map((option, i) => (
                        <div
                          key={option.value}
                          className={cn(
                            'flex items-center space-x-2.5 px-[0.81rem] py-4',
                            value === option.value &&
                              'rounded-tl-[1rem] rounded-br-[1rem] border border-[#EDEDED] bg-[linear-gradient(90deg,rgba(255,183,21,0.10)_0%,rgba(255,157,21,0.20)_100%)]',
                          )}
                        >
                          <RadioGroupItemCustom
                            value={option.value}
                            id={`tour-${option.value}`}
                            className='flex size-[1.375rem] items-center justify-center'
                          />
                          <Label
                            htmlFor={`tour-${option.value}`}
                            className='font-montserrat line-clamp-1 cursor-pointer text-[0.875rem] leading-[1.4rem] text-[#303030]'
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div>
                      {item.options.map((option, i) => {
                        const newValues = values[item.taxonomy] as string[]

                        const isChecked = newValues.includes(option.value)

                        return (
                          <div
                            key={i}
                            className='flex items-center gap-[0.3125rem] py-[0.75rem]'
                          >
                            <div className='p-[0.5rem]'>
                              <Checkbox
                                id={`tour-${option.value}`}
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  const values = checked
                                    ? [...newValues, option.value]
                                    : newValues.filter((value) => value !== option.value)

                                  onChange(item.taxonomy, values)
                                }}
                                className='size-[1.375rem] rounded-[0.375rem] border-2 border-[rgba(46,46,46,0.4)]/80 shadow-none data-[state=checked]:border-none data-[state=checked]:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)]'
                              />
                            </div>
                            <Label
                              htmlFor={`tour-${option.value}`}
                              className='font-montserrat line-clamp-1 cursor-pointer text-[0.875rem] leading-[1.4rem] text-[#303030]'
                            >
                              {option.label}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {isRadio && item.options.length > RADIO_VISIBLE_COUNT && (
                  <button
                    type='button'
                    className='w-full flex py-[0.875rem] px-[2.125rem] justify-center items-center gap-[0.375rem] border-t-[1px] border-[rgba(205,205,205,0.60)]'
                    onClick={() => toggleRadioExpand(item.taxonomy)}
                  >
                    <span className='font-montserrat text-[1rem] leading-[1.3rem] text-[#124681] font-bold'>
                      {expandedRadios[item.taxonomy] ? t('less') : t('more')}
                    </span>
                    <ICPlus
                      className={cn(
                        'size-[1.25rem] transition-transform duration-300',
                        expandedRadios[item.taxonomy] && 'rotate-45',
                      )}
                    />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 z-10 flex w-full items-center space-x-[0.75rem] bg-white p-3'>
          <BrandButton
            variant='blueGradient'
            classNameButtonContainer='w-full'
            type={{
              variant: 'button',
              onClick: () => {
                setOpen(false)
                onApply()
              },
            }}
          >
            {t('done')}
          </BrandButton>
          <button
            type='button'
            onClick={() => {
              setOpen(false)
              onReset()
            }}
            className='font-montserrat flex h-[2.5rem] shrink-0 items-center justify-center gap-[0.25rem] py-[0.75rem] text-[0.875rem] text-[#FF2019]'
          >
            <ICTrashcan className='size-[1rem]' />
            {t('reset')}
          </button>
        </div>
      </div>
    </DrawerProvider>
  )
}

const ICPlus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      {...props}
    >
      <path
        d='M5 10H10M10 10H15M10 10V15M10 10V5'
        stroke='#124681'
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
