import { cn } from '@/lib/utils'
import Link from 'next/link'

type BreadcrumbItemType = {
  label: string
  href: string
}

interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItemType[]
  classNameBreadcrumbItem?: string
  classNameBreadcrumbList?: string
}

export default function Breadcrumb({
  breadcrumbItems,
  classNameBreadcrumbList,
  classNameBreadcrumbItem,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label='Breadcrumb'
      className='font-montserrat relative'
    >
      <ul className={cn('flex items-center space-x-3', classNameBreadcrumbList)}>
        {breadcrumbItems.map(({ label, href }, index) => {
          const isLast = index === breadcrumbItems.length - 1
          return (
            <li
              key={index}
              className={cn(
                'xsm:text-[0.75rem] xsm:last:font-normal xsm:leading-[1.4] shrink-0 text-[1rem] leading-[1.2] text-white not-last:text-white/60 not-last:after:ml-3 not-last:after:content-["/"] last:line-clamp-1 last:max-w-82 last:font-bold',
                classNameBreadcrumbItem,
              )}
            >
              {isLast ? <span>{label}</span> : <Link href={href}>{label}</Link>}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
