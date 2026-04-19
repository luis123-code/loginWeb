import { Toaster } from "react-hot-toast";
import { DecorativePanel } from "@/components/login/DecorativePanel";
import { LoginForm } from "@/components/login/LoginForm";
import { Logo } from "@/components/Logo";

const LoginPage = () => {
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
            <p className="mt-4 font-display text-2xl text-white">
              Atención podológica profesional
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
                <header className="mb-8 space-y-2">
                  <h2 className="font-display text-3xl text-foreground sm:text-4xl">
                    Bienvenido de vuelta
                  </h2>
                  <p className="text-[15px] text-muted-foreground">
                    Ingresa tus credenciales para continuar
                  </p>
                </header>

                <LoginForm />

                <p className="mt-8 text-center text-sm text-muted-foreground">
                  ¿Aún no tienes cuenta?{" "}
                  <button className="font-semibold text-primary transition-colors hover:text-primary-dark">
                    Solicita acceso
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="px-6 pb-6 text-center text-xs text-muted-foreground sm:px-10 lg:px-12">
            © {new Date().getFullYear()} PodoCare Pro · Sistema seguro y certificado
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
