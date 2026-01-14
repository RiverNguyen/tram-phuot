'use client'

import Image from 'next/image'
import { useRef } from 'react'
import Link from 'next/link'
import { BrandTitle } from '@/components/shared'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/dist/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IExplorers } from '@/interface/homepage.interface'
import { IWhereDreamsTakeFlight } from '@/interface/about.interface'
import Article from '../OurAbout/_components/Article'
import useIsMobile from '@/hooks/use-is-mobile'

gsap.registerPlugin(ScrollTrigger)

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

const TEXTAREA = `At Wanderlust Station community every traveler finds a place to share stories tips and new routes connecting through the love of the open road`

export default function JourneyAbout({ explorers }: { explorers: IWhereDreamsTakeFlight }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isLoading, isMobile } = useIsMobile()
  useGSAP(
    () => {
      CustomEase.create('explorersEase', '0.51,-0.01,0.12,1')

      const mm = gsap.matchMedia()

      mm.add(
        {
          isMobile: '(max-width: 639px)',
          isDesktop: '(min-width: 640px)',
        },
        (ctx) => {
          if (ctx.conditions?.isMobile) return

          const tl = gsap.timeline({
            defaults: {
              duration: 1.6,
              ease: 'explorersEase',
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
              once: true,
            },
          })

          // Animation data
          const brickAnimations = {
            targets: ['.brick-1', '.brick-3', '.turle-tower'],
            yValues: ['6.3418rem', '8.8418rem', '10.1504rem'],
          }

          const verticalMoveAnimations = {
            targets: ['.street', '.image-dynamic-2', '.image-dynamic-4', '.content', '.person'],
            yValues: ['9.4946rem', '7.063rem', '5.9111rem', '5.1226rem', '5.2504rem'],
          }

          // Background animation
          tl.fromTo(
            '.bg-explorers',
            { width: '105rem', height: '55.75rem', top: '-4.92rem' },
            { width: '96.25rem', height: '35.75rem', top: '7.88rem' },
          )

          // Bricks animation
          tl.fromTo(
            brickAnimations.targets,
            { y: (i) => brickAnimations.yValues[i] },
            { y: '0rem' },
            '<',
          )

          // Fade in elements
          tl.fromTo(['.rim-100', '.flower', '.stamp-1'], { opacity: 0 }, { opacity: 1 }, '<')

          // Fade to partial opacity
          tl.fromTo('.rim-50', { opacity: 0 }, { opacity: 0.5 }, '<')
          tl.fromTo('.halo', { opacity: 1 }, { opacity: 0.6 }, '<')

          // Vertical movement (no rotation)
          tl.fromTo(
            verticalMoveAnimations.targets,
            { y: (i) => verticalMoveAnimations.yValues[i] },
            { y: '0rem' },
            '<',
          )

          // Towels with rotation
          tl.fromTo('.towel-left', { y: '9.4946rem', rotate: -7.32 }, { y: '0rem', rotate: 0 }, '<')
          tl.fromTo(
            '.towel-right',
            { y: '12.9054rem', rotate: 19.05 },
            { y: '0rem', rotate: 0 },
            '<',
          )

          // Dynamic images with rotation
          tl.fromTo(
            '.image-dynamic-1',
            { y: '6.5308rem', rotate: -18.44 },
            { y: '0rem', rotate: -5.68 },
            '<',
          )
          tl.fromTo(
            '.image-dynamic-3',
            { y: '7.2029rem', rotate: 32.36 },
            { y: '0rem', rotate: 19.53 },
            '<',
          )

          // Stamp and title
          tl.fromTo('.stamp-2', { y: '7.9126rem' }, { y: '0rem' }, '<')
          tl.fromTo(
            '.title',
            { y: '16.4952rem', opacity: 0, rotate: -14.67 },
            { y: '0rem', opacity: 1, rotate: 0 },
            '<',
          )
        },
      )

      return () => mm.revert()
    },
    { scope: containerRef },
  )
  console.log(explorers)

  return (
    <div
      ref={containerRef}
      className='xsm:h-[25.0625rem] relative h-[40.5rem]'
    >
      <div className='absolute w-full h-full'>
        <Image
          src={'/about-us/d-dream-mobile.webp'}
          alt=''
          fill
          className='object-cover pointer-events-none'
        />
      </div>
      <div className='xsm:hidden relative w-full h-full overflow-hidden'>
        <Image
          src={'/about-us/journey/d-color-left.webp'}
          alt=''
          width={775}
          height={350}
          className='absolute top-0 left-0 w-[48.4375rem] h-[21.875rem]'
        />
        <Image
          src={'/about-us/journey/d-color-yellow.webp'}
          alt=''
          width={404}
          height={210}
          className='absolute bottom-0 left-0 w-[25.21644rem] h-[13.1475rem]'
        />
        <Image
          src={'/about-us/journey/d-lake.webp'}
          alt=''
          width={1095}
          height={503}
          className='absolute top-[-4.125rem] right-[-10.75rem] w-[68.4375rem] h-auto'
        />
        <Image
          src={'/about-us/journey/d-color-right.webp'}
          alt=''
          width={813}
          height={298}
          className='absolute bottom-0 right-[-5rem] w-[50.8125rem] h-auto'
        />
        <Image
          src={'/about-us/journey/d-bay.webp'}
          alt=''
          width={813}
          height={298}
          className='absolute bottom-[-13rem] left-[17.4rem] w-[52.6875rem] h-auto'
        />
        <Image
          src={'/about-us/journey/d-vector-green.webp'}
          alt=''
          width={1910}
          height={596}
          className='absolute top-0 left-0 w-full h-full'
        />
      </div>
      <Image
        src={'/about-us/journey/d-temple.webp'}
        alt=''
        width={357}
        height={265}
        className='xsm:h-[7.54638rem] xsm:w-[10.17713rem] absolute xsm:bottom-[-0.8rem] xsm:right-[1.58rem] bottom-[-1.675rem] right-[14.7rem] w-auto h-[16.56694rem]'
      />
      <Image
        src={'/about-us/journey/d-ribbon-3-desktop.webp'}
        alt=''
        width={2189}
        height={956}
        className='xsm:hidden absolute top-0 right-0 w-full h-full'
      />
      <div className='absolute top-[13.625rem] left-[6.25rem] xsm:top-[7.56rem] xsm:left-[1.75rem]'>
        <div className='absolute top-[2.84rem] left-[9.375rem] z-10 w-[4.54594rem] -rotate-[7.522deg] rounded-[50%] bg-[#F6CD40] px-[0.4rem] py-[0.25rem] text-center text-[0.34438rem] leading-[0.45rem] font-bold font-montserrat text-[#07364D] uppercase sm:hidden'>
          {explorers.subtitle || 'Wanderlust station'}
        </div>
        <h3 className='font-motherland xsm:text-[1rem] xsm:text-center xsm:mt-1.5 relative z-1 ml-[0.75rem] rotate-[-5.037deg] text-[2.5rem] leading-normal font-normal text-[#F56E0A] whitespace-pre'>
          <div
            dangerouslySetInnerHTML={{ __html: explorers?.subtitle || 'Where Dreams Take Flight' }}
            className='text-stroke absolute inset-0'
          ></div>
          <div
            dangerouslySetInnerHTML={{ __html: explorers?.subtitle || 'Where Dreams Take Flight' }}
            className='relative z-1'
          ></div>
        </h3>
        <div className='xsm:mt-2 xsm:mb-0 relative -mt-1 mb-[1.81rem]'>
          <h2 className='font-phu-du xsm:max-w-[14rem] xsm:text-[1.75rem] xsm:leading-[1] relative max-w-[35.8125rem] text-[4.125rem] leading-[4.125rem] font-bold text-white uppercase line-clamp-3'>
            {explorers.title || 'A sanctuary where every journey begins'}
          </h2>
          <div className='font-montserrat xsm:hidden absolute top-[7.35rem] left-[12.875rem] z-1 flex h-[3.19075rem] w-[10.11475rem] -rotate-[7.522deg] items-center justify-center rounded-[50%] bg-[#F6CD40] text-center text-[0.875rem] leading-[0.875rem] font-bold text-[#07364D] uppercase line-clamp-2'>
            {explorers.subtitle || 'Wanderlust station'}
          </div>
        </div>
      </div>
    </div>
  )
}
