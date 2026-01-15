'use client'

import { FC } from 'react'

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

interface DrawerProviderProps {
  children: React.ReactNode
  className?: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  showDrawerDrag?: boolean
}

const DrawerProvider: FC<DrawerProviderProps> = ({
  children,
  className,
  open,
  setOpen,
  showDrawerDrag = false,
}) => {
  return (
    <Drawer
      onOpenChange={(open) => setOpen(open)}
      open={open}
    >
      <DrawerContent
        suppressHydrationWarning
        className={cn('w-full rounded-[1rem_1rem_0rem_0rem] bg-white', className)}
        showDrawerDrag={showDrawerDrag}
      >
        {/* Giữ lại để tránh báo error */}
        <DrawerHeader className='hidden'>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerProvider
