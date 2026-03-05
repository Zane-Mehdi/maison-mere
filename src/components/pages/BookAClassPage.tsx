import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function BookAClassPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Banner CTA */}
      <section className="bg-accent text-accent-foreground py-6">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold">
                  Want to explore our membership and pricing options?
                </h2>
                <p className="text-accent-foreground/90 font-paragraph text-sm mt-1">
                  Browse all available membership and pricing plans and find the perfect fit for you.
                </p>
              </div>
              <Button 
                asChild
                className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 transition-all duration-200 whitespace-nowrap font-heading hover:scale-105 active:scale-95 no-underline"
              >
                <Link to="/classes" className="flex items-center gap-2 no-underline">
                  View Classes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4">
                Book A Class
              </h1>
              <p className="text-xl text-foreground/70 font-paragraph mb-12">
                Our Schedule
              </p>
            </div>
          </AnimatedSection>

          {/* Mindbody Placeholder */}
          <AnimatedSection delay={100}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-dashed border-primary/30 rounded-lg p-16 text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <div className="w-8 h-8 bg-primary/20 rounded-full" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Mindbody Schedule System
                  </h3>
                  <p className="text-foreground/60 font-paragraph max-w-md mx-auto">
                    Our class scheduling system will be embedded here. You'll be able to view available time slots, book your preferred classes, and manage your reservations.
                  </p>
                  <div className="pt-6">
                    <p className="text-sm text-foreground/50 font-paragraph">
                      [Mindbody Embed Code Placeholder]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Info Section */}
          <AnimatedSection delay={200}>
            <div className="max-w-4xl mx-auto mt-20 grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                  How to Book
                </h3>
                <ul className="space-y-3 font-paragraph text-foreground/70">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span>Browse available class times in the schedule above</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span>Select your preferred class and time slot</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span>Complete your booking and receive confirmation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span>Arrive 10 minutes early to get settled</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                  Cancellation Policy
                </h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  We understand that plans change. Here's our cancellation policy:
                </p>
                <ul className="space-y-2 font-paragraph text-foreground/70 text-sm">
                  <li>• Cancel up to 24 hours before class for a full credit</li>
                  <li>• Cancellations within 24 hours may forfeit the class</li>
                  <li>• No-shows will be marked as used from your package</li>
                  <li>• Contact us for any special circumstances</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
