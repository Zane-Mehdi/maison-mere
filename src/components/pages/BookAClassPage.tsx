import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

function MindbodySchedule() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const widget = document.createElement('div');
    widget.className = 'mindbody-widget';
    widget.setAttribute('data-widget-type', 'Schedules');
    widget.setAttribute('data-widget-id', '8932765aa51');
    container.appendChild(widget);

    const oldScript = document.querySelector(
      'script[src="https://brandedweb.mindbodyonline.com/embed/widget.js"]'
    );
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="w-full" />;
}

export default function BookAClassPage() {
  useEffect(() => {
    document.title = 'Book a Class | Maison Mère Studio';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Banner CTA */}
      <section className="bg-accent text-accent-foreground py-6 pt-32">
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
                  View Packages
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

          {/* Mindbody Schedule Widget */}
          <AnimatedSection delay={100}>
                          <MindbodySchedule />
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
