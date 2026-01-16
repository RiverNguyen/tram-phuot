import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonPromotion() {
  return (
    <div className='xsm:gap-[0.875rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] relative flex h-full w-full flex-col items-center justify-start gap-[1.125rem]'>
      {/* Image */}
      <Skeleton className='xsm:h-[13.4375rem] h-[16.9375rem] w-full rounded-[1rem]' />

      <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem] self-stretch'>
          {/* Tags */}
          <div className='flex items-center gap-[0.625rem]'>
            <Skeleton className='h-5 w-20 rounded' />
            <Skeleton className='size-1 rounded-full' />
            <Skeleton className='h-5 w-16 rounded' />
          </div>

          {/* Title */}
          <div className='flex w-full flex-col gap-2'>
            <Skeleton className='h-6 w-full rounded' />
            <Skeleton className='h-6 w-3/4 rounded' />
          </div>
        </div>

        <div className='xsm:gap-[0.625rem] flex flex-col items-start gap-[0.75rem]'>
          {/* Code */}
          <Skeleton className='h-5 w-32 rounded' />

          {/* Tags */}
          <div className='flex flex-wrap gap-2'>
            <Skeleton className='h-6 w-16 rounded' />
            <Skeleton className='h-6 w-12 rounded' />
            <Skeleton className='h-6 w-20 rounded' />
          </div>
        </div>
      </div>
    </div>
  )
}
