import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { products as staticProducts, Product } from "@/data/products";

// Map of slug -> static import for fallback images
const staticImageMap: Record<string, { image: string; images: string[] }> = {};
staticProducts.forEach((p) => {
  staticImageMap[p.slug] = { image: p.image, images: p.images };
});

interface DbProduct {
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

function dbToProduct(db: DbProduct): Product {
  const staticImg = staticImageMap[db.slug];
  const hasImage = db.image_url && db.image_url.length > 0;

  const image = hasImage ? db.image_url : staticImg?.image || "/placeholder.svg";
  const images = db.additional_images && db.additional_images.length > 0
    ? db.additional_images
    : hasImage
      ? [db.image_url]
      : staticImg?.images || [image];

  return {
    id: db.id,
    name: db.name,
    price: db.price,
    priceFormatted: `₦${db.price.toLocaleString()}`,
    category: db.category,
    image,
    images,
    description: db.description,
    details: db.details || [],
    sizes: db.sizes || ["S", "M", "L", "XL", "XXL"],
    slug: db.slug,
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id");

      if (error || !data || data.length === 0) {
        console.warn("Falling back to static products:", error?.message);
        return staticProducts;
      }

      return (data as unknown as DbProduct[]).map(dbToProduct);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductBySlug(slug: string) {
  const { data: products, ...rest } = useProducts();
  const product = products?.find((p) => p.slug === slug);
  return { data: product, ...rest };
}
