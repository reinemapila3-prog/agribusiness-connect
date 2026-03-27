import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Catalogue from "./pages/Catalogue";
import CommentCaMarche from "./pages/CommentCaMarche";
import APropos from "./pages/APropos";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Panier from "./pages/Panier";
import Commande from "./pages/Commande";
import DashboardAgriculteur from "./pages/DashboardAgriculteur";
import DashboardRestaurateur from "./pages/DashboardRestaurateur";
import DashboardGrandeSurface from "./pages/DashboardGrandeSurface";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/commande" element={<Commande />} />
            <Route path="/dashboard/agriculteur" element={<DashboardAgriculteur />} />
            <Route path="/dashboard/restaurateur" element={<DashboardRestaurateur />} />
            <Route path="/dashboard/grande-surface" element={<DashboardGrandeSurface />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
