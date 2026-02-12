
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, ShoppingCart, Star, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { products as shopProducts } from "@/data/products";

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      ...shopProducts[0],
      price: shopProducts[0].priceFormatted,
      originalPrice: "₦35,000",
      rating: 5,
      badge: "Best Seller"
    },
    {
      ...shopProducts[2],
      price: shopProducts[2].priceFormatted,
      originalPrice: "₦45,000",
      rating: 5,
      badge: "Exclusive"
    },
    {
      ...shopProducts[4],
      price: shopProducts[4].priceFormatted,
      originalPrice: null,
      rating: 5,
      badge: "New Arrival"
    }
  ];

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-muted/10 via-background to-muted/15 relative overflow-hidden flex items-center">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-[fadeInUp_1s_ease-out]">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-16"></div>
            <Sparkles className="mx-3 w-4 h-4 text-primary animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-16"></div>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-transparent bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text mb-4 animate-[shimmer_3s_ease-in-out_infinite]">
            Featured Collection
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Discover our carefully curated selection of premium menswear,
            designed for the sophisticated modern gentleman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover-scale bg-background border-border">
              <Link to={`/product/${product.slug}`}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button size="sm" variant="secondary" className="opacity-90">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="opacity-90">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>
              <CardContent className="p-6">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {product.priceFormatted}
                  </span>
                  <Link to={`/product/${product.slug}`}>
                    <Button size="sm" className="hover-scale">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-[fadeInUp_1s_ease-out_0.8s_both]">
          <Button asChild size="lg" variant="outline" className="group text-base px-8 py-3 border-2 border-primary/30 hover:border-primary bg-transparent hover:bg-primary/5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg backdrop-blur-sm">
            <Link to="/shop">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-foreground transition-all duration-300">
                View All Products
              </span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
