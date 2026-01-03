'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FloatingLabel from './FloatingLabel'
import BrandButton from '@/components/shared/brand-button'

interface FormContactProps {
  buttonSubmitText?: string
  containerClassName?: string
}

const formSchema = z.object({
  email: z.email({
    error: 'Email không hợp lệ',
  }),
  message: z.string().optional(),
})

type IContact = z.infer<typeof formSchema>

export default function FormContact({
  containerClassName,
  buttonSubmitText = 'VIETNAM TRAVEL GUIDE BOOK',
}: FormContactProps) {
  const form = useForm<IContact>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  function onSubmit(values: IContact) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={containerClassName}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <FormItem className='space-y-2.5 mb-8 xsm:space-y-[0.9375rem]'>
              <FormControl>
                <FloatingLabel
                  label='Email'
                  autoComplete='email'
                  required
                  error={fieldState.error?.message}
                  {...field}
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
            <FormItem className='space-y-2.5 mb-[2.75rem] xsm:space-y-[0.9375rem]'>
              <FormControl>
                <FloatingLabel
                  label='Your message'
                  autoComplete='off'
                  error={fieldState.error?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage className='font-montserrat' />
              <FormDescription className='font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] text-white/60 xsm:font-medium xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:-tracking-[0.0075rem]'>
                We ensure that all your information is kept confidential
              </FormDescription>
            </FormItem>
          )}
        />
        <BrandButton
          type='submit'
          disabled={form.formState.isSubmitting}
          variant='orangeGradient'
          classNameButtonContainer='disabled:opacity-50 xsm:w-full'
        >
          {form.formState.isSubmitting ? 'Submitting' : buttonSubmitText}
        </BrandButton>
      </form>
    </Form>
  )
}
