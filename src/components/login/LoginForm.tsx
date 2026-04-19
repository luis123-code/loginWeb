import { useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { FloatingLabelInput } from "./FloatingLabelInput";
import { SocialLoginButton, GoogleIcon } from "./SocialLoginButton";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "", remember: true },
  });

  // Ripple effect on button click
  const triggerRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.className = "ripple";
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  const onSubmit = async (_values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: integrate Auth0 — loginWithRedirect()
      await new Promise((r) => setTimeout(r, 1200));
      toast.error("Credenciales incorrectas", {
        style: {
          background: "hsl(0 78% 58%)",
          color: "white",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          borderRadius: "12px",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      // TODO: loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' }})
      await new Promise((r) => setTimeout(r, 800));
      toast("Conectando con Google…", {
        icon: "🔐",
        style: {
          background: "hsl(177 69% 42%)",
          color: "white",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          borderRadius: "12px",
        },
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <FloatingLabelInput
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        icon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />}
        error={errors.email?.message}
        {...register("email", {
          required: "El correo es obligatorio",
          pattern: { value: emailPattern, message: "Ingresa un correo válido" },
        })}
      />

      <FloatingLabelInput
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        icon={<Lock className="h-[18px] w-[18px]" strokeWidth={1.75} />}
        error={errors.password?.message}
        rightAction={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Eye className="h-[18px] w-[18px]" strokeWidth={1.75} />
            )}
          </button>
        }
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: { value: 6, message: "Mínimo 6 caracteres" },
        })}
      />

      <div className="flex items-center justify-between pt-1">
        <label className="group flex cursor-pointer items-center gap-2 select-none">
          <input
            type="checkbox"
            className="peer sr-only"
            {...register("remember")}
          />
          <span
            className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border-[1.5px] border-border bg-white
              transition-all peer-checked:border-primary peer-checked:bg-primary
              peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20"
          >
            <svg
              className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="2 6 5 9 10 3" />
            </svg>
          </span>
          <span className="text-sm text-foreground/80 group-hover:text-foreground">
            Recordarme
          </span>
        </label>

        <button
          type="button"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        onClick={triggerRipple}
        className="relative h-[52px] w-full overflow-hidden rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground
          shadow-button transition-all duration-200 hover:bg-primary-dark hover:shadow-[0_12px_32px_hsl(177_69%_42%/0.45)]
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
          active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
      >
        <span className="flex items-center justify-center gap-2">
          {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
          {isSubmitting ? "Ingresando…" : "Iniciar sesión"}
        </span>
      </button>

      <div className="flex items-center gap-4 py-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          o continúa con
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <SocialLoginButton
        icon={isGoogleLoading ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <GoogleIcon />}
        onClick={handleGoogle}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? "Conectando…" : "Continuar con Google"}
      </SocialLoginButton>
    </form>
  );
};
