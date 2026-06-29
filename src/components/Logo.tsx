import icono from "@/assets/icono.png";

interface LogoProps {
  size?: "sm" | "lg";
  variant?: "light" | "dark";
}

const FootIcon = ({ className }: { className?: string }) => (
  <img
    src={icono}
    alt="FootCare Logo"
    className={className}
  />
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
            isLight ? "brightness-0 invert" : "text-primary"
          }`}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`font-display ${isLg ? "text-2xl" : "text-lg"} ${
            isLight ? "text-white" : "text-foreground"
          }`}
        >
          FootCare
        </span>
      </div>
    </div>
  );
};
