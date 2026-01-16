'use client'

import Image from 'next/image'
import { motion, type Variants } from 'motion/react'
import { useMemo } from 'react'

interface ImagesProps {
  isInView: boolean
}

// Animation configurations
const DEFAULT_EASING = [0.39, 0.02, 0.15, 0.85] as const
const DEFAULT_DURATION = 1.5

const slideUpVariants: Variants = {
  hidden: { y: '8rem' },
  visible: { y: 0 },
}

const slideUpLongVariants: Variants = {
  hidden: { y: '14rem' },
  visible: { y: 0 },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const slideUpFadeVariants: Variants = {
  hidden: { opacity: 0, y: '5rem' },
  visible: { opacity: 1, y: 0 },
}

const slideUpLongFadeVariants: Variants = {
  hidden: { opacity: 0, y: '14rem' },
  visible: { opacity: 1, y: 0 },
}

const slideUpXFadeVariants: Variants = {
  hidden: { opacity: 0, y: '14rem', x: '3rem' },
  visible: { opacity: 1, y: 0, x: 0 },
}

const slideUpXVariants: Variants = {
  hidden: { y: '14rem', x: '-5rem' },
  visible: { y: 0, x: 0 },
}

const slideUpXRightVariants: Variants = {
  hidden: { y: '14rem', x: '2rem' },
  visible: { y: 0, x: 0 },
}

const slideUpLongXVariants: Variants = {
  hidden: { y: '18rem', x: '18rem', opacity: 0 },
  visible: { y: 0, x: 0, opacity: 1 },
}

const blurTransformVariants: Variants = {
  hidden: {
    y: '40rem',
    x: '8rem',
    filter: 'blur(124px)',
    width: '40.8095rem',
    height: '41.25306rem',
    opacity: 0.5,
  },
  visible: {
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    width: '5.67363rem',
    height: '5.73531rem',
    opacity: 1,
  },
}

const blurFadeVariants: Variants = {
  hidden: { opacity: 0, y: '5rem', x: '-3rem' },
  visible: { opacity: 0.5, y: 0, x: 0 },
}

const defaultTransition = {
  duration: DEFAULT_DURATION,
  ease: DEFAULT_EASING,
}

type TransitionConfig = typeof defaultTransition & {
  delay?: number
}

// Reusable animated image component
interface AnimatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className: string
  variants: Variants
  isInView: boolean
  transition?: TransitionConfig
  delay?: number
}

const AnimatedImage = ({
  src,
  alt,
  width,
  height,
  className,
  variants,
  isInView,
  transition = defaultTransition,
  delay,
}: AnimatedImageProps) => {
  const transitionWithDelay = useMemo(
    () => (delay !== undefined ? { ...transition, delay } : transition),
    [delay, transition],
  )

  return (
    <motion.div
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transitionWithDelay}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='w-full h-full object-cover'
      />
    </motion.div>
  )
}

