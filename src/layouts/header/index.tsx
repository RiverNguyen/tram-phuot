'use client'

import { ICCMenu } from '@/components/icons'
import SheetProvider from '@/components/provider/SheetProvider'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { Link } from '@/i18n/navigation'
import { IHeader } from '@/interface/site-setting.interface'
import DropdownMenu from '@/layouts/header/_components/desktop/DropdownMenu'
import NavigationMenu from '@/layouts/header/_components/desktop/NavigationMenu'
import MobileLanguageSwitcher from '@/layouts/header/_components/mobile/MobileLanguageSwitcher'
import MobileNavigation from '@/layouts/header/_components/mobile/MobileNavigation'
import MobileSheetHeader from '@/layouts/header/_components/mobile/MobileSheetHeader'
import MobileSocialMedia from '@/layouts/header/_components/mobile/MobileSocialMedia'
import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'

const Header = ({ data, socialMedia }: { data: IHeader; socialMedia: IHeader['social_media'] }) => {
  const navLeft = data?.navigations ? data.navigations.slice(0, 4) : []
  const navRight = data?.navigations ? data.navigations.slice(4) : []
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null)
  const [openSheet, setOpenSheet] = useState(false)

  const handleItemHover = (index: number, side: 'left' | 'right') => {
    setHoveredIndex(index)
    setHoveredSide(side)
  }

  const handleItemLeave = () => {
    setHoveredIndex(null)
    setHoveredSide(null)
  }

  const handleDropdownMouseEnter = () => {
    if (hoveredIndex !== null && hoveredSide) {
      setHoveredIndex(hoveredIndex)
      setHoveredSide(hoveredSide)
    }
  }

  const handleClose = () => {
    setHoveredIndex(null)
    setHoveredSide(null)
  }

  const headerRef = useRef<HTMLElement>(null)
  useScrollHeader(headerRef as React.RefObject<HTMLElement>)

  return (
    <>
      <header
        className='fixed top-[0.625rem] xsm:top-3 left-[50%] z-50 h-[4.5rem] w-[87.5rem] xsm:h-[3.75rem] xsm:w-[calc(100%-2rem)] translate-x-[-50%] transition-transform duration-500 rounded-[1rem] xsm:rounded-[0.75rem] bg-black/50 p-[0_3.125rem] backdrop-blur-[10px] xsm:p-[0.625rem]'
        ref={headerRef}
      >
        {/* Desktop Navigation */}
        <div className='xsm:hidden z-[50] flex h-full items-center justify-between'>
          <NavigationMenu
            items={navLeft}
            side='left'
            hoveredIndex={hoveredIndex}
            hoveredSide={hoveredSide}
            onItemHover={handleItemHover}
            onItemLeave={handleItemLeave}
          />
          <Link href='/'>
            <Image
              src={data.logo.url}
              alt={data.logo.alt}
              width={data.logo.width}
              height={data.logo.height}
              className='h-[3rem] w-auto object-cover'
            />
          </Link>
          <NavigationMenu
            items={navRight}
            side='right'
            hoveredIndex={hoveredIndex}
            hoveredSide={hoveredSide}
            onItemHover={handleItemHover}
            onItemLeave={handleItemLeave}
          />
        </div>

        {/* Mobile Navigation */}
        <div className='xsm:flex flex-between hidden h-full'>
          <Link href='/'>
            <Image
              src={data.logo.url}
              alt={data.logo.alt}
              width={140}
              height={40}
              className='mt-0.75 h-[2.5rem] w-[8.75rem] object-cover'
            />
          </Link>
          <button
            onClick={() => setOpenSheet(true)}
            className='flex-center h-[2.5rem] rounded-[0.5rem] bg-white/20 border-none px-4 text-[0.75rem] leading-[1.5] font-medium text-white backdrop-blur-[5px]'
          >
            <ICCMenu className='mr-2 h-[0.7rem] w-4 text-white' />
            Menu
          </button>
        </div>

        {/* Mobile Sheet/Drawer */}
        <SheetProvider
          open={openSheet}
          setOpen={setOpenSheet}
          className='w-full rounded-none border-none p-0'
          hideCloseButton
        >
          <div>
            <MobileSheetHeader
              data={data}
              onClose={() => setOpenSheet(false)}
            />
            <MobileNavigation data={data} />
          </div>
          <div className='absolute bottom-0 left-0 w-full bg-white py-[1.5rem]'>
            <MobileSocialMedia socialMedia={socialMedia} />
            <MobileLanguageSwitcher />
          </div>
        </SheetProvider>

        {/* Desktop Dropdown Menu */}
      </header>
      <AnimatePresence>
        {hoveredIndex !== null && hoveredSide && (
          <DropdownMenu
            hoveredIndex={hoveredIndex}
            hoveredSide={hoveredSide}
            navLeft={navLeft}
            navRight={navRight}
            onClose={handleClose}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleItemLeave}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
