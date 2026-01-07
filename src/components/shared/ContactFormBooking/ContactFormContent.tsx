'use client'

import RHFInputField from '@/components/shared/ContactFormBooking/RHFInputField'
import RHFPhoneInputField from '@/components/shared/ContactFormBooking/RHFPhoneInputField'
import { Form, FormField } from '@/components/ui/form'
import { BookingTourContext } from '@/modules/details-tour/providers/BookingTourProvider'
import { contactFormSchema, ContactFormValues } from '@/schemas/booking-tour.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useContext, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface ContactFormContentProps {
  onSubmitForm: (data: ContactFormValues) => Promise<{ success: boolean }>
}

export default function ContactFormContent({ onSubmitForm }: ContactFormContentProps) {
  const bookingTourContext = useContext(BookingTourContext)
  const [isPending, startTransition] = useTransition()

  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }
  const { setOpenContactForm } = bookingTourContext

  const translateContactFormBooking = useTranslations('ContactFormBooking')

  const translateContactFormBookingMessages = {
    fullNameRequired: translateContactFormBooking('fullNameRequired'),
    emailRequired: translateContactFormBooking('emailRequired'),
    emailInvalid: translateContactFormBooking('emailInvalid'),
    phoneRequired: translateContactFormBooking('phoneRequired'),
    phoneInvalid: translateContactFormBooking('phoneInvalid'),
  }
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema(translateContactFormBookingMessages)),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  })

  const { reset } = form

  const handleSubmitForm = async (data: ContactFormValues) => {
    if (!onSubmitForm) return
    startTransition(async () => {
      const response = await onSubmitForm(data)
      if (response.success) {
        setOpenContactForm(false)
        toast.success(translateContactFormBooking('bookingTourSuccessfully'))
      } else {
        toast.error(translateContactFormBooking('bookingTourFailed'))
      }
      reset()
    })
  }

  return (
    <section className='xsm:w-full xsm:max-w-full xsm:p-5 xsm:gap-y-0 xsm:max-h-[75vh] xsm:overflow-y-auto relative flex w-215.5 max-w-[80vw] flex-col gap-y-8 rounded-[1rem] bg-white p-8'>
      <button
        type='button'
        disabled={isPending}
        onClick={() => setOpenContactForm(false)}
        className='flex-center absolute top-3 right-3 size-8 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ICClose className='size-[0.8rem]' />
      </button>
      <div className='xsm:space-y-2 xsm:mb-5 space-y-2.5'>
        <h2 className='section-title-h2 font-phu-du xsm:tracking-[-0.03125rem] xsm:leading-snug w-fit text-[1.5rem] leading-[1.1] font-bold'>
          {translateContactFormBooking('title')}
        </h2>
        <p className='text-body/60 xsm:text-[0.75rem] xsm:text-body/75 xsm:leading-[1.4] font-montserrat text-[0.875rem] leading-normal'>
          ({translateContactFormBooking('description')})
        </p>
      </div>
      <Form {...form}>
        <form
          id='contact-form'
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className='xsm:gap-x-0 xsm:gap-y-9 xsm:mb-3 xsm:grid-cols-1 grid grid-cols-2 gap-x-5 gap-y-6'
        >
          <FormField
            name='fullName'
            control={form.control}
            render={({ field }) => (
              <RHFInputField
                required
                field={field}
                className='col-span-full'
                placeholder='Pham Thanh'
              />
            )}
          />
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <RHFInputField
                required
                field={field}
                className='col-span-1'
                placeholder='thomas123@gmail.com'
              />
            )}
          />
          <FormField
            name='phoneNumber'
            control={form.control}
            render={({ field }) => (
              <RHFPhoneInputField
                required
                field={field}
                className='col-span-1'
                placeholder='033.8792.9999'
              />
            )}
          />
          <FormField
            name='message'
            control={form.control}
            render={({ field }) => (
              <RHFInputField
                field={field}
                className='col-span-full'
                placeholder={translateContactFormBooking('textMessage')}
              />
            )}
          />
        </form>
      </Form>
      <button
        type='submit'
        form='contact-form'
        disabled={isPending}
        className='flex-center h-10 w-full cursor-pointer rounded-[0.625rem] bg-[linear-gradient(50deg,#03328C_-18.36%,#00804D_82.62%)] disabled:cursor-not-allowed disabled:opacity-50'
      >
        <span className='font-montserrat text-[0.875rem] leading-none font-semibold text-[#F9EAD5] uppercase'>
          {translateContactFormBooking('submitButton')}
        </span>
      </button>
    </section>
  )
}

function ICClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={13}
      height={13}
      viewBox='0 0 13 13'
      fill='none'
      {...props}
    >
      <path
        d='M0.289885 11.0342C-0.0940168 11.4181 -0.101852 12.0998 0.29772 12.4993C0.705126 12.8989 1.38675 12.8911 1.76282 12.515L6.40098 7.87685L11.0313 12.5072C11.423 12.8989 12.0968 12.8989 12.4964 12.4993C12.896 12.0919 12.896 11.426 12.5042 11.0342L7.87391 6.40392L12.5042 1.76576C12.896 1.37402 12.9038 0.700236 12.4964 0.300665C12.0968 -0.0989062 11.423 -0.0989062 11.0313 0.29283L6.40098 4.92315L1.76282 0.29283C1.38675 -0.0910714 0.697291 -0.106741 0.29772 0.300665C-0.101852 0.700236 -0.0940168 1.38969 0.289885 1.76576L4.92021 6.40392L0.289885 11.0342Z'
        fill='#2E2E2E'
      />
    </svg>
  )
}
