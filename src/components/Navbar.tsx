import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Accueil", path: "/" },
  { label: "Catalogue", path: "/catalogue" },
  { label: "Comment ça marche", path: "/comment-ca-marche" },
  { label: "À propos", path: "/a-propos" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">AgriPool</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/panier" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full hero-gradient text-primary-foreground text-[10px] font-bold flex items-center justify-center">3</span>
          </Link>
          <Button variant="ghost" size="sm" asChild><Link to="/connexion">Connexion</Link></Button>
          <Button size="sm" asChild><Link to="/inscription">S'inscrire</Link></Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3">
            <Button variant="ghost" size="sm">Connexion</Button>
            <Button size="sm">S'inscrire</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
