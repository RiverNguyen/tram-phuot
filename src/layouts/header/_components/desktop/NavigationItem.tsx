'use client'

import { ICChevron } from '@/components/icons'
import { IHeader } from '@/interface/site-setting.interface'
import Link from 'next/link'
import { motion } from 'motion/react'

interface NavigationItemProps {
  item: IHeader['navigations'][0]
  index: number
  hoveredIndex: number | null
  hoveredSide: 'left' | 'right' | null
  side: 'left' | 'right'
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const NavigationItem = ({
  item,
  index,
  hoveredIndex,
  hoveredSide,
  side,
  onMouseEnter,
  onMouseLeave,
}: NavigationItemProps) => {
  if (item.select === 'normal') {
    const url = item?.page_link_normal?.url
    if (!url) return null
    return (
      <Link
        href={url}
        className='leading-[1.6] tracking-[0.04rem] text-white/80 hover:text-white transition-all duration-300 h-full flex items-center px-[1.125rem] first:pl-0 last:pr-0 cursor-pointer'
      >
        {item?.page_link_normal?.title}
      </Link>
    )
  } else {
    const url = item?.page_link_parent?.title?.url
    if (!url) return null
    return (
      <div
        className='relative flex items-center group h-full px-[1.125rem] cursor-pointer'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link
          href={url}
          className='leading-[1.6] tracking-[0.04rem] text-white/80'
        >
          <motion.span
            animate={{
              color:
                hoveredIndex === index && hoveredSide === side
                  ? '#ffffff'
                  : 'rgba(255, 255, 255, 0.8)',
            }}
            transition={{ duration: 0.3 }}
          >
            {item?.page_link_parent?.title?.title}
          </motion.span>
        </Link>
        <motion.div
          animate={{
            opacity: hoveredIndex === index && hoveredSide === side ? 1 : 0.5,
          }}
          style={{ transformOrigin: 'center' }}
          transition={{ duration: 0.3 }}
          className='flex items-center justify-center'
        >
          <ICChevron
            className={`ml-[0.4375rem] size-[0.8125rem] text-white/80 transition-all duration-300 ${
              hoveredIndex === index && hoveredSide === side ? 'rotate-180' : ''
            }`}
          />
        </motion.div>
      </div>
    )
  }
}

export default NavigationItem
