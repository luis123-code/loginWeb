import { Users, MapPin, BarChart3 } from "lucide-react";
import { Logo } from "@/components/Logo";

const bullets = [
  { Icon: Users, text: "Gestión completa de pacientes" },
  { Icon: MapPin, text: "Agenda y rutas optimizadas" },
  { Icon: BarChart3, text: "Control total de tu negocio" },
];

/* ─────────────────────────────────────────────────────────────────────
   Animated themed scene: at-home podiatry
   - Walking briefcase (house-call kit)
   - Footprint trail leading to a home
   - ECG line pulsing across
   - Concentric "service area" rings on a stylized map
   ───────────────────────────────────────────────────────────────────── */
const AnimatedScene = () => (
  <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
    {/* Glowing orb behind */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-56 w-56 rounded-full bg-primary-light/25 blur-3xl animate-orb-pulse" />
    </div>

    <svg
      viewBox="0 0 400 300"
      className="relative h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="houseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(177 67% 51%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(177 70% 32%)" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="caseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(177 67% 92%)" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(177 67% 51%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(177 67% 51%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint grid (map feel) */}
      <g stroke="white" strokeOpacity="0.06">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>

      {/* Service-area rings around the home */}
      <g transform="translate(310, 170)">
        <circle r="55" fill="url(#ringGrad)" className="animate-ring-expand" />
        <circle
          r="55"
          fill="url(#ringGrad)"
          className="animate-ring-expand"
          style={{ animationDelay: "1.2s" }}
        />
        <circle
          r="55"
          fill="url(#ringGrad)"
          className="animate-ring-expand"
          style={{ animationDelay: "2.4s" }}
        />
      </g>

      {/* Dotted route from briefcase to home */}
      <path
        d="M 90 220 Q 180 120, 300 175"
        fill="none"
        stroke="hsl(177 67% 51%)"
        strokeOpacity="0.7"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="animate-route"
      />

      {/* Footprints along the route */}
      {[
        { x: 120, y: 205, r: -25, d: "0s" },
        { x: 155, y: 178, r: -15, d: "0.4s" },
        { x: 195, y: 158, r: -5, d: "0.8s" },
        { x: 235, y: 158, r: 8, d: "1.2s" },
        { x: 270, y: 168, r: 18, d: "1.6s" },
      ].map((f, i) => (
        <g
          key={i}
          transform={`translate(${f.x}, ${f.y})`}
          className="animate-footprint"
          style={{ ["--rot" as string]: `${f.r}deg`, animationDelay: f.d }}
        >
          {/* sole */}
          <ellipse cx="0" cy="0" rx="5" ry="8" fill="white" fillOpacity="0.85" />
          {/* heel */}
          <ellipse cx="0" cy="10" rx="4" ry="5" fill="white" fillOpacity="0.7" />
        </g>
      ))}

      {/* Stylized home (destination) */}
      <g transform="translate(285, 145)">
        <path
          d="M 0 30 L 25 5 L 50 30 L 50 60 L 0 60 Z"
          fill="url(#houseGrad)"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        {/* door */}
        <rect x="18" y="38" width="14" height="22" rx="2" fill="hsl(174 41% 9%)" fillOpacity="0.55" />
        {/* window */}
        <rect x="6" y="36" width="8" height="8" rx="1" fill="white" fillOpacity="0.6" />
        <rect x="36" y="36" width="8" height="8" rx="1" fill="white" fillOpacity="0.6" />
        {/* roof medical cross */}
        <g transform="translate(25, 14)" className="animate-heartbeat">
          <rect x="-2" y="-6" width="4" height="12" rx="1" fill="white" />
          <rect x="-6" y="-2" width="12" height="4" rx="1" fill="white" />
        </g>
      </g>

      {/* Walking medical briefcase (house-call kit) */}
      <g transform="translate(80, 200)" className="animate-briefcase">
        {/* handle */}
        <path
          d="M -10 -22 Q 0 -32, 10 -22"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* body */}
        <rect x="-22" y="-20" width="44" height="32" rx="5" fill="url(#caseGrad)" />
        {/* medical cross */}
        <g transform="translate(0, -4)">
          <rect x="-2" y="-7" width="4" height="14" rx="1" fill="hsl(177 69% 42%)" />
          <rect x="-7" y="-2" width="14" height="4" rx="1" fill="hsl(177 69% 42%)" />
        </g>
        {/* clasp */}
        <rect x="-6" y="-22" width="12" height="3" rx="1" fill="hsl(177 70% 32%)" />
      </g>

      {/* ECG line pulsing across */}
      <path
        d="M 0 270 L 80 270 L 95 270 L 105 250 L 115 290 L 125 240 L 135 270 L 400 270"
        fill="none"
        stroke="hsl(177 67% 51%)"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-ecg"
      />
    </svg>
  </div>
);

export const DecorativePanel = () => {
  // Pre-computed particle positions
  const particles = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 7.3) % 100}%`,
    delay: `${(i * 1.4) % 14}s`,
    duration: `${14 + (i % 6)}s`,
    size: 3 + (i % 4),
  }));

  return (
    <div className="relative hidden h-full overflow-hidden bg-gradient-decorative lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      {/* Decorative organic blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-wave-slow" />
        <div
          className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-primary-light/15 blur-3xl animate-wave-slow"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-2xl animate-wave-slow"
          style={{ animationDelay: "6s" }}
        />

        {/* SVG wave pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 800"
        >
          <defs>
            <pattern id="waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path
                d="M0 100 Q 50 50 100 100 T 200 100"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M0 150 Q 50 100 100 150 T 200 150"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#waves)" />
        </svg>

        {/* Floating particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            className="animate-float-particle absolute bottom-0 rounded-full bg-primary-light/40"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Top: Logo */}
      <div className="relative z-10 animate-fade-in">
        <Logo size="lg" variant="light" />
      </div>

      {/* Middle: Animated scene + tagline */}
      <div className="relative z-10 max-w-lg">
        <div className="animate-fade-in-up">
          <AnimatedScene />
        </div>

        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-heartbeat" />
            Podología a domicilio
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-white xl:text-[2.5rem]">
            Cuidamos cada paso,
            <br />
            <span className="font-serif-display italic text-primary-light">
              en la puerta de tu hogar
            </span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            La plataforma que profesionaliza tu práctica móvil — agenda, rutas y
            historias clínicas en un mismo lugar.
          </p>
        </div>

        <ul className="mt-8 space-y-3.5">
          {bullets.map(({ Icon, text }, i) => (
            <li
              key={text}
              className="flex items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white/15">
                <Icon className="h-[18px] w-[18px] text-primary-light" strokeWidth={2} />
              </span>
              <span className="text-[15px] font-medium text-white/90">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: signature */}
      <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="h-px w-12 bg-white/30" />
        <p className="mt-4 font-serif-display text-lg italic text-white/80">
          Tu salud podal, nuestra prioridad
        </p>
      </div>
    </div>
  );
};
