'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { contactFormSchema } from '@/schemas/booking-tour.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import FloatingLabel from './FloatingLabel'
import { BrandButton } from '@/components/shared'

const messages = {
  fullNameRequired: 'Full name is required',
  emailRequired: 'Email is required',
  emailInvalid: 'Invalid email',
  phoneRequired: 'Phone is required',
  phoneInvalid: 'Invalid phone number',
}

export default function FormContact() {
  const schema = contactFormSchema(messages)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  })

  return (
    <Form {...form}>
      <form className='flex flex-1 flex-col gap-[3rem]'>
        <h2 className='font-phu-du w-[29.625rem] text-[3rem] leading-[3.6rem] text-[#3B3943]'>
          Provide your info, and we will help.
        </h2>
        <div className='flex flex-col gap-[2.25rem]'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabel
                    label='Full name'
                    autoComplete='name'
                    required
                    error={fieldState.error?.message}
                    {...field}
                    labelClassName='text-[#8B8B8B] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] normal-case'
                    requiredClassName='text-[#EF2020] ml-[0.25rem]'
                    className='border-b-[#8B8B8B]'
                  />
                </FormControl>
                <FormMessage className='font-montserrat' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabel
                    label='Phone number'
                    autoComplete='tel'
                    required
                    error={fieldState.error?.message}
                    {...field}
                    labelClassName='text-[#8B8B8B] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] normal-case'
                    requiredClassName='text-[#EF2020] ml-[0.25rem]'
                    className='border-b-[#8B8B8B]'
                  />
                </FormControl>
                <FormMessage className='font-montserrat' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabel
                    label='Email'
                    autoComplete='email'
                    required
                    error={fieldState.error?.message}
                    {...field}
                    labelClassName='text-[#8B8B8B] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] normal-case'
                    requiredClassName='text-[#EF2020] ml-[0.25rem]'
                    className='border-b-[#8B8B8B]'
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
                    label='Message'
                    autoComplete='off'
                    required
                    error={fieldState.error?.message}
                    {...field}
                    labelClassName='text-[#8B8B8B] font-montserrat text-[0.875rem] leading-[1.05rem] tracking-[0.00875rem] normal-case'
                    requiredClassName='text-[#EF2020] ml-[0.25rem]'
                    className='border-b-[#8B8B8B]'
                  />
                </FormControl>
                <FormMessage className='font-montserrat' />
              </FormItem>
            )}
          />
        </div>
        <BrandButton
          variant='blueGradient'
          classNameButtonContainer='w-[19rem]'
          type={{ variant: 'button', type: 'submit' }}
        >
          Send information
        </BrandButton>
      </form>
    </Form>
  )
}
