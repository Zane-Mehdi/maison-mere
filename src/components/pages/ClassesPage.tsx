import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { Classes } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Users, TrendingUp, ChevronDown } from 'lucide-react';

interface PricingPlan {
  _id: string;
  itemName?: string;
  itemPrice?: number;
  itemDescription?: string;
  numberOfClasses?: number;
  specialNotes?: string;
  buyNowUrl?: string;
  planGroup?: string;
}

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

const PlanCard: React.FC<{plan: PricingPlan; expandedPlanId: string | null; setExpandedPlanId: (id: string | null) => void}> = ({ plan, expandedPlanId, setExpandedPlanId }) => {
  return (
    <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-lg font-heading font-bold text-foreground mb-2">{plan.itemName}</h4>
        <p className="text-3xl font-heading font-bold text-primary mb-4">£{plan.itemPrice?.toFixed(2)}</p>
        {plan.numberOfClasses && (
          <p className="text-sm text-foreground/60 font-paragraph mb-4">{plan.numberOfClasses} classes</p>
        )}
        {!plan.numberOfClasses && plan.itemName?.includes('Drop-In') && (
          <p className="text-sm text-foreground/60 font-paragraph mb-4">Per session</p>
        )}
        {plan.buyNowUrl && (
          <Button 
            asChild
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading hover:scale-105 active:scale-95 no-underline mt-auto"
          >
            <a href={plan.buyNowUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
              Buy Now
            </a>
          </Button>
        )}
      </div>
      {plan.specialNotes && (
        <div className="border-t border-border">
          <button
            onClick={() => setExpandedPlanId(expandedPlanId === plan._id ? null : plan._id)}
            className="w-full px-6 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
          >
            <span className="font-heading font-semibold text-foreground">Pack Details</span>
            <ChevronDown 
              className={`w-5 h-5 text-primary transition-transform duration-300 ${expandedPlanId === plan._id ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedPlanId === plan._id && (
            <div className="px-6 py-4 bg-secondary/20 border-t border-border">
              <p className="text-sm text-foreground/80 font-paragraph leading-relaxed">{plan.specialNotes}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default function ClassesPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const result = await BaseCrudService.getAll<PricingPlan>('pricingplans');
        setPricingPlans(result.items || []);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  // Group pricing plans by planGroup field
  const groupedPlans = {
    dropIn: pricingPlans.filter(p => p.planGroup === 'Drop-In Sessions'),
    standardPack: pricingPlans.filter(p => p.planGroup === 'Standard Pack'),
    mummyPack: pricingPlans.filter(p => p.planGroup === 'Mummy & Me Pack'),
    unlimited: pricingPlans.filter(p => p.planGroup === 'Unlimited Membership'),
    introOffer: pricingPlans.find(p => p.itemName?.includes('Intro'))
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="py-6 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-lg md:text-xl font-heading font-bold">
                  Want to see our full schedule?
                </h2>
                <p className="text-accent-foreground/90 font-paragraph text-sm mt-1">
                  Visit our booking page to view all available class times and book your spot.
                </p>
              </div>
              <Button 
                asChild
                className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 transition-all duration-200 whitespace-nowrap font-heading no-underline"
              >
                <a href="/book-a-class" className="flex items-center gap-2 no-underline">
                  View Full Schedule
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <section className="relative py-24 bg-gradient-to-br from-accent/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(179,160,131,0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                Reformer Pilates Classes
              </p>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
                Find Your Perfect Class
              </h1>
              <p className="text-xl text-foreground/80 font-paragraph leading-relaxed">
                From beginners to advanced practitioners, we have a class designed for your fitness level and goals.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Intro Offer Banner */}
      {groupedPlans.introOffer && (
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  {groupedPlans.introOffer.itemName}
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  {groupedPlans.introOffer.itemDescription}
                </p>
                {groupedPlans.introOffer.specialNotes && (
                  <p className="text-base opacity-80">
                    {groupedPlans.introOffer.specialNotes}
                  </p>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
      {/* Membership & Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Membership & Pricing
              </h2>
              <p className="text-xl text-foreground/70 font-paragraph max-w-2xl mx-auto">
                Choose the perfect plan for your fitness journey
              </p>
            </div>
          </AnimatedSection>

          {/* Drop-In Sessions */}
          {groupedPlans.dropIn.length > 0 && (
            <AnimatedSection delay={100}>
              <div className="mb-16">
                <h3 className="text-3xl font-heading font-bold text-foreground mb-8">Drop-In Sessions</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                  {groupedPlans.dropIn.map((plan) => (
                    <PlanCard key={plan._id} plan={plan} expandedPlanId={expandedPlanId} setExpandedPlanId={setExpandedPlanId} />
                  ))}
                </div>
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-border">
                  <p className="text-sm text-foreground/70 font-paragraph">
                    * For Mummy & Me, pre-bookings are required (x1 child per session)<br/>
                    * All classes expire after 30 days of purchase
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Standard Pack */}
          {groupedPlans.standardPack.length > 0 && (
            <AnimatedSection delay={150}>
              <div className="mb-16">
                <h3 className="text-3xl font-heading font-bold text-foreground mb-8">Standard Pack</h3>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
                  {groupedPlans.standardPack.map((plan) => (
                    <PlanCard key={plan._id} plan={plan} expandedPlanId={expandedPlanId} setExpandedPlanId={setExpandedPlanId} />
                  ))}
                </div>
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-border">
                  <p className="text-sm text-foreground/70 font-paragraph">
                    * All classes expire after 30 days of purchase
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Mummy & Me Pack */}
          {groupedPlans.mummyPack.length > 0 && (
            <AnimatedSection delay={200}>
              <div className="mb-16">
                <h3 className="text-3xl font-heading font-bold text-foreground mb-8">Mummy & Me Pack</h3>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
                  {groupedPlans.mummyPack.map((plan) => (
                    <PlanCard key={plan._id} plan={plan} expandedPlanId={expandedPlanId} setExpandedPlanId={setExpandedPlanId} />
                  ))}
                </div>
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-border">
                  <p className="text-sm text-foreground/70 font-paragraph">
                    * For Mummy & Me, pre-bookings are required (x1 child per session)<br/>
                    * All classes expire after 30 days of purchase
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Unlimited Membership */}
          {groupedPlans.unlimited.length > 0 && (
            <AnimatedSection delay={250}>
              <div>
                <h3 className="text-3xl font-heading font-bold text-foreground mb-8">Unlimited Membership</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                  {groupedPlans.unlimited.map((plan) => (
                    <Card key={plan._id} className="border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-lg font-heading font-bold text-foreground mb-2">{plan.itemName}</h4>
                        <p className="text-3xl font-heading font-bold text-primary mb-4">£{plan.itemPrice?.toFixed(2)}</p>
                        <p className="text-sm text-foreground/60 font-paragraph mb-4">{plan.itemDescription}</p>
                        {plan.buyNowUrl && (
                          <Button 
                            asChild
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading hover:scale-105 active:scale-95 no-underline mt-auto"
                          >
                            <a href={plan.buyNowUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                              Buy Now
                            </a>
                          </Button>
                        )}
                      </div>
                      {plan.specialNotes && (
                        <div className="border-t border-border">
                          <button
                            onClick={() => setExpandedPlanId(expandedPlanId === plan._id ? null : plan._id)}
                            className="w-full px-6 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
                          >
                            <span className="font-heading font-semibold text-foreground">Pack Details</span>
                            <ChevronDown 
                              className={`w-5 h-5 text-primary transition-transform duration-300 ${expandedPlanId === plan._id ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {expandedPlanId === plan._id && (
                            <div className="px-6 py-4 bg-secondary/20 border-t border-border">
                              <p className="text-sm text-foreground/80 font-paragraph leading-relaxed">{plan.specialNotes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-border">
                  <p className="text-sm text-foreground/70 font-paragraph">
                    * For Mummy & Me, pre-bookings are required (x1 child per session)<br/>
                    * All classes expire after 30 days of purchase
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Why Choose Maison Mère Studio?
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Expert Instruction',
                description: 'Learn from certified instructors with years of experience in reformer Pilates.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Women-Only Space',
                description: 'A comfortable, supportive environment designed exclusively for women.'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Flexible Schedule',
                description: 'Multiple classes daily to fit your busy lifestyle and fitness goals.'
              }
            ].map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70 font-paragraph leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
