import { Skeleton } from '@/components/ui/skeleton'

const StoriesCardSkeleton = () => {
  return (
    <div className='xsm:w-[15.6875rem] relative flex w-full max-w-[28.25rem] flex-col gap-[1.125rem] xsm:shrink-0'>
      {/* Tag skeleton */}
      <Skeleton className='xsm:left-[0.63rem] xsm:top-[0.56rem] xsm:h-[1.3125rem] absolute top-[0.57rem] left-[0.63rem] h-[2rem] w-[5rem] rounded-tl-[0.75rem] rounded-br-[0.75rem]' />

      {/* Image skeleton */}
      <Skeleton className='xsm:h-[10.47088rem] w-auto h-[18.875rem] rounded-[1.25rem]' />

      {/* Text skeletons */}
      <div className='xsm:w-full flex flex-col w-[27.08938rem] gap-[0.875rem]'>
        <Skeleton className='h-[2.0625rem] w-full' />
        <Skeleton className='h-[1.4rem] w-[8rem]' />
      </div>
    </div>
  )
}

export default StoriesCardSkeleton
