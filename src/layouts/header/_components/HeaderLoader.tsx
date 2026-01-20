export default function HeaderLoader() {
  return (
    <header className='fixed top-[0.625rem] xsm:top-3 left-[50%] z-50 h-[4.5rem] w-[87.5rem] xsm:h-[3.75rem] xsm:w-[calc(100%-2rem)] translate-x-[-50%] rounded-[1rem] xsm:rounded-[0.75rem] bg-black/50 p-[0_3.125rem] backdrop-blur-[10px] xsm:p-[0.625rem]'>
      <div className='flex h-full items-center justify-center'>
        <div className='h-[3rem] w-[3rem] animate-pulse rounded bg-white/20' />
      </div>
    </header>
  )
}
