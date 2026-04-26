import miaImage from '../../assets/mia.png'

export default function MiaAvatar({ size = 80, typing = false, showLabel = true }) {
  const dotSize = Math.round(size * 0.11)

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-full flex items-center justify-center relative overflow-hidden flex-shrink-0"
        style={{
          width:     size,
          height:    size,
          boxShadow: '0 0 0 2px rgba(0,208,156,0.2)',
        }}
      >
        {/* Character image */}
        {!typing && (
          <img
            src={miaImage}
            alt="Mia"
            style={{ width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none' }}
            draggable={false}
          />
        )}

        {/* Typing overlay */}
        {typing && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,60,40,0.65)', borderRadius: '50%' }}
          >
            <div className="flex gap-1 items-center">
              <div className="typing-dot rounded-full bg-white" style={{ width: dotSize, height: dotSize }} />
              <div className="typing-dot rounded-full bg-white" style={{ width: dotSize, height: dotSize }} />
              <div className="typing-dot rounded-full bg-white" style={{ width: dotSize, height: dotSize }} />
            </div>
          </div>
        )}
      </div>

      {showLabel && (
        <p className="text-xs font-semibold text-center" style={{ color: '#00D09C' }}>
          Mia · Your investing guide
        </p>
      )}
    </div>
  )
}