const Images = ({ isInView }: ImagesProps) => {
  return (
    <>
      {/* Static images */}
      <Image
        src='/home/overview/logo.webp'
        alt='Tram Phuot Logo'
        width={367}
        height={350}
        className='w-auto h-[21.5rem] object-cover absolute top-0 left-0 xsm:hidden'
        priority
      />
      <Image
        src='/home/overview/decor-paper.webp'
        alt='Decorative paper background'
        width={1440}
        height={500}
        className='w-full h-auto object-cover absolute bottom-0 left-0 z-[4] pointer-events-none'
        priority
      />
      <Image
        src='/home/overview/grandma.webp'
        alt='Grandma character'
        width={375}
        height={275}
        className='w-[23.36031rem] h-[17.15269rem] object-cover absolute bottom-[12rem] left-[-3rem] z-[4] xsm:bottom-[2.25rem] xsm:left-[-1rem] xsm:w-[9.10775rem] xsm:h-[6.6875rem]'
      />
      <Image
        src='/home/overview/image-mobile.webp'
        alt='Mobile overview image'
        width={375}
        height={275}
        unoptimized
        className='w-full xsm:block hidden h-[17.15269rem] object-cover absolute bottom-[2rem] left-0 z-[3]'
      />

      {/* Desktop only images */}
      <div className='xsm:hidden'>
        <Image
          src='/home/overview/bridge.webp'
          alt='Bridge scene'
          width={785}
          height={400}
          className='w-[48.94969rem] h-[25.13025rem] object-cover absolute bottom-[0.5rem] left-[-1rem] z-[1] rotate-[3.464deg]'
        />

        <AnimatedImage
          src='/home/overview/post-office.webp'
          alt='Post office building'
          width={620}
          height={370}
          className='w-[38.58994rem] h-[23.23944rem] absolute bottom-[10rem] left-[15rem] z-[0]'
          variants={slideUpVariants}
          isInView={isInView}
          transition={{ ...defaultTransition, delay: 0.1 }}
        />

        <motion.div
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInVariants}
          transition={{ duration: 1, ease: 'easeOut' }}
          className='w-[12.63738rem] h-[16.88356rem] absolute bottom-[20rem] left-[-5rem] z-[0]'
        >
          <Image
            src='/home/overview/decor-art.webp'
            alt='Decorative art'
            width={200}
            height={270}
            className='w-full h-full object-cover'
          />
        </motion.div>

        <AnimatedImage
          src='/home/overview/hand.webp'
          alt='Hand gesture'
          width={840}
          height={475}
          className='w-[52.68494rem] h-[29.63525rem] absolute bottom-[8rem] right-[15rem] z-[1]'
          variants={{
            hidden: { y: '13rem' },
            visible: { y: 0 },
          }}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/lion.webp'
          alt='Lion statue'
          width={370}
          height={415}
          className='w-[23.10838rem] h-[26.05594rem] absolute bottom-[11rem] right-[15rem] z-[3]'
          variants={slideUpXVariants}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/building.webp'
          alt='Historic building'
          width={400}
          height={390}
          className='w-[25.12713rem] h-[24.35044rem] absolute bottom-[11rem] right-[-0.5rem] z-[2]'
          variants={slideUpXRightVariants}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/train.webp'
          alt='Train scene'
          width={810}
          height={545}
          className='w-[50.59313rem] h-[33.94225rem] absolute bottom-[25rem] right-[-8rem] z-[1]'
          variants={slideUpLongVariants}
          isInView={isInView}
        />

        <motion.div
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={blurTransformVariants}
          transition={{ ...defaultTransition, delay: 0.2 }}
          className='absolute bottom-[55rem] right-[4.5rem] z-[0]'
        >
          <Image
            src='/home/overview/decor-right.svg'
            alt='Right decorative element'
            width={90}
            height={90}
            className='w-full h-full object-cover'
          />
        </motion.div>

        <AnimatedImage
          src='/home/overview/old.webp'
          alt='Old building'
          width={365}
          height={290}
          className='w-[22.78125rem] h-[18.19969rem] absolute bottom-[40rem] right-[0rem] z-[0]'
          variants={slideUpLongVariants}
          isInView={isInView}
        />

        <motion.div
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={blurFadeVariants}
          transition={{ ...defaultTransition, delay: 0.3 }}
          className='absolute w-[30.8rem] blur-[124px] h-[30.2rem] bottom-[20rem] right-[-2rem] z-[0]'
        >
          <Image
            src='/home/overview/decor-right.svg'
            alt='Blurred decorative element'
            width={90}
            height={90}
            className='w-full h-full object-cover'
          />
        </motion.div>

        <AnimatedImage
          src='/home/overview/bird.webp'
          alt='Bird illustration'
          width={290}
          height={215}
          className='w-[17.98975rem] h-[13.49231rem] absolute bottom-[46rem] right-[18rem] z-[0]'
          variants={slideUpXFadeVariants}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/brick.webp'
          alt='Brick decoration'
          width={60}
          height={60}
          className='size-[3.68563rem] absolute top-[3.68563rem] left-0 z-[0]'
          variants={slideUpFadeVariants}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/brick.webp'
          alt='Brick decoration'
          width={60}
          height={60}
          className='size-[3.68563rem] absolute top-0 left-[3.68563rem] z-[0]'
          variants={{
            hidden: { opacity: 0, y: '8rem' },
            visible: { opacity: 1, y: 0 },
          }}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/brick.webp'
          alt='Brick decoration'
          width={40}
          height={40}
          className='size-[2.49169rem] absolute bottom-[28rem] right-[35rem] z-[0]'
          variants={{
            hidden: { y: '8rem' },
            visible: { y: 0 },
          }}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/brick.webp'
          alt='Brick decoration'
          width={40}
          height={40}
          className='size-[2.49169rem] absolute bottom-[calc(28rem-2.49169rem)] right-[37.49169rem] z-[0]'
          variants={{
            hidden: { y: '8rem' },
            visible: { y: 0 },
          }}
          isInView={isInView}
        />

        <AnimatedImage
          src='/home/overview/go-road.svg'
          alt='Go road sign'
          width={155}
          height={150}
          className='w-[11.69144rem] h-[11.387rem] absolute bottom-[50rem] right-[12.5rem] z-[0]'
          variants={fadeInVariants}
          isInView={isInView}
          delay={0.3}
        />

        <AnimatedImage
          src='/home/overview/decor-left.svg'
          alt='Left decorative element'
          width={205}
          height={205}
          className='w-[12.73044rem] h-[12.86881rem] absolute bottom-[35rem] right-[21rem] z-[0]'
          variants={slideUpLongXVariants}
          isInView={isInView}
          delay={0.2}
        />
      </div>
    </>
  )
}

export default Images
