import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Clock, TrendingUp, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  const isExpanded = expandedPlanId === plan._id;

  return (
    <div className="w-full">
      <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
        <div className="p-6 flex flex-col flex-grow">
          <h4 className="text-lg font-heading font-bold text-foreground mb-2">{plan.itemName}</h4>
          <p className="text-3xl font-heading font-bold text-primary mb-4">£{plan.itemPrice?.toFixed(2)}</p>
          {plan.planGroup === 'Unlimited Membership' ? (
            <p className="text-sm text-foreground/60 font-paragraph mb-4">All Classes</p>
          ) : plan.numberOfClasses ? (
            <p className="text-sm text-foreground/60 font-paragraph mb-4">{plan.numberOfClasses} classes</p>
          ) : plan.itemName?.includes('Drop-In') ? (
            <p className="text-sm text-foreground/60 font-paragraph mb-4">Per session</p>
          ) : null}
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
              onClick={() => setExpandedPlanId(isExpanded ? null : plan._id)}
              className="w-full px-6 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
            >
              <span className="font-heading font-semibold text-foreground">Pack Details</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5 text-primary" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-secondary/20 border-t border-border">
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-sm text-foreground/80 font-paragraph leading-relaxed"
                    >
                      {plan.specialNotes}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Card>
    </div>
  );
};

export default function ClassesPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Classes | Maison Mère Studio';
  }, []);

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

  // Extract intro offer (planGroup === 'Intro')
  const introOffer = pricingPlans.find(p => p.planGroup === 'Intro');
  
  // Get unique plan groups (excluding Intro) and sort alphabetically
  const uniqueGroups = Array.from(new Set(
    pricingPlans
      .filter(p => p.planGroup && p.planGroup !== 'Intro')
      .map(p => p.planGroup)
  )).sort();

  // Create dynamic grouped plans
  const groupedPlans = uniqueGroups.reduce((acc, group) => {
    acc[group] = pricingPlans.filter(p => p.planGroup === group);
    return acc;
  }, {} as Record<string, PricingPlan[]>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-6 bg-accent text-accent-foreground">
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
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro Offer Banner */}
      {introOffer && (
        <section className="py-20 relative overflow-hidden bg-gradient-to-r from-primary via-primary to-accent">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-foreground rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-block px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full border border-primary-foreground/30">
                    <span className="text-sm font-heading font-semibold text-primary-foreground">✨ Special Offer</span>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-primary-foreground leading-tight">
                    {introOffer.itemName}
                  </h2>
                  
                  {/* Price highlight */}
                  {introOffer.itemPrice && (
                    <div className="mb-6 inline-block">
                      <p className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground">
                        £{introOffer.itemPrice.toFixed(2)}
                      </p>
                      <p className="text-primary-foreground/80 text-sm mt-2 font-paragraph">Limited time offer</p>
                    </div>
                  )}
                  
                  <p className="text-lg md:text-xl mb-6 text-primary-foreground/95 font-paragraph leading-relaxed max-w-2xl mx-auto">
                    {introOffer.itemDescription}
                  </p>
                  
                  {introOffer.specialNotes && (
                    <div className="mb-8 p-4 bg-primary-foreground/10 backdrop-blur-sm rounded-lg border border-primary-foreground/20">
                      <p className="text-base text-primary-foreground/90 font-paragraph">
                        {introOffer.specialNotes}
                      </p>
                    </div>
                  )}
                  
                  {introOffer.buyNowUrl && (
                    <Button
                      asChild
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 transition-all duration-300 font-heading hover:scale-110 active:scale-95 no-underline shadow-lg hover:shadow-xl px-8 py-6 text-lg"
                    >
                      <a href={introOffer.buyNowUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                        Get Started Today
                      </a>
                    </Button>
                  )}
                </div>
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

          {/* Dynamic Plan Groups */}
          {uniqueGroups.map((group, groupIndex) => (
            <AnimatedSection key={group} delay={100 + groupIndex * 50}>
              <div className="mb-16">
                <h3 className="text-3xl font-heading font-bold text-foreground mb-8">{group}</h3>
                <div className={`grid ${groupedPlans[group].length === 2 ? 'md:grid-cols-2 max-w-6xl' : groupedPlans[group].length === 3 ? 'md:grid-cols-3 max-w-7xl' : 'md:grid-cols-2 max-w-6xl'} gap-6`}>
                  {groupedPlans[group].map((plan) => (
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
          ))}
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
