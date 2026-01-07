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
  requiredClassName?: string
}

export default function FloatingLabel({
  wrapperClassName,
  labelClassName,
  label,
  requiredClassName,
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
          'peer font-montserrat block w-full appearance-none border-0 border-b border-b-white/24 bg-transparent px-0 py-[0.9375rem] text-[0.875rem] leading-[1.05rem] font-medium -tracking-[0.00875rem] text-white transition duration-300 focus:border-b-white focus:ring-0 focus:outline-none',
          props.className,
          props.value && 'border-b-white',
          error && 'border-b-destructive focus:border-b-destructive',
        )}
      />
      <label
        htmlFor={props.id}
        className={cn(
          'font-phu-du peer-focus:text-fg-brand absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-[1rem] leading-[1.3rem] font-medium text-white uppercase duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
          labelClassName
        )}
      >
        {label}
        {required && <span className={requiredClassName}>*</span>}
      </label>
    </div>
  )
}
