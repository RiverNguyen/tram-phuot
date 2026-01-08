'use client'

import { IHeader } from '@/interface/site-setting.interface'
import { Link } from '@/i18n/navigation'
import { XIcon } from 'lucide-react'
import Image from 'next/image'

interface MobileSheetHeaderProps {
  data: IHeader
  onClose: () => void
}

const MobileSheetHeader = ({ data, onClose }: MobileSheetHeaderProps) => {
  return (
    <div className='flex-between px-[1.4375rem] py-[1.125rem] shadow-sm'>
      <Link href='/'>
        <Image
          src={'/header/logo.svg'}
          alt={data.logo.alt}
          width={140}
          height={40}
          className='h-[2.5rem] w-[8.75rem] object-cover mt-0.75'
        />
      </Link>

      <button
        onClick={onClose}
        className='size-[1.5rem] flex-center'
      >
        <XIcon className='size-full text-[#630F3F]' />
      </button>
    </div>
  )
}

export default MobileSheetHeader







