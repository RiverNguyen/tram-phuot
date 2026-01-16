'use client'

import { submitTourBooking } from '@/actions/tour-booking'
import DrawerProvider from '@/components/provider/DrawerProvider'
import { ContactFormContent, ContactFormDialog } from '@/components/shared/ContactFormBooking'
import ENDPOINTS from '@/configs/endpoints'
import useIsMobile from '@/hooks/useIsMobile'
import { BookingTourContext } from '@/modules/details-tour/providers/BookingTourProvider'
import { ContactFormValues } from '@/schemas/booking-tour.schema'
import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

interface ContactFormProps {
  pricePerPax: number
  tourTitle: string
}

export default function ContactForm({ pricePerPax = 0, tourTitle = '' }: ContactFormProps) {
  const bookingTourContext = useContext(BookingTourContext)
  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }
  const { bookingTourData, openContactForm, tourPrice, setOpenContactForm } = bookingTourContext
  const locale = useLocale()
  const isMobile = useIsMobile()
  const router = useRouter()

  const handleSubmitForm = async (contactData: ContactFormValues) => {
    try {
      const {
        startDate,
        endDate,
        paxQuantity: { adults, children58, children14, children9 },
      } = bookingTourData
      if (!startDate || !endDate || !adults) {
        return { success: false }
      }

      const formData = {
        ...contactData,
        startDate: format(startDate, 'dd/MM/yyyy'),
        endDate: format(endDate, 'dd/MM/yyyy'),
        adults: adults,
        children9: children9,
        children58: children58,
        children14: children14,
        provisionalPrice: tourPrice?.provisionalPrice || 0,
        discountPrice: tourPrice?.discountPrice || 0,
        totalPrice: tourPrice?.provisionalPrice - tourPrice?.discountPrice || 0,
      }

      const CONTACT_ENDPOINT_BY_LOCALE = {
        vi: ENDPOINTS.contact_form.form_booking_tour_vi,
        en: ENDPOINTS.contact_form.form_booking_tour_en,
      }
      const endpoint = CONTACT_ENDPOINT_BY_LOCALE[locale as keyof typeof CONTACT_ENDPOINT_BY_LOCALE]

      const response = await submitTourBooking({
        formData,
        id: endpoint.id,
        unitTag: endpoint.unit_tag,
      })

      if (locale === 'en') {
        router.push('/thank-you')
      } else {
        router.push('/vi/cam-on')
      }

      if (response.status === 'mail_sent') return { success: true }
      return { success: false }
    } catch (error) {
      return { success: false }
    }
  }

  return (
    <>
      {!isMobile && (
        <ContactFormDialog
          open={openContactForm}
          setOpen={setOpenContactForm}
        >
          <ContactFormContent
            onSubmitForm={handleSubmitForm}
            tourTitle={tourTitle}
          />
        </ContactFormDialog>
      )}

      {isMobile && (
        <DrawerProvider
          open={openContactForm}
          setOpen={setOpenContactForm}
          className='rounded-t-[0.5rem]'
        >
          <ContactFormContent
            onSubmitForm={handleSubmitForm}
            tourTitle={tourTitle}
          />
        </DrawerProvider>
      )}
    </>
  )
}
