'use client'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function EmptyResult({
  wrapperClassName,
  imgClassName,
  textClassName,
}: {
  wrapperClassName?: string
  imgClassName?: string
  textClassName?: string
}) {
  const t = useTranslations('EmptyResult')

  return (
    <div className={cn('flex flex-col py-[4.5rem] items-center mx-auto', wrapperClassName)}>
      <Image
        src={'/others/d-empty.svg'}
        alt=''
        width={0}
        height={0}
        className={cn('size-[19.4375rem] object-cover xsm:size-[8rem]', imgClassName)}
      />
      <h3
        className={cn(
          'text-[rgba(46,46,46,0.75)] font-montserrat text-[1.5rem] font-bold leading-[1.95rem] tracking-[-0.05419rem] xsm:text-[0.875rem]',
          textClassName,
        )}
      >
        {t('text')}
      </h3>
    </div>
  )
}
