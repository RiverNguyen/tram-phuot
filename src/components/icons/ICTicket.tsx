import React from 'react'

export default function ICTicket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={20}
      height={20}
      viewBox='0 0 20 20'
      fill='none'
      {...props}
    >
      <path
        d='M16.2494 10.4193C16.2494 9.26927 17.1827 8.33594 18.3327 8.33594V7.5026C18.3327 4.16927 17.4994 3.33594 14.166 3.33594H5.83268C2.49935 3.33594 1.66602 4.16927 1.66602 7.5026V7.91927C2.81602 7.91927 3.74935 8.85261 3.74935 10.0026C3.74935 11.1526 2.81602 12.0859 1.66602 12.0859V12.5026C1.66602 15.8359 2.49935 16.6693 5.83268 16.6693H14.166C17.4994 16.6693 18.3327 15.8359 18.3327 12.5026C17.1827 12.5026 16.2494 11.5693 16.2494 10.4193Z'
        stroke='currentColor'
        strokeOpacity='0.75'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 12.2891L12.5 7.28906Z'
        fill='#F6AF43'
      />
      <path
        d='M7.5 12.2891L12.5 7.28906'
        stroke='currentColor'
        strokeOpacity='0.75'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.4961 12.2917H12.5036'
        stroke='currentColor'
        strokeOpacity='0.75'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.49607 7.70573H7.50356'
        stroke='currentColor'
        strokeOpacity='0.75'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
