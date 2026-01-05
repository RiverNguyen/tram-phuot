import TheExplorers from './explorers'
import OurStories from './our-stories/OurStories'

export default function Home() {
  return (
    <main className='relative w-full h-full bg-[#FDF4ED] overflow-hidden'>
      <TheExplorers />
      <OurStories />
    </main>
  )
}
