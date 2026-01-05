import { SVGProps } from 'react'

export default function ICFilter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='21'
      height='21'
      viewBox='0 0 21 21'
      fill='none'
      {...props}
    >
      <path
        d='M5.125 10.25H15.375M2.5625 5.125H17.9375M7.6875 15.375H12.8125'
        stroke='#303030'
        strokeWidth='1.70833'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

