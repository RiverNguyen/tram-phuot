'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FloatingLabel from './FloatingLabel'
import CF7Request from '@/fetches/cf7Request'
import { BrandButton } from '@/components/shared'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { routing } from '@/i18n/routing'

interface FormContactProps {
  buttonSubmitText?: string
  containerClassName?: string
}

export default function FormContact({
  containerClassName,
  buttonSubmitText = 'VIETNAM TRAVEL GUIDE BOOK',
}: FormContactProps) {
  const params = useParams()

  const currentLocale = (params?.locale as string) || routing.defaultLocale

  const translateFooter = useTranslations('Footer')
  const messages = {
    emailRequired: translateFooter('emailRequired'),
    emailInvalid: translateFooter('emailInvalid'),
  }

  const formSchema = z.object({
    email: z.email({
      error: messages.emailInvalid,
    }),
    message: z.string().optional(),
  })

  type IContact = z.infer<typeof formSchema>

  const form = useForm<IContact>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: IContact) {
    try {
      const cf7Request = new CF7Request(values)

      const res = await cf7Request.send({
        id: currentLocale === 'en' ? '399' : '400', // 399: en, 400: vi
        unitTag: '123',
      })
      form.reset()
      toast.success(res.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Someting went wrong')
    }
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
            <FormItem className='xsm:space-y-[0.9375rem] mb-8 space-y-2.5'>
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
            <FormItem className='xsm:space-y-[0.9375rem] mb-[2.75rem] space-y-2.5'>
              <FormControl>
                <FloatingLabel
                  label={translateFooter('yourMessage')}
                  autoComplete='off'
                  error={fieldState.error?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage className='font-montserrat' />
              <FormDescription className='font-montserrat xsm:font-medium xsm:text-[0.75rem] xsm:leading-[1.2rem] xsm:-tracking-[0.0075rem] text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] text-white/60'>
                {translateFooter('formDesc')}
              </FormDescription>
            </FormItem>
          )}
        />
        <BrandButton
          type={{ variant: 'button', type: 'submit' }}
          disabled={form.formState.isSubmitting}
          variant='orangeGradient'
          classNameButtonContainer='w-[17.75rem] disabled:opacity-50 disabled:cursor-not-allowed xsm:w-full'
        >
          {form.formState.isSubmitting ? translateFooter('buttonSubmit') : buttonSubmitText}
        </BrandButton>
      </form>
    </Form>
  )
}
