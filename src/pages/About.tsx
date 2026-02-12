
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Users, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest fabrics and materials for our collections."
    },
    {
      icon: Heart,
      title: "Passionate Craftsmanship",
      description: "Every piece is crafted with attention to detail and love for the art."
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "We design for real men with real style needs and preferences."
    },
    {
      icon: Zap,
      title: "Modern Innovation",
      description: "Blending traditional techniques with contemporary design philosophy."
    }
  ];

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
                Our Story
              </h1>
              <p className="text-base text-white/80 max-w-2xl mx-auto">
                Brand 45 is a modern menswear brand rooted in elegance, simplicity, and bold expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Crafted for the Modern Gentleman
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Brand 45 is a modern menswear brand. We create premium kaftans and shirts for men 
                  who value style, identity, and intentional living.
                </p>
                <p>
                  Our pieces combine bold fabrics, elegant cuts, and quiet luxury, designed to make 
                  every man feel worthy, confident, and refined. We believe true style isn't loud—
                  it's intentional, effortless, and rooted in self-awareness.
                </p>
                <p>
                  At Brand 45, we go beyond fashion. We design for men who lead with purpose, 
                  dress with pride, and express themselves through simplicity and bold expression.
                </p>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
              <img
                src="/placeholder.svg"
                alt="Brand 45 Story"
                className="relative z-10 w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Values */}
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 hover-scale bg-background border-border">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Vision Statement */}
          <div className="mt-20 text-center animate-fade-in">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                "To redefine modern menswear by creating pieces that embody confidence, 
                sophistication, and cultural pride. We envision a world where every man 
                can express his authentic self through thoughtfully designed, premium clothing 
                that bridges tradition with contemporary style."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
