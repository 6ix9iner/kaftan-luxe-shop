
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Eye, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("latest");

  const filteredProducts = products.filter(product =>
    selectedCategory === "all" || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with kaftan background */}
      <section className="pt-0 pb-0 relative overflow-hidden">
        <div
          className="w-full min-h-[340px] flex items-end bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg-kaftan.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 pt-32">
            <div className="text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Shop Collection
              </h1>
              <p className="text-base text-white/80 max-w-2xl mx-auto">
                Discover our complete range of premium kaftans and shirts,
                crafted for the discerning modern gentleman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="kaftans">Kaftans</SelectItem>
                  <SelectItem value="shirts">Shirts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
