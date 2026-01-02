import { SVGProps } from 'react'

export default function ICBgTitle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='330'
      height='203'
      viewBox='0 0 330 203'
      fill='none'
      {...props}
    >
      <g filter='url(#filter0_g_2033_9063)'>
        <path
          d='M1.87687 192.041L24.2562 28.991C24.7698 25.2493 27.8302 22.3765 31.5969 22.1003L308.173 1.82139C312.485 1.50522 316.268 4.67232 316.715 8.97275L327.633 113.994C328.044 117.947 325.49 121.603 321.636 122.577L11.7626 200.885C6.26405 202.274 1.10567 197.66 1.87687 192.041Z'
          fill='#F56E0A'
        />
      </g>
      <defs>
        <filter
          id='filter0_g_2033_9063'
          x='-0.000195265'
          y='0.000781298'
          width='329.477'
          height='202.932'
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
          <feMerge result='effect1_texture_2033_9063'>
            <feMergeNode in='displacedImage' />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
