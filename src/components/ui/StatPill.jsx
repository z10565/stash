export default function StatPill({ label, value, icon: Icon }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
      style={{ backgroundColor: '#111827', borderColor: '#1F2937', color: '#D1D5DB' }}
    >
      {Icon && <Icon size={15} color="#00C896" />}
      <span style={{ color: '#6B7280' }}>{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  )
}
