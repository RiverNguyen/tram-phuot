'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const LanguageSwitcher = () => {
  const params = useParams()
  const pathname = usePathname()

  const locales = routing.locales
  const currentLocale = (params?.locale as string) || routing.defaultLocale

  return (
    <NavigationMenu>
      <NavigationMenuList className='space-x-0'>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='flex-y-center p-0 pl-[1.125rem]'>
            <Image
              src={`/header/${currentLocale}.svg`}
              alt={currentLocale}
              width={24}
              height={24}
              className='size-[1.5rem] object-cover rounded-full'
            />
            <p className='ml-[0.3125rem] text-white/80 leading-[1.6] tracking-[0.04rem] font-normal'>
              {currentLocale.toUpperCase()}
            </p>
          </NavigationMenuTrigger>
          <NavigationMenuContent className='min-w-[6rem] p-3 flex-x-center flex-col'>
            {locales.map((loc) => {
              const isActive = loc === currentLocale
              return (
                <NavigationMenuItem
                  key={loc}
                  className='list-none'
                >
                  <NavigationMenuLink asChild>
                    <Link
                      href={`${pathname}`}
                      locale={loc}
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
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default LanguageSwitcher
