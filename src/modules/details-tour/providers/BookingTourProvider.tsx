'use client'
import { useParams } from 'next/navigation'
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

interface BookingTourProviderProps {
  children: React.ReactNode
}

export type BookingTourContextType = {
  tourSlug: string
  bookingTourData: BookingTourDataType
  openBookingOverviewMobile: boolean
  openContactForm: boolean
  setBookingTourData: Dispatch<SetStateAction<BookingTourDataType>>
  setOpenBookingOverviewMobile: Dispatch<SetStateAction<boolean>>
  setOpenContactForm: Dispatch<SetStateAction<boolean>>
}

export const BookingTourContext = createContext<BookingTourContextType | null>(null)

export type BookingTourDataType = {
  startDate?: Date
  endDate?: Date
  paxQuantity: {
    adults: number
    children58: number
    children14: number
  }
}

export default function BookingTourProvider({ children }: BookingTourProviderProps) {
  const searchParams = useParams()
  const tourSlug = searchParams.slug as string
  const [bookingTourData, setBookingTourData] = useState<BookingTourDataType>({
    startDate: undefined,
    endDate: undefined,
    paxQuantity: {
      adults: 1,
      children58: 0,
      children14: 0,
    },
  })

  const [openBookingOverviewMobile, setOpenBookingOverviewMobile] = useState<boolean>(false)
  const [openContactForm, setOpenContactForm] = useState<boolean>(false)

  return (
    <BookingTourContext.Provider
      value={{
        tourSlug,
        bookingTourData,
        openBookingOverviewMobile,
        openContactForm,
        setBookingTourData,
        setOpenBookingOverviewMobile,
        setOpenContactForm,
      }}
    >
      {children}
    </BookingTourContext.Provider>
  )
}
