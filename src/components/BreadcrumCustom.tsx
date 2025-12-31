import Link from 'next/link'
import {Fragment} from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {cn} from '@/lib/utils'

interface IBreadcrumbCustom {
  items: {
    label: string
    href: string
  }[]
  classNameItem?: string
  classNameLastItem?: string
  classNameSeparator?: string
}

export default function BreadcrumbCustom({
  items,
  classNameItem,
  classNameLastItem,
  classNameSeparator,
}: IBreadcrumbCustom) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index !== items.length - 1 ? (
              <>
                <BreadcrumbItem
                  className={cn(
                    'text-white/50 font-sf-pro text-[0.875rem] leading-[1.3125rem] tracking-[-0.00875rem] font-[510]',
                    classNameItem,
                  )}
                >
                  <BreadcrumbLink asChild>
                    <Link
                      className='sm:hover:text-white'
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  className={cn('text-white/50', classNameSeparator)}
                />
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className={cn(
                      'text-white font-sf-pro text-[0.875rem] leading-[1.3125rem] tracking-[-0.00875rem] font-[510]',
                      classNameLastItem,
                    )}
                  >
                    {item.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
