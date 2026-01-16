import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function SkeletonHotel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'xsm:h-[31.03531rem] xsm:rounded-[0.56044rem] group relative h-[28.6875rem] w-full overflow-hidden rounded-[0.5rem] bg-[#FFFCE3]',
        className,
      )}
      aria-hidden='true'
    >
      {/* image */}
      <Skeleton className='absolute inset-0 rounded-none bg-black/10' />

      {/* badge */}
      <div className='xsm:px-[0.84069rem] xsm:py-[0.70056rem] absolute top-0 left-0 inline-flex w-full px-[0.75rem] py-[0.625rem]'>
        <Skeleton className='xsm:h-[1.75144rem] xsm:w-[7.5rem] xsm:rounded-tl-[0.84069rem] xsm:rounded-br-[0.84069rem] h-[1.5625rem] w-[6.5rem] rounded-tl-[0.75rem] rounded-br-[0.75rem] bg-white/25' />
      </div>

      {/* bottom overlay */}
      <div className='xsm:min-h-auto xsm:pt-[3.50288rem] xsm:px-[0.84069rem] xsm:pb-[1.33106rem] xsm:items-center absolute bottom-0 left-0 flex min-h-[12.375rem] w-full items-end justify-between bg-[linear-gradient(180deg,rgba(6,42,25,0.00)_0%,rgba(6,42,25,0.58)_24.91%,#062A19_100%)] px-[0.75rem] pt-[3.125rem] pb-[1.1875rem]'>
        <div className='xsm:gap-[0.91075rem] flex h-full w-full flex-col items-start gap-[0.8125rem]'>
          {/* amenities pills */}
          <div className='xsm:gap-[0.42031rem] flex w-full flex-wrap items-center gap-[0.375rem]'>
            <Skeleton className='xsm:h-[1.2rem] h-[1.375rem] w-[4.75rem] rounded-[6.25rem] bg-white/15' />
            <Skeleton className='xsm:h-[1.2rem] h-[1.375rem] w-[3.5rem] rounded-[6.25rem] bg-white/10' />
          </div>

          {/* title */}
          <div className='flex w-full flex-col gap-[0.5rem]'>
            <Skeleton className='h-[1rem] w-[92%] rounded-[0.25rem] bg-white/20' />
            <Skeleton className='h-[1rem] w-[70%] rounded-[0.25rem] bg-white/15' />
          </div>

          {/* rating stars */}
          <div className='flex items-center gap-[0.25rem]'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='xsm:size-[0.84069rem] size-[0.75rem] rounded-[0.2rem] bg-white/15' />
            ))}
          </div>

          {/* bottom row */}
          <div className='xsm:justify-between flex h-full w-full items-center gap-[0.625rem]'>
            <div className='xsm:w-[15.20244rem] xsm:gap-[0.5rem] xsm:shrink-0 xsm:flex-none flex flex-1 flex-col items-start gap-[0.9375rem]'>
              <Skeleton className='xsm:h-[0.07006rem] h-[0.0625rem] w-full rounded-none bg-white/10' />
              <div className='flex w-full items-center justify-between'>
                <div className='xsm:gap-[0.28025rem] flex items-center gap-[0.25rem]'>
                  <Skeleton className='xsm:size-[0.84069rem] size-[0.75rem] rounded-[0.2rem] bg-white/15' />
                  <Skeleton className='h-[0.875rem] w-[7rem] rounded-[0.25rem] bg-white/15' />
                </div>
                <Skeleton className='h-[1.25rem] w-[5.5rem] rounded-[0.25rem] bg-[#FFC542]/25' />
              </div>
            </div>

            <Skeleton className='xsm:size-[2.75rem] xsm:rounded-[0.684rem] size-[2.25rem] rounded-[0.5625rem] bg-[#F56E0A]/35' />
          </div>
        </div>
      </div>
    </div>
  )
}
