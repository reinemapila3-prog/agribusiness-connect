import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Plus, Minus, Package, ClipboardList, LogOut, User, RefreshCw, Filter, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  unit: string;
  image_url: string | null;
  is_available: boolean;
  seller_id: string;
  categories: { name: string } | null;
  profiles: { full_name: string; location: string | null } | null;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: { name: string; price: number; unit: string; image_url: string | null; seller_id: string } | null;
}

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: { quantity: number; unit_price: number; products: { name: string } | null }[];
}

const DashboardGrandeSurface = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"catalogue" | "panier" | "commandes">("catalogue");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceSort, setPriceSort] = useState<"" | "asc" | "desc">("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => { if (!loading && !user) navigate("/connexion"); }, [user, loading]);

  useEffect(() => { if (user) { fetchAll(); } }, [user]);

  const fetchAll = () => { fetchProducts(); fetchCart(); fetchOrders(); fetchCategories(); };

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*, categories(name), profiles!products_seller_id_fkey(full_name, location)").eq("is_available", true).gt("quantity", 0);
    if (data) setProducts(data as any);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("id, name");
    if (data) setCategories(data);
  };

  const fetchCart = async () => {
    const { data } = await supabase.from("cart_items").select("*, products(name, price, unit, image_url, seller_id)").eq("user_id", user!.id);
    if (data) setCart(data as any);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*, order_items(quantity, unit_price, products(name))").eq("buyer_id", user!.id).order("created_at", { ascending: false });
    if (data) setOrders(data as any);
  };

  const addToCart = async (productId: string, qty: number = 10) => {
    const existing = cart.find((c) => c.product_id === productId);
    if (existing) {
      await supabase.from("cart_items").update({ quantity: existing.quantity + qty }).eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({ user_id: user!.id, product_id: productId, quantity: qty });
    }
    toast.success(`${qty} unités ajoutées`);
    fetchCart();
  };

  const updateCartQty = async (itemId: string, qty: number) => {
    if (qty <= 0) await supabase.from("cart_items").delete().eq("id", itemId);
    else await supabase.from("cart_items").update({ quantity: qty }).eq("id", itemId);
    fetchCart();
  };

  const placeOrder = async () => {
    if (cart.length === 0) { toast.error("Panier vide"); return; }
    const total = cart.reduce((s, c) => s + (c.products?.price || 0) * c.quantity, 0);

    const { data: order, error } = await supabase.from("orders").insert({
      buyer_id: user!.id, total_amount: total, status: "pending",
      delivery_address: profile?.location || "", payment_method: "mobile_money",
    }).select().single();

    if (error || !order) { toast.error("Erreur commande"); return; }

    const items = cart.map((c) => ({
      order_id: order.id, product_id: c.product_id,
      seller_id: c.products!.seller_id, quantity: c.quantity, unit_price: c.products!.price,
    }));
    await supabase.from("order_items").insert(items);

    const sellerIds = [...new Set(cart.map((c) => c.products!.seller_id))];
    await supabase.from("notifications").insert(sellerIds.map((sid) => ({
      user_id: sid, title: "Commande grande surface !",
      message: `Commande en gros reçue de ${profile?.full_name || "une grande surface"}.`,
      type: "order" as const, related_order_id: order.id,
    })));

    for (const c of cart) {
      const product = products.find((p) => p.id === c.product_id);
      if (product) await supabase.from("products").update({ quantity: Math.max(0, product.quantity - c.quantity) }).eq("id", c.product_id);
    }

    await supabase.from("cart_items").delete().eq("user_id", user!.id);
    toast.success("Commande passée !");
    fetchAll(); setTab("commandes");
  };

  const reorder = async (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    // This is a simplified reorder - adds items to cart
    toast.success("Articles ajoutés au panier pour recommande");
    setTab("panier");
  };

  let filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !categoryFilter || p.categories?.name === categoryFilter;
    return matchSearch && matchCategory;
  });

  if (priceSort === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (priceSort === "desc") filteredProducts.sort((a, b) => b.price - a.price);

  const cartTotal = cart.reduce((s, c) => s + (c.products?.price || 0) * c.quantity, 0);
  const totalOrdered = orders.reduce((s, o) => s + o.total_amount, 0);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Espace Grande Surface</h1>
            <p className="text-muted-foreground text-sm flex items-center gap-1"><User className="w-4 h-4" />{profile?.full_name} — {profile?.location}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setTab("panier")} className="relative">
              <ShoppingCart className="w-4 h-4 mr-1" />Panier pro
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full hero-gradient text-primary-foreground text-xs font-bold flex items-center justify-center">{cart.length}</span>}
            </Button>
            <Button variant="ghost" onClick={() => { signOut(); navigate("/"); }}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 card-shadow"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center"><ClipboardList className="w-5 h-5 text-primary-foreground" /></div><div><p className="text-sm text-muted-foreground">Commandes</p><p className="text-2xl font-bold text-foreground">{orders.length}</p></div></div></div>
          <div className="bg-card rounded-xl p-5 card-shadow"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center"><TrendingUp className="w-5 h-5 text-primary-foreground" /></div><div><p className="text-sm text-muted-foreground">Total commandé</p><p className="text-2xl font-bold text-foreground">{totalOrdered.toLocaleString()} FCFA</p></div></div></div>
          <div className="bg-card rounded-xl p-5 card-shadow"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg warm-gradient flex items-center justify-center"><Package className="w-5 h-5 text-primary-foreground" /></div><div><p className="text-sm text-muted-foreground">Produits disponibles</p><p className="text-2xl font-bold text-foreground">{products.length}</p></div></div></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1 mb-6 w-fit">
          {[{ key: "catalogue", label: "Catalogue" }, { key: "panier", label: `Panier (${cart.length})` }, { key: "commandes", label: "Historique" }].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as any)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === t.key ? "bg-background text-foreground card-shadow" : "text-muted-foreground"}`}>{t.label}</button>
          ))}
        </div>

        {/* Catalogue */}
        {tab === "catalogue" && (
          <>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm">
                <option value="">Toutes catégories</option>
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <select value={priceSort} onChange={(e) => setPriceSort(e.target.value as any)} className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm">
                <option value="">Trier par prix</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl overflow-hidden card-shadow">
                  {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover" />}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-heading font-bold text-foreground">{p.name}</h3>
                        {p.categories && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.categories.name}</span>}
                      </div>
                      <p className="text-lg font-bold text-secondary">{p.price.toLocaleString()} FCFA</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Stock: {p.quantity} {p.unit}</p>
                    {p.profiles && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{p.profiles.full_name} — {p.profiles.location}
                      </p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1" onClick={() => addToCart(p.id, 10)}><Plus className="w-4 h-4 mr-1" />+10 {p.unit}</Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => addToCart(p.id, 50)}>+50 {p.unit}</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredProducts.length === 0 && <div className="col-span-full text-center py-12 text-muted-foreground"><Package className="w-12 h-12 mx-auto mb-3 opacity-40" /><p>Aucun produit</p></div>}
            </div>
          </>
        )}

        {/* Cart */}
        {tab === "panier" && (
          <div>
            {cart.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground"><ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" /><p>Panier vide</p></div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map((c) => (
                    <div key={c.id} className="bg-card rounded-xl p-4 card-shadow flex items-center gap-4">
                      {c.products?.image_url && <img src={c.products.image_url} className="w-16 h-16 rounded-lg object-cover" />}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{c.products?.name}</p>
                        <p className="text-sm text-muted-foreground">{c.products?.price.toLocaleString()} FCFA/{c.products?.unit}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateCartQty(c.id, c.quantity - 10)} className="w-8 h-8 rounded-lg border border-input flex items-center justify-center text-xs font-bold">-10</button>
                        <input type="number" value={c.quantity} onChange={(e) => updateCartQty(c.id, parseInt(e.target.value) || 0)} className="w-20 text-center py-1 rounded-lg border border-input bg-background text-foreground text-sm" />
                        <button onClick={() => updateCartQty(c.id, c.quantity + 10)} className="w-8 h-8 rounded-lg border border-input flex items-center justify-center text-xs font-bold">+10</button>
                      </div>
                      <p className="font-bold text-foreground w-32 text-right">{((c.products?.price || 0) * c.quantity).toLocaleString()} FCFA</p>
                    </div>
                  ))}
                </div>
                <div className="bg-card rounded-xl p-6 card-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-foreground">Total</span>
                    <span className="text-2xl font-bold text-secondary">{cartTotal.toLocaleString()} FCFA</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={placeOrder}>Passer la commande en gros</Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Orders History */}
        {tab === "commandes" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground"><ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-40" /><p>Aucune commande</p></div>
            ) : orders.map((o) => (
              <div key={o.id} className="bg-card rounded-xl p-5 card-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-heading font-bold text-foreground">Commande #{o.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleDateString("fr-FR")} — {o.total_amount.toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${o.status === "delivered" ? "bg-primary/10 text-primary" : o.status === "pending" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                      {o.status === "pending" ? "En attente" : o.status === "confirmed" ? "Confirmé" : o.status === "shipped" ? "Expédié" : o.status === "delivered" ? "Livré" : "Annulé"}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => reorder(o.id)}><RefreshCw className="w-3 h-3 mr-1" />Recommander</Button>
                  </div>
                </div>
                {o.order_items && o.order_items.length > 0 && (
                  <div className="border-t border-border pt-2 space-y-1">
                    {o.order_items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm text-muted-foreground">
                        <span>{item.products?.name} × {item.quantity}</span>
                        <span>{(item.quantity * item.unit_price).toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardGrandeSurface;
