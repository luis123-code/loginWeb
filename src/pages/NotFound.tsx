import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Home, MapPin } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-surface">
      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:px-10 lg:px-12">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Logo size="lg" variant="dark" />
        </div>

        {/* 404 Illustration */}
        <div className="relative mb-12 flex justify-center">
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary-light/10 blur-2xl" />
            
            {/* 404 Number */}
            <div className="relative">
              <h1 className="font-display text-[120px] font-bold leading-none text-primary/20">
                404
              </h1>
              
              {/* Foot icon overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-soft backdrop-blur-sm">
                  <MapPin className="h-12 w-12 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            ¡Ups! Ruta no encontrada
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Parece que te has desviado del camino. Nuestros podólogos no pueden encontrar esta dirección.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-button"
            >
              <Home className="h-5 w-5" />
              Volver al Inicio
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-white/70 text-foreground rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-soft backdrop-blur-sm border border-border"
            >
              Ir Atrás
            </button>
          </div>

          {/* Podology-themed message */}
          <div className="mt-12 rounded-2xl bg-white/70 p-6 shadow-soft backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground mb-1">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Si estás buscando agendar una visita podológica a domicilio, our equipo está listo para ayudarte. Contáctanos para programar tu cita.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>FootCare Pro · Cuidamos cada paso, en la puerta de tu hogar</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
