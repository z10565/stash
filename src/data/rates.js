// ── Widget rate constants ─────────────────────────────────────────────────────
export const RATES = {
  p2p:   12,   // P2P Loans average
  etf:    8,   // ETFs / Index funds average
  bonds:  4.5, // Bonds / Term deposits average
  bank:   2,   // Bank deposit baseline
}

// ── Mix presets ───────────────────────────────────────────────────────────────
export const PRESETS = {
  conservative:  { p2p: 10, etf: 30, bonds: 60 },
  balanced:      { p2p: 30, etf: 50, bonds: 20 },
  growth:        { p2p: 50, etf: 40, bonds: 10 },
  aggressive:    { p2p: 70, etf: 25, bonds:  5 },
}

// ── Mix asset colours ─────────────────────────────────────────────────────────
export const MIX_COLORS = {
  p2p:   '#FF6B35',
  etf:   '#00D09C',
  bonds: '#F0A500',
}
