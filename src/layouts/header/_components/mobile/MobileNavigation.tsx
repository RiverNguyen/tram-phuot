'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { IHeader } from '@/interface/site-setting.interface'
import { Link } from '@/i18n/navigation'
import { Fragment } from 'react'

interface MobileNavigationProps {
  data: IHeader
}

const MobileNavigation = ({ data }: MobileNavigationProps) => {
  return (
    <div className='h-[31.5625rem] overflow-auto'>
      <Accordion
        type='single'
        collapsible
        className='w-full'
      >
        {Array.isArray(data?.navigations) &&
          data?.navigations.map((item, index) => {
            if (item.select === 'parent') {
              const hasChildren =
                Array.isArray(item.page_link_parent?.link) &&
                item.page_link_parent.link.length > 0

              if (!hasChildren) {
                return (
                  <Link
                    href={item.page_link_parent?.title?.url || '/'}
                    key={index}
                    className='h-[4.37rem] flex-y-center mx-[0.5625rem] block'
                  >
                    <p className='flex pl-[1rem] text-[#2e2e2e] font-phu-du font-medium leading-[1.3] uppercase'>
                      {item.page_link_parent?.title?.title}
                    </p>
                  </Link>
                )
              }

              return (
                <Fragment key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className='border-none'
                  >
                    <AccordionTrigger className='h-[4.37rem] px-[1.5rem] py-0 hover:no-underline'>
                      <Link
                        href={item.page_link_parent?.title?.url || '/'}
                        className='flex text-[#2e2e2e] text-base font-phu-du font-medium leading-[1.3] uppercase'
                      >
                        {item.page_link_parent?.title?.title}
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent className='py-2 bg-[#EDEDED]'>
                      <div className='flex flex-col space-y-[0.875rem] pl-[1.8125rem]'>
                        {item.page_link_parent?.link?.map((linkItem, linkIndex) => (
                          <Link
                            key={linkIndex}
                            href={linkItem?.item?.url || '/'}
                            className='text-[#2E2E2E]/75 text-[0.875rem] leading-[1.6]'
                          >
                            {linkItem?.item?.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <Separator className='w-[22.625rem] mx-auto h-[0.0375rem] bg-[#A1A1A1]/18' />
                </Fragment>
              )
            } else {
              return (
                <Link
                  href={item.page_link_normal?.url || '/'}
                  key={index}
                  className='h-[4.37rem] flex-y-center border-b border-[#A1A1A1]/18 mx-[0.5625rem]'
                >
                  <p className='flex pl-[1rem] text-[#2e2e2e] font-phu-du font-medium leading-[1.3] uppercase'>
                    {item.page_link_normal?.title}
                  </p>
                </Link>
              )
            }
          })}
      </Accordion>
    </div>
  )
}

export default MobileNavigation

