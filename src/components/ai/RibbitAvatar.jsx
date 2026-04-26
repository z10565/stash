import ribbitImage from '../../assets/ribbit.png'

export default function RibbitAvatar({ size = 72, pulsing = false, showLabel = true }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={pulsing ? 'ribbit-pulse' : ''}
        style={{ width: size, height: size, flexShrink: 0, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 0 2px rgba(0,200,150,0.2)' }}
      >
        <img
          src={ribbitImage}
          alt="Ribbit"
          style={{ width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none' }}
          draggable={false}
        />
      </div>

      {showLabel && (
        <p className="text-xs font-semibold text-center" style={{ color: '#00C896' }}>
          Ribbit · Market AI
        </p>
      )}
    </div>
  )
}
