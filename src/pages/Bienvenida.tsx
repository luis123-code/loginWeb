import { Logo } from "@/components/Logo";

const Bienvenida = () => {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" variant="dark" />
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-4">
          Bienvenida al sistema
        </h1>
        <p className="text-muted-foreground text-lg">
          FootCare Pro · Sistema de gestión podológica
        </p>
      </div>
    </div>
  );
};

export default Bienvenida;
