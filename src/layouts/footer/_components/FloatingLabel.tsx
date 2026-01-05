'use client'

import { cn } from '@/lib/utils'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface FloatingLabelProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  wrapperClassName?: string
  labelClassName?: string
  label?: string
  error?: string
}

export default function FloatingLabel({
  wrapperClassName,
  labelClassName,
  label,
  required,
  error,
  ...props
}: FloatingLabelProps) {
  return (
    <div className={cn('relative z-0', wrapperClassName)}>
      <input
        {...props}
        type={props.type ? props.type : 'text'}
        placeholder=''
        className={cn(
          'block py-[0.9375rem] px-0 w-full bg-transparent border-0 border-b border-b-white/24 appearance-none focus:outline-none focus:ring-0 focus:border-b-white peer transition duration-300 font-montserrat text-[0.875rem] font-medium leading-[1.05rem] -tracking-[0.00875rem] text-white',
          props.className,
          props.value && 'border-b-white',
          error && 'border-b-destructive focus:border-b-destructive',
        )}
      />
      <label
        htmlFor={props.id}
        className={cn(
          'absolute font-phu-du text-[1rem] font-medium leading-[1.3rem] uppercase text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto',
        )}
      >
        {label}
        {required && <span>*</span>}
      </label>
    </div>
  )
}
