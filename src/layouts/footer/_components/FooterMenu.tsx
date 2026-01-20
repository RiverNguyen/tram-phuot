import { Link } from '@/i18n/navigation'
import { IMenuFooter } from '@/interface/site-setting.interface'
import { cn } from '@/lib/utils'

interface FooterMenuProps {
  containerClassName?: string
  title: string
  menus?: IMenuFooter[]
  content?: React.ReactNode
}

// Decode HTML entities (e.g., &amp; -> &, &lt; -> <, &gt; -> >)
function decodeHtmlEntities(text: string): string {
  if (typeof window === 'undefined') {
    // Server-side: simple decode for common entities
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
  }
  // Client-side: use browser API for complete decoding
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

export default function FooterMenu({ title, menus, content, containerClassName }: FooterMenuProps) {
  return (
    <div className={cn('flex-1', containerClassName)}>
      <p className='font-phu-du text-[0.75rem] font-medium leading-[0.975rem] tracking-[0.015rem] uppercase text-white/30 mb-[0.25rem] xsm:tracking-[0.0625rem] xsm:leading-[0.9875rem] xsm:text-white/80 xsm:opacity-60'>
        {title}
      </p>
      {menus ? (
        <ul className='flex flex-col space-y-2.5 xsm:flex-row xsm:flex-wrap xsm:space-x-[1.12rem] xsm:space-y-[0.125rem]'>
          {menus.map((menu, i) => (
            <li key={i}>
              <Link
                href={menu?.navigations?.url}
                target={'_blank'}
                className='font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] -tracking-[0.03125rem] text-white/80 sm:hover:text-white transition duration-300 xsm:text-white xsm:leading-[1.4rem] xsm:font-normal'
              >
                {menu?.navigations?.title ? decodeHtmlEntities(menu.navigations.title) : ''}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        content
      )}
    </div>
  )
}
