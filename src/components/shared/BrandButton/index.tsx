'use client'
import { cn } from '@/lib/utils'
import React from 'react'

type BrandButtonVariant = 'greenGradient' | 'orangeGradient' | 'blueGradient' | 'transparent'
type BrandButtonType =
  | { variant: 'link'; href: string }
  | {
      variant: 'button'
      type?: 'button' | 'submit'
      onClick?: () => void
      form?: string
      disabled?: boolean
    }
interface BrandButtonProps {
  showButtonTexture?: boolean
  variant?: BrandButtonVariant
  classNameButtonContainer?: string
  classNameButtonText?: string
  children: React.ReactNode
  type?: BrandButtonType
}

export default function BrandButton({
  showButtonTexture = true,
  variant = 'greenGradient',
  type = { variant: 'button', type: 'button' },
  classNameButtonContainer,
  classNameButtonText,
  children,
}: BrandButtonProps) {
  const classNameButtonVariant: Record<BrandButtonVariant, string> = {
    greenGradient: 'bg-green-gradient',
    orangeGradient: 'bg-orange-gradient',
    blueGradient: 'bg-blue-gradient',
    transparent: 'bg-transparent',
  }

  if (type.variant === 'link') {
    return (
      <a
        href={type.href}
        className={cn(
          'group flex-center font-montserrat xsm:h-10.5 relative h-12 w-auto cursor-pointer overflow-hidden rounded-[1.25rem_0.125rem] bg-transparent px-7',
          classNameButtonVariant[variant],
          classNameButtonContainer,
        )}
      >
        <div
          className={cn(
            'xsm:text-[0.75rem] relative z-2 text-[0.875rem] leading-none font-semibold text-white uppercase',
            variant === 'transparent' && 'bg-blue-gradient bg-clip-text text-transparent',
            classNameButtonText,
          )}
        >
          {children}
        </div>
        <div
          className={cn(
            'bg-blue-gradient mask-border pointer-events-none absolute top-0 left-0 z-5 hidden size-full rounded-[inherit] p-0.25',
            variant === 'transparent' && 'block',
          )}
        ></div>
        {variant === 'transparent' ? (
          <IconArrowTopRightGradient className='absolute top-2 right-2 size-2.5' />
        ) : (
          <IconArrowTopRightWhite className='absolute top-2 right-2 size-2.5' />
        )}
        {showButtonTexture && (
          <>
            <ButtonDecorTexture className='xsm:w-[2.7465rem] xsm:top-0 xsm:-left-4 xsm:h-[2.76625rem] absolute top-0.5 -left-6.5 z-1 h-[4.5325rem] w-18 opacity-6' />
            <ButtonDecorTexture className='xsm:w-[2.7465rem] xsm:h-[2.76625rem] xsm:-top-4 xsm:-right-4 absolute -top-6 -right-6 z-1 h-[4.5325rem] w-18 opacity-12' />
          </>
        )}
      </a>
    )
  }

  const handleClickButton = () => {
    if (type.variant === 'button' && type.onClick) {
      type.onClick()
    }
  }

  return (
    <button
      type={type?.type || 'button'}
      onClick={handleClickButton}
      form={type?.form || undefined}
      disabled={type?.disabled || false}
      className={cn(
        'group flex-center font-montserrat xsm:h-10.5 relative h-12 w-auto cursor-pointer overflow-hidden rounded-[1.25rem_0.125rem] bg-transparent px-7 disabled:cursor-not-allowed disabled:opacity-50',
        classNameButtonVariant[variant],
        classNameButtonContainer,
      )}
    >
      <div
        className={cn(
          'xsm:text-[0.75rem] relative z-2 text-[0.875rem] leading-none font-semibold text-white uppercase',
          variant === 'transparent' && 'bg-blue-gradient bg-clip-text text-transparent',
          classNameButtonText,
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'bg-blue-gradient mask-border pointer-events-none absolute top-0 left-0 z-5 hidden size-full rounded-[inherit] p-0.25',
          variant === 'transparent' && 'block',
        )}
      ></div>
      {variant === 'transparent' ? (
        <IconArrowTopRightGradient className='absolute top-2 right-2 size-2.5' />
      ) : (
        <IconArrowTopRightWhite className='absolute top-2 right-2 size-2.5' />
      )}
      {showButtonTexture && (
        <>
          <ButtonDecorTexture className='xsm:w-[2.7465rem] xsm:top-0 xsm:-left-4 xsm:h-[2.76625rem] absolute top-0.5 -left-6.5 z-1 h-[4.5325rem] w-18 opacity-6' />
          <ButtonDecorTexture className='xsm:w-[2.7465rem] xsm:h-[2.76625rem] xsm:-top-4 xsm:-right-4 absolute -top-6 -right-6 z-1 h-[4.5325rem] w-18 opacity-12' />
        </>
      )}
    </button>
  )
}

