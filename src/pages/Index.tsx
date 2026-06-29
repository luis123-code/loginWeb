import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { DecorativePanel } from "@/components/login/DecorativePanel";
import { LoginForm } from "@/components/login/LoginForm";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { Shield, Lock, AlertTriangle, Skull } from "lucide-react";

const LoginPage = () => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isIpBlocked, setIsIpBlocked] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const attempts = parseInt(localStorage.getItem('failedAttempts') || '0');
    const ipBlocked = localStorage.getItem('ipBlocked') === 'true';
    setFailedAttempts(attempts);
    setIsBlocked(attempts >= 3);
    setIsIpBlocked(ipBlocked);
  }, []);

  // Borrar sesión cuando llega ?token=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl === 'true') {
      console.log("[Index] Logout signal received: ?token=true");
      logout();
      window.history.replaceState({}, '', window.location.pathname);
      console.log("[Index] Session keys cleared from localStorage");
    }
  }, [logout]);
  return (
    <div className="min-h-screen w-full bg-background">
      <Toaster position="top-right" />

      <div className="grid min-h-screen w-full lg:grid-cols-2">
        {/* LEFT — Decorative panel (desktop only) */}
        <DecorativePanel />

        {/* RIGHT — Form */}
        <div className="relative flex min-h-screen flex-col bg-gradient-surface">
          {/* Mobile gradient header */}
          <div className="bg-gradient-decorative px-6 pb-10 pt-8 lg:hidden">
            <Logo size="sm" variant="light" />
            <p className="mt-4 font-display text-2xl font-bold text-white">
              Atención podológica profesional a domicilio
            </p>
          </div>

          {/* Top-left small logo (desktop) */}
          <div className="hidden px-12 pt-10 lg:block">
            <Logo size="sm" variant="dark" />
          </div>

          {/* Form area */}
          <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
            <div className="w-full max-w-md animate-fade-in-up">
              <div className="rounded-2xl bg-white/70 p-8 shadow-soft backdrop-blur-sm sm:p-10 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
                {isIpBlocked ? (
                  <div className="text-center space-y-6 animate-fade-in-up">
                    <div className="relative mx-auto h-24 w-24">
                      <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
                        <Shield className="h-12 w-12 text-destructive" />
                      </div>
                      <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-destructive flex items-center justify-center animate-bounce">
                        <Skull className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="font-display text-2xl font-bold text-destructive">
                        Cuenta y IP Bloqueadas
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Tu cuenta y dirección IP han sido bloqueadas temporalmente por múltiples intentos de acceso no autorizado.
                      </p>
                      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-destructive">
                          <Lock className="h-4 w-4 animate-pulse" />
                          <span className="font-semibold">Bloqueo de seguridad activo</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Por favor, contacta al administrador para desbloquear tu acceso.
                      </p>
                    </div>
                  </div>
                ) : isBlocked ? (
                  <div className="text-center space-y-4 animate-fade-in-up">
                    <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Cuenta bloqueada
                    </h2>
                    <p className="text-muted-foreground">
                      Has superado el número máximo de intentos fallidos. Por favor, contacta al administrador para desbloquear tu cuenta.
                    </p>
                  </div>
                ) : (
                  <>
                    <header className="mb-8 space-y-2">
                      <h2 className="font-display text-[34px] font-bold leading-tight tracking-tight text-foreground sm:text-[38px]">
                        Bienvenido de vuelta
                      </h2>
                      <p className="text-[15px] text-muted-foreground">
                        Ingresa tus credenciales para continuar
                      </p>
                    </header>

                    {failedAttempts > 0 && (
                      <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                        <p className="text-sm font-semibold text-destructive">
                          Usuario y contraseña fallido ({failedAttempts}/3)
                        </p>
                        <p className="text-xs text-destructive/80 mt-1">
                          {failedAttempts >= 3 ? "Cuenta bloqueada" : `Te quedan ${3 - failedAttempts} intentos`}
                        </p>
                      </div>
                    )}

                    <LoginForm />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="px-6 pb-6 text-center text-xs text-muted-foreground sm:px-10 lg:px-12">
            © {new Date().getFullYear()} FootCare Pro · Sistema seguro y certificado
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
