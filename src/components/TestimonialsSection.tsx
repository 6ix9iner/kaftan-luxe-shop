
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Adewale Johnson",
      role: "CEO, Tech Innovations",
      image: "/placeholder.svg",
      rating: 5,
      text: "Brand 45 has transformed my professional wardrobe. The quality and attention to detail in every piece is exceptional. I feel confident and sophisticated in their designs."
    },
    {
      id: 2,
      name: "Emeka Okafor",
      role: "Creative Director",
      image: "/placeholder.svg",
      rating: 5,
      text: "The craftsmanship is unmatched. Each kaftan tells a story and the modern cuts make traditional wear feel contemporary and stylish."
    },
    {
      id: 3,
      name: "Tunde Bakare",
      role: "Business Executive",
      image: "/placeholder.svg",
      rating: 5,
      text: "From board meetings to cultural events, Brand 45 has me covered. The versatility and elegance of their pieces make them my go-to choice for any occasion."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-[fadeInUp_1s_ease-out]">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-16"></div>
            <Quote className="mx-3 w-4 h-4 text-primary animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-16"></div>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-black text-transparent bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Don't just take our word for it. Here's what distinguished gentlemen say about Brand 45.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 bg-background/80 backdrop-blur-xl border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                        />
                        <div className="flex items-center justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <blockquote className="text-base text-muted-foreground leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </blockquote>
                      
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-primary">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary scale-110' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
