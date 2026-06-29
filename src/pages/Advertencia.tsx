import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { AlertTriangle, Shield, Lock, Camera } from "lucide-react";

const Advertencia = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Incrementar contador de intentos de acceso no autorizado
    const unauthorizedAttempts = parseInt(localStorage.getItem('unauthorizedAttempts') || '0') + 1;
    localStorage.setItem('unauthorizedAttempts', unauthorizedAttempts.toString());

    // Si ya hubo 3 intentos, bloquear
    if (unauthorizedAttempts >= 3) {
      localStorage.setItem('ipBlocked', 'true');
      // Redirigir a una página de bloqueo o mostrar mensaje de bloqueo
    }

    // Countdown para redirigir automáticamente
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" variant="dark" />
        </div>

        <div className="bg-white/70 rounded-2xl p-8 shadow-soft backdrop-blur-sm text-center">
          {/* Escudo animado */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
                <Shield className="h-12 w-12 text-destructive animate-bounce" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive flex items-center justify-center animate-spin">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-4 animate-fade-in-up">
            Acceso No Autorizado
          </h1>

          <p className="text-muted-foreground mb-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Has intentado acceder a una página protegida sin autenticación previa.
            Por seguridad, este intento ha sido registrado.
          </p>

          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0 animate-pulse" />
              <div className="text-left">
                <p className="text-sm font-semibold text-destructive mb-1">
                  Advertencia de Seguridad
                </p>
                <p className="text-xs text-muted-foreground">
                  Si realizas otro intento de acceso no autorizado, tu dirección IP será bloqueada temporalmente por motivos de seguridad.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Lock className="h-4 w-4 animate-pulse" />
            <span>Redirigiendo al inicio en {countdown} segundos...</span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advertencia;
