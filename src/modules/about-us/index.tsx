import React from 'react'
import Banner from '@/modules/about-us/_components/Banner'
import OurAbout from '@/modules/about-us/_components/OurAbout'
import OurStoryAbout from '@/modules/about-us/_components/OurStoryAbout'
import JourneyAbout from '@/modules/about-us/_components/JourneyAbout'
import VideoStory from '@/modules/about-us/_components/VideoStory'
import {PageBannerACF} from '@/interface/banner.interface'
import {IAboutUs, IContentAbout, ITheExplorers, IVideoAbout, IWhereDreamsTakeFlight} from '@/interface/about.interface'

interface Props {
    locale?: string;
    banner?: PageBannerACF
    about: IAboutUs
    content: IContentAbout
    explorers: IWhereDreamsTakeFlight
    theExplorer: ITheExplorers
    video: IVideoAbout
}

const WrapperAbout=({
    locale,
    banner,
    about,
    content,
    explorers,
    theExplorer,
    video
}: Props) => {
  return (
    <main className='relative w-full h-full bg-[#FDF4ED] overflow-hidden'>
      <Banner
        locale={locale}
        data={banner}
      />
      <OurAbout
        about={about}
      />
      
      <OurStoryAbout content={content} />
      <JourneyAbout explorers={explorers} />
      <VideoStory
        theExplorer={theExplorer}
        video={video}
      />
    </main>
  )
}

export default WrapperAbout