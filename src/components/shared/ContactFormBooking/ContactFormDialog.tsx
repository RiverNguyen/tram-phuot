'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface ContactFormDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}

export default function ContactFormDialog({ open, setOpen, children }: ContactFormDialogProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])
  return (
    <div
      className={cn(
        'flex-center fixed top-0 left-0 z-[99] size-full transition-all duration-300 ease-out',
        open ? 'visible' : 'invisible',
      )}
    >
      <div
        onClick={() => setOpen(false)}
        className={cn(
          'absolute top-0 left-0 size-full bg-black/50 transition-all duration-300 ease-out z-[98]',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      ></div>
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out z-[99]',
          open ? 'top-1/2 -translate-y-1/2' : 'top-full',
        )}
      >
        {children}
      </div>
    </div>
  )
}
