import Banner from './sections/Banner'
import WrapperTourList from './sections/WrapperTourList'

export default function page() {
  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner />

      {/* Main content */}
      <div className='xsm:px-[1rem] xsm:py-[2.5rem] xsm:gap-[2.5rem] relative w-full h-full max-w-[87.5rem] mx-auto flex flex-col items-center gap-[3.75rem] pt-[5rem] pb-[3.75rem]'>
        <WrapperTourList />
      </div>
    </main>
  )
}
