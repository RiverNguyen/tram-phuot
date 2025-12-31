import { SVGProps } from 'react'

export default function ICElipse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='4'
      height='4'
      viewBox='0 0 4 4'
      fill='currentColor'
      {...props}
    >
      <circle
        cx='2'
        cy='2'
        r='2'
        fill='currentColor'
      />
    </svg>
  )
}
