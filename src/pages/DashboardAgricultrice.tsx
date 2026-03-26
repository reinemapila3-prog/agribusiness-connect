import { motion } from "framer-motion";
import { Package, TrendingUp, DollarSign, ShoppingBag, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: DollarSign, label: "Revenus du mois", value: "124 500 FCFA", change: "+18%" },
  { icon: ShoppingBag, label: "Commandes", value: "23", change: "+5" },
  { icon: Package, label: "Produits actifs", value: "8", change: "" },
  { icon: TrendingUp, label: "Taux de vente", value: "92%", change: "+3%" },
];

const orders = [
  { id: "AGR-0843", client: "Restaurant Le Plateau", items: "Tomates (20kg), Piments (5kg)", total: "16 000", status: "Livré", date: "22 Mars" },
  { id: "AGR-0845", client: "Mami Cuisine", items: "Manioc (50kg)", total: "15 000", status: "En route", date: "24 Mars" },
  { id: "AGR-0847", client: "Chez Tantine BZV", items: "Tomates (10kg), Manioc (25kg), Piments (3kg)", total: "16 100", status: "En préparation", date: "25 Mars" },
];

const myProducts = [
  { name: "Tomates fraîches", stock: 200, unit: "kg", price: 500, active: true },
  { name: "Piments rouges", stock: 50, unit: "kg", price: 1200, active: true },
  { name: "Manioc", stock: 500, unit: "kg", price: 300, active: true },
  { name: "Aubergines", stock: 0, unit: "kg", price: 450, active: false },
];

const statusColor: Record<string, string> = {
  "Livré": "bg-primary/10 text-primary",
  "En route": "bg-accent/20 text-accent-foreground",
  "En préparation": "bg-secondary/10 text-secondary",
};

const DashboardAgricultrice = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24 section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Bonjour, Maman Félicité 🌾</h1>
            <p className="text-muted-foreground">Voici l'état de vos ventes aujourd'hui</p>
          </motion.div>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Ajouter un produit</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl bg-card card-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                {s.change && <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{s.change}</span>}
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold text-card-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl bg-card card-shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold text-card-foreground">Commandes récentes</h2>
              <Button variant="ghost" size="sm">Voir tout</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">N°</th>
                    <th className="text-left py-2 font-medium">Client</th>
                    <th className="text-left py-2 font-medium hidden md:table-cell">Articles</th>
                    <th className="text-right py-2 font-medium">Total</th>
                    <th className="text-center py-2 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border/50">
                      <td className="py-3 font-medium text-foreground">{o.id}</td>
                      <td className="py-3 text-foreground">{o.client}</td>
                      <td className="py-3 text-muted-foreground hidden md:table-cell">{o.items}</td>
                      <td className="py-3 text-right font-medium text-foreground">{o.total} F</td>
                      <td className="py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[o.status]}`}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl bg-card card-shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold text-card-foreground">Mes produits</h2>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {myProducts.map((p) => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className={`font-medium text-sm ${p.active ? "text-card-foreground" : "text-muted-foreground line-through"}`}>{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.stock > 0 ? `${p.stock} ${p.unit} en stock` : "Rupture"}</p>
                  </div>
                  <span className="font-bold text-sm text-foreground">{p.price} F/{p.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default DashboardAgricultrice;
