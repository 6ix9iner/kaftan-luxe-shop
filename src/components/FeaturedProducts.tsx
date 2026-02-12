
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, ShoppingCart, Star, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "Royal Kaftan Collection",
      price: "₦45,000",
      originalPrice: "₦60,000",
      image: "/placeholder.svg",
      category: "Premium Kaftans",
      description: "Luxury traditional wear with contemporary sophistication",
      rating: 5,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Executive Shirt Series",
      price: "₦28,000",
      originalPrice: "₦35,000",
      image: "/placeholder.svg",
      category: "Designer Shirts",
      description: "Premium shirts for the distinguished gentleman",
      rating: 5,
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Limited Edition Kaftan",
      price: "₦75,000",
      image: "/placeholder.svg",
      category: "Exclusive",
      description: "Rare design with premium Italian fabrics",
      rating: 5,
      badge: "Limited"
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
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group relative bg-background/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-primary/10 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 rounded-2xl overflow-hidden animate-[fadeInUp_1s_ease-out] cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                {/* Product badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white shadow-lg ${
                    product.badge === 'Best Seller' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    product.badge === 'New Arrival' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {product.badge}
                  </span>
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Enhanced overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                    <Button size="sm" className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-white/30 text-white shadow-lg transform hover:scale-105 transition-all duration-300 rounded-full">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-white/30 text-white shadow-lg transform hover:scale-105 transition-all duration-300 rounded-full">
                      <Heart className="w-3 h-3" />
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-lg transform hover:scale-105 transition-all duration-300 rounded-full px-4">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Category tag */}
                <div className="absolute top-4 right-4">
                  <span className="bg-background/90 backdrop-blur-md text-foreground px-2 py-1 rounded-full text-xs font-semibold border border-primary/20 shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl">
                {/* Rating stars - smaller */}
                <div className="flex items-center mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">(5.0)</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-black text-primary">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 rounded-lg px-4 py-2 text-sm">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Buy Now
                  </Button>
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
