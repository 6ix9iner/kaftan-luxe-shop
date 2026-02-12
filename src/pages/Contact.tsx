
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Instagram, Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick response guaranteed",
      action: "Chat with us",
      links: [
        { label: "09057178590", href: "https://wa.me/2349057178590" },
        { label: "08136252096", href: "https://wa.me/2348136252096" }
      ]
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Follow our latest collections",
      action: "Follow @brand_fortyfive",
      links: [
        { label: "@brand_fortyfive", href: "https://instagram.com/brand_fortyfive" }
      ]
    },
    {
      icon: Mail,
      title: "Email",
      description: "For detailed inquiries",
      action: "Send us an email",
      links: [
        { label: "hello@brand45.com", href: "mailto:hello@brand45.com" }
      ]
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
                Get in Touch
              </h1>
              <p className="text-base text-white/80 max-w-2xl mx-auto">
                Ready to elevate your style? We'd love to hear from you. 
                Reach out for custom orders, styling advice, or any inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover-scale bg-background border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="text-center relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <method.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {method.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  {method.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mb-2"
                    >
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {link.label}
                        <method.icon className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      </Button>
                    </a>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-background border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center">
                  <Send className="mr-3 w-5 h-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 min-h-[120px]"
                      placeholder="Tell us about your style preferences, size requirements, or any questions you have..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Business Info */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-foreground flex items-center">
                    <Clock className="mr-3 w-5 h-5 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-foreground flex items-center">
                    <MapPin className="mr-3 w-5 h-5 text-primary" />
                    Visit Our Showroom
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Experience our collections in person. Book an appointment for personalized styling consultations.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground font-medium">Lagos Showroom</p>
                    <p className="text-muted-foreground">Victoria Island, Lagos State, Nigeria</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 hover-scale">
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/5 to-primary/5 border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Ready to elevate your style?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our community of distinguished gentlemen who value premium craftsmanship and timeless elegance.
                  </p>
                  <div className="flex space-x-3 justify-center">
                    <Button size="sm" asChild className="hover-scale">
                      <a href="https://wa.me/2349057178590" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="hover-scale">
                      <a href="https://instagram.com/brand_fortyfive" target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4 mr-2" />
                        Follow
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
