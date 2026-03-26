import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonasSection from "@/components/PersonasSection";
import BusinessModelSection from "@/components/BusinessModelSection";
import CTASection from "@/components/CTASection";
import farmerImg from "@/assets/farmer.jpg";

const values = [
  { icon: Target, title: "Mission", text: "Éliminer les intermédiaires qui captent la valeur du travail des agricultrices congolaises et permettre un commerce direct et équitable." },
  { icon: Eye, title: "Vision", text: "Devenir la première plateforme agricole B2B du Congo, puis de l'Afrique centrale, en connectant les zones rurales aux marchés urbains." },
  { icon: Heart, title: "Valeurs", text: "Transparence, équité, qualité et soutien à l'entrepreneuriat féminin rural au Congo." },
];

const APropos = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-24 section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">À propos</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Pourquoi <span className="text-gradient">AgriPool</span> ?
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Au Congo-Brazzaville, les agricultrices des Plateaux produisent des aliments 
              de qualité mais n'ont pas accès aux marchés urbains. Les intermédiaires achètent 
              à bas prix et revendent cher, captant jusqu'à 60% de la valeur.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              AgriPool supprime ces intermédiaires en créant un lien direct entre productrices 
              et restaurateurs. Résultat : les agricultrices gagnent plus, les restaurateurs 
              paient moins, et tout le monde mange mieux.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <img src={farmerImg} alt="Agricultrice des Plateaux" className="rounded-2xl card-shadow w-full" loading="lazy" width={600} height={600} />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-xl bg-card card-shadow text-center"
            >
              <div className="w-14 h-14 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-card-foreground mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <PersonasSection />
    <BusinessModelSection />
    <CTASection />
    <Footer />
  </div>
);

export default APropos;
