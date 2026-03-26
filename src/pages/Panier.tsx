import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import produceImg from "@/assets/produce.jpg";

const initialCart = [
  { id: 1, name: "Tomates fraîches", price: 500, unit: "kg", qty: 10, location: "Djambala" },
  { id: 2, name: "Manioc", price: 300, unit: "kg", qty: 25, location: "Gamboma" },
  { id: 3, name: "Piments rouges", price: 1200, unit: "kg", qty: 3, location: "Ngo" },
];

const Panier = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const remove = (id: number) => setCart((prev) => prev.filter((item) => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = 2500;
  const commission = Math.round(subtotal * 0.07);
  const total = subtotal + delivery + commission;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 section-padding bg-background min-h-screen">
        <div className="max-w-5xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-primary" /> Mon Panier
          </motion.h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Votre panier est vide</p>
              <Button asChild><Link to="/catalogue">Voir le catalogue</Link></Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-4 p-4 rounded-xl bg-card card-shadow">
                    <img src={produceImg} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-card-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.location} · {item.price} FCFA/{item.unit}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="font-medium text-foreground w-8 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive self-end"><Trash2 className="w-4 h-4" /></button>
                      <span className="font-bold text-foreground">{(item.price * item.qty).toLocaleString()} F</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl bg-card card-shadow h-fit sticky top-24">
                <h3 className="font-heading text-lg font-bold text-card-foreground mb-4">Résumé</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>Sous-total</span><span>{subtotal.toLocaleString()} FCFA</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Livraison (Plateaux → BZV)</span><span>{delivery.toLocaleString()} FCFA</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Commission (7%)</span><span>{commission.toLocaleString()} FCFA</span></div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                    <span>Total</span><span>{total.toLocaleString()} FCFA</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-6" size="lg">
                  <Link to="/commande">Passer la commande <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">Paiement par Mobile Money (MTN / Airtel)</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Panier;
