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

  return (
    <DrawerProvider
      open={open}
      setOpen={setOpen}
      showDrawerDrag={false}
      className='h-full overflow-hidden'
    >
      {/* Header */}
      <div className='fixed top-0 left-0 right p-3 pt-6 bg-[#E5EDF6] w-full h-[4.5rem] flex items-center justify-between'>
        <span className='bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-transparent font-montserrat text-[0.875rem] font-bold leading-[1.1375rem] tracking-[-0.03125rem]'>
          {t('searchFilter')}
        </span>
        <button
          type='button'
          onClick={() => setOpen(false)}
          className='shrink-0 bg-[linear-gradient(53deg,#03328C_43.28%,#00804D_83.79%)] rounded-[0.5rem] p-[0.625rem] flex items-center justify-center'
        >
          <X className='size-[1rem] text-white' />
        </button>
      </div>

      {/* Content */}
      <div className='overflow-y-auto pt-[4.5rem] pb-[4.125rem] space-y-[0.75rem] bg-[#E5EDF6]'>
        {data.map((item, i) => {
          const isRadio = item.variant === 'radio'

          const value = values[item.taxonomy] as string

          return (
            <div
              className='p-3 bg-white'
              key={i}
            >
              <div className='flex items-center justify-between bg-[#F6F6F6] rounded-[0.5rem] p-[0.875rem_0.625rem] font-montserrat text-[0.875rem] font-bold leading-[1.3125rem] text-[#07364D] uppercase'>
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
                  {item.options.map((option, i) => (
                    <div
                      key={option.value}
                      className='flex items-center py-4 px-[0.81rem] space-x-2.5'
                    >
                      <RadioGroupItemCustom
                        value={option.value}
                        id={`tour-${option.value}`}
                        className='size-[1.375rem] flex items-center justify-center'
                      />
                      <Label
                        htmlFor={`tour-${option.value}`}
                        className='line-clamp-1 text-[#303030] font-montserrat text-[0.875rem] leading-[1.4rem] cursor-pointer'
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
                        className='flex py-[0.75rem] items-center gap-[0.3125rem]'
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
                            className='size-[1.375rem] rounded-[0.375rem] border-2 border-[rgba(46,46,46,0.4)]/80 shadow-none data-[state=checked]:bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] data-[state=checked]:border-none'
                          />
                        </div>
                        <Label
                          htmlFor={`tour-${option.value}`}
                          className='line-clamp-1 text-[#303030] font-montserrat text-[0.875rem] leading-[1.4rem] cursor-pointer'
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

      <div className='fixed bottom-0 left-0 right-0 w-full p-3 bg-white flex items-center space-x-[0.75rem] z-1'>
        <BrandButton
          classNameButtonContainer='w-full'
          onClick={() => {
            setOpen(false)
            onApply()
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
          className='flex h-[2.5rem] py-[0.75rem] shrink-0 justify-center items-center gap-[0.25rem] font-montserrat text-[0.875rem] text-[#FF2019]'
        >
          <ICTrashcan className='size-[1rem]' />
          {t('reset')}
        </button>
      </div>
    </DrawerProvider>
  )
}
