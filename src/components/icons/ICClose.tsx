import React from 'react'

export default function ICClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={32}
      height={32}
      viewBox='0 0 32 32'
      fill='none'
      {...props}
    >
      <g opacity='0.7'>
        <path
          d='M24 24L16 16M16 16L8 8M16 16L24 8M16 16L8 24'
          stroke='white'
          strokeWidth='2.66667'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}
