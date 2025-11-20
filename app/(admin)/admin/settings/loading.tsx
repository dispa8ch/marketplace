export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-48 animate-pulse rounded bg-muted" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
