import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-farm.jpg";

const stats = [
  { icon: Users, value: "500+", label: "Agricultrices" },
  { icon: TrendingUp, value: "30%", label: "Plus de revenus" },
  { icon: ShieldCheck, value: "0", label: "Intermédiaire" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Terres agricoles des Plateaux" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 hero-gradient opacity-80" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
            Place de marché agricole B2B
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Du champ à la table,{" "}
            <span className="text-accent">sans intermédiaire</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg font-body">
            Connectons directement les agricultrices des Plateaux aux restaurateurs 
            de Brazzaville et Pointe-Noire. Prix justes, produits frais.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <Link to="/catalogue">
            <Button variant="hero" size="lg" className="text-base">
              Explorer le catalogue <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
          <Link to="/comment-ca-marche">
            <Button variant="heroOutline" size="lg" className="text-base">
              Comment ça marche
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-primary-foreground/90">
              <stat.icon className="w-5 h-5 mb-1 text-accent" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-primary-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
