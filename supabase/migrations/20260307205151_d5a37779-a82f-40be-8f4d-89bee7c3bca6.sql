
-- Create products table
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL DEFAULT 'kaftans',
  image_url TEXT NOT NULL DEFAULT '',
  additional_images TEXT[] DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  details TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT ARRAY['S','M','L','XL','XXL'],
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS - public read, no public write
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products" ON public.products FOR SELECT USING (true);

-- Create product-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Public read for product images
CREATE POLICY "Anyone can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

-- Seed existing products
INSERT INTO public.products (name, price, category, image_url, description, details, sizes, slug) VALUES
('Classic White Kaftan', 25000, 'kaftans', '', 'Pure cotton traditional kaftan with modern fit. This timeless piece blends heritage craftsmanship with contemporary tailoring, offering supreme comfort and elegance for any occasion.', ARRAY['100% premium cotton fabric','Hand-finished embroidery details','Modern slim-fit silhouette','Machine washable','Available in multiple sizes'], ARRAY['S','M','L','XL','XXL'], 'classic-white-kaftan'),
('Navy Premium Shirt', 18000, 'shirts', '', 'Sophisticated shirt for business and casual wear. Crafted from premium fabric with attention to every stitch, this shirt transitions seamlessly from boardroom to evening events.', ARRAY['Premium blended fabric','Reinforced collar and cuffs','Tailored fit','Easy-iron finish','Button-down design'], ARRAY['S','M','L','XL','XXL'], 'navy-premium-shirt'),
('Embroidered Gold Kaftan', 35000, 'kaftans', '', 'Luxury kaftan with intricate gold embroidery. A statement piece designed for special occasions, featuring meticulous hand-embroidered gold thread work on premium fabric.', ARRAY['Luxury cotton-silk blend','Hand-embroidered gold thread','Relaxed elegant fit','Dry clean recommended','Comes with matching cap'], ARRAY['S','M','L','XL','XXL'], 'embroidered-gold-kaftan'),
('Casual Linen Shirt', 15000, 'shirts', '', 'Breathable linen shirt for everyday comfort. Perfect for warm weather, this shirt combines natural linen''s cooling properties with a refined casual look.', ARRAY['100% natural linen','Breathable and lightweight','Relaxed casual fit','Pre-washed for softness','Coconut shell buttons'], ARRAY['S','M','L','XL','XXL'], 'casual-linen-shirt'),
('Royal Blue Kaftan', 28000, 'kaftans', '', 'Regal blue kaftan with contemporary styling. This bold piece makes a statement with its rich royal blue tone and modern cut that flatters every body type.', ARRAY['Premium dyed cotton','Subtle tone-on-tone embroidery','Contemporary fit','Colour-fast dye technology','Side pocket detail'], ARRAY['S','M','L','XL','XXL'], 'royal-blue-kaftan'),
('Oxford Business Shirt', 20000, 'shirts', '', 'Professional shirt with premium Oxford fabric. The quintessential business shirt, designed with a crisp finish and structured collar for a polished professional look.', ARRAY['Premium Oxford cotton','Structured spread collar','Barrel cuffs','Wrinkle-resistant','Classic business fit'], ARRAY['S','M','L','XL','XXL'], 'oxford-business-shirt');
