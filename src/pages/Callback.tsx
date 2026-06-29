import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Logo } from "@/components/Logo";
import { apiService } from "@/services/ApiService";
import { useAuth } from "@/context/AuthContext";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleRedirectCallback, getIdTokenClaims } = useAuth0();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Auth0 maneja el callback automáticamente
        await handleRedirectCallback();
        
        // Obtener y guardar id_token directamente
        try {
          const idTokenClaims = await getIdTokenClaims();
          if (idTokenClaims && idTokenClaims.__raw) {
            // Decodificar el token JWT
            const tokenParts = idTokenClaims.__raw.split('.');
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              console.log("Token decodificado:", payload);
              
              // Verificar usuario en NocoDB usando sub y email
              try {
                const nocoDbUser = await apiService.findByAuth0Sub(payload.sub, payload.email);
                console.log("Usuario verificado en NocoDB:", nocoDbUser);
                
                // Si no hay registros en NocoDB, redirigir a login y borrar token
                if (!nocoDbUser.records || nocoDbUser.records.length === 0) {
                  console.log("Usuario no encontrado en NocoDB, incrementando intentos fallidos");
                  // Incrementar contador de intentos fallidos
                  const failedAttempts = parseInt(localStorage.getItem('failedAttempts') || '0') + 1;
                  localStorage.setItem('failedAttempts', failedAttempts.toString());
                  localStorage.removeItem('authToken');
                  navigate("/", { replace: true });
                  return;
                }
              } catch (nocoDbError) {
                console.error("Error al verificar usuario en NocoDB:", nocoDbError);
                // En caso de error, incrementar intentos fallidos
                const failedAttempts = parseInt(localStorage.getItem('failedAttempts') || '0') + 1;
                localStorage.setItem('failedAttempts', failedAttempts.toString());
                localStorage.removeItem('authToken');
                navigate("/", { replace: true });
                return;
              }
            }
            login(idTokenClaims.__raw);
            console.log("ID token guardado en contexto y localStorage desde Callback");
          }
        } catch (tokenError) {
          console.error("Error al obtener id_token:", tokenError);
          navigate("/", { replace: true });
          return;
        }
        
        // Redirigir a la página de verificado
        navigate("/verificado", { replace: true });
      } catch (error) {
        console.error("Error en callback:", error);
        navigate("/verificado", { replace: true });
      }
    };

    handleCallback();
  }, [handleRedirectCallback, navigate, searchParams, getIdTokenClaims]);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" variant="dark" />
        </div>
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground text-lg">Procesando autenticación...</p>
      </div>
    </div>
  );
};

export default Callback;
