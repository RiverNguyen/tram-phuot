'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import { useTranslations } from 'next-intl'
import { DrawerHeader } from '@/modules/home/banner/_components/mobile/DrawerHeader'
import { ApplyButton } from '@/modules/home/banner/_components/mobile/ApplyButton'
import { Counter } from '@/modules/home/banner/_components/mobile/Counter'

interface GuestsDrawerProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  adults: number
  children: number
  onAdultsChange: (value: number) => void
  onChildrenChange: (value: number) => void
}

export const GuestsDrawer = ({
  open,
  onOpenChange,
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
}: GuestsDrawerProps) => {
  const t = useTranslations('HomePage.banner')

  return (
    <DrawerProvider
      open={open}
      setOpen={onOpenChange}
      showDrawerDrag={false}
    >
      <div className='pt-[1.5rem] pb-4'>
        <DrawerHeader
          title={t('numberOfGuests')}
          onClose={() => onOpenChange(false)}
        />
        <div className='space-y-6 px-4'>
          <Counter
            label={adults === 1 ? t('adult') : t('adults')}
            value={adults}
            onDecrease={() => onAdultsChange(Math.max(0, adults - 1))}
            onIncrease={() => onAdultsChange(adults + 1)}
            decreaseAriaLabel='Decrease adults'
            increaseAriaLabel='Increase adults'
          />
          <Counter
            label={t('children')}
            value={children}
            onDecrease={() => onChildrenChange(Math.max(0, children - 1))}
            onIncrease={() => onChildrenChange(children + 1)}
            decreaseAriaLabel='Decrease children'
            increaseAriaLabel='Increase children'
          />
        </div>
      </div>
      <ApplyButton onClick={() => onOpenChange(false)} />
    </DrawerProvider>
  )
}







