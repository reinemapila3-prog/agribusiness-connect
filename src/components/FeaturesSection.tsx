import { motion } from "framer-motion";
import { ShoppingCart, Truck, CreditCard, BarChart3, MessageSquare, Shield } from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Catalogue en ligne",
    description: "Parcourez les produits frais disponibles avec prix, quantités et photos mis à jour en temps réel par les agricultrices.",
  },
  {
    icon: Truck,
    title: "Logistique intégrée",
    description: "Livraison organisée des Plateaux vers Brazzaville et Pointe-Noire avec suivi GPS et jours de livraison planifiés.",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    description: "Payez par Mobile Money (MTN, Airtel) ou à la livraison. Facturation automatique pour les restaurateurs.",
  },
  {
    icon: BarChart3,
    title: "Commandes récurrentes",
    description: "Planifiez vos commandes hebdomadaires automatiques. Recevez toujours vos produits sans effort.",
  },
  {
    icon: MessageSquare,
    title: "Communication directe",
    description: "Échangez directement avec les agricultrices. Négociez les prix et les quantités sans intermédiaire.",
  },
  {
    icon: Shield,
    title: "Qualité garantie",
    description: "Système de notation et avis. Traçabilité complète du champ à votre cuisine professionnelle.",
  },
];

const FeaturesSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-secondary font-medium text-sm uppercase tracking-wider">Fonctionnalités</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Tout ce qu'il faut pour votre activité
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Une plateforme complète pensée pour simplifier l'approvisionnement 
          des restaurateurs et valoriser le travail des agricultrices.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card card-shadow hover:elevated-shadow transition-shadow group"
          >
            <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
