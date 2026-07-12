import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { DecorativePanel } from "@/components/login/DecorativePanel";
import { LoginForm } from "@/components/login/LoginForm";
import { Logo } from "@/components/Logo";
import { AlertTriangle } from "lucide-react";

const LoginPage = () => {
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    const attempts = parseInt(localStorage.getItem('failedAttempts') || '0');
    setFailedAttempts(attempts);
  }, []);

  // Borrar token cuando llega ?token=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    
    if (tokenFromUrl === 'true') {
      localStorage.removeItem('authToken');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);
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
                        <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Usuario y contraseña fallido ({failedAttempts})</span>
                        </div>
                      </div>
                    )}

                    <LoginForm />
                  </>
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
