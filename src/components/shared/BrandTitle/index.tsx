import { cn } from '@/lib/utils'
import React from 'react'
import ICBgTitle from '@/components/icons/ICBgTitle'

type variant = 'orange' | 'green'

interface BrandTitleProps {
  title: string
  subtitle?: string
  className?: string
  classNameContainer?: string
  classNameTitle?: string
  classNameSubtitle?: string
  classNameTitleContainer?: string
  classNameIcon?: string
  variant?: variant
}

export default function BrandTitle({
  title,
  subtitle,
  classNameContainer,
  classNameTitle,
  classNameSubtitle,
  classNameIcon,
  classNameTitleContainer,
  variant = 'orange',
}: BrandTitleProps) {
  const classNameVariant: Record<variant, string> = {
    orange: 'text-[#F56E0A]',
    green: 'text-[#479064]',
  }
  return (
    <div
      className={cn(
        'xsm:w-[14.11981rem] xsm:h-[10rem] relative w-[20.50531rem] h-[14.52263rem]',
        classNameContainer,
      )}
    >
      <ICBg
        className={cn(
          'xsm:top-[1.231rem] xsm:w-full absolute top-[1.8643rem] w-full h-auto',
          classNameIcon,
          classNameVariant[variant],
        )}
      />

      <div
        className={cn(
          'xsm:left-[2.28rem] absolute top-[0.375rem] left-[3.3rem]',
          classNameTitleContainer,
        )}
      >
        <div className='relative inline-block'>
          <h2
            aria-hidden
            className={cn(
              'xsm:[-webkit-text-stroke:2.07px_#FDF6EC] xsm:text-[1.5rem] absolute inset-0 font-motherland text-[2.25rem] leading-[200%] text-transparent select-none [-webkit-text-stroke:3px_#FDF6EC] rotate-[-3.64deg]',
              classNameTitle,
            )}
          >
            {title}
          </h2>
          <h2
            className={cn(
              'xsm:text-[1.5rem] relative font-motherland text-[2.25rem] leading-[200%] text-[#F56E0A] rotate-[-3.64deg]',
              classNameTitle,
            )}
          >
            {title}
          </h2>
        </div>
      </div>

      <h3
        className={cn(
          'xsm:left-[1.98rem] xsm:top-[2.8775rem] xsm:text-[2.25rem] xsm:leading-[120%] absolute left-[3.689rem] top-[3.7992rem] text-white text-[3rem] font-phu-du font-medium leading-[100%] rotate-[-3.64deg]',
          classNameSubtitle,
        )}
      >
        {subtitle}
      </h3>
    </div>
  )
}

const ICBg = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='330'
      height='203'
      viewBox='0 0 330 203'
      fill='none'
      className={className}
      {...props}
    >
      <g filter='url(#filter0_g_2353_12997)'>
        <path
          d='M1.87638 192.045L24.2557 28.9949C24.7693 25.2532 27.8297 22.3804 31.5964 22.1042L308.173 1.82529C312.485 1.50913 316.268 4.67623 316.715 8.97665L327.633 113.998C328.044 117.951 325.49 121.607 321.636 122.581L11.7621 200.889C6.26356 202.278 1.10518 197.664 1.87638 192.045Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <filter
          id='filter0_g_2353_12997'
          x='-0.00117183'
          y='0.00468755'
          width='329.477'
          height='202.936'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood
            floodOpacity='0'
            result='BackgroundImageFix'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.15625 0.15625'
            numOctaves='3'
            seed='7395'
          />
          <feDisplacementMap
            in='shape'
            scale='3.5999999046325684'
            xChannelSelector='R'
            yChannelSelector='G'
            result='displacedImage'
            width='100%'
            height='100%'
          />
          <feMerge result='effect1_texture_2353_12997'>
            <feMergeNode in='displacedImage' />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
