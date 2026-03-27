import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Plus, Edit2, Trash2, Bell, MapPin, User, LogOut, TrendingUp, ShoppingCart, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category_id: string | null;
  price: number;
  quantity: number;
  unit: string;
  image_url: string | null;
  is_available: boolean;
}

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  order_id: string;
  product_id: string;
  orders: { id: string; status: string; created_at: string; buyer_id: string; profiles?: { full_name: string } } | null;
  products: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const DashboardAgriculteur = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [tab, setTab] = useState<"products" | "orders" | "notifications">("products");

  // Form state
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formQty, setFormQty] = useState("");
  const [formUnit, setFormUnit] = useState("kg");
  const [formImage, setFormImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/connexion");
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchCategories();
      fetchOrders();
      fetchNotifications();
    }
  }, [user]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").eq("seller_id", user!.id).order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) setCategories(data);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("order_items").select("*, orders(*), products(name)").eq("seller_id", user!.id).order("created_at", { ascending: false });
    if (data) setOrderItems(data as any);
  };

  const fetchNotifications = async () => {
    const { data } = await supabase.from("notifications").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(20);
    if (data) setNotifications(data);
  };

  const resetForm = () => {
    setFormName(""); setFormDesc(""); setFormCategory(""); setFormPrice(""); setFormQty(""); setFormUnit("kg"); setFormImage(null);
    setEditingProduct(null); setShowAddModal(false);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${user!.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) { toast.error("Erreur upload image"); return null; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) { toast.error("Nom et prix requis"); return; }
    setSubmitting(true);
    let imageUrl = editingProduct?.image_url || null;
    if (formImage) imageUrl = await uploadImage(formImage);

    if (editingProduct) {
      const { error } = await supabase.from("products").update({
        name: formName, description: formDesc || null, category_id: formCategory || null,
        price: parseFloat(formPrice), quantity: parseInt(formQty) || 0, unit: formUnit, image_url: imageUrl,
      }).eq("id", editingProduct.id);
      if (error) toast.error("Erreur mise à jour"); else { toast.success("Produit mis à jour"); resetForm(); fetchProducts(); }
    } else {
      const { error } = await supabase.from("products").insert({
        seller_id: user!.id, name: formName, description: formDesc || null, category_id: formCategory || null,
        price: parseFloat(formPrice), quantity: parseInt(formQty) || 0, unit: formUnit, image_url: imageUrl,
      });
      if (error) toast.error("Erreur ajout produit"); else { toast.success("Produit ajouté"); resetForm(); fetchProducts(); }
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error("Erreur suppression"); else { toast.success("Produit supprimé"); fetchProducts(); }
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p); setFormName(p.name); setFormDesc(p.description || ""); setFormCategory(p.category_id || "");
    setFormPrice(p.price.toString()); setFormQty(p.quantity.toString()); setFormUnit(p.unit); setShowAddModal(true);
  };

  const totalRevenue = orderItems.reduce((s, oi) => s + oi.quantity * oi.unit_price, 0);
  const unreadNotifs = notifications.filter((n) => !n.is_read).length;

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Tableau de bord vendeur</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{profile?.full_name}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile?.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { resetForm(); setShowAddModal(true); }}><Plus className="w-4 h-4 mr-1" />Ajouter produit</Button>
            <Button variant="ghost" onClick={() => { signOut(); navigate("/"); }}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 card-shadow">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center"><Package className="w-5 h-5 text-primary-foreground" /></div><div><p className="text-sm text-muted-foreground">Produits</p><p className="text-2xl font-bold text-foreground">{products.length}</p></div></div>
          </div>
          <div className="bg-card rounded-xl p-5 card-shadow">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-primary-foreground" /></div><div><p className="text-sm text-muted-foreground">Commandes</p><p className="text-2xl font-bold text-foreground">{orderItems.length}</p></div></div>
          </div>
          <div className="bg-card rounded-xl p-5 card-shadow">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg warm-gradient flex items-center justify-center"><TrendingUp className="w-5 h-5 text-primary-foreground" /></div><div><p className="text-sm text-muted-foreground">Revenus</p><p className="text-2xl font-bold text-foreground">{totalRevenue.toLocaleString()} FCFA</p></div></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1 mb-6 w-fit">
          {[{ key: "products", label: "Mes Produits" }, { key: "orders", label: "Commandes" }, { key: "notifications", label: `Notifications ${unreadNotifs > 0 ? `(${unreadNotifs})` : ""}` }].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as any)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === t.key ? "bg-background text-foreground card-shadow" : "text-muted-foreground"}`}>{t.label}</button>
          ))}
        </div>

        {/* Products Tab */}
        {tab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>Aucun produit. Ajoutez votre premier produit !</p>
              </div>
            ) : products.map((p) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl overflow-hidden card-shadow">
                {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-bold text-foreground">{p.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.quantity > 0 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                      {p.quantity > 0 ? "En stock" : "Épuisé"}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-secondary">{p.price.toLocaleString()} FCFA/{p.unit}</p>
                  <p className="text-sm text-muted-foreground">Stock : {p.quantity} {p.unit}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Edit2 className="w-3 h-3 mr-1" />Modifier</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}><Trash2 className="w-3 h-3 mr-1" />Supprimer</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {tab === "orders" && (
          <div className="space-y-3">
            {orderItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>Aucune commande reçue</p>
              </div>
            ) : orderItems.map((oi) => (
              <div key={oi.id} className="bg-card rounded-xl p-4 card-shadow flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{oi.products?.name}</p>
                  <p className="text-sm text-muted-foreground">Qté: {oi.quantity} — {(oi.quantity * oi.unit_price).toLocaleString()} FCFA</p>
                  <p className="text-xs text-muted-foreground">{new Date(oi.orders?.created_at || "").toLocaleDateString("fr-FR")}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${oi.orders?.status === "delivered" ? "bg-primary/10 text-primary" : oi.orders?.status === "pending" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {oi.orders?.status === "pending" ? "En attente" : oi.orders?.status === "confirmed" ? "Confirmé" : oi.orders?.status === "shipped" ? "Expédié" : oi.orders?.status === "delivered" ? "Livré" : "Annulé"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Notifications Tab */}
        {tab === "notifications" && (
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>Aucune notification</p>
              </div>
            ) : notifications.map((n) => (
              <div key={n.id} className={`bg-card rounded-xl p-4 card-shadow ${!n.is_read ? "border-l-4 border-primary" : ""}`} onClick={async () => {
                if (!n.is_read) {
                  await supabase.from("notifications").update({ is_read: true }).eq("id", n.id);
                  fetchNotifications();
                }
              }}>
                <p className="font-medium text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleDateString("fr-FR")}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-background rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading text-xl font-bold text-foreground">{editingProduct ? "Modifier produit" : "Ajouter un produit"}</h2>
              <button onClick={resetForm}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form onSubmit={handleSubmitProduct} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Nom *</label>
                <input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Ex: Tomates fraîches" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                <textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Catégorie</label>
                <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Sélectionner</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Prix (FCFA) *</label>
                  <input type="number" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Quantité</label>
                  <input type="number" value={formQty} onChange={(e) => setFormQty(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Unité</label>
                  <select value={formUnit} onChange={(e) => setFormUnit(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="kg">kg</option>
                    <option value="unité">unité</option>
                    <option value="sac">sac</option>
                    <option value="caisse">caisse</option>
                    <option value="botte">botte</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Image</label>
                <label className="flex items-center gap-2 cursor-pointer px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-muted-foreground">
                  <Upload className="w-4 h-4" />
                  {formImage ? formImage.name : "Choisir une image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setFormImage(e.target.files?.[0] || null)} />
                </label>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Enregistrement..." : editingProduct ? "Mettre à jour" : "Ajouter"}</Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardAgriculteur;
