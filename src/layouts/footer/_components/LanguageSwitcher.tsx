'use client'
import DrawerProvider from '@/components/provider/DrawerProvider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const { locale: currentLocale } = useParams<{ locale: string }>()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('Header')

  const locales = routing.locales

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='font-montserrat xsm:text-white/80 xsm:leading-[1.05rem] flex cursor-pointer items-center space-x-2 text-[0.75rem] leading-[1.125rem] tracking-[0.0625rem] text-white/51 uppercase sm:hidden'
      >
        <span>{currentLocale.toUpperCase()}</span>
        <div className='flex items-center space-x-[0.42rem]'>
          <Image
            src={`/header/${currentLocale}.svg`}
            alt={currentLocale}
            width={24}
            height={24}
            className='xsm:size-[1.125rem] size-[1.325rem] rounded-full object-cover'
          />
          <ChevronDown className='xsm:size-[1rem] size-[1.1655rem]' />
        </div>
      </button>
      <DrawerProvider
        open={open}
        setOpen={setOpen}
      >
        <div className='p-[1.5rem]'>
          <p className='text-[#2E2E2E] text-[1rem] leading-[1.6] font-medium'>{t('language')}</p>
          <div className='flex flex-col gap-2 mt-4'>
            {locales.map((loc) => {
              const isActive = loc === currentLocale
              return (
                <Link
                  key={loc}
                  href={`${pathname}`}
                  locale={loc}
                  className='flex items-center justify-between space-x-4'
                >
                  <div className='flex items-center space-x-4'>
                    <Image
                      src={`/header/${loc}.svg`}
                      alt={loc}
                      width={24}
                      height={24}
                      className='w-[1.37075rem] h-[0.91381rem] object-cover rounded-[0.25rem]'
                    />
                    <span className='text-[#2E2E2E] text-[1rem] leading-[1.6] font-medium'>
                      {loc.toUpperCase()}
                    </span>
                  </div>
                  {isActive && <Check className='size-5 text-[#2E2E2E]' />}
                </Link>
              )
            })}
          </div>
        </div>
      </DrawerProvider>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type='button'
            className='font-montserrat xsm:text-white/80 xsm:leading-[1.05rem] flex cursor-pointer items-center space-x-2 text-[0.75rem] leading-[1.125rem] tracking-[0.0625rem] text-white/51 uppercase xsm:hidden'
          >
            <span>{currentLocale.toUpperCase()}</span>
            <div className='flex items-center space-x-[0.42rem]'>
              <Image
                src={`/header/${currentLocale}.svg`}
                alt={currentLocale}
                width={24}
                height={24}
                className='xsm:size-[1.125rem] size-[1.325rem] rounded-full object-cover'
              />
              <ChevronDown className='xsm:size-[1rem] size-[1.1655rem]' />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className='min-w-[6rem] w-fit'>
          {locales.map((loc, i) => {
            const isActive = loc === currentLocale
            return (
              <Link
                href={`${pathname}`}
                locale={loc}
                key={i}
                className={cn(
                  'flex-y-center space-x-2 rounded-md px-2 py-1.5 transition-colors',
                  isActive ? 'bg-black/10 font-semibold' : 'hover:bg-black/5',
                )}
              >
                <Image
                  src={`/header/${loc}.svg`}
                  alt={loc}
                  width={24}
                  height={24}
                  className='size-[1.5rem] object-cover rounded-full'
                />
                <p
                  className={cn(
                    'leading-[1.6] tracking-[0.04rem] font-normal',
                    isActive ? 'text-[#2e2e2e]' : 'text-[#2e2e2e]/80',
                  )}
                >
                  {loc.toUpperCase()}
                </p>
              </Link>
            )
          })}
        </PopoverContent>
      </Popover>
    </>
  )
}
