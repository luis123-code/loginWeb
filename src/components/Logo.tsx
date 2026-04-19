interface LogoProps {
  size?: "sm" | "lg";
  variant?: "light" | "dark";
}

const FootIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Stylized foot: heel + sole + 5 toes */}
    <path
      d="M9 19c0-4.5 2.7-8 7-8 4 0 6.5 2.5 6.5 6.2 0 2.4-1.1 4-2.6 5.6-1.4 1.5-2.4 2.7-2.4 4.4 0 1.6-1.4 2.8-3.2 2.8-3.6 0-5.3-3.5-5.3-7v-4z"
      fill="currentColor"
      fillOpacity="0.95"
    />
    <circle cx="11" cy="8.5" r="1.6" fill="currentColor" />
    <circle cx="14.5" cy="6.2" r="1.9" fill="currentColor" />
    <circle cx="18.5" cy="5.5" r="2" fill="currentColor" />
    <circle cx="22" cy="6.8" r="1.8" fill="currentColor" />
    <circle cx="24.5" cy="9.5" r="1.5" fill="currentColor" />
  </svg>
);

export const Logo = ({ size = "sm", variant = "dark" }: LogoProps) => {
  const isLight = variant === "light";
  const isLg = size === "lg";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center rounded-2xl ${
          isLg ? "h-14 w-14" : "h-10 w-10"
        } ${isLight ? "bg-white/10 backdrop-blur-sm ring-1 ring-white/20" : "bg-primary/10"}`}
      >
        <FootIcon
          className={`${isLg ? "h-8 w-8" : "h-6 w-6"} ${
            isLight ? "text-white" : "text-primary"
          }`}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`font-display ${isLg ? "text-2xl" : "text-lg"} ${
            isLight ? "text-white" : "text-foreground"
          }`}
        >
          PodoCare
        </span>
        <span
          className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
            isLight ? "text-primary-light" : "text-primary"
          }`}
        >
          Pro
        </span>
      </div>
    </div>
  );
};
