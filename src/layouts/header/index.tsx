'use client'

import { IHeader } from '@/interface/site-setting.interface'
import DropdownMenu from '@/layouts/header/_components/DropdownMenu'
import NavigationMenu from '@/layouts/header/_components/NavigationMenu'
import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

const Header = ({ data }: { data: IHeader }) => {
  const navLeft = data?.navigations ? data.navigations.slice(0, 4) : []
  const navRight = data?.navigations ? data.navigations.slice(4) : []
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null)

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
      <header className='fixed top-[0.625rem] left-[50%] z-50 flex h-[4.5rem] w-[87.5rem] translate-x-[-50%] items-center justify-between rounded-[1rem] bg-black/50 p-[0_3.125rem] backdrop-blur-[10px]'>
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
