import { Leaf, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="hero-gradient text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">AgriPool</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            La place de marché agricole B2B qui connecte les agricultrices des Plateaux 
            aux restaurateurs de Brazzaville et Pointe-Noire.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Navigation</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <Link to="/" className="block hover:text-accent transition-colors">Accueil</Link>
            <Link to="/catalogue" className="block hover:text-accent transition-colors">Catalogue</Link>
            <Link to="/comment-ca-marche" className="block hover:text-accent transition-colors">Comment ça marche</Link>
            <Link to="/a-propos" className="block hover:text-accent transition-colors">À propos</Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Fonctionnalités</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <p>Catalogue produits</p>
            <p>Commandes récurrentes</p>
            <p>Paiement Mobile Money</p>
            <p>Suivi livraison</p>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +242 06 000 00 00
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@agripool.cg
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Brazzaville, Congo
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm text-primary-foreground/50">
        © 2026 AgriPool. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
