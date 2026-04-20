import { ShieldCheck, AlertTriangle, Building2 } from 'lucide-react'

const CONFIG = {
  buyback: {
    label: 'Buyback guarantee',
    icon: ShieldCheck,
    color: '#00D09C',
    bg: 'rgba(0,208,156,0.10)',
    border: 'rgba(0,208,156,0.25)',
  },
  collateral: {
    label: 'Collateralised',
    icon: Building2,
    color: '#F0A500',
    bg: 'rgba(240,165,0,0.10)',
    border: 'rgba(240,165,0,0.25)',
  },
  DGS: {
    label: 'Deposit guarantee',
    icon: ShieldCheck,
    color: '#26E5B0',
    bg: 'rgba(38,229,176,0.10)',
    border: 'rgba(38,229,176,0.25)',
  },
  none: {
    label: 'Capital at risk',
    icon: AlertTriangle,
    color: '#FF6B78',
    bg: 'rgba(255,71,87,0.08)',
    border: 'rgba(255,71,87,0.20)',
  },
}

export default function ProtectionBadge({ type = 'none', compact = false }) {
  const cfg = CONFIG[type] || CONFIG.none
  const Icon = cfg.icon

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
        style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
      >
        <Icon size={10} />
        {cfg.label}
      </span>
    )
  }

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
      style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
    >
      <Icon size={12} />
      {cfg.label}
    </div>
  )
}
