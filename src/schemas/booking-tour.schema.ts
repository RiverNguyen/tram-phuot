import { z } from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const bookingTourSchema = (messages: Record<string, string>) =>
  z
    .object({
      startDate: z.date({
        error: messages.startDateRequired,
      }),
      endDate: z.date({
        error: messages.endDateRequired,
      }),
      paxQuantity: z.object({
        adults: z.number().int().min(1, messages.adultsMin),
        children58: z.number().int().min(0),
        children14: z.number().int().min(0),
      }),

      voucherCode: z.string().optional(),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: messages.endDateAfterStartDate,
      path: ['endDate'],
    })

export const contactFormSchema = (messages: Record<string, string>) =>
  z.object({
    fullName: z.string().min(1, messages.fullNameRequired),
    email: z.string().min(1, messages.emailRequired).email(messages.emailInvalid),
    phoneNumber: z
      .string()
      .min(1, messages.phoneRequired)
      .refine(
        (value) => {
          const phone = parsePhoneNumberFromString(value)
          return phone?.isValid() ?? false
        },
        {
          message: messages.phoneInvalid,
        },
      ),
    message: z.string().optional(),
  })

export type BookingTourFormValues = z.infer<ReturnType<typeof bookingTourSchema>>
export type ContactFormValues = z.infer<ReturnType<typeof contactFormSchema>>
