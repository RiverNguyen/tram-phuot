'use client'

import ICClose from '@/components/icons/ICClose'
import RHFInputField from '@/components/shared/ContactFormBooking/RHFInputField'
import RHFPhoneInputField from '@/components/shared/ContactFormBooking/RHFPhoneInputField'
import { Form, FormField } from '@/components/ui/form'
import { ContactFormValues, contactFormSchema } from '@/schemas/booking-tour.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

type HotelContactFormContentProps = {
  onSubmitForm: (data: ContactFormValues) => Promise<{ success: boolean }>
  onClose: () => void
}

export default function HotelContactFormContent({
  onSubmitForm,
  onClose,
}: HotelContactFormContentProps) {
  const [isPending, startTransition] = useTransition()
  const translateContactFormBooking = useTranslations('ContactFormBooking')
  const t = useTranslations('DetailHotelPage')
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
        reset()
        onClose()
      }
    })
  }

  return (
    <section className='xsm:w-full xsm:max-w-full xsm:p-5 xsm:gap-y-0 xsm:max-h-[75vh] xsm:overflow-y-auto relative flex w-215.5 max-w-[80vw] flex-col gap-y-8 rounded-[1rem] bg-white p-8'>
      <button
        type='button'
        disabled={isPending}
        onClick={onClose}
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
                field={field as any}
                className='col-span-full'
                placeholder={t('textFullName')}
              />
            )}
          />
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <RHFInputField
                required
                field={field as any}
                className='col-span-1'
                placeholder={t('textEmail')}
              />
            )}
          />
          <FormField
            name='phoneNumber'
            control={form.control}
            render={({ field }) => (
              <RHFPhoneInputField
                required
                field={field as any}
                className='col-span-1'
                placeholder={t('textPhoneNumber')}
              />
            )}
          />
          <FormField
            name='message'
            control={form.control}
            render={({ field }) => (
              <RHFInputField
                field={field as any}
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
