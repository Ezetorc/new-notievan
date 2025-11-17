export function UserInfo({ name, value }: { name: string; value: string }) {
  return (
    <div className='flex flex-col gap-y-2'>
      <h3 className='mobile:text-[24px] tablet:text-3xl font-semibold'>{name}</h3>
      <div className='mobile:text-[18px] tablet:text-2xl'>{value}</div>
    </div>
  )
}
