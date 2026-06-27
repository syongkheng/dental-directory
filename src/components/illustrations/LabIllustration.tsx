export function LabIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: 'auto', borderRadius: '14px' }}
    >
      <defs>
        <radialGradient id="lab-room-bg" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff8f4" />
          <stop offset="100%" stopColor="#ede4db" />
        </radialGradient>
        <linearGradient id="lab-bench-body" x1="0" y1="237" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cec2b8" />
          <stop offset="100%" stopColor="#c0b4aa" />
        </linearGradient>
        <radialGradient id="lamp-beam" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#fff0e6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff0e6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── ROOM BACKGROUND ── */}
      <rect width="480" height="360" fill="url(#lab-room-bg)" rx="14" />

      {/* Ambient warm glow pools */}
      <circle cx="185" cy="155" r="110" fill="#fdeae0" opacity="0.22" />
      <circle cx="350" cy="180" r="75" fill="#fdeae0" opacity="0.15" />

      {/* Subtle wall grid lines */}
      <line x1="0" y1="100" x2="480" y2="100" stroke="var(--color-border)" strokeWidth="0.5" strokeOpacity="0.25" />
      <line x1="0" y1="145" x2="480" y2="145" stroke="var(--color-border)" strokeWidth="0.5" strokeOpacity="0.18" />
      <line x1="0" y1="190" x2="480" y2="190" stroke="var(--color-border)" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Precision corner marks */}
      <line x1="18" y1="18" x2="38" y2="18" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.18" />
      <line x1="18" y1="18" x2="18" y2="38" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.18" />
      <line x1="462" y1="342" x2="462" y2="352" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.14" />
      <line x1="452" y1="352" x2="462" y2="352" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.14" />

      {/* ── OVERHEAD MAGNIFYING LAMP ── */}
      {/* Lamp arm from upper-right wall */}
      <path
        d="M 440 18 C 420 30 380 50 340 72 Q 290 98 230 102"
        stroke="#b3aaa5"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arm joint */}
      <circle cx="340" cy="72" r="8" fill="#b3aaa5" />
      <circle cx="340" cy="72" r="4" fill="#9c9189" />
      {/* Lamp arm attachment at wall */}
      <rect x="432" y="10" width="20" height="16" rx="4" fill="#c4bdb8" />

      {/* Lamp head */}
      <circle cx="210" cy="102" r="32" fill="#d6d0cc" />
      <circle cx="210" cy="102" r="25" fill="var(--color-primary)" />
      <circle cx="210" cy="102" r="18" fill="#ff8844" />
      <circle cx="210" cy="102" r="11" fill="#ffaa66" opacity="0.75" />
      {/* Lamp lens shine */}
      <ellipse cx="204" cy="96" rx="5" ry="4" fill="#fff8f4" opacity="0.45" />

      {/* Lamp light beam */}
      <path
        d="M 178 134 Q 210 200 242 134"
        fill="url(#lamp-beam)"
      />
      <ellipse cx="210" cy="148" rx="32" ry="10" fill="#fff0e6" opacity="0.28" />

      {/* ── BENCH SURFACE ── */}
      {/* Bench edge highlight */}
      <rect x="0" y="222" width="480" height="4" fill="#ddd2c8" rx="0" />
      {/* Bench lip (3-D edge illusion) */}
      <rect x="0" y="226" width="480" height="11" fill="#c8bcb2" />
      {/* Bench body */}
      <rect x="0" y="237" width="480" height="123" fill="url(#lab-bench-body)" />
      {/* Primary orange accent stripe on bench front */}
      <rect x="0" y="237" width="480" height="3" fill="var(--color-primary)" opacity="0.15" />

      {/* ── BENCH OBJECTS ── */}

      {/* 1. PLASTER DENTAL CAST — far left (x ≈ 48–148) */}
      <ellipse cx="98" cy="226" rx="46" ry="10" fill="#c8c2bc" />
      <path d="M 52 226 Q 54 184 98 172 Q 142 184 144 226 Z" fill="#e8e2dc" />
      {/* Arch impression bumps on top */}
      <path
        d="M 72 190 Q 76 182 82 181 Q 88 179 94 180 Q 100 179 106 180 Q 112 181 118 182 Q 123 182 126 190"
        stroke="#d4cec8"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 76 197 Q 80 192 86 191 Q 92 189 98 190 Q 104 189 110 191 Q 116 192 120 197"
        stroke="#d4cec8"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      {/* Cast shadow */}
      <ellipse cx="98" cy="224" rx="42" ry="5" fill="#c0b8b2" opacity="0.35" />
      {/* Cast label line */}
      <line x1="72" y1="210" x2="124" y2="210" stroke="#c8c2bc" strokeWidth="0.6" strokeOpacity="0.35" />

      {/* 2. SHADE GUIDE FAN — center-left (x ≈ 180–270) */}
      {/* Handle */}
      <rect x="219" y="192" width="10" height="36" rx="5" fill="#9c9189" />
      <rect x="220" y="204" width="8" height="2" rx="1" fill="#888078" />
      <rect x="220" y="212" width="8" height="2" rx="1" fill="#888078" />
      {/* Fan pivot dot */}
      <circle cx="224" cy="192" r="6" fill="#b3aaa5" />
      <circle cx="224" cy="192" r="3" fill="#9c9189" />
      {/* Fan tabs — spreading semicircle */}
      <path d="M 224 192 L 199 148 Q 198 142 204 140 L 213 138 Z" fill="#f5f0ec" stroke="#e2dcd8" strokeWidth="0.75" />
      <path d="M 224 192 L 204 141 L 215 135 L 225 134 Z" fill="#f0e8e2" stroke="#ddd8d2" strokeWidth="0.75" />
      <path d="M 224 192 L 215 135 L 226 130 L 235 132 Z" fill="#eae2d8" stroke="#d8d2cc" strokeWidth="0.75" />
      <path d="M 224 192 L 226 130 L 236 128 L 244 132 Z" fill="#e4d8cc" stroke="#d2ccc6" strokeWidth="0.75" />
      <path d="M 224 192 L 236 129 L 244 128 L 252 134 Z" fill="#ded0c4" stroke="#ccc8c0" strokeWidth="0.75" />
      <path d="M 224 192 L 244 129 L 252 129 L 258 136 Z" fill="#d8c8ba" stroke="#c8c2ba" strokeWidth="0.75" />
      {/* Primary orange accent tab — "selected shade" */}
      <path d="M 224 192 L 252 131 L 260 138 L 261 148 Z" fill="var(--color-primary)" opacity="0.82" />

      {/* 3. DENTAL ARTICULATOR — center (x ≈ 295–390) */}
      {/* Top arch model */}
      <path
        d="M 300 215 Q 300 193 326 188 Q 352 188 368 196 Q 380 204 378 215 Q 362 205 340 203 Q 318 203 300 215 Z"
        fill="#ece6e1"
        stroke="#d8d2cc"
        strokeWidth="1"
      />
      {/* Bottom arch model */}
      <path
        d="M 298 226 Q 298 206 326 200 Q 354 200 372 208 Q 382 216 380 226 Z"
        fill="#e4ddd8"
        stroke="#d0cac4"
        strokeWidth="1"
      />
      {/* Hinge connector pin */}
      <line x1="338" y1="190" x2="338" y2="212" stroke="#b3aaa5" strokeWidth="3" strokeLinecap="round" />
      <circle cx="338" cy="190" r="4.5" fill="#b3aaa5" />
      <circle cx="338" cy="212" r="4" fill="#c4bdb8" />
      {/* Occlusal arch curve */}
      <path
        d="M 306 218 Q 322 212 338 210 Q 354 212 370 218"
        stroke="var(--color-primary)"
        strokeWidth="1.2"
        strokeOpacity="0.45"
        fill="none"
      />

      {/* 4. WAXING INSTRUMENT — right (x ≈ 405–460) */}
      {/* Handle */}
      <rect x="400" y="188" width="14" height="44" rx="7" fill="#b3aaa5" />
      {/* Handle grip rings */}
      <rect x="401" y="200" width="12" height="2" rx="1" fill="#9c9189" opacity="0.55" />
      <rect x="401" y="210" width="12" height="2" rx="1" fill="#9c9189" opacity="0.55" />
      <rect x="401" y="220" width="12" height="2" rx="1" fill="#9c9189" opacity="0.55" />
      {/* Neck narrowing */}
      <line x1="407" y1="232" x2="407" y2="222" stroke="#9c9189" strokeWidth="2.5" strokeLinecap="round" />
      {/* Working blade tip (wax carver shape) */}
      <path
        d="M 407 232 Q 410 220 415 212 Q 418 207 415 205 Q 412 204 409 208 Q 406 212 406 222"
        stroke="#9c9189"
        strokeWidth="1.5"
        fill="#d4ccc8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. CERAMIC CUP / WAX POT — far right (x ≈ 440–472) */}
      <ellipse cx="455" cy="228" rx="16" ry="5" fill="#c8c2bc" />
      <path d="M 439 228 Q 438 210 440 204 Q 445 196 455 196 Q 465 196 470 204 Q 472 210 471 228 Z" fill="#ddd8d4" stroke="#c8c2be" strokeWidth="1" />
      <ellipse cx="455" cy="198" rx="15" ry="4.5" fill="#e8e4e0" />
      <ellipse cx="453" cy="198" rx="9" ry="3" fill="#fff8f4" opacity="0.55" />

      {/* ── FLOATING DETAIL PARTICLES ── */}
      <circle cx="162" cy="155" r="3" fill="var(--color-primary)" opacity="0.15" />
      <circle cx="290" cy="168" r="2.5" fill="var(--color-accent)" opacity="0.18" />
      <circle cx="430" cy="162" r="2" fill="var(--color-primary)" opacity="0.15" />
    </svg>
  )
}
