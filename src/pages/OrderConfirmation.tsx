import { useState, useRef } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, Upload, FileText, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "2347062849981";

const OrderConfirmation = () => {
  const location = useLocation();
  const state = location.state as {
    orderId?: string;
    email?: string;
    whatsappLink?: string;
    invoiceUrl?: string;
  } | null;

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!state?.orderId) return <Navigate to="/" />;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Max 5MB allowed", variant: "destructive" });
        return;
      }
      setReceiptFile(file);
    }
  };

  const uploadReceipt = async () => {
    if (!receiptFile) return;
    setUploading(true);
    try {
      const ext = receiptFile.name.split(".").pop();
      const filePath = `${state.orderId}-receipt.${ext}`;

      // First try to remove any existing file (ignore errors)
      await supabase.storage.from("receipts").remove([filePath]);

      const { data: uploadData, error } = await supabase.storage
        .from("receipts")
        .upload(filePath, receiptFile, { upsert: true });

      if (error) {
        console.error("Receipt upload error:", error);
        throw error;
      }

      console.log("Receipt uploaded successfully:", uploadData);

      // Build public URL directly — bucket is public
      const { data: urlData } = supabase.storage
        .from("receipts")
        .getPublicUrl(filePath);
      
      const url = urlData.publicUrl;
      console.log("Receipt URL set to:", url);
      setReceiptUrl(url);
      toast({ title: "Receipt uploaded successfully!" });
    } catch (err: any) {
      console.error("Receipt upload failed:", err);
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const openInvoice = () => {
    if (!state.invoiceUrl) return;
    window.open(state.invoiceUrl, "_blank", "noopener,noreferrer");
  };

  const buildWhatsAppLink = () => {
    console.log("Building WhatsApp link. receiptUrl:", receiptUrl, "invoiceUrl:", state.invoiceUrl);
    const hasReceipt = !!receiptUrl;
    const hasInvoice = !!state.invoiceUrl;

    const attachmentNote = hasReceipt && hasInvoice
      ? "Payment receipt & invoice attached."
      : hasReceipt
        ? "Payment receipt attached."
        : hasInvoice
          ? "Invoice attached."
          : "";

    const lines = [
      `Hi! Order #${state.orderId} — ${attachmentNote}`,
      ``,
    ];
    if (hasReceipt) lines.push(`📎 Receipt: ${receiptUrl}`);
    if (hasInvoice) lines.push(`📄 Invoice: ${state.invoiceUrl}`);
    lines.push("", "Please confirm my order. Thank you!");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-2">
            Your order <span className="font-semibold text-foreground">#{state.orderId}</span> is being processed.
          </p>
          <p className="text-muted-foreground mb-8">
            A confirmation email has been sent to{" "}
            <span className="font-semibold text-foreground">{state.email}</span>
          </p>

          {/* Steps */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-lg font-bold text-foreground mb-4">Next Steps</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                Upload your bank transfer receipt below.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                Send the receipt and invoice to us via WhatsApp with one click.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                We'll confirm your payment and ship your order.
              </li>
            </ol>
          </div>

          {/* Receipt Upload */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" /> Upload Payment Receipt
            </h2>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,.pdf"
              className="hidden"
            />

            {!receiptUrl ? (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary transition-colors text-center"
                >
                  {receiptFile ? (
                    <p className="text-foreground font-medium">{receiptFile.name}</p>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Click to select your bank receipt</p>
                      <p className="text-xs text-muted-foreground mt-1">Image or PDF, max 5MB</p>
                    </>
                  )}
                </div>
                {receiptFile && (
                  <Button onClick={uploadReceipt} disabled={uploading} className="w-full">
                    {uploading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload className="w-4 h-4 mr-2" /> Upload Receipt</>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-700 dark:text-green-300 font-medium">Receipt uploaded successfully!</p>
              </div>
            )}
          </div>

          {/* Invoice */}
          {state.invoiceUrl && (
            <div className="bg-card border border-border rounded-2xl p-8 mb-8 text-left">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Your Invoice
              </h2>
              <Button variant="outline" className="w-full" onClick={openInvoice}>
                <FileText className="w-4 h-4 mr-2" /> View / Download Invoice
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto" onClick={() => window.open(buildWhatsAppLink(), '_blank', 'noopener,noreferrer')}>
                <MessageCircle className="w-5 h-5 mr-2" />
                {receiptUrl ? "Send Receipt & Invoice via WhatsApp" : "Send Invoice via WhatsApp"}
              </Button>
            <Link to="/shop">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
