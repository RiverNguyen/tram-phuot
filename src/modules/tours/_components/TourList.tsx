import { ITour } from '@/interface/tour.interface'
import TourCard from './TourCard'

export default function TourList({ data }: { data: ITour[] }) {
  return (
    <div className='xsm:grid-cols-1 gap-y-[1.5rem] w-full grid grid-cols-4 gap-y-[2rem] gap-x-[1.125rem]'>
      {Array.isArray(data) &&
        data.map((tour, i) => (
          <TourCard
            key={i}
            tour={tour}
          />
        ))}
    </div>
  )
}
