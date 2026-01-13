'use client'

import { BrandTitle } from '@/components/shared'
import { ITheExplorers, IVideoAbout } from '@/interface/about.interface'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface VideoStoryProps {
  theExplorer: ITheExplorers
  video: IVideoAbout
}

export default function VideoStory({ theExplorer, video }: VideoStoryProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPaused, setIsPaused] = useState(true)

  /* ================= MOUNT ================= */
  useEffect(() => {
    setIsMounted(true)
  }, [])

  /* ================= INTERSECTION OBSERVER ================= */
  useEffect(() => {
    if (!isMounted) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVideoLoaded) {
          setIsVideoLoaded(true)
          videoRef.current?.load()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [isMounted, isVideoLoaded])

  /* ================= CLICK PLAY / PAUSE ================= */
  const handleClickVideo = () => {
    if (!videoRef.current) return

    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPaused(false)
    } else {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }

  /* ================= RENDER ================= */
  const shouldShowVideo = isMounted && isVideoLoaded

  return (
    <div className='relative z-50 w-[87.5rem] mx-auto mt-[12.9rem] pb-[4.5rem] flex items-center justify-center xsm:mt-[4rem] xsm:w-full xsm:pb-[4rem] xsm:px-[1rem]'>
      {/* TITLE */}
      <div className='absolute left-[1.07rem] top-[-5.9rem] z-[50] xsm:left-[1.38rem] xsm:top-[-3rem]'>
        <BrandTitle
          title={theExplorer?.title || 'The explorers'}
          subtitle={theExplorer?.subtitle}
          variant='orange'
          classNameTitle='xsm:text-[1.25rem]'
          classNameContainer='xsm:w-[13.85938rem] xsm:h-[9.88156rem]'
          classNameTitleContainer='xsm:top-[0.5rem]'
          classNameSubtitle='left-[3.3rem] xsm:left-[2.06rem] xsm:w-[11.129rem] xsm:text-[1.75rem]'
        />
      </div>

      {/* VIDEO CONTAINER */}
      <div
        ref={containerRef}
        className='relative z-[10] w-full h-[39.0625rem] xsm:h-[24.5625rem] cursor-pointer overflow-hidden'
        onClick={handleClickVideo}
      >
        {/* VIDEO / PLACEHOLDER */}
        <div className='h-full w-full'>
          {shouldShowVideo ? (
            <video
              ref={videoRef}
              className='h-full w-full object-cover'
              src={video?.video_youtube || '/about-us/14056202_2560_1440_30fps.mp4'}
              preload='metadata'
              loop
              playsInline
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-gray-800'>
              <span className='text-white text-lg'>Loading video...</span>
            </div>
          )}
        </div>

        {/* PLAY BUTTON */}
        {isPaused && (
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='h-[5rem] w-[5rem] rounded-full overflow-hidden'>
              <Image
                src='/about-us/press-start.svg'
                alt='press-start'
                width={80}
                height={80}
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
