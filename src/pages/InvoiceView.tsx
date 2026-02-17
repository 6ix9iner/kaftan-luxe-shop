import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SUPABASE_URL = "https://hdevkqhvplhenqbzpalq.supabase.co";

const InvoiceView = () => {
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get("id");
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!invoiceId) {
      setError("No invoice ID provided");
      setLoading(false);
      return;
    }

    const fetchInvoice = async () => {
      try {
        const url = `${SUPABASE_URL}/storage/v1/object/public/receipts/invoices/${invoiceId}.html`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Invoice not found");
        const html = await res.text();
        setHtmlContent(html);
      } catch {
        setError("Could not load invoice. It may not exist yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading invoice...</p>
      </div>
    );
  }

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

  return (
    <iframe
      srcDoc={htmlContent!}
      title={`Invoice ${invoiceId}`}
      className="w-full h-screen border-0"
    />
  );
};

export default InvoiceView;
