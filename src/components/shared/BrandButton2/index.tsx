import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonAndLinkProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

interface BrandButton2Props extends ButtonAndLinkProps {}

export default function BrandButton2({ href, ...props }: BrandButton2Props) {
  if (href) {
    return (
      <Link
        {...props}
        href={href || ''}
        className={cn(
          'h-[2.5rem] px-[1.875rem] cursor-pointer flex items-center justify-center rounded-[0.625rem] bg-[linear-gradient(50deg,#03328C_-18.36%,#00804D_82.62%)] xsm:bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase text-[#F9EAD5] xsm:text-[0.625rem] leading-[0.75rem] xsm:px-[0.625rem] xsm:py-[0.4375rem] xsm:h-auto xsm:rounded-[0.25rem]',
          props.className,
        )}
      />
    )
  }

  return (
    <button
      {...props}
      type={props.type || 'button'}
      className={cn(
        'h-[2.5rem] px-[1.875rem] cursor-pointer flex items-center justify-center rounded-[0.625rem] bg-[linear-gradient(50deg,#03328C_-18.36%,#00804D_82.62%)] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase text-[#F9EAD5] xsm:text-[0.625rem] leading-[0.75rem] xsm:px-[0.625rem] xsm:py-[0.4375rem] xsm:h-auto xsm:rounded-[0.25rem]',
        props.className,
      )}
    />
  )
}
