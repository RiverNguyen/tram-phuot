'use client'

import Image from 'next/image'
import { useRef } from 'react'
import Link from 'next/link'
import { SectionTitle } from '@/components/shared'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/dist/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

export default function TheExplorers() {
  const containerRef = useRef<HTMLDivElement>(null)

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
            targets: ['.street', '.image-dynamic-2', '.image-dynamic-4', '.content'],
            yValues: ['9.4946rem', '7.063rem', '5.9111rem', '5.1226rem'],
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

          // person animation
          tl.fromTo('.person', { y: '5.2504rem' }, { y: '0rem' }, '<')

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

  return (
    <div
      ref={containerRef}
      className='xsm:px-[1rem] xsm:h-[50.9375rem] relative w-full h-[50.83rem] max-w-[100rem] mx-auto'
    >
      {/* Background */}
      <Image
        src='/home/bg-explorers.webp'
        alt='Bg Explorers'
        width={4811}
        height={2669}
        className='xsm:hidden bg-explorers max-w-[105rem] absolute top-[7.88rem] left-1/2 -translate-x-1/2 w-[96.25rem] h-[35.75rem]'
      />
      <Image
        src='/home/bg-explorers-mb.webp'
        alt='Bg Explorers'
        width={1040}
        height={2102}
        className='sm:hidden pt-[3.25rem] absolute top-0 left-[1rem] w-[21.4375rem] h-[43.5625rem] '
      />
      {/* Brick 1 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 1'
        width={120}
        height={120}
        className='brick-1 z-1 absolute top-[13.4rem] left-[59.5509rem] w-[2.49169rem] h-auto'
      />
      {/* Brick 2 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 2'
        width={120}
        height={120}
        className='z-1 absolute top-[31.72rem] left-[93.3136rem] w-[2.49169rem] h-auto'
      />
      {/* Brick 3 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 2'
        width={120}
        height={120}
        className='brick-3 z-1 absolute top-[15.89rem] left-[57.0592rem] w-[2.49169rem] h-auto'
      />
      {/* Brick 4 */}
      <Image
        src='/home/brick.webp'
        alt='Brick 2'
        width={120}
        height={120}
        className='z-1 absolute top-[34.21rem] left-[90.8219rem] w-[2.49169rem] h-auto'
      />

      <div className='xsm:top-0 xsm:w-[21.4375rem] z-1 relative top-[8.51rem] left-1/2 -translate-x-1/2 w-[96.25rem] h-[35.125rem]'>
        {/* halo */}
        <div className='xsm:top-[28.41rem] xsm:left-[-1.0366rem] xsm:w-[18.99844rem] xsm:h-[16.7265rem] xsm:opacity-[0.8] halo absolute top-[2.3447rem] left-[56.0557rem] w-[18.32988rem] h-[18.52913rem] bg-[linear-gradient(154deg,rgba(255,183,21,0.60)_19.82%,rgba(240,76,5,0.60)_91.61%)] blur-[55.2px] opacity-[0.6]'></div>
        {/* rim 100 */}
        <Image
          src='/home/rim.webp'
          alt='Rim'
          width={1023}
          height={374}
          className='xsm:hidden rim-100 absolute top-[28.084rem] left-[13.3591rem] w-[21.30675rem] h-auto object-cover'
        />
        {/* rim 50 */}
        <Image
          src='/home/rim.webp'
          alt='Rim'
          width={1023}
          height={374}
          className='xsm:hidden rim-50 absolute top-[1.979rem] left-[75.7878rem] w-[21.30675rem] h-auto object-cover opacity-50'
        />
        {/* flower */}
        <Image
          src='/home/flower.webp'
          alt='Flower'
          width={624}
          height={513}
          className='xsm:hidden flower absolute top-[16.2202rem] left-[53.0031rem] w-[13rem] h-auto object-cover'
        />
        {/* towel left */}
        <Image
          src='/home/towel-left.webp'
          alt='towel left'
          width={2918}
          height={1950}
          className='xsm:hidden towel-left absolute top-[6.3rem] left-[-1.875rem] w-[45.0625rem] h-auto pointer-events-none' // width ở figma là 83.7493rem
        />
        {/* towel right */}
        <Image
          src='/home/towel-right.webp'
          alt='towel right'
          width={2918}
          height={1950}
          className='xsm:hidden towel-right absolute top-[-13.9rem] right-[-1.875rem] w-[35.5625rem] h-auto' // width ở figma là 32.5085rem
        />

        {/* towel mb */}
        <Image
          src='/home/towel-mb.webp'
          alt='towel mb'
          width={1125}
          height={2830}
          className='sm:hidden z-1 absolute top-[7.2rem] left-[-1rem] max-w-[23.4375rem] h-auto object-cover pointer-events-none'
        />

        {/* turtle tower */}
        <Image
          src='/home/turtle-tower.webp'
          alt='Turtle tower'
          width={979}
          height={1583}
          className='xsm:top-[26.62rem] xsm:left-[5.75rem] xsm:w-[11.20469rem] xsm:z-2 turle-tower absolute top-[-14.1392rem] left-[64.4232rem] w-[20.38738rem] h-auto object-cover'
        />
        {/* street */}
        <Image
          src='/home/street.webp'
          alt='Street'
          width={738}
          height={843}
          className='xsm:top-[29.81rem] xsm:left-[11.2rem] xsm:w-[12rem] xsm:z-3 street absolute top-[-4.75rem] left-[75.2rem] w-[15.16375rem] h-auto object-cover' // height ở figma là 15.7523rem
        />
        {/* person */}
        <Image
          src='/home/person.webp'
          alt='Person'
          width={1167}
          height={1021}
          className='xsm:top-[32.5rem] xsm:left-[-3.69rem] xsm:w-[12.57144rem] xsm:z-3 person z-1 absolute top-[2.085rem] left-[48.125rem] w-[24.3078rem] h-auto object-cover'
        />
        {/* image dynamic 1 */}
        <div className='xsm:top-[47.12rem] xsm:left-[5.7rem] xsm:w-[8.8395rem] xsm:h-[5.84513rem] xsm:p-[0.14356rem] xsm:rotate-[11.17deg] xsm:z-5 xsm:shadow-[-35.89px_72.068px_22.396px_0_rgba(0,0,0,0),-22.97px_45.94px_20.673px_0_rgba(0,0,0,0.01),-12.921px_25.841px_17.514px_0_rgba(0,0,0,0.05),-5.742px_11.485px_12.921px_0_rgba(0,0,0,0.09),-1.436px_2.871px_7.178px_0_rgba(0,0,0,0.1)] image-dynamic-1 z-2 absolute top-[22.5rem] left-[29.9rem] w-[26.43281rem] h-[17.47875rem] rotate-[-5.681deg] p-[0.42931rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src='/uu-dai/card.webp'
            alt='Image dynamic 1'
            width={1301}
            height={916}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 2 */}
        <div className='xsm:top-[42.5rem] xsm:left-[6.05rem] xsm:w-[9.00213rem] xsm:h-[5.55688rem] xsm:p-[0.14356rem] xsm:rotate-[-10.78deg] xsm:z-4 xsm:shadow-[-58.984px_118.439px_36.806px_0_rgba(0,0,0,0.00),-37.75px_75.499px_33.975px_0_rgba(0,0,0,0.01),-21.234px_42.468px_28.784px_0_rgba(0,0,0,0.05),-9.437px_18.875px_21.234px_0_rgba(0,0,0,0.09),-2.359px_4.719px_11.797px_0_rgba(0,0,0,0.10)] image-dynamic-2 z-2 absolute top-[16.659rem] left-[63.6362rem] w-[16.37975rem] h-[10.11094rem] rotate-[-10.78deg] p-[0.35rem] overflow-hidden bg-white shadow-[-107.323px_215.505px_66.97px_0_rgba(0,0,0,0),-68.687px_137.373px_61.818px_0_rgba(0,0,0,0.01),-38.636px_77.273px_52.374px_0_rgba(0,0,0,0.05),-17.172px_34.343px_38.636px_0_rgba(0,0,0,0.09),-4.293px_8.586px_21.465px_0_rgba(0,0,0,0.10)]'>
          <Image
            src='/uu-dai/card.webp'
            alt='Image dynamic 2'
            width={832}
            height={592}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 3 */}
        <div className='xsm:top-[41.51rem] xsm:left-[14.95rem] xsm:w-[6.97331rem] xsm:h-[9.91044rem] xsm:p-[0.14356rem] xsm:rotate-[4.53deg] xsm:z-3 xsm:shadow-[-55.13px_110.701px_34.401px_0_rgba(0,0,0,0.00),-35.283px_70.567px_31.755px_0_rgba(0,0,0,0.01),-19.847px_39.694px_26.904px_0_rgba(0,0,0,0.05),-8.821px_17.642px_19.847px_0_rgba(0,0,0,0.09),-2.205px_4.41px_11.026px_0_rgba(0,0,0,0.10)] image-dynamic-3 z-2 absolute top-[14.7rem] left-[77.2rem] w-[12.68819rem] h-[18.03244rem] rotate-[19.529deg] p-[0.35rem] overflow-hidden bg-white shadow-[-100.311px_201.425px_62.594px_0_rgba(0,0,0,0),-64.199px_128.399px_57.779px_0_rgba(0,0,0,0.01),-36.112px_72.224px_48.952px_0_rgba(0,0,0,0.05),-16.05px_32.1px_36.112px_0_rgba(0,0,0,0.09),-4.012px_8.025px_20.062px_0_rgba(0,0,0,0.1)]'>
          <Image
            src='/uu-dai/card.webp'
            alt='Image dynamic 3'
            width={831}
            height={985}
            className='w-full h-full object-cover'
          />
        </div>
        {/* image dynamic 4 */}
        <div className='xsm:top-[41.8rem] xsm:left-[-0.34rem] xsm:w-[8.2185rem] xsm:h-[6.94356rem] xsm:p-[0.14356rem] xsm:z-1 xsm:shadow-[-60.215px_120.911px_37.574px_0_rgba(0,0,0,0.00),-38.537px_77.075px_34.684px_0_rgba(0,0,0,0.01),-21.677px_43.355px_29.385px_0_rgba(0,0,0,0.05),-9.634px_19.269px_21.677px_0_rgba(0,0,0,0.09),-2.409px_4.817px_12.043px_0_rgba(0,0,0,0.10)] image-dynamic-4 z-2 absolute top-[22.8639rem] left-[55.9025rem] w-[14.9538rem] h-[12.6341rem] rotate-[11.21deg] p-[0.35rem] overflow-hidden bg-white shadow-[-109.563px_220.003px_68.367px_0_rgba(0,0,0,0),-70.12px_140.241px_63.108px_0_rgba(0,0,0,0.01),-39.443px_78.885px_53.467px_0_rgba(0,0,0,0.05),-17.53px_35.06px_39.443px_0_rgba(0,0,0,0.09),-4.383px_8.765px_21.913px_0_rgba(0,0,0,0.1)]'>
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
          className='xsm:top-[26.63rem] xsm:left-[0.56rem] xsm:w-[4.95738rem] stamp-1 z-3 absolute top-[14.5rem] left-[51rem] w-[9rem] h-auto '
        />
        {/* content */}
        <div className='xsm:top-[11.38rem] xsm:left-[1rem] xsm:right-[1rem] xsm:w-auto xsm:gap-[2.06rem] content absolute top-[5.4077rem] left-[16.9103rem] flex w-[32.0625rem] flex-col justify-center gap-[1.4375rem]'>
          <p className='xsm:text-[0.875rem] xsm:no-underline xsm:before:content-none xsm:leading-[1.75rem] xsm:tracking-[-0.0175rem] text-white text-[1.125rem] font-montserrat font-medium leading-[200%] tracking-[-2%] whitespace-pre-line underline decoration-[0.0625rem] decoration-[rgba(165,165,165,0.50)] underline-offset-[0.5rem] decoration-dashed decoration before:content-[""] before:pl-[3.875rem]'>
            {TEXTAREA}
          </p>
          <div className='xsm:gap-[1.01075rem] flex items-center gap-[1.1035rem]'>
            {SOCIALS.map((social) => (
              <Link
                href={social.href}
                key={social.name}
                className='xsm:size-[3.09138rem] size-[3.375rem]'
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
        <SectionTitle
          title='The explorers'
          subtitle='SHARE THEIR JOURNEYS!'
          rotation={-3.64}
          classNameIcon='text-[#F56E0A]'
        />
      </div>
      {/* stamp 2 */}
      <Image
        src='/home/stamp-2.webp'
        alt='Stamp 1'
        width={525}
        height={525}
        className='xsm:hidden stamp-2 z-3 absolute top-[12.9rem] left-[8.0356rem] w-[10rem] h-auto '
      />
      <Image
        src='/home/stamp-2-mb.webp'
        alt='Stamp 1'
        width={311}
        height={313}
        className='sm:hidden stamp-2 z-3 absolute top-[5.63063rem] right-[1.785rem] w-[3.47288rem] h-auto '
      />
    </div>
  )
}
