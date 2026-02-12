import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const BANK_DETAILS = {
  bankName: "First Bank of Nigeria",
  accountNumber: "0123456789",
  accountName: "Brand Forty Five Ltd",
};

const WHATSAPP_NUMBER = "2347062849981";

const Checkout = () => {
  const { items, totalPrice, totalPriceFormatted, clearCart } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const copyAccount = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim() || !phone.trim() || !address.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (items.length === 0) {
      toast({ title: "Your cart is empty", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        items: items.map(i => ({
          name: i.product.name,
          price: i.product.price,
          priceFormatted: i.product.priceFormatted,
          quantity: i.quantity,
          size: i.size,
        })),
        totalPrice,
        totalPriceFormatted,
        bankDetails: BANK_DETAILS,
        whatsappNumber: WHATSAPP_NUMBER,
      };

      const { data, error } = await supabase.functions.invoke("process-order", {
        body: orderData,
      });

      if (error) throw error;

      clearCart();
      navigate("/order-confirmation", {
        state: {
          orderId: data.orderId,
          email,
          whatsappLink: data.whatsappLink,
          invoiceUrl: data.invoiceUrl,
        },
      });
    } catch (err: any) {
      toast({ title: "Error placing order", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">Your Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" required maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required maxLength={255} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="08012345678" required maxLength={20} />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main Street, Lagos" required maxLength={300} />
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Payment — Bank Transfer</h2>
                <p className="text-sm text-muted-foreground mb-6">Transfer the exact amount below and click "I've Made Payment" to complete your order.</p>
                <div className="bg-muted rounded-xl p-6 space-y-3">
                  <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span className="font-semibold text-foreground">{BANK_DETAILS.bankName}</span></div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Account No.</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{BANK_DETAILS.accountNumber}</span>
                      <button type="button" onClick={copyAccount} className="text-primary hover:text-primary/80 transition-colors">
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Account Name</span><span className="font-semibold text-foreground">{BANK_DETAILS.accountName}</span></div>
                  <div className="flex justify-between border-t border-border pt-3 mt-3">
                    <span className="text-muted-foreground font-medium">Amount</span>
                    <span className="text-xl font-bold text-primary">{totalPriceFormatted}</span>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Processing..." : "I've Made Payment — Place Order"}
              </Button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8 sticky top-28">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                <div className="space-y-4 border-b border-border pb-6 mb-6">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span><span>{totalPriceFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
