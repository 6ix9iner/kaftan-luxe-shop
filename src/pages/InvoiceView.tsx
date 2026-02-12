import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const InvoiceView = () => {
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!invoiceId) {
      setError("No invoice ID provided");
      setLoading(false);
      return;
    }

    const fetchInvoice = async () => {
      try {
        const { data } = supabase.storage
          .from("receipts")
          .getPublicUrl(`invoices/${invoiceId}.html`);

        const res = await fetch(data.publicUrl);
        if (!res.ok) throw new Error("Invoice not found");

        const html = await res.text();

        // Replace the entire document with the invoice HTML
        document.open();
        document.write(html);
        document.close();
      } catch {
        setError("Invoice not found or could not be loaded.");
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Invoice Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading invoice...</p>
      </div>
    );
  }

  return null;
};

export default InvoiceView;
