import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"agricultrice" | "restaurateur">("restaurateur");

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Leaf className="w-7 h-7" />
            </div>
            <span className="font-heading text-3xl font-bold">AgriPool</span>
          </div>
          <h2 className="font-heading text-2xl font-bold mb-4">La place de marché agricole B2B du Congo</h2>
          <p className="opacity-80 leading-relaxed">Connectez-vous directement aux agricultrices des Plateaux ou aux restaurateurs de Brazzaville et Pointe-Noire.</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">AgriPool</span>
          </Link>

          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Connexion</h1>
          <p className="text-muted-foreground mb-6">Accédez à votre espace {role === "agricultrice" ? "productrice" : "restaurateur"}</p>

          <div className="flex rounded-lg bg-muted p-1 mb-6">
            {(["restaurateur", "agricultrice"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${role === r ? "bg-background text-foreground card-shadow" : "text-muted-foreground"}`}
              >
                {r === "agricultrice" ? "🌾 Agricultrice" : "🍳 Restaurateur"}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="votre@email.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="rounded border-input" /> Se souvenir de moi
              </label>
              <a href="#" className="text-sm text-primary hover:underline">Mot de passe oublié ?</a>
            </div>
            <Button className="w-full" size="lg">Se connecter</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-primary font-medium hover:underline">S'inscrire</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Connexion;
