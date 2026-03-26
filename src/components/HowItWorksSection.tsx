import { motion } from "framer-motion";
import { UserPlus, Search, ShoppingCart, Truck, Star } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Inscription", description: "Créez votre profil en tant qu'agricultrice ou restaurateur avec vos informations et votre zone." },
  { icon: Search, title: "Exploration", description: "Parcourez le catalogue de produits frais disponibles, filtrez par catégorie et localisation." },
  { icon: ShoppingCart, title: "Commande", description: "Ajoutez les produits au panier, choisissez la quantité et validez. Commandes récurrentes possibles." },
  { icon: Truck, title: "Livraison", description: "Les produits sont regroupés et livrés aux jours planifiés. Suivez votre commande en temps réel." },
  { icon: Star, title: "Évaluation", description: "Notez la qualité des produits et du service pour aider la communauté." },
];

const HowItWorksSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-secondary font-medium text-sm uppercase tracking-wider">Parcours</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Comment ça marche
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative flex items-start gap-6 mb-12 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="hidden md:block md:w-1/2" />
            <div className="relative z-10 w-12 h-12 rounded-full hero-gradient flex items-center justify-center shrink-0 ring-4 ring-background">
              <step.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="md:w-1/2">
              <div className="bg-card rounded-xl p-5 card-shadow">
                <div className="text-xs font-semibold text-secondary mb-1">Étape {i + 1}</div>
                <h3 className="font-heading text-lg font-bold text-card-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
