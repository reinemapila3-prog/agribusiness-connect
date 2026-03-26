import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, MapPin, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = ["Livraison", "Paiement", "Confirmation"];

const Commande = () => {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("mtn");

  if (step === 2) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 section-padding bg-background min-h-screen flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Commande confirmée !</h1>
            <p className="text-muted-foreground mb-2">Commande #AGR-2024-0847</p>
            <p className="text-sm text-muted-foreground mb-6">
              Vous recevrez un SMS de confirmation sur votre numéro. Livraison prévue le <strong className="text-foreground">Jeudi 28 Mars</strong>.
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild variant="outline"><Link to="/dashboard/restaurateur">Suivre ma commande</Link></Button>
              <Button asChild><Link to="/catalogue">Continuer mes achats</Link></Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? "hero-gradient text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-12 h-0.5 ${i < step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-xl bg-card card-shadow">
                <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Adresse de livraison
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Quartier" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  <input placeholder="Avenue / Rue" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  <select className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                    <option>Brazzaville</option>
                    <option>Pointe-Noire</option>
                  </select>
                  <input placeholder="Repère (ex: face à...)" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card card-shadow">
                <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" /> Contact
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Nom du destinataire" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                  <input placeholder="+242 06 XXX XX XX" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card card-shadow">
                <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Créneau de livraison
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {["Mardi", "Jeudi", "Samedi"].map((day) => (
                    <button key={day} className="p-3 rounded-lg border border-input bg-background text-foreground text-sm font-medium hover:border-primary hover:bg-primary/5 transition-colors focus:ring-2 focus:ring-ring">
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={() => setStep(1)}>Continuer vers le paiement</Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-xl bg-card card-shadow">
                <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Mode de paiement
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "mtn", label: "MTN Mobile Money", desc: "Paiement instantané" },
                    { id: "airtel", label: "Airtel Money", desc: "Paiement instantané" },
                    { id: "cash", label: "Paiement à la livraison", desc: "Espèces uniquement" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-lg border text-left transition-colors ${paymentMethod === method.id ? "border-primary bg-primary/5" : "border-input bg-background hover:border-primary/50"}`}
                    >
                      <span className="font-medium text-foreground block">{method.label}</span>
                      <span className="text-sm text-muted-foreground">{method.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod !== "cash" && (
                <div className="p-6 rounded-xl bg-card card-shadow">
                  <label className="text-sm font-medium text-foreground mb-2 block">Numéro {paymentMethod === "mtn" ? "MTN" : "Airtel"} Money</label>
                  <input placeholder="+242 06 XXX XX XX" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
              )}

              <div className="p-6 rounded-xl bg-card card-shadow">
                <h3 className="font-heading font-bold text-card-foreground mb-3">Résumé de la commande</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>Tomates fraîches × 10 kg</span><span>5 000 FCFA</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Manioc × 25 kg</span><span>7 500 FCFA</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Piments rouges × 3 kg</span><span>3 600 FCFA</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Livraison</span><span>2 500 FCFA</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Commission (7%)</span><span>1 127 FCFA</span></div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground"><span>Total</span><span>19 727 FCFA</span></div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>Retour</Button>
                <Button className="flex-1" size="lg" onClick={() => setStep(2)}>Confirmer et payer</Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Commande;
