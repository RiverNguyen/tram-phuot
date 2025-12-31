import localFont from 'next/font/local'

export const phudu = localFont({
  src: [
    {
      path: './phudu/Phudu-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './phudu/Phudu-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './phudu/Phudu-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './phudu/Phudu-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-phudu',
  display: 'swap',
  preload: true,
})
