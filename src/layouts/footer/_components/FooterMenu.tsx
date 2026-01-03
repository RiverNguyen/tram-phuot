import { Link } from '@/i18n/navigation'
import { IMenuFooter } from '@/interface/site-setting.interface'
import { cn } from '@/lib/utils'

interface FooterMenuProps {
  containerClassName?: string
  title: string
  menus?: IMenuFooter[]
  content?: React.ReactNode
}

export default function FooterMenu({ title, menus, content, containerClassName }: FooterMenuProps) {
  return (
    <div className={cn('flex-1', containerClassName)}>
      <p className='font-phu-du text-[0.75rem] font-medium leading-[0.975rem] tracking-[0.015rem] uppercase text-white/30 mb-[0.625rem] xsm:tracking-[0.0625rem] xsm:leading-[0.9875rem] xsm:text-white/80 xsm:opacity-60'>
        {title}
      </p>
      {menus ? (
        <ul className='flex flex-col space-y-2.5 xsm:flex-row xsm:flex-wrap xsm:space-x-[1.12rem] xsm:space-y-[0.875rem]'>
          {menus.map((menu, i) => (
            <li key={i}>
              <Link
                href={menu?.navigations?.url}
                target={menu?.navigations?.target}
                className='font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] -tracking-[0.03125rem] text-white/80 sm:hover:text-white transition duration-300 xsm:text-white xsm:leading-[1.4rem] xsm:font-normal'
              >
                {menu?.navigations?.title}
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
