'use client'

import { PopupGallery } from '@/components/shared'
import ICAlbum from '@/modules/details-tour/icons/ICAlbum'
import { WPImage } from '@/types/acf-wordpress.type'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

interface GalleryImageProps {
  imageList: WPImage[]
  previewImage: WPImage
}
export default function GalleryImage({ imageList, previewImage }: GalleryImageProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  const [openGallery, setOpenGallery] = useState<boolean>(false)

  const handleClickShowGallery = () => {
    setOpenGallery(true)
  }

  return (
    <div className='xsm:rounded-[0.63725rem] relative size-full rounded-[1rem] bg-[#F5F5F5]'>
      {previewImage?.url && (
        <Image
          alt={previewImage?.alt || ''}
          width={500}
          height={305}
          src={previewImage?.url}
          className='size-full rounded-[inherit] object-cover'
        />
      )}

      <button
        type='button'
        onClick={handleClickShowGallery}
        className='xsm:px-[1.05725rem] xsm:h-[2.2467rem] xsm:rounded-[0.625rem] xsm:bottom-[0.4rem] xsm:right-[0.38rem] xsm:space-x-0 font-montserrat absolute right-3 bottom-3 flex h-8.5 cursor-pointer items-center space-x-2 rounded-full bg-white px-4'
      >
        <ICAlbum className='xsm:size-[1.18944rem] size-4.5 shrink-0' />
        <span className='xsm:hidden text-[0.875rem] leading-[1.2] font-semibold tracking-[-0.025rem] text-[#181818]'>
          {translateDetailsTourPage('textShowGallery')}
        </span>
      </button>

      <PopupGallery
        open={openGallery}
        setOpen={setOpenGallery}
        items={imageList}
      />
    </div>
  )
}
