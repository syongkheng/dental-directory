function arc(cx: number, cy: number, R: number, r: number, startDeg: number, endDeg: number) {
  const rad = (d: number) => (d * Math.PI) / 180
  const cos = Math.cos
  const sin = Math.sin
  const sx = cx + R * cos(rad(startDeg))
  const sy = cy + R * sin(rad(startDeg))
  const ex = cx + R * cos(rad(endDeg))
  const ey = cy + R * sin(rad(endDeg))
  const ix = cx + r * cos(rad(endDeg))
  const iy = cy + r * sin(rad(endDeg))
  const jx = cx + r * cos(rad(startDeg))
  const jy = cy + r * sin(rad(startDeg))
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M${sx.toFixed(2)},${sy.toFixed(2)} A${R},${R},0,${large},1,${ex.toFixed(2)},${ey.toFixed(2)} L${ix.toFixed(2)},${iy.toFixed(2)} A${r},${r},0,${large},0,${jx.toFixed(2)},${jy.toFixed(2)} Z`
}

const CX = 140
const CY = 140
const R = 110
const INNER = 60

const SEGMENTS = [
  { letter: 'P', label: 'Plan',   start: -131, end: -49, labelAngle: -90,  fill: 'var(--color-primary-subtle)', textColor: 'var(--color-primary)' },
  { letter: 'D', label: 'Do',     start: -41,  end: 41,  labelAngle: 0,    fill: 'var(--color-primary)',        textColor: 'var(--color-on-primary)' },
  { letter: 'C', label: 'Check',  start: 49,   end: 131, labelAngle: 90,   fill: 'var(--color-accent)',         textColor: 'var(--color-on-accent)' },
  { letter: 'A', label: 'Act',    start: 139,  end: 221, labelAngle: 180,  fill: 'var(--color-primary-hover)',  textColor: 'var(--color-on-primary)' },
]

function labelPos(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

export function PDCACycle() {
  return (
    <svg
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Plan Do Check Act quality cycle"
      style={{ width: '100%', maxWidth: '280px', height: 'auto' }}
    >
      {/* Outer decorative ring */}
      <circle cx={CX} cy={CY} r={R + 16} stroke="var(--color-border)" strokeWidth="1" strokeDasharray="4 6" />

      {/* Segment arcs */}
      {SEGMENTS.map((seg) => (
        <path
          key={seg.letter}
          d={arc(CX, CY, R, INNER, seg.start, seg.end)}
          style={{ fill: seg.fill }}
        />
      ))}

      {/* Segment labels */}
      {SEGMENTS.map((seg) => {
        const medR = (R + INNER) / 2
        const pos = labelPos(seg.labelAngle, medR)
        return (
          <g key={`label-${seg.letter}`}>
            <text
              x={pos.x}
              y={pos.y - 6}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="22"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
              style={{ fill: seg.textColor }}
            >
              {seg.letter}
            </text>
            <text
              x={pos.x}
              y={pos.y + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.04em"
              style={{ fill: seg.textColor, fillOpacity: 0.8 }}
            >
              {seg.label.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* Junction dots between segments */}
      {[-45, 45, 135, -135].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x = CX + (R + 8) * Math.cos(rad)
        const y = CY + (R + 8) * Math.sin(rad)
        return <circle key={deg} cx={x.toFixed(2)} cy={y.toFixed(2)} r="4" fill="var(--color-bg)" />
      })}

      {/* Center circle */}
      <circle cx={CX} cy={CY} r={INNER - 4} fill="var(--color-bg)" />
      <circle cx={CX} cy={CY} r={INNER - 4} stroke="var(--color-border)" strokeWidth="1" fill="none" />
      <text
        x={CX}
        y={CY - 7}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="var(--color-primary)"
        letterSpacing="-0.5"
      >
        PDCA
      </text>
      <text
        x={CX}
        y={CY + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="7.5"
        fontFamily="system-ui, sans-serif"
        fill="var(--color-text-muted)"
        letterSpacing="0.08em"
      >
        QUALITY CYCLE
      </text>
    </svg>
  )
}
