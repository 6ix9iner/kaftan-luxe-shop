import classicWhiteKaftan from "@/assets/products/classic-white-kaftan.jpg";
import navyPremiumShirt from "@/assets/products/navy-premium-shirt.jpg";
import embroideredGoldKaftan from "@/assets/products/embroidered-gold-kaftan.jpg";
import casualLinenShirt from "@/assets/products/casual-linen-shirt.jpg";
import royalBlueKaftan from "@/assets/products/royal-blue-kaftan.jpg";
import oxfordBusinessShirt from "@/assets/products/oxford-business-shirt.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
  slug: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White Kaftan",
    price: 25000,
    priceFormatted: "₦25,000",
    category: "kaftans",
    image: classicWhiteKaftan,
    images: [classicWhiteKaftan, classicWhiteKaftan, classicWhiteKaftan],
    description: "Pure cotton traditional kaftan with modern fit. This timeless piece blends heritage craftsmanship with contemporary tailoring, offering supreme comfort and elegance for any occasion.",
    details: [
      "100% premium cotton fabric",
      "Hand-finished embroidery details",
      "Modern slim-fit silhouette",
      "Machine washable",
      "Available in multiple sizes"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    slug: "classic-white-kaftan"
  },
  {
    id: 2,
    name: "Navy Premium Shirt",
    price: 18000,
    priceFormatted: "₦18,000",
    category: "shirts",
    image: navyPremiumShirt,
    images: [navyPremiumShirt, navyPremiumShirt, navyPremiumShirt],
    description: "Sophisticated shirt for business and casual wear. Crafted from premium fabric with attention to every stitch, this shirt transitions seamlessly from boardroom to evening events.",
    details: [
      "Premium blended fabric",
      "Reinforced collar and cuffs",
      "Tailored fit",
      "Easy-iron finish",
      "Button-down design"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    slug: "navy-premium-shirt"
  },
  {
    id: 3,
    name: "Embroidered Gold Kaftan",
    price: 35000,
    priceFormatted: "₦35,000",
    category: "kaftans",
    image: embroideredGoldKaftan,
    images: [embroideredGoldKaftan, embroideredGoldKaftan, embroideredGoldKaftan],
    description: "Luxury kaftan with intricate gold embroidery. A statement piece designed for special occasions, featuring meticulous hand-embroidered gold thread work on premium fabric.",
    details: [
      "Luxury cotton-silk blend",
      "Hand-embroidered gold thread",
      "Relaxed elegant fit",
      "Dry clean recommended",
      "Comes with matching cap"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    slug: "embroidered-gold-kaftan"
  },
  {
    id: 4,
    name: "Casual Linen Shirt",
    price: 15000,
    priceFormatted: "₦15,000",
    category: "shirts",
    image: casualLinenShirt,
    images: [casualLinenShirt, casualLinenShirt, casualLinenShirt],
    description: "Breathable linen shirt for everyday comfort. Perfect for warm weather, this shirt combines natural linen's cooling properties with a refined casual look.",
    details: [
      "100% natural linen",
      "Breathable and lightweight",
      "Relaxed casual fit",
      "Pre-washed for softness",
      "Coconut shell buttons"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    slug: "casual-linen-shirt"
  },
  {
    id: 5,
    name: "Royal Blue Kaftan",
    price: 28000,
    priceFormatted: "₦28,000",
    category: "kaftans",
    image: royalBlueKaftan,
    images: [royalBlueKaftan, royalBlueKaftan, royalBlueKaftan],
    description: "Regal blue kaftan with contemporary styling. This bold piece makes a statement with its rich royal blue tone and modern cut that flatters every body type.",
    details: [
      "Premium dyed cotton",
      "Subtle tone-on-tone embroidery",
      "Contemporary fit",
      "Colour-fast dye technology",
      "Side pocket detail"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    slug: "royal-blue-kaftan"
  },
  {
    id: 6,
    name: "Oxford Business Shirt",
    price: 20000,
    priceFormatted: "₦20,000",
    category: "shirts",
    image: oxfordBusinessShirt,
    images: [oxfordBusinessShirt, oxfordBusinessShirt, oxfordBusinessShirt],
    description: "Professional shirt with premium Oxford fabric. The quintessential business shirt, designed with a crisp finish and structured collar for a polished professional look.",
    details: [
      "Premium Oxford cotton",
      "Structured spread collar",
      "Barrel cuffs",
      "Wrinkle-resistant",
      "Classic business fit"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    slug: "oxford-business-shirt"
  }
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find(p => p.slug === slug);

export const getProductById = (id: number): Product | undefined =>
  products.find(p => p.id === id);
