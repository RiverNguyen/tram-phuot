'use client'

import { Link } from '@/i18n/navigation'
import { IHeader } from '@/interface/site-setting.interface'
import Image from 'next/image'

interface MobileSocialMediaProps {
  socialMedia: IHeader['social_media']
}

const MobileSocialMedia = ({ socialMedia }: MobileSocialMediaProps) => {
  return (
    <div className='mx-[1.97rem] grid grid-cols-5 gap-4 mb-[2.78rem]'>
      {Array.isArray(socialMedia) &&
        socialMedia.map((item, index) => (
          <Link
            href={item.link}
            key={index}
          >
            <Image
              src={item.image}
              alt={''}
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
