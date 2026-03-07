import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function verifyAdmin(req: Request): boolean {
  const password = req.headers.get("x-admin-password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword || !password) return false;
  // Constant-time comparison to prevent timing attacks
  if (password.length !== adminPassword.length) return false;
  let result = 0;
  for (let i = 0; i < password.length; i++) {
    result |= password.charCodeAt(i) ^ adminPassword.charCodeAt(i);
  }
  return result === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify admin password on every request
  if (!verifyAdmin(req)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    // GET: List all products or verify password
    if (req.method === "GET") {
      if (action === "verify") {
        return jsonResponse({ success: true });
      }
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id");
      if (error) throw error;
      return jsonResponse({ products: data });
    }

    // POST: Create product
    if (req.method === "POST") {
      const body = await req.json();
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: body.name,
          price: body.price,
          category: body.category,
          image_url: body.image_url || "",
          additional_images: body.additional_images || [],
          description: body.description || "",
          details: body.details || [],
          sizes: body.sizes || ["S", "M", "L", "XL", "XXL"],
          slug: body.slug,
        })
        .select()
        .single();
      if (error) throw error;
      return jsonResponse({ product: data }, 201);
    }

    // PUT: Update product
    if (req.method === "PUT") {
      const body = await req.json();
      const id = url.searchParams.get("id");
      if (!id) return jsonResponse({ error: "Missing product id" }, 400);

      const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
      const fields = ["name", "price", "category", "image_url", "additional_images", "description", "details", "sizes", "slug"];
      for (const f of fields) {
        if (body[f] !== undefined) updateData[f] = body[f];
      }

      const { data, error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", parseInt(id))
        .select()
        .single();
      if (error) throw error;
      return jsonResponse({ product: data });
    }

    // DELETE: Delete product
    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      if (!id) return jsonResponse({ error: "Missing product id" }, 400);
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", parseInt(id));
      if (error) throw error;
      return jsonResponse({ success: true });
    }

    return jsonResponse({ error: "Method not allowed" }, 405);
  } catch (err) {
    console.error("Admin products error:", err);
    return jsonResponse({ error: err.message }, 500);
  }
});
