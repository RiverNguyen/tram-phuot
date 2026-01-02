import Image from 'next/image'
import { SVGProps } from 'react'
import Link from 'next/link'
import ICBgTitle from '@/components/icon/ICBgTitle'

const SOCIALS = [
  {
    name: 'Facebook',
    image: '/socials/facebook.webp',
    href: 'https://www.facebook.com',
  },
  {
    name: 'Instagram',
    image: '/socials/instagram.webp',
    href: 'https://www.instagram.com',
  },
  {
    name: 'YouTube',
    image: '/socials/youtube.webp',
    href: 'https://www.youtube.com',
  },
  {
    name: 'TikTok',
    image: '/socials/tiktok.webp',
    href: 'https://www.tiktok.com',
  },
  {
    name: 'Twitter',
    image: '/socials/twitter.webp',
    href: 'https://www.twitter.com',
  },
]

export default function TheExplorers() {
  return (
    <div className='relative w-full h-[50.83rem] max-w-[100rem] mx-auto'>
      {/* Background */}
      <ICBgExplorers className='absolute top-[7.88rem] left-1/2 -translate-x-1/2 w-[96.25rem] h-[35.75rem]' />
      {/* Brick 1 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 1'
        width={120}
        height={120}
        className='z-1 absolute top-[13.4rem] left-[59.9259rem] w-[2.49169rem] h-auto'
      />
      {/* Brick 2 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 2'
        width={120}
        height={120}
        className='z-1 absolute top-[31.72rem] left-[93.6886rem] w-[2.49169rem] h-auto'
      />
      {/* Brick 3 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 2'
        width={120}
        height={120}
        className='z-1 absolute top-[15.89rem] left-[57.4342rem] w-[2.49169rem] h-auto'
      />
      {/* Brick 4 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 2'
        width={120}
        height={120}
        className='z-1 absolute top-[34.21rem] left-[91.1969rem] w-[2.49169rem] h-auto'
      />

      <div className='relative top-[8.51rem] left-1/2 -translate-x-1/2 w-[96.25rem] h-[35.125rem]'>
        {/* vector */}
        <div className='absolute top-[2.3447rem] left-[56.0557rem] w-[18.32988rem] h-[18.52913rem] bg-[linear-gradient(154deg,rgba(255,183,21,0.60)_19.82%,rgba(240,76,5,0.60)_91.61%)] blur-[55.2px] opacity-[0.6]'></div>
        {/* rim 100 */}
        <Image
          src='/home/rim.webp'
          alt='Rim'
          width={1023}
          height={374}
          className='absolute top-[28.084rem] left-[13.3591rem] w-[21.30675rem] h-auto object-cover'
        />
        {/* rim 50 */}
        <Image
          src='/home/rim.webp'
          alt='Rim'
          width={1023}
          height={374}
          className='absolute top-[1.979rem] left-[75.7878rem] w-[21.30675rem] h-auto object-cover opacity-50'
        />
        {/* flower */}
        <Image
          src='/home/flower.webp'
          alt='Flower'
          width={624}
          height={513}
          className='absolute top-[16.2202rem] left-[53.0031rem] w-[13rem] h-auto object-cover'
        />
        {/* towel left */}
        {/* towel right */}
        {/* turtle tower */}
        <Image
          src='/home/turtle-tower.webp'
          alt='Turtle tower'
          width={979}
          height={1583}
          className='absolute top-[-14.1392rem] left-[64.4232rem] w-[20.38738rem] h-auto object-cover'
        />
        {/* street */}
        <Image
          src='/home/street.webp'
          alt='Street'
          width={738}
          height={843}
          className='absolute top-[-4.0104rem] left-[76.1592rem] w-auto h-[15.7523rem] object-cover'
        />
        {/* person */}
        <Image
          src='/home/person.webp'
          alt='Person'
          width={1167}
          height={1021}
          className='z-1 absolute top-[2.085rem] left-[48.125rem] w-[24.3078rem] h-auto object-cover'
        />
        {/* image dynamic 1 */}
        <div className='z-2 absolute top-[22.5rem] left-[29.9rem] w-[26.43281rem] h-[17.47875rem] rotate-[-5.681deg] p-[0.42931rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src='/uu-dai/card.webp'
            alt='Image dynamic 1'
            width={1301}
            height={916}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 2 */}
        <div className='z-2 absolute top-[16.659rem] left-[63.6362rem] w-[16.37975rem] h-[10.11094rem] rotate-[-10.78deg] p-[0.35rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src='/uu-dai/card.webp'
            alt='Image dynamic 2'
            width={832}
            height={592}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 3 */}
        <div className='z-2 absolute top-[14.7rem] left-[77.2rem] w-[12.68819rem] h-[18.03244rem] rotate-[19.529deg] p-[0.35rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src='/uu-dai/card.webp'
            alt='Image dynamic 3'
            width={831}
            height={985}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 4 */}
        <div className='z-2 absolute top-[22.8639rem] left-[55.9025rem] w-[14.9538rem] h-[12.6341rem] rotate-[11.21deg] p-[0.35rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src='/uu-dai/card.webp'
            alt='Image dynamic 4'
            width={786}
            height={698}
            className='w-full h-full object-cover'
          />
        </div>
        {/* stamp 1 */}
        <Image
          src='/home/stamp-1.webp'
          alt='Stamp 1'
          width={431}
          height={411}
          className='z-3 absolute top-[15.9298rem] left-[52rem] w-[7.20056rem] h-auto '
        />
        {/* content */}
        <div className='absolute top-[5.4077rem] left-[16.9103rem] flex w-[32.0625rem] flex-col justify-center gap-[1.4375rem]'>
          <div className='text-white self-stretch'>
            <p className=''>At Wanderlust Station community every traveler</p>
            <p>finds a place to share stories tips and new routes</p>
            <p>connecting through the love of the open road</p>
          </div>
          <div className='flex items-center gap-[1.1035rem]'>
            {SOCIALS.map((social) => (
              <Link
                href={social.href}
                key={social.name}
                className='size-[3.375rem]'
              >
                <Image
                  src={social.image}
                  alt={social.name}
                  width={162}
                  height={162}
                  className='w-full h-full object-cover'
                />
              </Link>
            ))}
          </div>
        </div>
        {/* title */}
        <div className='absolute top-[-7.1431rem] left-[4.3235rem] w-[20.50531rem] h-[14.52263rem]'>
          <ICBgTitle className='absolute top-[1.864rem] left-0 w-[20.50531rem] h-[12.65856rem]' />
        </div>
      </div>
      <div></div>
      {/* stamp 2 */}
      <Image
        src='/home/stamp-2.webp'
        alt='Stamp 1'
        width={525}
        height={525}
        className='z-3 absolute top-[17.2364rem] left-[8.4106rem] w-[7.741rem] h-auto '
      />
    </div>
  )
}

const ICBgExplorers = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1544'
      height='576'
      viewBox='0 0 1544 576'
      fill='none'
      {...props}
    >
      <g filter='url(#filter0_g_2011_8984)'>
        <path
          d='M1.7998 13.8008C1.7998 7.17338 7.17239 1.80078 13.7998 1.80078H1529.8C1536.43 1.80078 1541.8 7.17336 1541.8 13.8008V561.801C1541.8 568.428 1536.43 573.801 1529.8 573.801H13.7998C7.17243 573.801 1.7998 568.428 1.7998 561.801V13.8008Z'
          fill='#479064'
        />
      </g>
      <defs>
        <filter
          id='filter0_g_2011_8984'
          x='-0.000195265'
          y='0.000781298'
          width='1543.6'
          height='575.6'
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
          <feMerge result='effect1_texture_2011_8984'>
            <feMergeNode in='displacedImage' />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
