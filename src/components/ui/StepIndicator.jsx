export default function StepIndicator({ steps, current }) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="h-1 rounded-full mb-4" style={{ backgroundColor: '#1F2937' }}>
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ backgroundColor: '#00C896', width: `${((current) / steps) * 100}%` }}
        />
      </div>
      {/* Step labels */}
      <div className="flex justify-between">
        {Array.from({ length: steps }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all"
              style={{
                backgroundColor: i < current ? '#00C896' : i === current ? '#00C896' : '#1F2937',
                color: i <= current ? '#0A0E1A' : '#6B7280',
              }}
            >
              {i < current ? '✓' : i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
