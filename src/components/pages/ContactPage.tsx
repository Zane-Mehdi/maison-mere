import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
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
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className} mt-8`}
    >
      {children}
    </div>
  );
};

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Maison Mère Studio';

    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        (window as any).Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative py-16 md:py-40 bg-gradient-to-br from-accent/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(179,160,131,0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="container mx-auto px-4 relative z-15 pt-20 md:pt-0">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                Get In Touch
              </p>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-3">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 font-paragraph leading-relaxed">
                Have questions about our classes, memberships, or private hire? We&apos;d love to hear from you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Contact Info Cards */}
      <section className="pb-8 md:pb-12 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            <AnimatedSection>
              <a
                href="https://www.google.com/maps/place/Maison+M%C3%A8re+Studio/@51.5662353,-0.3214471,17z/data=!3m1!4b1!4m6!3m5!1s0x487613a616224053:0x85765e83dbf291a4!8m2!3d51.5662353!4d-0.3214471!16s%2Fg%2F11xyd0ld08?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6 cursor-pointer hover:bg-primary/5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    Location
                  </h3>
                  <p className="text-foreground/70 font-paragraph text-sm hover:text-primary transition-colors">207 Watford Rd, Harrow HA1 3UA</p>
                </Card>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <a
                href="tel:07304499808"
                className="block"
              >
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6 cursor-pointer hover:bg-primary/5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    Phone
                  </h3>
                  <p className="text-foreground/70 font-paragraph text-sm hover:text-primary transition-colors">07304 499808</p>
                </Card>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <a
                href="mailto:Contact@maisonmerestudio.com"
                className="block"
              >
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6 cursor-pointer hover:bg-primary/5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    Email
                  </h3>
                  <p className="text-foreground/70 font-paragraph text-sm hover:text-primary transition-colors">contact@maisonmerestudio.com</p>
                </Card>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  Hours
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">Mon-Fri: 7am-9pmSat: 3-5pm</p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
      {/* Contact Form & Info Section */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Tally Form */}
              <AnimatedSection>
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    Send Us A Message
                  </h2>
                  <p className="text-foreground/70 font-paragraph mb-8 leading-relaxed">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  <iframe
                    data-tally-src="https://tally.so/embed/VL8Oey?alignLeft=1&hideTitle=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="420"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Contact Form"
                    style={{ border: 'none' }}
                  />
                </div>
              </AnimatedSection>

              {/* Additional Info */}
              <AnimatedSection delay={100}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                      Visit Our Studio
                    </h2>
                    <p className="text-foreground/70 font-paragraph leading-relaxed mb-6">We're located in the heart of Harrow, providing a convenient and accessible location for women across the area.</p>
                  </div>

                  <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/10 p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Opening Hours
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Monday - Friday</span>
                        <span className="text-foreground font-paragraph font-semibold text-justify">7:00 AM - 9:00 AM6:00 PM - 9:00PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Saturday</span>
                        <span className="text-foreground font-paragraph font-semibold">3:00 PM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Sunday</span>
                        <span className="text-foreground font-paragraph font-semibold text-center">12:00 PM - 1:00 PM</span>
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
                      Private One-to-One Classes
                    </h3>
                    <p className="text-foreground/70 font-paragraph leading-relaxed mb-4">
                      Looking for personalized instruction tailored to your goals and fitness level? Our private one-to-one classes offer dedicated attention and customized programming.
                    </p>
                    <ul className="space-y-2 text-foreground/70 font-paragraph text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Personalized fitness plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>One-on-one instruction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Flexible scheduling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Progress tracking and support</span>
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
      {/* Google Maps Section */}
      <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Find Us</h2>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=Maison+M%C3%A8re+Studio+Harrow&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
}
