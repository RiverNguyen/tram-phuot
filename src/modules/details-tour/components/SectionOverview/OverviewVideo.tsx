'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { cn } from '@/lib/utils'
import ICInstagram from '@/modules/details-tour/icons/ICInstagram'
import ICFacebook from '@/modules/details-tour/icons/ICFacebook'
import ICTiktok from '@/modules/details-tour/icons/ICTiktok'
import ICVolume from '@/modules/details-tour/icons/ICVolume'
import { OverviewVideoResType } from '@/types/details-tour.type'
import { SiteSettingsResType } from '@/types/wordpress.type'
import { WPLink } from '@/types/acf-wordpress.type'

interface OverviewVideoProps {
  overviewVideo: OverviewVideoResType
  siteSettings: SiteSettingsResType
}

export default function OverviewVideo({ overviewVideo, siteSettings }: OverviewVideoProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [containerRef, entry] = useIntersectionObserver({
    threshold: 0.5,
  })
  const [tiktokOembed, setTiktokOembed] = useState<any>(null)

  const tiktokUrl = overviewVideo?.video_tiktok // ví dụ: https://www.tiktok.com/@user/video/1234567890

  const oembedApi = tiktokUrl
    ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(tiktokUrl)}`
    : null

  useEffect(() => {
    if (oembedApi) {
      fetch(oembedApi)
        .then((response) => response.json())
        .then((data) => setTiktokOembed(data))
        .catch((error) => console.error('Error fetching TikTok oEmbed:', error))
    }
  }, [oembedApi])

  const isVisible = !!entry?.isIntersecting

  const videoId = useMemo(() => {
    const raw = overviewVideo?.video_tiktok
    const match = typeof raw === 'string' ? raw.match(/video\/(\d+)/) : null
    return match ? match[1] : undefined
  }, [overviewVideo?.video_tiktok])

  // set iframe src (lazy load)
  useEffect(() => {
    if (!videoId) {
      setIframeSrc(null)
      return
    }

    if (isVisible) {
      setIframeSrc(
        `https://www.tiktok.com/player/v1/${videoId}?music_info=0&description=0&controls=0&progress_bar=0&play_button=0&volume_control=1&fullscreen_button=0&timestamp=0&loop=1&autoplay=1`,
      )
    }
  }, [videoId, isVisible])

  const handleToggleVolume = () => setIsMuted((prev) => !prev)

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e)
  }

  const handleVideoLoadedData = () => {
    console.log('Video loaded successfully')
  }

  return (
    <div
      ref={containerRef}
      className='relative h-full w-full overflow-clip rounded-[1rem] bg-[#f5f5f5]'
    >
      {/* Gradient overlay - chỉ hiện khi có video_upload */}
      {overviewVideo?.video_type === 'video_upload' && (
        <div
          className='absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none z-1'
          style={{
            background:
              'linear-gradient(1deg, rgba(4, 4, 4, 0.93) 2.58%, rgba(0, 0, 0, 0.00) 84.04%, rgba(0, 0, 0, 0.70) 98.78%)',
          }}
        ></div>
      )}
      {tiktokOembed?.author_url && (
        <div className='absolute left-[1.0625rem] bottom-[2rem] right-[2.5625rem]'>
          <Link
            href={tiktokOembed.author_url}
            target='_blank'
            className='text-white font-medium font-phu-du'
          >
            {tiktokOembed?.author_name}
          </Link>
          <p className='text-[0.7rem] line-clamp-3 text-white font-light mt-2'>
            {tiktokOembed?.title}
          </p>
        </div>
      )}
      {overviewVideo?.video_type === 'video_upload' && (
        <button
          onClick={handleToggleVolume}
          className={cn('absolute top-6 left-6 flex size-6 items-center justify-center z-[2]')}
        >
          <ICVolume className='size-full text-white' />
          <span
            className={cn(
              'absolute top-1/2 left-1/2 hidden h-8 w-[0.15rem] -translate-1/2 -rotate-45 bg-white',
              isMuted && 'block',
            )}
          />
        </button>
      )}

      {siteSettings?.data?.social && (
        <div className='absolute top-0 right-0 flex items-center space-x-3 p-4 z-[2]'>
          <LinkSocial
            link={siteSettings.data.social.link_instagram}
            icon={<ICInstagram className='xsm:size-[0.7535rem] size-3.75' />}
          />
          <LinkSocial
            link={siteSettings.data.social.link_facebook}
            icon={<ICFacebook className='xsm:size-[0.7535rem] size-3.75' />}
          />
          <LinkSocial
            link={siteSettings.data.social.link_tiktok}
            icon={<ICTiktok className='xsm:size-[0.7535rem] size-3.75' />}
          />
        </div>
      )}

      {overviewVideo?.video_type === 'video_tiktok' && overviewVideo?.video_tiktok && (
        <iframe
          className='h-full w-full'
          width='100%'
          height='100%'
          style={{ border: 'none', width: '100%', height: '100%' }}
          allow='autoplay; encrypted-media; picture-in-picture'
          loading='lazy'
          title='TikTok Video'
          {...(iframeSrc && { src: iframeSrc })}
        />
      )}

      {overviewVideo?.video_type === 'video_upload' && overviewVideo?.video_upload?.url && (
        <video
          className='h-full w-full object-cover relative z-0'
          src={overviewVideo?.video_upload?.url}
          muted={isMuted}
          loop
          playsInline
          controls={false}
          preload='metadata'
          onError={handleVideoError}
          onLoadedData={handleVideoLoadedData}
          {...(isVisible && { autoPlay: true })}
        />
      )}
    </div>
  )
}

function LinkSocial({ link, icon }: { link: WPLink; icon: React.ReactNode }) {
  return (
    <Link
      target={link?.target || '_self'}
      href={link?.url || '#'}
      className={cn(
        'flex size-8.75 items-center justify-center rounded-full border border-solid border-white bg-white',
      )}
    >
      {icon}
    </Link>
  )
}
