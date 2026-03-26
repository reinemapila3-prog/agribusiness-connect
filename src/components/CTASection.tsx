import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import produceImg from "@/assets/produce.jpg";

const CTASection = () => (
  <section className="relative section-padding overflow-hidden">
    <div className="absolute inset-0">
      <img src={produceImg} alt="Produits frais" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
      <div className="absolute inset-0 hero-gradient opacity-90" />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
          Prêt à rejoindre la communauté ?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Que vous soyez agricultrice ou restaurateur, inscrivez-vous gratuitement 
          et commencez à commercer directement.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="hero" size="lg" className="text-base">
            Je suis agricultrice <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base">
            Je suis restaurateur <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
