import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Bienvenida from "./pages/Bienvenida.tsx";
import Callback from "./pages/Callback.tsx";
import Verificado from "./pages/Verificado.tsx";
import Advertencia from "./pages/Advertencia.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
      domain={domain || ""}
      clientId={clientId || ""}
      authorizationParams={{
        redirect_uri: redirectUri || window.location.origin
      }}
      cacheLocation="memory"
      useRefreshTokens={false}
      useRefreshTokensFallback={false}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bienvenida" element={<Bienvenida />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/verificado" element={<Verificado />} />
            <Route path="/advertencia" element={<Advertencia />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Auth0Provider>
  </QueryClientProvider>
);

export default App;
