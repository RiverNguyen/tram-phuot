import localFont from 'next/font/local'

// Montserrat Font Family - Optimized: chỉ load các weight đang sử dụng (400, 500, 600, 700)
// Loại bỏ italic variants và các weight không cần thiết để giảm bundle size
export const montserrat = localFont({
  src: [
    {
      path: './montserrat/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './montserrat/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Arial',
})

// Motherland Font Family
export const motherland = localFont({
  src: './motherland/NVN-MOTHERLAND-SIGNATURE-1.ttf',
  variable: '--font-motherland',
  display: 'swap',
  preload: false, // Display font, không cần preload
  fallback: ['serif'],
})

// Phu-du Font Family - Optimized: chỉ load các weight đang sử dụng (400, 500, 700)
export const phuDu = localFont({
  src: [
    {
      path: './phu-du/DTPhudu-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './phu-du/DTPhudu-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './phu-du/DTPhudu-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-phu-du',
  display: 'swap',
  preload: true, // Primary font, cần preload
  fallback: ['sans-serif'],
  adjustFontFallback: 'Arial',
})
