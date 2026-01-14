'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { ContactFormValues, contactFormSchema } from '@/schemas/booking-tour.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import FloatingLabel from './FloatingLabel'
import { BrandButton } from '@/components/shared'
import { toast } from 'sonner'
import endpoints from '@/configs/endpoints'
import CF7Request from '@/fetches/cf7Request'
import { useLocale, useTranslations } from 'next-intl'
import { PhoneInput } from '@/components/ui/phone-input-custom'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function FormContact({ title }: { title?: string }) {
  const locale = useLocale()

  const translateContactForm = useTranslations('ContactForm')
  const messages = {
    fullNameRequired: translateContactForm('fullNameRequired'),
    fullNameInvalid: translateContactForm('fullNameInvalid'),
    emailRequired: translateContactForm('emailRequired'),
    emailInvalid: translateContactForm('emailInvalid'),
    phoneRequired: translateContactForm('phoneRequired'),
    phoneInvalid: translateContactForm('phoneInvalid'),
  }

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema(messages)),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const request = new CF7Request(values)
      const cf7Form =
        locale === 'en'
          ? endpoints.contact_form.form_contact_en
          : endpoints.contact_form.form_contact_vi

      const response = await request.send({
        id: cf7Form.id,
        unitTag: cf7Form.unit_tag,
      })

      if (response?.invalid_fields?.length === 0) {
        toast.success(translateContactForm('submitSuccess'))
        form.reset()
      } else {
        toast.error(translateContactForm('submitFailed'))
      }
    } catch (error) {
      console.error('Form submission error', error)
      toast.error(translateContactForm('submitFailedMessage'))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='xsm:gap-9 flex flex-1 flex-col gap-12'
      >
        <h2 className='xsm:w-full xsm:text-[1.25rem] xsm:leading-6 xsm:tracking-[0.025rem] font-phu-du w-118.5 text-[3rem] leading-[3.6rem] font-medium text-[#3B3943]'>
          {title || ''}
        </h2>
        <div className='flex flex-col gap-[2.25rem]'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabel
                    label={translateContactForm('fullNameLabel')}
                    autoComplete='name'
                    required
                    error={fieldState.error?.message}
                    {...field}
                    labelClassName='text-[#8B8B8B] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] normal-case'
                    requiredClassName='text-[#EF2020] ml-[0.25rem]'
                  />
                </FormControl>
                <FormMessage className='font-montserrat' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field, fieldState }) => {
              const [isFocused, setIsFocused] = useState(false)
              const hasValue = !!field.value
              const shouldFloat = isFocused || hasValue

              return (
                <FormItem>
                  <FormControl>
                    <div className='relative z-0'>
                      <div className='relative flex items-center pb-3.75'>
                        <PhoneInput
                          {...field}
                          defaultCountry='VN'
                          placeholder=' '
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => {
                            if (!field.value) {
                              setIsFocused(false)
                            }
                          }}
                          className='peer text-body-t1 h-4.25 rounded-none border-none! px-0 py-0 text-[0.875rem] leading-[1.2] tracking-[0.00875rem] shadow-none! ring-0! outline-0!'
                        />
                        <label
                          htmlFor={field.name}
                          onClick={() => {
                            const input = document.querySelector(
                              `input[name="${field.name}"]`,
                            ) as HTMLInputElement
                            input?.focus()
                          }}
                          className={cn(
                            'font-montserrat pointer-events-auto absolute top-0 -z-10 origin-left transform cursor-text text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] text-[#8B8B8B] normal-case duration-300',
                            shouldFloat
                              ? '-translate-y-5.75 scale-75 translate-x-0'
                              : 'translate-y-0 scale-100 translate-x-14',
                          )}
                        >
                          {translateContactForm('phoneNumberLabel')}
                          <span className='text-[#EF2020] ml-1'>*</span>
                        </label>
                      </div>
                      <div
                        className={cn(
                          'h-px w-full transition-colors duration-300',
                          fieldState.error ? 'bg-destructive' : 'bg-[#8B8B8B]/40',
                        )}
                      ></div>
                    </div>
                  </FormControl>
                  <FormMessage className='font-montserrat' />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabel
                    label={translateContactForm('emailLabel')}
                    autoComplete='email'
                    required
                    error={fieldState.error?.message}
                    {...field}
                    labelClassName='text-[#8B8B8B] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] normal-case'
                    requiredClassName='text-[#EF2020] ml-[0.25rem]'
                  />
                </FormControl>
                <FormMessage className='font-montserrat' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='message'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabel
                    label={translateContactForm('messageLabel')}
                    autoComplete='off'
                    error={fieldState.error?.message}
                    {...field}
                    labelClassName='text-[#8B8B8B] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] normal-case'
                    requiredClassName='text-[#EF2020] ml-[0.25rem]'
                  />
                </FormControl>
                <FormMessage className='font-montserrat' />
              </FormItem>
            )}
          />
        </div>
        <BrandButton
          variant='blueGradient'
          classNameButtonContainer='xsm:w-full w-[19rem]'
          type={{ variant: 'button', type: 'submit' }}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? translateContactForm('sending')
            : translateContactForm('sendInformation')}
        </BrandButton>
      </form>
    </Form>
  )
}
