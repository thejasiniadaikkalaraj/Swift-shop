export function SkeletonCard({ isLarge = false }: { isLarge?: boolean }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden ${isLarge ? 'sm:col-span-2' : ''}`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 20px rgba(167, 139, 250, 0.1)',
      }}
    >
      {/* Image skeleton */}
      <div
        className="w-full aspect-square relative overflow-hidden"
        style={{ backgroundColor: 'rgba(237, 233, 254, 0.5)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear',
          }}
        />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div
          className="h-5 rounded-full w-3/4 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(237, 233, 254, 0.5)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite linear',
              animationDelay: '0.15s',
            }}
          />
        </div>

        {/* Description */}
        <div
          className="h-4 rounded-full w-full relative overflow-hidden"
          style={{ backgroundColor: 'rgba(237, 233, 254, 0.5)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite linear',
              animationDelay: '0.3s',
            }}
          />
        </div>
        <div
          className="h-4 rounded-full w-1/2 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(237, 233, 254, 0.5)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite linear',
              animationDelay: '0.45s',
            }}
          />
        </div>

        {/* Price + button row */}
        <div className="flex items-center justify-between pt-2">
          <div
            className="h-7 w-16 rounded-full relative overflow-hidden"
            style={{ backgroundColor: 'rgba(237, 233, 254, 0.5)' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear',
                animationDelay: '0.6s',
              }}
            />
          </div>
          <div
            className="h-10 w-24 rounded-full relative overflow-hidden"
            style={{ backgroundColor: 'rgba(237, 233, 254, 0.5)' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear',
                animationDelay: '0.75s',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
