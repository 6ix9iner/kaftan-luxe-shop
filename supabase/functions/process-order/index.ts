import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "BF45-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateInvoiceHtml(order: any, orderId: string): string {
  const itemsRows = order.items
    .map(
      (item: any) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee">${item.name} (${item.size})</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${item.priceFormatted}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${orderId}</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 40px; color: #333; }
  .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #1a1a2e; padding-bottom: 20px; }
  .header h1 { margin: 0; font-size: 28px; color: #1a1a2e; letter-spacing: 2px; }
  .header p { color: #666; margin: 5px 0; font-size: 14px; }
  .info-grid { display: flex; justify-content: space-between; margin-bottom: 30px; }
  .info-box { background: #f9f9f9; padding: 15px 20px; border-radius: 8px; flex: 1; margin: 0 5px; }
  .info-box:first-child { margin-left: 0; }
  .info-box:last-child { margin-right: 0; }
  .info-box p { margin: 4px 0; font-size: 13px; }
  .info-box strong { color: #1a1a2e; }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  thead tr { background: #1a1a2e; color: white; }
  thead th { padding: 12px 15px; text-align: left; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
  thead th:last-child { text-align: right; }
  thead th:nth-child(2) { text-align: center; }
  tbody td { padding: 10px 15px; border-bottom: 1px solid #eee; font-size: 14px; }
  .total-row { text-align: right; margin-top: 20px; font-size: 20px; color: #1a1a2e; }
  .footer { margin-top: 50px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
</style>
</head><body>
<div class="header">
  <h1>BRAND FORTY FIVE</h1>
  <p>INVOICE</p>
</div>
<div class="info-grid">
  <div class="info-box">
    <p><strong>Invoice To:</strong></p>
    <p>${order.customerName}</p>
    <p>${order.customerEmail}</p>
    <p>${order.customerPhone}</p>
    <p>${order.customerAddress}</p>
  </div>
  <div class="info-box">
    <p><strong>Order #:</strong> ${orderId}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
    <p><strong>Status:</strong> Awaiting Payment Confirmation</p>
  </div>
</div>
<table>
  <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
  <tbody>${itemsRows}</tbody>
</table>
<div class="total-row"><strong>Total: ${order.totalPriceFormatted}</strong></div>
<div class="footer">
  <p>Thank you for shopping with Brand Forty Five!</p>
  <p>Please send your payment receipt via WhatsApp for order confirmation.</p>
</div>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const order = await req.json();
    const orderId = generateOrderId();

    // Generate invoice HTML
    const invoiceHtml = generateInvoiceHtml(order, orderId);

    // Store invoice in Supabase Storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const invoiceFileName = `invoices/${orderId}.html`;
    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(invoiceFileName, new Blob([invoiceHtml], { type: "text/html" }), {
        contentType: "text/html",
        upsert: true,
      });

    let invoiceUrl: string | null = null;
    if (!uploadError) {
      // Use the app's /invoice route which fetches and renders the HTML properly
      const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/$/, "") || "";
      invoiceUrl = `${origin}/invoice?id=${orderId}`;
    } else {
      console.error("Invoice upload error:", uploadError);
    }

    // Build WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `Hi! I just placed an order #${orderId} on Brand Forty Five.\n\nCustomer: ${order.customerName}\nEmail: ${order.customerEmail}\nPhone: ${order.customerPhone}\nTotal: ${order.totalPriceFormatted}\n\nI'd like to send my payment receipt and get my invoice. Thank you!`
    );
    const whatsappLink = `https://wa.me/${order.whatsappNumber}?text=${whatsappMessage}`;

    // Send confirmation email via Google Apps Script
    const appsScriptUrl = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");
    let emailSent = false;

    if (appsScriptUrl) {
      const emailHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h1 style="color:#1a1a2e;text-align:center">Order Confirmed! 🎉</h1>
          <p>Dear ${order.customerName},</p>
          <p>Thank you for your order <strong>#${orderId}</strong>! Your order is being processed.</p>
          <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0">
            <h3>Order Summary</h3>
            ${order.items.map((i: any) => `<p>${i.name} (Size: ${i.size}) x${i.quantity} — ${i.priceFormatted}</p>`).join("")}
            <hr><p style="font-size:18px"><strong>Total: ${order.totalPriceFormatted}</strong></p>
          </div>
          <h3>Payment Details</h3>
          <p>Please complete your bank transfer to:</p>
          <div style="background:#f0f0f0;padding:15px;border-radius:8px">
            <p><strong>Bank:</strong> ${order.bankDetails.bankName}</p>
            <p><strong>Account No:</strong> ${order.bankDetails.accountNumber}</p>
            <p><strong>Account Name:</strong> ${order.bankDetails.accountName}</p>
            <p><strong>Amount:</strong> ${order.totalPriceFormatted}</p>
          </div>
          ${invoiceUrl ? `<p style="margin-top:20px"><a href="${invoiceUrl}" style="display:inline-block;padding:12px 24px;background:#1a1a2e;color:white;text-decoration:none;border-radius:8px">View Your Invoice</a></p>` : ""}
          <p style="margin-top:20px">After payment, please send your receipt via WhatsApp for quick confirmation.</p>
          <p>Thank you for choosing Brand Forty Five!</p>
        </div>
      `;

      try {
        const emailRes = await fetch(appsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: order.customerEmail,
            subject: `Order Confirmed — #${orderId}`,
            html: emailHtml,
          }),
        });
        emailSent = emailRes.ok;
        if (!emailRes.ok) {
          const errBody = await emailRes.text();
          console.error("Apps Script error:", errBody);
        }
      } catch (e) {
        console.error("Email send failed:", e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        whatsappLink,
        invoiceUrl,
        emailSent,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Process order error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
