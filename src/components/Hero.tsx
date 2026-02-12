import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import anime from 'animejs/lib/anime.es.js';
const Hero = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Try to play video on mobile
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }

    // Animate logo entrance
    anime({
      targets: '.hero-logo',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutElastic(1, .8)'
    });

    // Animate traditional attire image
    anime({
      targets: '.traditional-attire',
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 200,
      easing: 'easeOutQuad'
    });

    // Animate subtitle
    anime({
      targets: '.hero-subtitle',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 400,
      easing: 'easeOutQuad'
    });

    // Animate buttons with stagger
    anime({
      targets: '.hero-button',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100, {
        start: 600
      }),
      easing: 'easeOutQuad'
    });

    // Animate floating particles
    anime({
      targets: '.floating-particle',
      translateY: [{
        value: -15,
        duration: 2000
      }, {
        value: 0,
        duration: 2000
      }],
      opacity: [{
        value: 0.3,
        duration: 2000
      }, {
        value: 0.7,
        duration: 2000
      }],
      loop: true,
      delay: anime.stagger(200),
      easing: 'easeInOutQuad'
    });

    // Animate geometric shapes with rotation
    anime({
      targets: '.geometric-shape',
      rotate: [0, 360],
      scale: [{
        value: 1.1,
        duration: 3000
      }, {
        value: 1,
        duration: 3000
      }],
      duration: 6000,
      loop: true,
      easing: 'linear'
    });

    // Animate stars
    anime({
      targets: '.trust-star',
      scale: [{
        value: 1.2,
        duration: 1000
      }, {
        value: 1,
        duration: 1000
      }],
      opacity: [0, 1],
      delay: anime.stagger(100, {
        start: 900
      }),
      loop: true,
      easing: 'easeInOutQuad'
    });
  }, []);
  return <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video ref={videoRef} autoPlay muted playsInline webkit-playsinline="true" preload="auto" onEnded={() => setVideoEnded(true)} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoEnded ? 'opacity-0' : 'opacity-100'}`}>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Background (shows when video ends) */}
      <div className={`absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10 transition-opacity duration-1000 ${videoEnded ? 'opacity-100' : 'opacity-0'}`} />

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="floating-particle absolute top-10 left-10 w-2 h-2 bg-primary/30 rounded-full"></div>
        <div className="floating-particle absolute top-32 right-20 w-1 h-1 bg-secondary/40 rounded-full"></div>
        <div className="floating-particle absolute bottom-40 left-32 w-1.5 h-1.5 bg-primary/20 rounded-full"></div>
        <div className="floating-particle absolute top-1/2 right-10 w-1 h-1 bg-secondary/30 rounded-full"></div>
        
        {/* Moving geometric shapes */}
        <div className="geometric-shape absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
        <div className="geometric-shape absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-tl from-secondary/8 to-transparent rounded-full blur-2xl"></div>
        <div className="geometric-shape absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-primary/15 to-transparent rounded-full blur-lg"></div>
        
        {/* Animated grid lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent animate-pulse delay-1000"></div>
        
        {/* Rotating elements */}
        <div className="absolute top-1/4 right-1/4 w-12 h-12 border border-primary/20 rounded-lg animate-[spin_20s_linear_infinite] transform rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/3 w-8 h-8 border border-secondary/25 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 animate-[fadeInUp_1.2s_ease-out] max-w-4xl mx-auto">
          {/* Logo stays perfectly centered */}
          <div className="relative flex justify-center items-center">
            {/* Traditional attire image - responsive on all devices */}
            <div className="absolute -left-2 sm:-left-3 md:-left-4 lg:-left-6 xl:-left-8 top-8 sm:top-6 md:top-0">
              
            </div>
            
            {/* Main logo - perfectly centered and unaffected */}
            <img src="/lovable-uploads/1dc3feef-0a86-4708-b2a8-cafdbe48740f.png" alt="Brand Forty Five Logo" className="hero-logo h-40 sm:h-48 md:h-56 lg:h-64 w-auto object-contain" />
          </div>

          {/* Subtitle - updated text */}
          <p className="hero-subtitle text-lg sm:text-xl max-w-2xl mx-auto text-foreground leading-relaxed font-semibold">
            Élégance meets style. Premium outfits crafted for men who value refined style and confidence.
          </p>

          {/* CTA buttons - refined */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
            <Button asChild size="lg" className="hero-button group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 rounded-lg px-6 py-3 text-sm font-medium">
              <Link to="/shop">
                <span className="relative z-10 flex items-center">
                  Explore Collection
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-lg"></div>
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="hero-button group border-2 hover:bg-primary/5 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-lg px-6 py-3 text-sm font-medium">
              <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              Watch Story
            </Button>
          </div>

          {/* Trust indicators - smaller */}
          <div className="flex items-center justify-center space-x-4 pt-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="trust-star w-3 h-3 fill-primary text-primary" />)}
            </div>
            <span className="text-xs text-muted-foreground">Trusted by 500+ customers</span>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-[scroll_2s_ease-in-out_infinite]">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center">
              <div className="w-0.5 h-2 bg-primary rounded-full mt-1.5 animate-[scroll_2s_ease-in-out_infinite]"></div>
            </div>
            <ChevronDown className="w-4 h-4 text-primary/50 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div>
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
    </section>;
};
export default Hero;