import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const AnimatedSection: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-accent/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(179,160,131,0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                Get In Touch
              </p>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-foreground/80 font-paragraph leading-relaxed">
                Have questions about our classes, memberships, or private hire? We&apos;d love to hear from you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <AnimatedSection>
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  Location
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">
                  Oldham, United Kingdom
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  Phone
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">
                  Contact us for details
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  Email
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">
                  info@hnbstudio.co.uk
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  Hours
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">
                  Mon-Fri: 6am-9pm
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <AnimatedSection>
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    Send Us A Message
                  </h2>
                  <p className="text-foreground/70 font-paragraph mb-8 leading-relaxed">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-paragraph text-sm">
                        Thank you for your message! We&apos;ll be in touch soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-paragraph mb-2 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="border-border focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground font-paragraph mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="border-border focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground font-paragraph mb-2 block">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-border focus:border-primary"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-foreground font-paragraph mb-2 block">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="border-border focus:border-primary"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground font-paragraph mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="border-border focus:border-primary min-h-[150px]"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              {/* Additional Info */}
              <AnimatedSection delay={100}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                      Visit Our Studio
                    </h2>
                    <p className="text-foreground/70 font-paragraph leading-relaxed mb-6">
                      We&apos;re located in the heart of Oldham, providing a convenient and accessible location for women across the area.
                    </p>
                  </div>

                  <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/10 p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Opening Hours
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Monday - Friday</span>
                        <span className="text-foreground font-paragraph font-semibold">6:00 AM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Saturday</span>
                        <span className="text-foreground font-paragraph font-semibold">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Sunday</span>
                        <span className="text-foreground font-paragraph font-semibold">9:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-border bg-card p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Private Hire & Events
                    </h3>
                    <p className="text-foreground/70 font-paragraph leading-relaxed mb-4">
                      Interested in booking our studio for a private event, corporate wellness session, or special occasion? Get in touch to discuss availability and pricing.
                    </p>
                    <ul className="space-y-2 text-foreground/70 font-paragraph text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Private group classes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Corporate wellness programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Special events and celebrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Team building sessions</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="border-border bg-card p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Membership Inquiries
                    </h3>
                    <p className="text-foreground/70 font-paragraph leading-relaxed">
                      Want to learn more about our membership options, class packages, or intro offers? Send us a message and we&apos;ll provide all the details you need to get started.
                    </p>
                  </Card>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl flex items-center justify-center border border-primary/20">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Find Us in Oldham
                  </h3>
                  <p className="text-foreground/70 font-paragraph">
                    Convenient location with easy access
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
