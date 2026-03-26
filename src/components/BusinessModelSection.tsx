import { motion } from "framer-motion";
import { Percent, Wallet, TrendingUp, Award } from "lucide-react";

const models = [
  {
    icon: Percent,
    title: "Commission par transaction",
    value: "5-10%",
    description: "Commission transparente prélevée sur chaque vente. L'agricultrice reçoit le reste directement.",
  },
  {
    icon: Wallet,
    title: "Abonnement Premium",
    value: "Optionnel",
    description: "Les restaurateurs peuvent souscrire un abonnement pour des livraisons prioritaires et des réductions.",
  },
  {
    icon: TrendingUp,
    title: "Services logistiques",
    value: "Variable",
    description: "Frais de livraison mutualisés entre les commandes d'une même zone pour réduire les coûts.",
  },
  {
    icon: Award,
    title: "Mise en avant",
    value: "Sponsorisé",
    description: "Les agricultrices peuvent booster la visibilité de leurs produits sur le catalogue.",
  },
];

const BusinessModelSection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-secondary font-medium text-sm uppercase tracking-wider">Modèle économique</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Un modèle gagnant-gagnant
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Notre modèle est conçu pour que chaque acteur y trouve son compte : 
          les agricultrices gagnent plus, les restaurateurs paient moins.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map((model, i) => (
          <motion.div
            key={model.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-background card-shadow text-center"
          >
            <div className="w-14 h-14 rounded-full accent-gradient flex items-center justify-center mx-auto mb-4">
              <model.icon className="w-7 h-7 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground font-heading mb-1">{model.value}</div>
            <h3 className="font-heading text-base font-semibold text-foreground mb-2">{model.title}</h3>
            <p className="text-muted-foreground text-sm">{model.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BusinessModelSection;
