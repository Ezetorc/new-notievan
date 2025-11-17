export function UserInfo({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className='text-3xl font-semibold'>{name}</h3>
      <div className='text-2xl w-[30%]'>{value}</div>
    </div>
  )
}
