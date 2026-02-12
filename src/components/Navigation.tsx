
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Navigation = () => {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const useWhiteText = !isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isHome ? window.innerHeight - 100 : 0;
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/90 backdrop-blur-2xl border-b border-primary/10 shadow-2xl shadow-primary/5' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/lovable-uploads/744e4579-af79-470f-8f6d-cd180bd81f7a.png" 
              alt="Brand Forty Five Logo" 
              className={`h-12 w-auto object-contain group-hover:scale-105 transition-all duration-300 ${useWhiteText ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-lg font-medium transition-all duration-300 group ${
                  location.pathname === link.to
                    ? (useWhiteText ? 'text-white' : 'text-primary')
                    : (useWhiteText ? 'text-white/80 hover:text-white' : 'text-foreground hover:text-primary')
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 ${
                  location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className={`hover:bg-primary/10 transition-colors duration-300 rounded-xl ${useWhiteText ? 'text-white' : ''}`}>
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className={`hover:bg-primary/10 transition-colors duration-300 rounded-xl ${useWhiteText ? 'text-white' : ''}`}>
              <User className="w-5 h-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className={`relative hover:bg-primary/10 transition-colors duration-300 rounded-xl ${useWhiteText ? 'text-white' : ''}`}>
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block w-full h-0.5 transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-foreground'} ${
                isOpen ? 'top-3 rotate-45' : 'top-1'
              }`}></span>
              <span className={`absolute block w-full h-0.5 transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-foreground'} ${
                isOpen ? 'opacity-0' : 'top-3'
              }`}></span>
              <span className={`absolute block w-full h-0.5 transition-all duration-300 ${useWhiteText ? 'bg-white' : 'bg-foreground'} ${
                isOpen ? 'top-3 -rotate-45' : 'top-5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-background/95 backdrop-blur-2xl border-t border-primary/10 rounded-b-3xl shadow-2xl">
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block text-lg font-medium transition-all duration-300 transform ${
                    location.pathname === link.to
                      ? 'text-primary translate-x-2'
                      : 'text-foreground hover:text-primary hover:translate-x-2'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile action buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-primary/10">
                <Button variant="ghost" size="sm" className="flex-1 mr-2">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
                <Link to="/cart" className="flex-1 ml-2" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full relative">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Cart
                    {totalItems > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
