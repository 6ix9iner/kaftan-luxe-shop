
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <section className="min-h-screen py-16 relative overflow-hidden flex items-center">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-tr from-secondary/8 to-transparent rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-1/2 right-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6 animate-[fadeInUp_1s_ease-out]">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
                Our Story
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text leading-tight animate-[shimmer_3s_ease-in-out_infinite]">
              Crafted for the Modern Gentleman
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Brand 45 is more than just fashion—we design for men who lead with purpose, 
                dress with pride, and express themselves through simplicity and bold expression.
              </p>
              
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Our pieces combine bold fabrics, elegant cuts, and quiet luxury, designed to make 
                every man feel worthy, confident, and refined.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center group cursor-pointer">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-2 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-lg font-bold text-foreground">5+</div>
                <div className="text-xs text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-2 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-lg font-bold text-foreground">500+</div>
                <div className="text-xs text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-2 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-lg font-bold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Premium Quality</div>
              </div>
            </div>

            <Button 
              asChild 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 rounded-lg px-6 py-3 text-sm"
            >
              <Link to="/about">
                <span className="relative z-10 flex items-center">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-lg"></div>
              </Link>
            </Button>
          </div>
          
          {/* Enhanced Image Section */}
          <div className="relative animate-[fadeInUp_1s_ease-out_0.4s_both] group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-primary/20 transition-all duration-700">
              <img
                src="/placeholder.svg"
                alt="Brand 45 Craftsmanship"
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating quality badge */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <Award className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <div className="text-white font-bold text-sm">Premium Quality</div>
                <div className="text-white/80 text-xs">Handcrafted Excellence</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tl from-secondary/15 to-primary/15 rounded-full blur-2xl animate-[float_6s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
