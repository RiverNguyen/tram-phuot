'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import { ContactFormContent, ContactFormDialog } from '@/components/shared/ContactFormBooking'
import ENDPOINTS from '@/configs/endpoints'
import CF7Request from '@/fetches/cf7Request'
import useIsMobile from '@/hooks/useIsMobile'
import { BookingTourContext } from '@/modules/details-tour/providers/BookingTourProvider'
import { calculateProvisionalPriceByPaxQuantity } from '@/modules/details-tour/utils'
import { ContactFormValues } from '@/schemas/booking-tour.schema'
import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import { useContext } from 'react'

interface ContactFormProps {
  pricePerPax: number
}

export default function ContactForm({ pricePerPax = 0 }: ContactFormProps) {
  const bookingTourContext = useContext(BookingTourContext)
  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }
  const { bookingTourData, openContactForm, tourPrice, setOpenContactForm } = bookingTourContext
  const locale = useLocale()
  const isMobile = useIsMobile()

  const handleSubmitForm = async (contactData: ContactFormValues) => {
    try {
      const {
        startDate,
        endDate,
        paxQuantity: { adults, children58, children14 },
      } = bookingTourData
      if (!startDate || !endDate || !adults) {
        return { success: false }
      }

      const formData = {
        ...contactData,
        startDate: format(startDate, 'dd/MM/yyyy'),
        endDate: format(endDate, 'dd/MM/yyyy'),
        adults: adults,
        children58: children58,
        children14: children14,
        provisionalPrice: tourPrice?.provisionalPrice || 0,
        discountPrice: tourPrice?.discountPrice || 0,
        totalPrice: tourPrice?.provisionalPrice - tourPrice?.discountPrice || 0,
      }

      const cf7Request = new CF7Request(formData)

      const CONTACT_ENDPOINT_BY_LOCALE = {
        vi: ENDPOINTS.contact_form.form_booking_tour_vi,
        en: ENDPOINTS.contact_form.form_booking_tour_en,
      }
      const endpoint = CONTACT_ENDPOINT_BY_LOCALE[locale as keyof typeof CONTACT_ENDPOINT_BY_LOCALE]
      const response = await cf7Request.send({ id: endpoint.id, unitTag: endpoint.unit_tag })

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
          <ContactFormContent onSubmitForm={handleSubmitForm} />
        </ContactFormDialog>
      )}

      {isMobile && (
        <DrawerProvider
          open={openContactForm}
          setOpen={setOpenContactForm}
          showDrawerDrag={false}
          className='rounded-t-[0.5rem]'
        >
          <ContactFormContent onSubmitForm={handleSubmitForm} />
        </DrawerProvider>
      )}
    </>
  )
}
