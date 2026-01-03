import { cn } from '@/lib/utils'
import React from 'react'
import ICBgTitle from '@/components/icon/ICBgTitle'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  classNameContainer?: string
  classNameTitle?: string
  classNameSubtitle?: string
  classNameIcon?: string
  rotation?: number
}

export default function SectionTitle({
  title,
  subtitle,
  className,
  classNameContainer,
  classNameTitle,
  classNameSubtitle,
  classNameIcon,
  rotation = -3.64,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'xsm:top-0 xsm:left-[0.97rem] xsm:w-[14.11981rem] xsm:h-[10rem] title absolute top-[-7.1431rem] left-[4.3235rem] w-[20.50531rem] h-[14.52263rem]',
        classNameContainer,
        className,
      )}
    >
      <ICBgTitle
        className={cn(
          'xsm:top-[1.231rem] xsm:left-[0.2095rem] xsm:w-[14.11981rem] xsm:h-[8.71663rem] absolute top-[1.864rem] left-0 w-[20.50531rem] h-[12.65856rem]',
          classNameIcon,
        )}
      />
      <div
        className='xsm:top-[1.206rem] xsm:left-[2.2751rem] absolute top-[1.15rem] left-[3.3042rem]'
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* stroke */}
        <h2
          className={cn(
            'xsm:text-[1.5rem] xsm:[-webkit-text-stroke:2.07px_#FDF6EC] absolute text-[#F56E0A] font-motherland text-[2.25rem] leading-[100%] tracking-[0%] [-webkit-text-stroke:3px_#FDF6EC]',
            classNameTitle,
          )}
        >
          {title}
        </h2>

        {/* fill */}
        <h2
          className={cn(
            'xsm:text-[1.5rem] relative text-[#F56E0A] font-motherland text-[2.25rem] leading-[100%] tracking-[0%]',
            classNameTitle,
          )}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <h2
          className={cn(
            'xsm:text-[2.25rem] xsm:leading-[120%] xsm:top-[3.1rem] xsm:left-[1.77rem] absolute top-[3.9rem] left-[3.6891rem] text-white font-phu-du text-[3rem] font-medium leading-[100%] tracking-[0%]',
            classNameSubtitle,
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {subtitle}
        </h2>
      )}
    </div>
  )
}

