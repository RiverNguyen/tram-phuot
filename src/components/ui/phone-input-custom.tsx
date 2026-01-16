import * as React from 'react'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import useIsMobile from '@/hooks/useIsMobile'
import DrawerProvider from '@/components/provider/DrawerProvider'

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void
  }

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, placeholder, required, onChange, value, ...props }, ref) => {
  const previousCountryRef = React.useRef<RPNInput.Country | undefined>(undefined)
  const hasInitializedRef = React.useRef(false)

  const handleCountryChange = (country: RPNInput.Country | undefined) => {
    if (country && country !== previousCountryRef.current) {
      const countryCode = `+${RPNInput.getCountryCallingCode(country)}`
      // Tự động điền country code khi chọn quốc gia mới
      // Nếu input đang trống hoặc chỉ có country code (ví dụ: "+84", "+1"), điền country code mới
      const currentValue = value || ''
      const isEmpty = !currentValue || currentValue.trim() === ''
      const isOnlyCountryCode = currentValue.match(/^\+\d{1,4}$/)

      if (isEmpty || isOnlyCountryCode) {
        // Sử dụng setTimeout để đảm bảo country đã được cập nhật trước khi điền giá trị
        setTimeout(() => {
          onChange?.(countryCode as RPNInput.Value)
        }, 0)
      }
      previousCountryRef.current = country
    }
  }

  // Tự động điền country code khi component mount với defaultCountry và value trống
  React.useEffect(() => {
    if (!hasInitializedRef.current && props.defaultCountry) {
      const currentValue = value || ''
      if (!currentValue || currentValue.trim() === '') {
        const countryCode = `+${RPNInput.getCountryCallingCode(props.defaultCountry)}`
        // Sử dụng setTimeout để đảm bảo component đã render xong
        setTimeout(() => {
          onChange?.(countryCode as RPNInput.Value)
        }, 0)
        previousCountryRef.current = props.defaultCountry
      }
      hasInitializedRef.current = true
    }
  }, [props.defaultCountry, value, onChange])

  return (
    <RPNInput.default
      ref={ref}
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      numberInputProps={{
        placeholder,
        required,
      }}
      smartCaret={false}
      value={value || undefined}
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
      onCountryChange={handleCountryChange}
      {...props}
    />
  )
})
PhoneInput.displayName = 'PhoneInput'

interface InputComponentProps extends React.ComponentProps<'input'> {
  placeholder?: string
  required?: boolean
}
const InputComponent = React.forwardRef<HTMLInputElement, InputComponentProps>(
  ({ className, placeholder, required, ...props }, ref) => (
    <div className='relative ml-2 flex-1'>
      <Input
        className={cn(
          'peer text-body-t1 h-4.25 w-full rounded-none border-none! px-1 py-0 text-[0.875rem] leading-[1.2] tracking-[0.00875rem] shadow-none! ring-0! outline-0!',
          className,
        )}
        {...props}
        ref={ref}
        placeholder=''
      />
      <p className='pointer-events-none absolute top-0 left-1 space-x-1 text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[#8B8B8B] peer-[:not(:placeholder-shown)]:hidden'>
        <span>{placeholder}</span>
        {required && <span className='text-[#EF2020]'>*</span>}
      </p>
    </div>
  ),
)
InputComponent.displayName = 'InputComponent'

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)
  const translatePhoneInput = useTranslations('PhoneInput')
  const isMobile = useIsMobile()

  return (
    <>
      <Popover
        open={isPopoverOpen}
        modal
        onOpenChange={(open) => {
          setIsPopoverOpen(open)
          open && setSearchValue('')
        }}
      >
        <PopoverTrigger
          asChild
          // className='xsm:hidden block'
        >
          <Button
            type='button'
            variant='outline'
            className='flex h-full cursor-pointer gap-1 rounded-none! border-none! bg-transparent! p-0 shadow-none! ring-0! outline-0! focus:z-10'
            disabled={disabled}
          >
            <FlagComponent
              country={selectedCountry}
              countryName={selectedCountry}
            />
            <ChevronsUpDown
              className={cn('-mr-2 size-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className='w-full p-0 hidden_scroll'
        >
          <Command>
            <CommandInput
              value={searchValue}
              onValueChange={(value) => {
                setSearchValue(value)
                setTimeout(() => {
                  if (scrollAreaRef.current) {
                    const viewportElement = scrollAreaRef.current.querySelector(
                      '[data-radix-scroll-area-viewport]',
                    )
                    if (viewportElement) {
                      viewportElement.scrollTop = 0
                    }
                  }
                }, 0)
              }}
              placeholder={translatePhoneInput('textSearchCountry')}
            />
            <CommandList>
              <ScrollArea
                ref={scrollAreaRef}
                className='h-72'
              >
                <CommandEmpty>{translatePhoneInput('textNoCountryFound')}</CommandEmpty>
                <CommandGroup>
                  {countryList.map(({ value, label }) =>
                    value ? (
                      <CountrySelectOption
                        key={value}
                        country={value}
                        countryName={label}
                        selectedCountry={selectedCountry}
                        onChange={onChange}
                        onSelectComplete={() => setDrawerOpen(false)}
                      />
                    ) : null,
                  )}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* <Button
        type='button'
        variant='outline'
        onClick={() => setDrawerOpen(true)}
        className='xsm:flex hidden h-full cursor-pointer gap-1 rounded-none! border-none! bg-transparent! p-0 shadow-none! ring-0! outline-0! focus:z-10'
        disabled={disabled}
      >
        <FlagComponent
          country={selectedCountry}
          countryName={selectedCountry}
        />
        <ChevronsUpDown
          className={cn('-mr-2 size-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
        />
      </Button>
      <DrawerProvider
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        className='relative w-full rounded-t-[0.5rem]'
      >
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value)
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    '[data-radix-scroll-area-viewport]',
                  )
                  if (viewportElement) {
                    viewportElement.scrollTop = 0
                  }
                }
              }, 0)
            }}
            placeholder={translatePhoneInput('textSearchCountry')}
          />
          <CommandList>
            <ScrollArea
              ref={scrollAreaRef}
              className='h-72'
            >
              <CommandEmpty>{translatePhoneInput('textNoCountryFound')}</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setDrawerOpen(false)}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </DrawerProvider> */}
    </>
  )
}

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country
  onChange: (country: RPNInput.Country) => void
  onSelectComplete: () => void
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country)
    onSelectComplete()
  }

  return (
    <CommandItem
      className='gap-2'
      onSelect={handleSelect}
    >
      <FlagComponent
        country={country}
        countryName={countryName}
      />
      <span className='flex-1 text-sm'>{countryName}</span>
      <span className='text-foreground/50 text-sm'>{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </CommandItem>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

export { PhoneInput }