function ButtonDecorTexture(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={72}
      height={73}
      viewBox='0 0 72 73'
      fill='none'
      {...props}
    >
      <path
        d='M49.5838 22.6733L49.3921 13.4051L42.7047 20.2574L36.0262 27.2848L29.6209 19.9912L22.6154 13.3047L22.9768 23.1985L13.6306 23.0162L20.2151 29.4801L26.5574 36.3633L20.1536 43.1829L13.5366 49.7471L22.6388 49.8711L22.8197 58.9078L29.2268 52.3327L36.0282 46.042L42.6487 52.5168L49.327 59.1303L49.47 49.9204L58.3261 49.6688L52.2985 42.7836L45.3327 36.3633L52.1919 29.8357L58.9262 22.8283L49.5838 22.6733Z'
        fill='#FFED93'
      />
      <path
        d='M41.8394 9.29938L40.4477 10.7581L41.9425 12.4119L37.4817 12.2296L37.4546 16.6167L36.0287 15.0995L34.5068 16.6659L34.4472 12.3553L30.2305 12.195L31.7667 10.7617L30.1257 9.13156L34.4635 9.18086L34.4635 4.83026L36.0377 6.43486L37.5865 4.84117L37.5865 9.20089L41.8394 9.29938ZM25.3594 10.7581L36.0232 21.352L46.4683 10.7581L36.0232 1.45947e-08L25.3594 10.7581Z'
        fill='#DBA676'
      />
      <path
        d='M67.1994 34.9105L65.6214 36.3473L67.2481 37.8644L62.9103 37.8754L62.8417 42.2095L61.3957 40.8056L59.7564 42.3134L59.9371 37.8133L55.5884 37.786L57.0922 36.3455L55.5397 34.812L59.8089 34.7519L59.9697 30.496L61.3921 32.0423L63.008 30.3885L62.961 34.7646L67.1994 34.9105ZM50.7085 36.3473L61.3994 47.14L71.9999 36.3473L61.3994 25.6641L50.7085 36.3473Z'
        fill='#DBA676'
      />
      <path
        d='M16.4728 34.8789L14.8606 36.3486L16.4602 37.791L12.1224 37.8292L12.0791 42.2053L10.6547 40.6172L9.15113 42.2582L9.14009 37.8821L4.84396 37.811L6.2357 36.3523L4.74093 34.6984L9.20165 34.8808L9.22702 30.4937L10.6565 32.0107L12.1766 30.4445L12.24 34.7549L16.4728 34.8789ZM8.45436e-08 36.3486L10.6638 47.1613L21.3456 36.3486L10.6638 25.6016L8.45436e-08 36.3486Z'
        fill='white'
        fillOpacity='0.27'
      />
      <path
        d='M41.804 60.5454L40.4648 61.9439L41.9106 63.5302L37.629 63.5576L37.4843 67.8134L36.0385 66.187L34.605 67.8025L34.5691 63.4263L30.2312 63.3826L31.8054 61.9458L30.1787 60.4287L34.5165 60.4178L34.5852 56.0835L36.0312 57.4876L37.6687 55.9796L37.488 60.4779L41.804 60.5454ZM25.2915 61.9439L36.0257 72.5196L46.5467 61.9439L36.0257 51.3828L25.2915 61.9439Z'
        fill='white'
        fillOpacity='0.27'
      />
    </svg>
  )
}

