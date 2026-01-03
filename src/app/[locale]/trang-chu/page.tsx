import TheExplorers from './sections/TheExplorers'
import TheExplorers2 from './sections/TheExplorers-2'
import OurStories from './sections/OurStories'

export default function Home() {
  return (
    <main className='relative w-full h-full bg-[#FDF4ED] overflow-hidden'>
      <TheExplorers />
      <TheExplorers2 />
      <OurStories />
    </main>
  )
}
