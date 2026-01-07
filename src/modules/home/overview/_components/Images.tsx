'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

interface ImagesProps {
  isInView: boolean
}

const Images = ({ isInView }: ImagesProps) => {
  return (
    <>
      <Image
        src={'/home/overview/logo.webp'}
        alt='overview-bg'
        width={367}
        height={350}
        className='w-auto h-[21.5rem] object-cover absolute top-0 left-0 xsm:hidden'
      />
      <Image
        src={'/home/overview/decor-paper.webp'}
        alt='overview-paper'
        width={1440}
        height={500}
        className='w-full h-auto object-cover absolute bottom-0 left-0 z-[4]'
      />
      <Image
        src={'/home/overview/grandma.webp'}
        alt='overview-grandma'
        width={375}
        height={275}
        className='w-[23.36031rem] h-[17.15269rem] object-cover absolute bottom-[12rem] left-[-3rem] z-[4] xsm:bottom-[2.25rem] xsm:left-[-1rem] xsm:w-[9.10775rem] xsm:h-[6.6875rem]'
      />
      <Image
        src={'/home/overview/image-mobile.webp'}
        alt='overview-grandma'
        width={375}
        height={275}
        className='w-full xsm:block hidden h-[17.15269rem] object-cover absolute bottom-[2rem] left-0 z-[3]'
      />
      <div className='xsm:hidden'>
        <Image
          src={'/home/overview/bridge.webp'}
          alt='overview-bride'
          width={785}
          height={400}
          className='w-[48.94969rem] h-[25.13025rem] object-cover absolute bottom-[0.5rem] left-[-1rem] z-[1] rotate-[3.464deg]'
        />
        <motion.div
          initial={{ y: '8rem' }}
          animate={isInView ? { y: 0 } : { y: '8rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.1 }}
          className='w-[38.58994rem] h-[23.23944rem] absolute bottom-[10rem] left-[15rem] z-[0]'
        >
          <Image
            src={'/home/overview/post-office.webp'}
            alt='overview-bride'
            width={620}
            height={370}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className='w-[12.63738rem] h-[16.88356rem] absolute bottom-[20rem] left-[-5rem] z-[0]'
        >
          <Image
            src={'/home/overview/decor-art.webp'}
            alt='overview-bride'
            width={200}
            height={270}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ y: '13rem' }}
          animate={isInView ? { y: 0 } : { y: '12rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='w-[52.68494rem] h-[29.63525rem] absolute bottom-[8rem] right-[15rem] z-[1]'
        >
          <Image
            src={'/home/overview/hand.webp'}
            alt='overview-bride'
            width={840}
            height={475}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ y: '14rem', x: '-5rem' }}
          animate={isInView ? { y: 0, x: 0 } : { y: '14rem', x: '-5rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='w-[23.10838rem] h-[26.05594rem] absolute bottom-[11rem] right-[15rem] z-[3]'
        >
          <Image
            src={'/home/overview/lion.webp'}
            alt='overview-bride'
            width={370}
            height={415}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ y: '14rem', x: '2rem' }}
          animate={isInView ? { y: 0, x: 0 } : { y: '14rem', x: '2rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='w-[25.12713rem] h-[24.35044rem] absolute bottom-[11rem] right-[-0.5rem] z-[2]'
        >
          <Image
            src={'/home/overview/building.webp'}
            alt='overview-bride'
            width={400}
            height={390}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ y: '14rem' }}
          animate={isInView ? { y: 0 } : { y: '14rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='w-[50.59313rem] h-[33.94225rem] absolute bottom-[25rem] right-[-8rem] z-[1]'
        >
          <Image
            src={'/home/overview/train.webp'}
            alt='overview-bride'
            width={810}
            height={545}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{
            y: '40rem',
            x: '8rem',
            filter: 'blur(124px)',
            width: '40.8095rem',
            height: '41.25306rem',
            opacity: 0.5,
          }}
          animate={
            isInView
              ? {
                  y: 0,
                  x: 0,
                  filter: 'blur(0px)',
                  width: '5.67363rem',
                  height: '5.73531rem',
                  opacity: 1,
                }
              : {
                  y: '40rem',
                  x: '8rem',
                  filter: 'blur(124px)',
                  width: '40.8095rem',
                  height: '41.25306rem',
                  opacity: 0.3,
                }
          }
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.2 }}
          className='absolute bottom-[55rem] right-[4.5rem] z-[0]'
        >
          <Image
            src={'/home/overview/decor-right.svg'}
            alt='overview-bride'
            width={90}
            height={90}
            className='w-full h-full object-cover'
          />
        </motion.div>

        <motion.div
          initial={{ y: '14rem' }}
          animate={isInView ? { y: 0 } : { y: '14rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='w-[22.78125rem] h-[18.19969rem] absolute bottom-[40rem] right-[0rem] z-[0]'
        >
          <Image
            src={'/home/overview/old.webp'}
            alt='overview-bride'
            width={365}
            height={290}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '5rem', x: '-3rem' }}
          animate={isInView ? { opacity: 0.5, y: 0, x: 0 } : { opacity: 0, y: '5rem', x: '-3rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.3 }}
          className='absolute w-[30.8rem] blur-[124px] h-[30.2rem] bottom-[20rem] right-[-2rem] z-[0]'
        >
          <Image
            src={'/home/overview/decor-right.svg'}
            alt='overview-bride'
            width={90}
            height={90}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '14rem', x: '3rem' }}
          animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: '14rem', x: '3rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='w-[17.98975rem] h-[13.49231rem] absolute bottom-[46rem] right-[18rem] z-[0]'
        >
          <Image
            src={'/home/overview/bird.webp'}
            alt='overview-bride'
            width={290}
            height={215}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '5rem' }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: '5rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='size-[3.68563rem] absolute top-[3.68563rem] left-0 z-[0]'
        >
          <Image
            src={'/home/overview/brick.webp'}
            alt='overview-bride'
            width={60}
            height={60}
            className='size-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '8rem' }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: '8rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='size-[3.68563rem] absolute top-0 left-[3.68563rem] z-[0]'
        >
          <Image
            src={'/home/overview/brick.webp'}
            alt='overview-bride'
            width={60}
            height={60}
            className='size-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 1, y: '8rem' }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: '8rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='size-[2.49169rem] absolute bottom-[28rem] right-[35rem] z-[0]'
        >
          <Image
            src={'/home/overview/brick.webp'}
            alt='overview-bride'
            width={40}
            height={40}
            className='size-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 1, y: '8rem' }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: '8rem' }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85] }}
          className='size-[2.49169rem] absolute bottom-[calc(28rem-2.49169rem)] right-[37.49169rem] z-[0]'
        >
          <Image
            src={'/home/overview/brick.webp'}
            alt='overview-bride'
            width={40}
            height={40}
            className='size-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.3 }}
          className='w-[11.69144rem] h-[11.387rem] absolute bottom-[50rem] right-[12.5rem] z-[0]'
        >
          <Image
            src={'/home/overview/go-road.svg'}
            alt='overview-bride'
            width={155}
            height={150}
            className='w-full h-full object-cover'
          />
        </motion.div>
        <motion.div
          initial={{ y: '18rem', x: '18rem', opacity: 0 }}
          animate={isInView ? { y: 0, x: 0, opacity: 1 } : { y: '18rem', x: '18rem', opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.2 }}
          className='w-[12.73044rem] h-[12.86881rem] absolute bottom-[35rem] right-[21rem] z-[0]'
        >
          <Image
            src={'/home/overview/decor-left.svg'}
            alt='overview-bride'
            width={205}
            height={205}
            className='w-full h-full object-cover'
          />
        </motion.div>
      </div>
    </>
  )
}

export default Images
