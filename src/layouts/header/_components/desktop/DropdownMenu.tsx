'use client'

import { IHeader } from '@/interface/site-setting.interface'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { XIcon } from 'lucide-react'
import { decodeHtmlEntities } from '@/lib/utils'

interface DropdownMenuProps {
  hoveredIndex: number | null
  hoveredSide: 'left' | 'right' | null
  navLeft: IHeader['navigations']
  navRight: IHeader['navigations']
  onClose: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const DropdownMenu = ({
  hoveredIndex,
  hoveredSide,
  navLeft,
  navRight,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: DropdownMenuProps) => {
  const currentNav = hoveredSide === 'left' ? navLeft : navRight
  const currentItem = currentNav[hoveredIndex!]

  if (!currentItem?.page_link_parent?.link) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className='fixed top-[5.125rem] left-[50%] z-40 w-[87.5rem] -translate-x-1/2 rounded-t-[1rem] min-h-[38.0625rem] overflow-hidden shadow-[0_592.313px_165.848px_0_rgba(0,0,0,0.00),_0_379.08px_151.807px_0_rgba(0,0,0,0.01),_0_213.232px_128.115px_0_rgba(0,0,0,0.05),_0_94.77px_94.77px_0_rgba(0,0,0,0.09),_0_23.692px_51.772px_0_rgba(0,0,0,0.10)] xsm:hidden'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background */}
      <div className='absolute w-full h-full left-0 top-0'>
        <Image
          src={'/header/menu.webp'}
          alt='menu'
          fill
          className='object-cover'
        />
        <XIcon
          className='size-3.5 absolute top-[4rem] right-[4rem] text-black cursor-pointer z-10'
          onClick={onClose}
        />
      </div>

      {/* Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={`${hoveredSide}-${hoveredIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className='relative z-10 top-[4rem] left-[4rem] w-fit'
        >
          <p className='font-phu-du text-[4.8rem] font-bold leading-[1.1] tracking-[0.096rem] text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit mb-[3.575rem]'>
            {currentItem.page_link_parent.title.title}
          </p>
          {(() => {
            const filteredLinks = currentItem.page_link_parent.link.filter(
              (linkItem) => linkItem?.item?.url,
            )
            const itemCount = filteredLinks.length
            const cols = itemCount <= 4 ? 1 : 2
            return (
              <div
                className='grid gap-y-[1.0625rem] gap-x-[2rem]'
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(15.18rem, 15.18rem))`,
                }}
              >
                {filteredLinks.map((linkItem, linkIndex) => (
                  <motion.div
                    key={linkIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={linkItem.item.url}
                      target={linkItem.item.target}
                      className='block text-[#2E2E2E]/75 font-semibold leading-[1.5] tracking-[-0.02rem] w-fit whitespace-nowrap hover:text-black transition-all duration-300'
                    >
                      {decodeHtmlEntities(linkItem.item.title)}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Background Image */}
      <Image
        src={currentItem.page_link_parent.image.url}
        alt={currentItem.page_link_parent.image.alt}
        width={1130}
        height={500}
        className='object-cover absolute bottom-0 right-0 w-[70.625rem] h-[31.25rem] pointer-events-none'
      />
    </motion.div>
  )
}

export default DropdownMenu
