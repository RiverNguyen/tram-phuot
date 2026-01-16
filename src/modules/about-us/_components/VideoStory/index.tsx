'use client'

import { BrandTitle } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'
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

    // On mobile, load video immediately when component mounts
    const isMobile = window.innerWidth < 768
    if (isMobile && !isVideoLoaded) {
      setIsVideoLoaded(true)
      videoRef.current?.load()
      return
    }

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

    // Ensure video is loaded when user clicks
    if (!isVideoLoaded) {
      setIsVideoLoaded(true)
      videoRef.current.load()
    }

    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPaused(false)
    } else {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }

  /* ================= RENDER ================= */
  const shouldLoadVideo = isMounted && isVideoLoaded

  return (
    <div className='relative z-1 w-[87.5rem] mx-auto mt-[12.9rem] pb-[4.5rem] flex items-center justify-center xsm:mt-[4rem] xsm:w-full xsm:pb-[4rem] xsm:px-[1rem]'>
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
        className='relative z-[1] w-full h-[39.0625rem] xsm:h-[24.5625rem] cursor-pointer overflow-hidden'
        onClick={handleClickVideo}
      >
        {/* VIDEO / PLACEHOLDER */}
        <div className='h-full w-full relative z-[1]'>
          <video
            ref={videoRef}
            className='h-full w-full object-cover relative z-[1]'
            src={video?.video_youtube || '/about-us/14056202_2560_1440_30fps.mp4'}
            preload={shouldLoadVideo ? 'metadata' : 'none'}
            loop
            playsInline
            muted
          />
          {!shouldLoadVideo && (
            <div className='absolute inset-0 flex h-full w-full items-center justify-center bg-gray-800 pointer-events-none'>
              <div className='relative h-full w-full'>
                <Skeleton className='absolute inset-0 h-full w-full rounded-none bg-gray-700/50' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-4'>
                    <Skeleton className='h-[5rem] w-[5rem] rounded-full bg-white/20' />
                    <Skeleton className='h-4 w-32 bg-white/20' />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PLAY BUTTON */}
        {isPaused && (
          <div className='absolute inset-0 z-[2] flex items-center justify-center pointer-events-none'>
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
