import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Mail, Lock, User, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Role = "agriculteur" | "restaurateur" | "grande_surface";

const Inscription = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("restaurateur");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !password) { toast.error("Veuillez remplir les champs obligatoires"); return; }
    if (password.length < 8) { toast.error("Le mot de passe doit contenir au moins 8 caractères"); return; }
    setIsLoading(true);
    try {
      await signUp(email, password, {
        full_name: `${firstName} ${lastName}`.trim(),
        phone,
        location: location || (role === "agriculteur" ? "Djambala" : "Brazzaville"),
        role,
      });
      toast.success("Compte créé ! Vérifiez votre email pour confirmer.");
      navigate("/connexion");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  const roleLabels: Record<Role, string> = {
    agriculteur: "🌾 Agriculteur",
    restaurateur: "🍳 Restaurateur",
    grande_surface: "🏬 Grande surface",
  };

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
          <h2 className="font-heading text-2xl font-bold mb-4">
            {role === "agriculteur" ? "Vendez vos produits au juste prix" : "Des produits frais, sans intermédiaire"}
          </h2>
          <p className="opacity-80 leading-relaxed">
            {role === "agriculteur"
              ? "Inscrivez-vous et accédez directement aux restaurateurs et grandes surfaces."
              : "Commandez directement auprès des agriculteurs et recevez des produits frais."}
          </p>
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

          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Créer un compte</h1>
          <p className="text-muted-foreground mb-6">Rejoignez la communauté AgriPool</p>

          <div className="flex rounded-lg bg-muted p-1 mb-6">
            {(Object.keys(roleLabels) as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${role === r ? "bg-background text-foreground card-shadow" : "text-muted-foreground"}`}
              >
                {roleLabels[r]}
              </button>
            ))}
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Prénom *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Nom</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+242 06 XXX XX XX" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                {role === "agriculteur" ? "Zone de production" : "Ville"}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm appearance-none">
                  {role === "agriculteur" ? (
                    <>
                      <option value="Djambala">Djambala</option>
                      <option value="Gamboma">Gamboma</option>
                      <option value="Lékana">Lékana</option>
                      <option value="Ngo">Ngo</option>
                      <option value="Ollombo">Ollombo</option>
                    </>
                  ) : (
                    <>
                      <option value="Brazzaville">Brazzaville</option>
                      <option value="Pointe-Noire">Pointe-Noire</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Mot de passe *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8 caractères minimum" className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Création..." : "Créer mon compte"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Déjà inscrit ?{" "}
            <Link to="/connexion" className="text-primary font-medium hover:underline">Se connecter</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Inscription;
