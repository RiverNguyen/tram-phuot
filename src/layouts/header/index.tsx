'use client'

import { ICCMenu } from '@/components/icons'
import SheetProvider from '@/components/provider/SheetProvider'
import { IHeader, ISocialMedia } from '@/interface/site-setting.interface'
import { Link } from '@/i18n/navigation'
import DropdownMenu from '@/layouts/header/_components/desktop/DropdownMenu'
import NavigationMenu from '@/layouts/header/_components/desktop/NavigationMenu'
import MobileLanguageSwitcher from '@/layouts/header/_components/mobile/MobileLanguageSwitcher'
import MobileNavigation from '@/layouts/header/_components/mobile/MobileNavigation'
import MobileSheetHeader from '@/layouts/header/_components/mobile/MobileSheetHeader'
import MobileSocialMedia from '@/layouts/header/_components/mobile/MobileSocialMedia'
import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

const Header = ({ data, socialMedia }: { data: IHeader; socialMedia: ISocialMedia[] }) => {
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

  return (
    <>
      <header className='fixed top-[0.625rem] xsm:top-3 left-[50%] z-50 h-[4.5rem] w-[87.5rem] xsm:h-[3.75rem] xsm:w-[calc(100%-2rem)] translate-x-[-50%] rounded-[1rem] xsm:rounded-[0.75rem] bg-black/50 p-[0_3.125rem] backdrop-blur-[10px] xsm:p-[0.625rem]'>
        {/* Desktop Navigation */}
        <div className='xsm:hidden flex items-center justify-between h-full z-[50]'>
          <NavigationMenu
            items={navLeft}
            side='left'
            hoveredIndex={hoveredIndex}
            hoveredSide={hoveredSide}
            onItemHover={handleItemHover}
            onItemLeave={handleItemLeave}
          />
          <Image
            src={data.logo.url}
            alt={data.logo.alt}
            width={data.logo.width}
            height={data.logo.height}
            className='h-[3rem] w-auto object-cover'
          />
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
        <div className='hidden xsm:flex h-full flex-between'>
          <Link href='/'>
            <Image
              src={data.logo.url}
              alt={data.logo.alt}
              width={140}
              height={40}
              className='h-[2.5rem] w-[8.75rem] object-cover mt-0.75'
            />
          </Link>
          <button
            onClick={() => setOpenSheet(true)}
            className='h-[2.5rem] px-4 rounded-[0.5rem] bg-white/20 backdrop-blur-[5px] flex-center text-white text-[0.75rem] font-medium leading-[1.5]'
          >
            <ICCMenu className='w-4 h-[0.7rem] text-white mr-2' />
            Menu
          </button>
        </div>

        {/* Mobile Sheet/Drawer */}
        <SheetProvider
          open={openSheet}
          setOpen={setOpenSheet}
          className='border-0 w-full rounded-none p-0'
          hideCloseButton
        >
          <div className='bg-white'>
            <MobileSheetHeader
              data={data}
              onClose={() => setOpenSheet(false)}
            />
            <MobileNavigation data={data} />
          </div>
          <div className='py-[1.5rem] absolute bottom-0 left-0 w-full bg-white'>
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
