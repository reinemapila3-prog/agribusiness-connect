import { motion } from "framer-motion";
import farmerImg from "@/assets/farmer.jpg";
import restaurantImg from "@/assets/restaurant.jpg";

const personas = [
  {
    image: farmerImg,
    role: "Agricultrice",
    name: "Mama Bénédicte",
    location: "Plateaux, Djambala",
    quote: "Avant, je vendais mes tomates à 200 FCFA/kg aux grossistes. Maintenant, je les vends à 500 FCFA directement aux restaurants.",
    benefits: [
      "Meilleurs prix sans intermédiaires",
      "Accès direct au marché urbain",
      "Revenus prévisibles grâce aux commandes récurrentes",
      "Réduction des pertes post-récolte",
    ],
  },
  {
    image: restaurantImg,
    role: "Restaurateur",
    name: "Chef Patrick",
    location: "Brazzaville, Poto-Poto",
    quote: "Je reçois des produits plus frais à meilleur prix. La qualité de mes plats s'est améliorée et mes clients le remarquent.",
    benefits: [
      "Produits frais livrés directement",
      "Prix compétitifs sans marge intermédiaire",
      "Commandes automatiques planifiées",
      "Traçabilité et qualité garanties",
    ],
  },
];

const PersonasSection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-secondary font-medium text-sm uppercase tracking-wider">Pour qui</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Deux acteurs, un lien direct
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {personas.map((persona, i) => (
          <motion.div
            key={persona.role}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-background card-shadow overflow-hidden"
          >
            <div className="relative h-56">
              <img
                src={persona.image}
                alt={persona.role}
                className="w-full h-full object-cover"
                loading="lazy"
                width={600}
                height={600}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  {persona.role}
                </span>
                <h3 className="font-heading text-xl font-bold text-primary-foreground mt-2">{persona.name}</h3>
                <p className="text-primary-foreground/70 text-sm">{persona.location}</p>
              </div>
            </div>
            <div className="p-6">
              <blockquote className="italic text-muted-foreground border-l-4 border-secondary pl-4 mb-6">
                "{persona.quote}"
              </blockquote>
              <ul className="space-y-2">
                {persona.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PersonasSection;
