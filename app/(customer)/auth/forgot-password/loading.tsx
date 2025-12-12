export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-md space-y-4 p-6">
        <div className="h-8 w-32 bg-muted/20 animate-pulse rounded mx-auto" />
        <div className="space-y-3">
          <div className="h-10 bg-muted/20 animate-pulse rounded" />
          <div className="h-10 bg-muted/20 animate-pulse rounded" />
          <div className="h-10 bg-primary/20 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}