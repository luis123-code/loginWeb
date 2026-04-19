import { Sparkles, Calendar, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

const bullets = [
  { Icon: Sparkles, text: "Gestión completa de pacientes" },
  { Icon: Calendar, text: "Agenda y rutas optimizadas" },
  { Icon: ShieldCheck, text: "Control total de tu negocio" },
];

export const DecorativePanel = () => {
  // Pre-computed particle positions for floating effect
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
          className="absolute inset-0 h-full w-full opacity-[0.07]"
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

      {/* Middle: Tagline + bullets */}
      <div className="relative z-10 max-w-md animate-fade-in-up">
        <h1 className="font-display text-4xl leading-tight text-white xl:text-5xl">
          Atención podológica profesional a domicilio
        </h1>
        <p className="mt-4 text-base text-white/70">
          La plataforma que tus pacientes y tu equipo merecen.
        </p>

        <ul className="mt-10 space-y-5">
          {bullets.map(({ Icon, text }, i) => (
            <li
              key={text}
              className="flex items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                <Icon className="h-5 w-5 text-primary-light" strokeWidth={2} />
              </span>
              <span className="text-base text-white/90">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: signature */}
      <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="h-px w-12 bg-white/30" />
        <p className="mt-4 font-display text-lg italic text-white/80">
          Tu salud podal, nuestra prioridad
        </p>
      </div>
    </div>
  );
};
