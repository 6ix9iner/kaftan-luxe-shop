import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast({ title: `${product.name} added to cart`, description: `Size: ${selectedSize} | Qty: ${quantity}` });
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="rounded-2xl overflow-hidden bg-muted mb-4">
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover" />
              </div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-20 h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-6">{product.priceFormatted}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Size */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${selectedSize === size ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary"
                        }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">Quantity</h3>
                <div className="inline-flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="px-6 text-lg font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-10">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
                <Button size="lg" variant="outline"><Heart className="w-5 h-5" /></Button>
              </div>

              {/* Details */}
              <div className="border-t border-border pt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20 border-t border-border pt-12">
              <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {related.map(p => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="group block">
                    <div className="rounded-2xl overflow-hidden bg-muted mb-4 aspect-square">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-primary font-bold mt-1">{p.priceFormatted}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
