'use client'
import { PaxType } from '@/enums'
import {
  calculateProvisionalPriceByPaxQuantity,
  PriceBreakdownItemType,
} from '@/modules/details-tour/utils'
import { useParams } from 'next/navigation'
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

interface BookingTourProviderProps {
  pricePerPax: number
  children: React.ReactNode
}

export type BookingTourContextType = {
  tourSlug: string
  bookingTourData: BookingTourDataType
  openBookingOverviewMobile: boolean
  openContactForm: boolean
  pricePerPaxTypes: Record<PaxType, PriceBreakdownItemType>
  tourPrice: PriceTourType
  setBookingTourData: Dispatch<SetStateAction<BookingTourDataType>>
  setOpenBookingOverviewMobile: Dispatch<SetStateAction<boolean>>
  setOpenContactForm: Dispatch<SetStateAction<boolean>>
  setTourPrice: Dispatch<SetStateAction<PriceTourType>>
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

export type PriceTourType = {
  provisionalPrice: number
  discountPrice: number
}

export default function BookingTourProvider({ pricePerPax, children }: BookingTourProviderProps) {
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
  const { pricePerPaxTypes, provisionalPrice } = calculateProvisionalPriceByPaxQuantity(
    bookingTourData.paxQuantity,
    pricePerPax,
  )
  const [tourPrice, setTourPrice] = useState<PriceTourType>({
    provisionalPrice,
    discountPrice: 0,
  })

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
        pricePerPaxTypes,
        tourPrice,
        setTourPrice,
      }}
    >
      {children}
    </BookingTourContext.Provider>
  )
}
