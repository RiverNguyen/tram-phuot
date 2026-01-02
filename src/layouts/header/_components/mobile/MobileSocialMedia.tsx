'use client'

import { ISocialMedia } from '@/interface/site-setting.interface'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

interface MobileSocialMediaProps {
  socialMedia: ISocialMedia[]
}

const MobileSocialMedia = ({ socialMedia }: MobileSocialMediaProps) => {
  return (
    <div className='mx-[1.97rem] grid grid-cols-5 gap-4 mb-[2.78rem]'>
      {socialMedia.map((item, index) => (
        <Link
          href={item.link?.url || '/'}
          key={index}
        >
          <Image
            src={item.image?.url || '/'}
            alt={item.image?.alt || ''}
            width={48}
            height={48}
            className='size-[3rem] object-cover'
          />
        </Link>
      ))}
    </div>
  )
}

export default MobileSocialMedia

