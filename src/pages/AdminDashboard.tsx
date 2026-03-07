import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Lock, Plus, Pencil, Trash2, Save, X, Upload, Eye, LogOut, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
  additional_images: string[];
  description: string;
  details: string[];
  sizes: string[];
  slug: string;
}

const EMPTY_PRODUCT: Omit<AdminProduct, "id"> = {
  name: "",
  price: 0,
  category: "kaftans",
  image_url: "",
  additional_images: [],
  description: "",
  details: [],
  sizes: ["S", "M", "L", "XL", "XXL"],
  slug: "",
};

const AdminDashboard = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  const adminFetch = useCallback(
    async (method: string, params?: Record<string, string>, body?: unknown) => {
      const url = new URL(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-products`
      );
      if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
      }
      const res = await fetch(url.toString(), {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      return data;
    },
    [password]
  );

  const handleLogin = async () => {
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const secs = Math.ceil((lockoutUntil - Date.now()) / 1000);
      toast({ title: `Too many attempts. Try again in ${secs}s`, variant: "destructive" });
      return;
    }
    if (!password.trim()) return;
    setLoading(true);
    try {
      await adminFetch("GET", { action: "verify" });
      setAuthenticated(true);
      setLoginAttempts(0);
      toast({ title: "Authenticated successfully" });
    } catch {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      if (attempts >= 5) {
        setLockoutUntil(Date.now() + 60000 * attempts);
      }
      toast({ title: "Invalid password", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = useCallback(async () => {
    try {
      const data = await adminFetch("GET");
      setProducts(data.products || []);
    } catch (err: any) {
      toast({ title: "Failed to load products", description: err.message, variant: "destructive" });
    }
  }, [adminFetch]);

  useEffect(() => {
    if (authenticated) loadProducts();
  }, [authenticated, loadProducts]);

  const uploadImage = async (file: File): Promise<string> => {
    setUploadingImage(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      return urlData.publicUrl;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "edit" | "new"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      if (target === "edit" && editingProduct) {
        setEditingProduct({ ...editingProduct, image_url: url });
      } else {
        setNewProduct({ ...newProduct, image_url: url });
      }
      toast({ title: "Image uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    }
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const saveProduct = async () => {
    if (!editingProduct) return;
    setLoading(true);
    try {
      await adminFetch("PUT", { id: String(editingProduct.id) }, editingProduct);
      toast({ title: "Product updated" });
      setEditingProduct(null);
      loadProducts();
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {
    if (!newProduct.name || !newProduct.slug || !newProduct.price) {
      toast({ title: "Name, slug and price are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await adminFetch("POST", undefined, newProduct);
      toast({ title: "Product created" });
      setNewProduct(EMPTY_PRODUCT);
      setIsCreating(false);
      loadProducts();
    } catch (err: any) {
      toast({ title: "Create failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      await adminFetch("DELETE", { id: String(id) });
      toast({ title: "Product deleted" });
      loadProducts();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Enter your admin password to continue</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoComplete="off"
            />
            <Button className="w-full" onClick={handleLogin} disabled={loading || !password.trim()}>
              {loading ? "Verifying..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Product form component
  const ProductForm = ({
    product,
    onChange,
    onSave,
    onCancel,
    title,
    isNew = false,
  }: {
    product: Omit<AdminProduct, "id"> | AdminProduct;
    onChange: (p: any) => void;
    onSave: () => void;
    onCancel: () => void;
    title: string;
    isNew?: boolean;
  }) => (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {isNew ? <Plus className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={product.name}
              onChange={(e) => {
                const name = e.target.value;
                onChange({
                  ...product,
                  name,
                  ...(isNew ? { slug: generateSlug(name) } : {}),
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              value={product.slug}
              onChange={(e) => onChange({ ...product, slug: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Price (₦)</Label>
            <Input
              type="number"
              value={product.price}
              onChange={(e) => onChange({ ...product, price: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={product.category} onValueChange={(v) => onChange({ ...product, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="kaftans">Kaftans</SelectItem>
                <SelectItem value="shirts">Shirts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={product.description}
            onChange={(e) => onChange({ ...product, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Product Details (one per line)</Label>
          <Textarea
            value={(product.details || []).join("\n")}
            onChange={(e) =>
              onChange({ ...product, details: e.target.value.split("\n").filter(Boolean) })
            }
            rows={4}
            placeholder="100% premium cotton&#10;Hand-finished embroidery"
          />
        </div>

        <div className="space-y-2">
          <Label>Sizes (comma separated)</Label>
          <Input
            value={(product.sizes || []).join(", ")}
            onChange={(e) =>
              onChange({
                ...product,
                sizes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            placeholder="S, M, L, XL, XXL"
          />
        </div>

        <div className="space-y-2">
          <Label>Product Image</Label>
          <div className="flex items-center gap-4">
            {product.image_url && (
              <img
                src={product.image_url}
                alt="Product"
                className="w-20 h-20 object-cover rounded-lg border border-border"
              />
            )}
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">{uploadingImage ? "Uploading..." : "Upload Image"}</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, isNew ? "new" : "edit")}
                disabled={uploadingImage}
              />
            </label>
          </div>
          {product.image_url && (
            <Input
              value={product.image_url}
              onChange={(e) => onChange({ ...product, image_url: e.target.value })}
              placeholder="Or paste image URL"
              className="mt-2"
            />
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Product Admin</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/shop" target="_blank"><Eye className="w-4 h-4 mr-2" /> View Shop</a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setAuthenticated(false);
                setPassword("");
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Create new product */}
        {isCreating ? (
          <ProductForm
            product={newProduct}
            onChange={setNewProduct}
            onSave={createProduct}
            onCancel={() => {
              setIsCreating(false);
              setNewProduct(EMPTY_PRODUCT);
            }}
            title="Create New Product"
            isNew
          />
        ) : (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add New Product
          </Button>
        )}

        {/* Product list */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            All Products ({products.length})
          </h2>
          {products.map((product) =>
            editingProduct?.id === product.id ? (
              <ProductForm
                key={product.id}
                product={editingProduct}
                onChange={setEditingProduct}
                onSave={saveProduct}
                onCancel={() => setEditingProduct(null)}
                title={`Editing: ${product.name}`}
              />
            ) : (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ₦{product.price.toLocaleString()} · {product.category} · /{product.slug}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct({ ...product })}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
