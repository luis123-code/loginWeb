import { Foot } from "lucide-react";

interface LogoProps {
  size?: "sm" | "lg";
  variant?: "light" | "dark";
}

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
        <Foot
          className={`${isLg ? "h-7 w-7" : "h-5 w-5"} ${
            isLight ? "text-white" : "text-primary"
          }`}
          strokeWidth={1.75}
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
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
            isLight ? "text-primary-light" : "text-primary"
          }`}
        >
          Pro
        </span>
      </div>
    </div>
  );
};
