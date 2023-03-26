export default function Skeleton() {
  return (
    <div className="animate-pulse grid md:grid-cols-4 md:gap-3">
      <div className="md:col-span-2">
        <div className="flex-1 h-96 w-auto mt-20">
          <div className="h-96 bg-slate-200 rounded"></div>
        </div>
      </div>
      <div className="flex-1 space-y-12 py-1 mt-20">
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 bg-slate-200 rounded col-span-2"></div>
            <div className="h-3 bg-slate-200 rounded col-span-1"></div>
          </div>
          <div className="h-3 bg-slate-200 rounded"></div>
          <div className="h-3 bg-slate-200 rounded"></div>
          <div className="h-3 bg-slate-200 rounded"></div>
          <div className="h-3 bg-slate-200 rounded"></div>
        </div>
      </div>
      <div className="card p-5 mt-20 space-y-12">
        <div className="h-3  rounded"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="h-10 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}
