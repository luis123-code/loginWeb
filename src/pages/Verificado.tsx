import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

// Verificar y decodificar token JWT
const verifyToken = (token: string): { valid: boolean; decoded?: any; expired?: boolean } => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false };
    }
    
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < currentTime) {
      return { valid: false, expired: true, decoded: payload };
    }
    
    return { valid: true, decoded: payload };
  } catch (error) {
    console.error("Error al verificar token:", error);
    return { valid: false };
  }
};

const Verificado = () => {
  const navigate = useNavigate();
  const [nocoDbUser, setNocoDbUser] = useState<any>(null);
  const [shouldShow, setShouldShow] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [userPicture, setUserPicture] = useState<string | null>(null);

  const handleRedirect = () => {
    setRedirecting(true);
    const token = localStorage.getItem('authToken');
    setTimeout(() => {
      if (token) {
        window.location.href = `${import.meta.env.VITE_APP_URL || 'http://localhost:8080'}/?token=${encodeURIComponent(token)}`;
      } else {
        window.location.href = import.meta.env.VITE_APP_URL || "http://localhost:8080/";
      }
    }, 1000);
  };

  // Borrar token cuando llega ?token=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    
    if (tokenFromUrl === 'true') {
      localStorage.removeItem('authToken');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Verificar token de localStorage - sin llamar APIs
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log("Token en localStorage:", token);
    
    if (!token) {
      navigate("/advertencia");
      return;
    }
    
    const verification = verifyToken(token);
    console.log("Verificación del token:", verification);
    
    if (!verification.valid) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      navigate("/advertencia");
      return;
    }
    
    setNocoDbUser(verification.decoded.data);
    console.log("Datos de usuario decodificados:", verification.decoded.data);
    setUserPicture(sessionStorage.getItem('userPicture'));
    setShouldShow(true);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      {!shouldShow ? (
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando sesión...</p>
        </div>
      ) : (
        <div className="max-w-md w-full p-8">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" variant="dark" />
        </div>

        <div className="bg-white/70 rounded-xl p-8 shadow-soft backdrop-blur-sm text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            {userPicture ? (
              <div className="relative inline-block shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-primary/40 blur-sm opacity-60" />
                <img
                  src={userPicture}
                  alt="Avatar"
                  className="relative h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>
            ) : (
              <div className="shrink-0 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-xl border-4 border-white">
                <span className="text-3xl font-bold">
                  {nocoDbUser?.nombre?.charAt(0).toUpperCase() || nocoDbUser?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            )}

            <div className="shrink-0 flex flex-col items-center justify-center gap-1">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Pulso ECG animado */}
                <polyline
                  points="0,40 15,40 22,20 28,55 34,30 40,40 80,40"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="text-primary"
                  strokeDasharray="120"
                  strokeDashoffset="120"
                >
                  <animate attributeName="stroke-dashoffset" from="120" to="0" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.85;1" dur="1.8s" repeatCount="indefinite" />
                </polyline>
                {/* Pie icono */}
                <g transform="translate(23, 42)">
                  <ellipse cx="17" cy="6" rx="17" ry="6" fill="currentColor" className="text-primary/20" />
                  <path
                    d="M 4 0 C 4 -10 10 -14 17 -14 C 24 -14 30 -10 30 0 C 30 4 26 6 17 6 C 8 6 4 4 4 0 Z"
                    fill="currentColor"
                    className="text-primary/30"
                  />
                  <circle cx="10" cy="-10" r="2" fill="currentColor" className="text-primary/60">
                    <animate attributeName="r" values="2;2.5;2" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="16" cy="-12" r="2" fill="currentColor" className="text-primary/60">
                    <animate attributeName="r" values="2;2.5;2" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="22" cy="-10" r="2" fill="currentColor" className="text-primary/60">
                    <animate attributeName="r" values="2;2.5;2" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                  </circle>
                </g>
                {/* Check flotante */}
                <g transform="translate(54, 10)">
                  <circle cx="10" cy="10" r="10" fill="currentColor" className="text-primary">
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.3;0.85;1" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <polyline
                    points="5,10 8,14 15,6"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  >
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.35;0.85;1" dur="1.8s" repeatCount="indefinite" />
                  </polyline>
                </g>
              </svg>
            </div>
          </div>

          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
            Bienvenido al sistema
          </span>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {nocoDbUser?.nombre || nocoDbUser?.email || 'Usuario'}
          </h1>

          <p className="text-muted-foreground mb-8">
            Has iniciado sesión correctamente
          </p>

          <button
            onClick={handleRedirect}
            disabled={redirecting}
            className="block w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg mb-3 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {redirecting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                <span>Llevando a la aplicación...</span>
              </div>
            ) : (
              "Ir a la aplicación"
            )}
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('userEmail');
              localStorage.removeItem('authToken');
              sessionStorage.removeItem('userPicture');
              navigate("/", { replace: true });
            }}
            className="w-full px-6 py-3 bg-transparent text-foreground rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Verificado;
