import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPriceFormatted, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Browse our collection and add items to your cart.</p>
          <Link to="/shop"><Button size="lg">Continue Shopping</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart ({totalItems})</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-6 p-6 rounded-2xl border border-border bg-card">
                  <Link to={`/product/${item.product.slug}`}>
                    <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-lg object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${item.product.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">{item.product.name}</Link>
                    <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                    <p className="text-primary font-bold mt-2">{item.product.priceFormatted}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="inline-flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-2 hover:bg-muted transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-2 hover:bg-muted transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card border border-border rounded-2xl p-8 h-fit">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              <div className="space-y-4 border-b border-border pb-6 mb-6">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.product.name} (x{item.quantity})</span>
                    <span className="text-foreground font-medium">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground mb-8">
                <span>Total</span>
                <span>{totalPriceFormatted}</span>
              </div>
              <Link to="/checkout">
                <Button size="lg" className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
