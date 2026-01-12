import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonRelated() {
  return (
    <div className='xsm:flex-col xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] xsm:gap-[0.875rem] flex items-center gap-[4.5rem]'>
      <Skeleton className='xsm:h-[13.8125rem] xsm:w-full xsm:rounded-none h-[19.75rem] w-[34rem] shrink-0 rounded-[1.25rem]' />
      <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] xsm:gap-[1.25rem] flex flex-1 flex-col gap-[4rem]'>
        <div>
          <Skeleton className='h-4.5 w-28' />
          <Skeleton className='w-full h-10 xsm:mt-[0.5rem] xsm:mb-[0.375rem] my-[1rem]' />
          <Skeleton className='h-24 w-full' />
        </div>
        <Skeleton className='h-4.5 w-20' />
      </div>
    </div>
  )
}