function IconArrowTopRightWhite(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={10}
      height={10}
      viewBox='0 0 10 10'
      fill='none'
      {...props}
    >
      <path
        d='M8.1054 3.32683C7.98468 3.45149 7.86515 3.57774 7.74244 3.70041C6.87667 4.56667 6.0105 5.43253 5.14433 6.29839C4.80208 6.64051 4.45745 6.98104 4.11879 7.32635C4.02755 7.41955 3.92236 7.45539 3.79885 7.45539C3.46816 7.45579 3.13707 7.45619 2.80638 7.45539C2.62152 7.45499 2.54661 7.37852 2.54661 7.19452C2.54661 6.85837 2.549 6.52222 2.54542 6.18647C2.54422 6.05504 2.59403 5.95428 2.68566 5.86347C3.09803 5.45483 3.50761 5.04381 3.91838 4.63358C4.318 4.23451 4.71762 3.83623 5.11683 3.43715C5.48059 3.07352 5.84356 2.7087 6.20732 2.34507C6.35075 2.20129 6.49538 2.05871 6.63921 1.91533C6.64957 1.90497 6.65953 1.89342 6.67745 1.8739C6.64996 1.87032 6.63283 1.86634 6.6161 1.86634C5.36147 1.86634 4.10683 1.86634 2.8518 1.86713C1.98085 1.86793 1.1099 1.86992 0.23935 1.87112C0.205085 1.87112 0.170423 1.86913 0.136955 1.86196C0.00188997 1.83288 -0.0439286 1.69787 0.0516928 1.5979C0.199507 1.44336 0.352502 1.29361 0.503504 1.14227C0.833397 0.810499 1.16488 0.480325 1.49438 0.14816C1.59518 0.0462004 1.71391 0 1.85694 0C3.08249 0.00119484 4.30804 0.000796559 5.53358 0.000796559C6.69299 0.000796559 7.8524 0.000796559 9.01181 0.000796559C9.48155 0.000796559 9.85846 0.292735 9.97081 0.748765C9.99034 0.827625 9.9987 0.910865 9.9987 0.992114C10.0003 3.379 9.9999 5.76589 10.0003 8.15238C10.0003 8.28262 9.96006 8.39414 9.86603 8.48813C9.38633 8.96607 8.90822 9.44599 8.42932 9.92473C8.34764 10.0064 8.27393 10.0235 8.2062 9.96774C8.17473 9.94185 8.15281 9.89764 8.14006 9.85742C8.12771 9.81838 8.1309 9.77378 8.1309 9.73156C8.1309 7.6386 8.1309 5.54524 8.1309 3.45229C8.1309 3.41564 8.1309 3.379 8.1309 3.34196C8.12253 3.33679 8.11377 3.33201 8.1054 3.32683Z'
        fill='white'
      />
      <path
        d='M2.24886 8.70613C2.24886 8.93633 2.24926 9.16654 2.24886 9.39674C2.24846 9.56641 2.16479 9.65164 1.99546 9.65164C1.5321 9.65244 1.06913 9.65204 0.605763 9.65124C0.430458 9.65124 0.347187 9.5676 0.346789 9.39316C0.345992 8.93036 0.345992 8.46716 0.346789 8.00436C0.346789 7.83349 0.428067 7.75145 0.600584 7.75105C1.06913 7.74986 1.53767 7.74946 2.00582 7.75105C2.16359 7.75145 2.24846 7.84066 2.24886 7.99998C2.24926 8.23536 2.24886 8.47074 2.24886 8.70652V8.70613Z'
        fill='white'
      />
    </svg>
  )
}

