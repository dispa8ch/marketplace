export default function VendorsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="h-10 w-80 animate-pulse rounded bg-muted" />
      </div>
      <div className="rounded-lg border bg-card">
        <div className="space-y-4 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-12 flex-1 animate-pulse rounded bg-muted" />
              <div className="h-12 w-32 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
