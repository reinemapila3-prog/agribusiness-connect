import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import produceImg from "@/assets/produce.jpg";

const categories = ["Tous", "Légumes", "Fruits", "Tubercules", "Épices", "Volailles", "Céréales"];

const products = [
  { id: 1, name: "Tomates fraîches", category: "Légumes", price: 500, unit: "kg", location: "Djambala", available: 200, season: true },
  { id: 2, name: "Piments rouges", category: "Épices", price: 1200, unit: "kg", location: "Ngo", available: 50, season: true },
  { id: 3, name: "Manioc", category: "Tubercules", price: 300, unit: "kg", location: "Gamboma", available: 500, season: true },
  { id: 4, name: "Bananes plantain", category: "Fruits", price: 400, unit: "régime", location: "Djambala", available: 100, season: true },
  { id: 5, name: "Haricots verts", category: "Légumes", price: 800, unit: "kg", location: "Lékana", available: 80, season: true },
  { id: 6, name: "Aubergines locales", category: "Légumes", price: 450, unit: "kg", location: "Ngo", available: 150, season: true },
  { id: 7, name: "Poulets de ferme", category: "Volailles", price: 3500, unit: "pièce", location: "Gamboma", available: 30, season: true },
  { id: 8, name: "Maïs grain", category: "Céréales", price: 350, unit: "kg", location: "Djambala", available: 300, season: false },
  { id: 9, name: "Oignons", category: "Légumes", price: 700, unit: "kg", location: "Lékana", available: 120, season: true },
];

const CataloguePage = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "Tous" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Catalogue des produits
            </h1>
            <p className="text-muted-foreground">Produits frais disponibles directement des agricultrices des Plateaux</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl bg-card card-shadow overflow-hidden group"
              >
                <div className="h-40 overflow-hidden">
                  <img src={produceImg} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{product.category}</span>
                    {product.season && <span className="text-xs text-primary font-medium">🟢 En saison</span>}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-card-foreground">{product.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {product.location}
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{product.price}</span>
                      <span className="text-sm text-muted-foreground"> FCFA/{product.unit}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{product.available} {product.unit} dispo.</span>
                  </div>
                  <Button className="w-full mt-4" size="sm">Ajouter au panier</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CataloguePage;
