import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";

const CommentCaMarche = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24 section-padding bg-background">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Comment fonctionne AgriPool ?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une plateforme simple et transparente qui connecte directement 
            les agricultrices des Plateaux aux restaurateurs des grandes villes.
          </p>
        </motion.div>
      </div>
    </div>
    <HowItWorksSection />

    <section className="section-padding bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {[
            { q: "Quels sont les frais de la plateforme ?", a: "AgriPool prélève une commission de 5 à 10% sur chaque transaction. Les agricultrices reçoivent directement le reste du paiement." },
            { q: "Comment sont organisées les livraisons ?", a: "Les commandes sont regroupées par zone et livrées aux jours planifiés (mardi et vendredi). Les frais de livraison sont mutualisés." },
            { q: "Quels modes de paiement sont acceptés ?", a: "Mobile Money (MTN et Airtel), paiement à la livraison, et virement bancaire pour les commandes en gros." },
            { q: "Puis-je commander de manière récurrente ?", a: "Oui ! Vous pouvez planifier des commandes automatiques hebdomadaires ou mensuelles." },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background rounded-xl p-6 card-shadow"
            >
              <h3 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>
);

export default CommentCaMarche;
