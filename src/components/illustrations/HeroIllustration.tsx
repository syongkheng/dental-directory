export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="hero-crown-fill" x1="240" y1="75" x2="240" y2="299" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff8f4" />
          <stop offset="55%" stopColor="#f0e6dc" />
          <stop offset="100%" stopColor="#ddd0c5" />
        </linearGradient>
        <radialGradient id="hero-bg-glow" cx="50%" cy="47%" r="46%">
          <stop offset="0%" stopColor="#fdeae0" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fdeae0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background radial glow */}
      <ellipse cx="240" cy="207" rx="225" ry="205" fill="url(#hero-bg-glow)" />

      {/* Precision measurement arcs */}
      <circle cx="240" cy="187" r="160" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.1" fill="none" />
      <circle cx="240" cy="187" r="182" stroke="var(--color-primary)" strokeWidth="0.75" strokeOpacity="0.07" fill="none" />
      <circle cx="240" cy="187" r="205" stroke="var(--color-primary)" strokeWidth="0.5" strokeOpacity="0.04" fill="none" />
      <circle cx="240" cy="187" r="130" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.12" fill="none" strokeDasharray="5 8" />
      <circle cx="240" cy="187" r="108" stroke="var(--color-accent)" strokeWidth="0.75" strokeOpacity="0.09" fill="none" strokeDasharray="3 6" />

      {/* Crosshair reference lines */}
      <line x1="240" y1="8" x2="240" y2="58" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.16" />
      <line x1="240" y1="330" x2="240" y2="380" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.16" />
      <line x1="58" y1="187" x2="108" y2="187" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.16" />
      <line x1="372" y1="187" x2="422" y2="187" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.16" />
      <line x1="237" y1="8" x2="243" y2="8" stroke="var(--color-primary)" strokeWidth="2" strokeOpacity="0.28" />
      <line x1="237" y1="380" x2="243" y2="380" stroke="var(--color-primary)" strokeWidth="2" strokeOpacity="0.28" />
      <line x1="58" y1="184" x2="58" y2="190" stroke="var(--color-primary)" strokeWidth="2" strokeOpacity="0.28" />
      <line x1="422" y1="184" x2="422" y2="190" stroke="var(--color-primary)" strokeWidth="2" strokeOpacity="0.28" />

      {/* Floating dots — scattered precision particles */}
      <circle cx="90" cy="115" r="5" fill="var(--color-primary)" opacity="0.28" />
      <circle cx="382" cy="140" r="4" fill="var(--color-primary)" opacity="0.2" />
      <circle cx="418" cy="298" r="3.5" fill="var(--color-accent)" opacity="0.35" />
      <circle cx="60" cy="320" r="4" fill="var(--color-accent)" opacity="0.28" />
      <circle cx="140" cy="400" r="3" fill="var(--color-primary)" opacity="0.18" />
      <circle cx="358" cy="390" r="5" fill="var(--color-primary)" opacity="0.14" />
      <circle cx="450" cy="172" r="3" fill="var(--color-accent)" opacity="0.22" />
      <circle cx="35" cy="222" r="4" fill="var(--color-primary)" opacity="0.17" />
      <circle cx="180" cy="20" r="3" fill="var(--color-accent)" opacity="0.28" />
      <circle cx="310" cy="28" r="4" fill="var(--color-primary)" opacity="0.17" />
      <circle cx="462" cy="72" r="2.5" fill="var(--color-primary)" opacity="0.2" />
      <circle cx="22" cy="145" r="3" fill="var(--color-accent)" opacity="0.17" />
      <circle cx="455" cy="360" r="3.5" fill="var(--color-accent)" opacity="0.15" />
      <circle cx="18" cy="388" r="2.5" fill="var(--color-primary)" opacity="0.14" />

      {/* Decorative accent cluster — upper-right */}
      <circle cx="410" cy="68" r="34" fill="var(--color-primary)" opacity="0.05" />
      <circle cx="410" cy="68" r="21" fill="var(--color-primary)" opacity="0.09" />
      <circle cx="410" cy="68" r="8" fill="var(--color-primary)" opacity="0.32" />

      {/* Decorative accent cluster — lower-left */}
      <circle cx="70" cy="388" r="24" fill="var(--color-accent)" opacity="0.07" />
      <circle cx="70" cy="388" r="13" fill="var(--color-accent)" opacity="0.12" />
      <circle cx="70" cy="388" r="4.5" fill="var(--color-accent)" opacity="0.28" />

      {/* Small rotated squares */}
      <rect x="428" y="318" width="11" height="11" transform="rotate(45 433.5 323.5)" fill="var(--color-primary)" opacity="0.14" />
      <rect x="36" y="70" width="9" height="9" transform="rotate(45 40.5 74.5)" fill="var(--color-accent)" opacity="0.18" />
      <rect x="176" y="418" width="8" height="8" transform="rotate(45 180 422)" fill="var(--color-primary)" opacity="0.14" />

      {/* Subtle lab instrument silhouettes */}
      <line x1="44" y1="355" x2="136" y2="342" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeOpacity="0.13" strokeLinecap="round" />
      <circle cx="46" cy="356" r="3.5" fill="var(--color-text-muted)" opacity="0.1" />
      <line x1="344" y1="368" x2="428" y2="382" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeOpacity="0.13" strokeLinecap="round" />
      <circle cx="427" cy="382" r="5" fill="var(--color-accent)" opacity="0.13" />

      {/* === DENTAL CROWN — Central Hero Motif === */}

      {/* Crown body fill */}
      <path
        d="M155 275
           C 152 282 162 296 178 299
           L 302 299
           C 318 296 328 282 325 275
           C 330 242 335 202 330 172
           C 327 147 318 122 306 102
           Q 298 90 293 97
           Q 282 112 272 132
           Q 264 113 254 97
           Q 246 80 240 75
           Q 234 80 226 97
           Q 216 113 208 132
           Q 198 112 187 97
           Q 182 90 174 102
           C 162 122 153 147 150 172
           C 145 202 150 242 155 275
           Z"
        fill="url(#hero-crown-fill)"
      />

      {/* Crown left/top highlight — simulates light from upper-left */}
      <path
        d="M150 172
           C 153 147 162 122 174 102
           Q 182 90 187 97
           Q 198 112 208 132
           Q 216 113 226 97
           Q 234 80 240 75"
        stroke="#fff8f4"
        strokeWidth="2.2"
        strokeOpacity="0.82"
        fill="none"
        strokeLinecap="round"
      />

      {/* Crown central fissure groove */}
      <path
        d="M240 75 Q238 148 240 198 Q242 238 240 268"
        stroke="#c2b5aa"
        strokeWidth="0.8"
        strokeOpacity="0.45"
        fill="none"
        strokeLinecap="round"
      />

      {/* Crown cross-groove (between main cusps) */}
      <path
        d="M208 132 Q224 158 240 164 Q256 158 272 132"
        stroke="#c2b5aa"
        strokeWidth="0.65"
        strokeOpacity="0.38"
        fill="none"
      />

      {/* Crown border / shadow stroke */}
      <path
        d="M155 275
           C 152 282 162 296 178 299
           L 302 299
           C 318 296 328 282 325 275
           C 330 242 335 202 330 172
           C 327 147 318 122 306 102
           Q 298 90 293 97
           Q 282 112 272 132
           Q 264 113 254 97
           Q 246 80 240 75
           Q 234 80 226 97
           Q 216 113 208 132
           Q 198 112 187 97
           Q 182 90 174 102
           C 162 122 153 147 150 172
           C 145 202 150 242 155 275
           Z"
        stroke="#c2b5aa"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Small glow beneath the crown */}
      <ellipse cx="240" cy="310" rx="70" ry="12" fill="var(--color-primary)" opacity="0.06" />
    </svg>
  )
}
