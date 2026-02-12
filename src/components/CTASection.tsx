
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-tl from-secondary/12 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/8 to-secondary/8 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-[fadeInUp_1s_ease-out]">
          <h2 className="text-2xl md:text-4xl font-black text-transparent bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text mb-6 animate-[shimmer_3s_ease-in-out_infinite]">
            Ready to Elevate Your Style?
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light mb-8 max-w-2xl mx-auto">
            Join the distinguished gentlemen who trust Brand 45 for their wardrobe. 
            Experience the perfect blend of tradition and modernity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button 
              asChild 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 rounded-lg px-8 py-4 text-base"
            >
              <Link to="/shop">
                <span className="relative z-10 flex items-center">
                  Start Shopping Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-lg"></div>
              </Link>
            </Button>

            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="group border-2 border-primary/30 hover:border-primary bg-transparent hover:bg-primary/5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg px-8 py-4 text-base backdrop-blur-sm"
            >
              <Link to="/contact">
                <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-foreground transition-all duration-300">
                  Get In Touch
                </span>
              </Link>
            </Button>
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-center justify-center space-x-3 group cursor-pointer">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-all duration-300">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email Us</p>
                <p className="text-xs text-muted-foreground">hello@brand45.com</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 group cursor-pointer">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-all duration-300">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Call Us</p>
                <p className="text-xs text-muted-foreground">+234 (0) 123 456 7890</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 group cursor-pointer">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-all duration-300">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Visit Us</p>
                <p className="text-xs text-muted-foreground">Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
