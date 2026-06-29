import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cierre de sesión solicitado desde otro sistema");
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('failedAttempts');
    localStorage.removeItem('ipBlocked');
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" variant="dark" />
        </div>
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Cerrando sesión...</p>
      </div>
    </div>
  );
};

export default Logout;