function IconArrowTopRightGradient(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={10}
      height={10}
      viewBox='0 0 10 10'
      fill='none'
      {...props}
    >
      <path
        d='M8.1054 3.32683C7.98468 3.45149 7.86515 3.57774 7.74244 3.70041C6.87667 4.56667 6.0105 5.43253 5.14433 6.29839C4.80208 6.64051 4.45745 6.98104 4.11879 7.32635C4.02755 7.41955 3.92236 7.45539 3.79885 7.45539C3.46816 7.45579 3.13707 7.45619 2.80638 7.45539C2.62152 7.45499 2.54661 7.37852 2.54661 7.19452C2.54661 6.85837 2.549 6.52222 2.54542 6.18647C2.54422 6.05504 2.59403 5.95428 2.68566 5.86347C3.09803 5.45483 3.50761 5.04381 3.91838 4.63358C4.318 4.23451 4.71762 3.83623 5.11683 3.43715C5.48059 3.07352 5.84356 2.7087 6.20732 2.34507C6.35075 2.20129 6.49538 2.05871 6.63921 1.91533C6.64957 1.90497 6.65953 1.89342 6.67745 1.8739C6.64996 1.87032 6.63283 1.86634 6.6161 1.86634C5.36147 1.86634 4.10683 1.86634 2.8518 1.86713C1.98085 1.86793 1.1099 1.86992 0.23935 1.87112C0.205085 1.87112 0.170423 1.86913 0.136955 1.86196C0.00188997 1.83288 -0.0439286 1.69787 0.0516928 1.5979C0.199507 1.44336 0.352502 1.29361 0.503504 1.14227C0.833397 0.810499 1.16488 0.480325 1.49438 0.14816C1.59518 0.0462004 1.71391 0 1.85694 0C3.08249 0.00119484 4.30804 0.000796559 5.53358 0.000796559C6.69299 0.000796559 7.8524 0.000796559 9.01181 0.000796559C9.48155 0.000796559 9.85846 0.292735 9.97081 0.748765C9.99034 0.827625 9.9987 0.910865 9.9987 0.992114C10.0003 3.379 9.9999 5.76589 10.0003 8.15238C10.0003 8.28262 9.96006 8.39414 9.86603 8.48813C9.38633 8.96607 8.90822 9.44599 8.42932 9.92473C8.34764 10.0064 8.27393 10.0235 8.2062 9.96774C8.17473 9.94185 8.15281 9.89764 8.14006 9.85742C8.12771 9.81838 8.1309 9.77378 8.1309 9.73156C8.1309 7.6386 8.1309 5.54524 8.1309 3.45229C8.1309 3.41564 8.1309 3.379 8.1309 3.34196C8.12253 3.33679 8.11377 3.33201 8.1054 3.32683Z'
        fill='url(#paint0_linear_1109_9596)'
      />
      <path
        d='M2.24886 8.70613C2.24886 8.93633 2.24926 9.16654 2.24886 9.39674C2.24846 9.56641 2.16479 9.65164 1.99546 9.65164C1.5321 9.65244 1.06913 9.65204 0.605763 9.65124C0.430458 9.65124 0.347187 9.5676 0.346789 9.39316C0.345992 8.93036 0.345992 8.46716 0.346789 8.00436C0.346789 7.83349 0.428067 7.75145 0.600584 7.75105C1.06913 7.74986 1.53767 7.74946 2.00582 7.75105C2.16359 7.75145 2.24846 7.84066 2.24886 7.99998C2.24926 8.23536 2.24886 8.47074 2.24886 8.70652V8.70613Z'
        fill='url(#paint1_linear_1109_9596)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1109_9596'
          x1='0.000976262'
          y1='10.0393'
          x2='9.41067'
          y2='3.00085'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            offset='0.517469'
            stopColor='#03328C'
          />
          <stop
            offset={1}
            stopColor='#00804D'
          />
        </linearGradient>
        <linearGradient
          id='paint1_linear_1109_9596'
          x1='0.346191'
          y1='9.6595'
          x2='2.1362'
          y2='8.31992'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            offset='0.517469'
            stopColor='#03328C'
          />
          <stop
            offset={1}
            stopColor='#00804D'
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
