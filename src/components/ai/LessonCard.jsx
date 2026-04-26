export default function LessonCard({ title, onSelect }) {
  return (
    <button
      onClick={() => onSelect(title)}
      className="flex-shrink-0 rounded-2xl border p-4 text-left transition-all"
      style={{
        minWidth:        168,
        backgroundColor: '#111827',
        borderColor:     '#1F2937',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#00C896'; e.currentTarget.style.backgroundColor = 'rgba(0,200,150,0.05)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1F2937'; e.currentTarget.style.backgroundColor = '#111827' }}
    >
      <p className="text-sm font-semibold text-white leading-snug mb-2">{title}</p>
      <p className="text-xs" style={{ color: '#6B7280' }}>2 min read</p>
    </button>
  )
}
