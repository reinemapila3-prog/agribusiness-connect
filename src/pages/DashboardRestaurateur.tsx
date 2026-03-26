import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, Truck, RefreshCw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Package, label: "Commandes ce mois", value: "12", color: "hero-gradient" },
  { icon: Clock, label: "En cours", value: "2", color: "accent-gradient" },
  { icon: CheckCircle2, label: "Livrées", value: "9", color: "hero-gradient" },
  { icon: RefreshCw, label: "Commandes récurrentes", value: "3", color: "warm-gradient" },
];

const orders = [
  { id: "AGR-0847", items: "Tomates (10kg), Manioc (25kg), Piments (3kg)", total: "19 727", status: "En préparation", date: "25 Mars", eta: "28 Mars" },
  { id: "AGR-0845", items: "Manioc (50kg)", total: "17 550", status: "En route", date: "24 Mars", eta: "26 Mars" },
  { id: "AGR-0840", items: "Haricots (15kg), Aubergines (10kg)", total: "18 925", status: "Livré", date: "20 Mars", eta: "22 Mars" },
  { id: "AGR-0835", items: "Poulets (5 pièces), Tomates (8kg)", total: "24 150", status: "Livré", date: "18 Mars", eta: "20 Mars" },
];

const statusConfig: Record<string, { color: string; icon: typeof Truck }> = {
  "En préparation": { color: "bg-secondary/10 text-secondary", icon: Clock },
  "En route": { color: "bg-accent/20 text-accent-foreground", icon: Truck },
  "Livré": { color: "bg-primary/10 text-primary", icon: CheckCircle2 },
};

const DashboardRestaurateur = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24 section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Bonjour, Chef Patrick 🍳</h1>
            <p className="text-muted-foreground">Gérez vos commandes et approvisionnements</p>
          </motion.div>
          <Button asChild size="sm"><Link to="/catalogue">Nouvelle commande</Link></Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl bg-card card-shadow">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl bg-card card-shadow p-6 mb-6">
          <h2 className="font-heading text-lg font-bold text-card-foreground mb-4">Suivi des commandes</h2>
          <div className="space-y-4">
            {orders.map((o, i) => {
              const config = statusConfig[o.status];
              const StatusIcon = config.icon;
              return (
                <motion.div key={o.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-lg border border-border bg-background">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{o.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}>
                          <StatusIcon className="w-3 h-3" /> {o.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{o.items}</p>
                    </div>
                    <span className="font-bold text-foreground">{o.total} F</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Commandé le {o.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Livraison prévue : {o.eta}</span>
                  </div>
                  {o.status !== "Livré" && (
                    <div className="mt-3">
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${o.status === "En route" ? "w-2/3 hero-gradient" : "w-1/3 accent-gradient"}`} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-card card-shadow p-6">
          <h2 className="font-heading text-lg font-bold text-card-foreground mb-4">Commandes récurrentes</h2>
          <p className="text-sm text-muted-foreground mb-4">Configurez des commandes automatiques pour ne jamais manquer de stock.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { product: "Tomates fraîches", qty: "20 kg", freq: "Chaque mardi" },
              { product: "Manioc", qty: "50 kg", freq: "Chaque jeudi" },
              { product: "Piments rouges", qty: "5 kg", freq: "Chaque samedi" },
            ].map((r) => (
              <div key={r.product} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-sm text-foreground">{r.product}</p>
                  <p className="text-xs text-muted-foreground">{r.qty} · {r.freq}</p>
                </div>
                <RefreshCw className="w-4 h-4 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default DashboardRestaurateur;
