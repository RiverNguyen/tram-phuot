'use client'

import { Separator } from '@/components/ui/separator'
import { XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface DrawerHeaderProps {
  title: string
  onClose: () => void
}

export const DrawerHeader = ({ title, onClose }: DrawerHeaderProps) => {
  const t = useTranslations('HomePage.banner')

  return (
    <>
      <div className='flex-between px-4'>
        <p className='text-[1.125rem] font-bold leading-[1.1] text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)]'>
          {title}
        </p>
        <XIcon
          className='size-[1.25rem] text-[#2e2e2e] cursor-pointer'
          onClick={onClose}
        />
      </div>
      <Separator className='my-5 text-[#e6e6e6]' />
    </>
  )
}
