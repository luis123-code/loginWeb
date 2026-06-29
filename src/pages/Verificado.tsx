import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const [nocoDbUser, setNocoDbUser] = useState<any>(null);
  const [shouldShow, setShouldShow] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

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
    
    if (!token) {
      navigate("/advertencia");
      return;
    }
    
    const verification = verifyToken(token);
    
    if (!verification.valid) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      navigate("/advertencia");
      return;
    }
    
    setNocoDbUser(verification.decoded.data);
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
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            ¡Autenticación Exitosa!
          </h1>

          <p className="text-muted-foreground mb-6">
            Tu cuenta ha sido verificada correctamente.
          </p>

          {nocoDbUser && nocoDbUser.records && nocoDbUser.records[0] && (
            <div className="bg-background rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">
                Usuario: {nocoDbUser.records[0].fields?.nombre || nocoDbUser.records[0].fields?.email}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                {nocoDbUser.records[0].fields?.email}
              </p>
            </div>
          )}

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
              logout({ logoutParams: { returnTo: window.location.origin } });
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
