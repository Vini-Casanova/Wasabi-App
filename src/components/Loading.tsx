export function Loading() {
  return (
    <div className="flex gap-4 min-w-[320px] min-h-[147px] p-4 border animate-pulse bg-gray-400   border-gray-300 shadow-md hover:border-gray-100 max-md:h-fit transition-colors">
      <div className="grid grid-rows-[1fr, 20px]">
        <div>
          <div className="text-slate-70 font-normal text-lg mb-[18px] break-words" />
          <div className="mb-[10px] text-sm bg-slate-700" />
        </div>
        <div className="text-base font-normal bg-slate-100 " />
      </div>
      <div className="bg-slate-100 animate-pulse  max-w-[170px] max-h-[170px] max-sm:max-w-[120px] max-sm:max-h-[90px]" />
    </div>
  )
}
