'use client'

import { ICChevron } from '@/components/icons'
import DrawerProvider from '@/components/provider/DrawerProvider'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'

const MobileLanguageSwitcher = () => {
  const [openLanguageDropdown, setOpenLanguageDropdown] = useState(false)
  const t = useTranslations('Header')
  const params = useParams()
  const pathname = usePathname()
  const locales = routing.locales
  const currentLocale = (params?.locale as string) || routing.defaultLocale
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenLanguageDropdown(false)
      }
    }

    if (openLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openLanguageDropdown])

  return (
    <div className='flex-between px-[1.5rem]'>
      <p className='text-[#2E2E2E] text-[0.875rem] leading-[1.6]'>{t('language')}</p>
      <div
        className='relative'
        ref={languageDropdownRef}
      >
        <button
          onClick={() => setOpenLanguageDropdown(!openLanguageDropdown)}
          className='h-[2.25rem] px-3 flex-center gap-2 rounded-[0.25rem] border border-[#2e2e2e]/20 bg-white'
        >
          <Image
            src={`/header/${currentLocale}.svg`}
            alt={currentLocale}
            width={20}
            height={20}
            className='w-[1.37075rem] h-[0.91381rem] object-cover rounded-[0.25rem]'
          />
          <span className='text-[#2e2e2e] text-[0.875rem] font-medium'>
            {currentLocale.toUpperCase()}
          </span>
          <ICChevron className='size-2.5 text-[#2e2e2e] transition-transform' />
        </button>
        <DrawerProvider
          open={openLanguageDropdown}
          setOpen={setOpenLanguageDropdown}
        >
          <div className='p-[1.5rem]'>
            <p className='text-[#2E2E2E] text-[1rem] leading-[1.6] font-medium'>
              {t('language')}
            </p>
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
      </div>
    </div>
  )
}

export default MobileLanguageSwitcher



