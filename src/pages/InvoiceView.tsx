import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SUPABASE_URL = "https://hdevkqhvplhenqbzpalq.supabase.co";

const InvoiceView = () => {
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get("id");
  const [error, setError] = useState<string | null>(null);

  const invoiceUrl = invoiceId
    ? `${SUPABASE_URL}/storage/v1/object/public/receipts/invoices/${invoiceId}.html`
    : null;

  useEffect(() => {
    if (!invoiceId) {
      setError("No invoice ID provided");
    }
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

  return (
    <iframe
      src={invoiceUrl!}
      title={`Invoice ${invoiceId}`}
      className="w-full h-screen border-0"
    />
  );
};

export default InvoiceView;
