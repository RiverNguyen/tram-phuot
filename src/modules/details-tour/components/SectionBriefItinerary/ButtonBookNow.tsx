'use client'
import { BrandButton } from '@/components/shared'
import { scrollToSection } from '@/utils/scrollToSection'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function ButtonBookNow() {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')

  const handleClickButton = () => {
    scrollToSection('section-booking', 1, 6)
  }

  return (
    <BrandButton
      type={{ variant: 'button', type: 'button', onClick: handleClickButton }}
      variant='blueGradient'
      classNameButtonContainer='w-full'
    >
      {translateDetailsTourPage('textBookNow')}
    </BrandButton>
  )
}
