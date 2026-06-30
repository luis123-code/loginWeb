import { useState, MouseEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { FloatingLabelInput } from "./FloatingLabelInput";
import { apiService } from "@/services/ApiService";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Generar token JWT simple
const generateToken = (email: string, userData: any, googleInfo?: any): string => {
  const header = { alg: "HS256", typ: "JWT" };
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Extraer información del usuario desde NocoDB o Google
  const userInfo = {
    nombre: userData?.records?.[0]?.fields?.nombre || googleInfo?.name || '',
    email: email,
    givenName: googleInfo?.given_name || '',
    familyName: googleInfo?.family_name || ''
  };
  
  const payload = {
    sub: email,
    email: email,
    iat: timestamp,
    exp: timestamp + 86400, // 24 horas
    data: userInfo
  };
  
  const encode = (obj: any) => btoa(JSON.stringify(obj)).replace(/=/g, '');
  const headerEncoded = encode(header);
  const payloadEncoded = encode(payload);
  const signature = btoa(`${headerEncoded}.${payloadEncoded}`).replace(/=/g, '');
  
  return `${headerEncoded}.${payloadEncoded}.${signature}`;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "", remember: true },
  });

  useEffect(() => {
    const attempts = parseInt(localStorage.getItem('failedAttempts') || '0');
    setFailedAttempts(attempts);
    setIsBlocked(attempts >= 3);
  }, []);

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

  const onSubmit = async (values: LoginFormValues) => {
    // Verificar si la cuenta ya está bloqueada
    const currentAttempts = parseInt(localStorage.getItem('failedAttempts') || '0');
    if (currentAttempts >= 3) {
      window.location.reload();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.sendCredentials(values.email, values.password);
      toast.success("Credenciales enviadas correctamente", {
        style: {
          background: "hsl(142 76% 36%)",
          color: "white",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          borderRadius: "12px",
        },
      });
      // Limpiar contador de intentos fallidos si el login es exitoso
      localStorage.removeItem('failedAttempts');
      // Generar y guardar token JWT
      const token = generateToken(values.email, response);
      localStorage.setItem('authToken', token);
      // Redirigir a verificado
      window.location.href = "/verificado";
    } catch (error) {
      // Incrementar contador de intentos fallidos
      const failedAttempts = parseInt(localStorage.getItem('failedAttempts') || '0') + 1;
      localStorage.setItem('failedAttempts', failedAttempts.toString());

      if (failedAttempts >= 3) {
        window.location.reload();
      } else {
        toast.error(`Usuario y contraseña fallido (${failedAttempts}/3)`, {
          style: {
            background: "hsl(0 78% 58%)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            borderRadius: "12px",
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse: TokenResponse) => {
    setIsGoogleLoading(true);
    try {
      const accessToken = tokenResponse.access_token;
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!userInfoResponse.ok) {
        throw new Error("No se pudo obtener información de Google");
      }

      const userInfo = await userInfoResponse.json();

      if (!userInfo.email) {
        toast.error("No se pudo obtener el email de Google", {
          style: {
            background: "hsl(0 78% 58%)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            borderRadius: "12px",
          },
        });
        return;
      }

      // Buscar en NocoDB solo por google_sub
      if (!userInfo.sub) {
        throw new Error("No se recibió el identificador de Google");
      }

      const response = await apiService.findByGoogleSub(userInfo.sub);

      if (!response.records || response.records.length === 0) {
        throw new Error("Usuario no encontrado");
      }

      localStorage.removeItem('failedAttempts');
      const token = generateToken(userInfo.email, response, userInfo);
      localStorage.setItem('authToken', token);
      if (userInfo.picture) {
        sessionStorage.setItem('userPicture', userInfo.picture);
      }
      window.location.href = "/verificado";
    } catch (error) {
      const failedAttempts = parseInt(localStorage.getItem('failedAttempts') || '0') + 1;
      localStorage.setItem('failedAttempts', failedAttempts.toString());
      setFailedAttempts(failedAttempts);
      setIsBlocked(failedAttempts >= 3);

      if (failedAttempts >= 3) {
        window.location.reload();
      } else {
        toast.error(`Usuario no registrado (${failedAttempts}/3)`, {
          style: {
            background: "hsl(0 78% 58%)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            borderRadius: "12px",
          },
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      toast.error("Error al iniciar sesión con Google", {
        style: {
          background: "hsl(0 78% 58%)",
          color: "white",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          borderRadius: "12px",
        },
      });
    },
    flow: 'implicit',
    scope: 'openid email profile',
  });

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

      <button
        type="button"
        onClick={() => googleLogin()}
        disabled={isBlocked || isGoogleLoading}
        className="group flex h-[52px] w-full items-center justify-center gap-3 rounded-xl
        border-[1.5px] border-primary bg-white px-5 text-[15px] font-medium text-foreground
        transition-all duration-200 hover:bg-primary/5 hover:shadow-soft
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20
        disabled:opacity-60"
      >
        {isGoogleLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span>Verificando...</span>
          </>
        ) : (
          <>
            <span className="shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
              </svg>
            </span>
            <span>Continuar con Google</span>
          </>
        )}
      </button>

    </form>
  );
};
