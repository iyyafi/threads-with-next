export default function Loading() {
  return (
    <div className="animate-pulse px-4 py-6 flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2">
          <div className="h-3 bg-slate-300 rounded max-w-[50px] w-full"></div>
          <div className="h-3 bg-slate-300 rounded max-w-[70px] w-full"></div>
        </div>
        <div className="h-3 bg-slate-300 rounded max-w-[200px] w-full"></div>
      </div>
      <div className="h-5 bg-slate-300 rounded"></div>
      <div className="h-5 bg-slate-300 rounded w-full max-w-[250px]"></div>
      <div className="flex flex-col gap-2">
        <div className="h-2 bg-slate-300 rounded"></div>
        <div className="h-2 bg-slate-300 rounded"></div>
        <div className="h-2 bg-slate-300 rounded"></div>
        <div className="h-2 bg-slate-300 rounded"></div>
        <div className="h-2 bg-slate-300 rounded w-full max-w-[250px]"></div>
      </div>
    </div>
  );
}
