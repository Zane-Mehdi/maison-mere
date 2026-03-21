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
            <p className="text-sm text-foreground/60 font-paragraph mb-4">£{plan.numberOfClasses}/class</p>
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Classes | Maison Mère Studio';
  }, []);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const result = await BaseCrudService.getAll<PricingPlan>('pricingplans');
        setPricingPlans(result.items || []);
        // Set the first category as active
        const groups = Array.from(new Set(
          (result.items || [])
            .filter(p => p.planGroup && p.planGroup !== 'Intro')
            .map(p => p.planGroup)
        )).sort();
        if (groups.length > 0) {
          setActiveCategory(groups[0]);
        }
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

  // Get unique plan groups (excluding Intro) and sort with custom order
  const customOrder = ['Drop-In Sessions', 'Mummy & Me Pack', 'Standard Pack', 'Unlimited Membership'];
  const uniqueGroups = Array.from(new Set(
    pricingPlans
      .filter(p => p.planGroup && p.planGroup !== 'Intro')
      .map(p => p.planGroup)
  )).sort((a, b) => {
    const indexA = customOrder.indexOf(a);
    const indexB = customOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Create dynamic grouped plans
  const groupedPlans = uniqueGroups.reduce((acc, group) => {
    acc[group] = pricingPlans.filter(p => p.planGroup === group);
    return acc;
  }, {} as Record<string, PricingPlan[]>);

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  // Mapping for display names
  const displayNameMap: Record<string, string> = {
    'Drop-In Sessions': 'Drop-In Sessions',
    'Intro': 'Intro',
    'Mummy & Me Pack': 'Memberships',
    'Standard Pack': 'Standard Packs',
    'Unlimited Membership': 'Private 1-1'
  };

  const getDisplayName = (group: string): string => {
    return displayNameMap[group] || group;
  };

  const getDisclaimerMessage = (group: string): string => {
    const disclaimers: Record<string, string> = {
      'Memberships': 'Auto-renews monthly after the initial term. To cancel, please contact us.',
      'Private 1-1': '* Private 1-1 sessions must be scheduled within 7 days of booking'
    };
    return disclaimers[group] || '';
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      // Show sticky section when scrolled past hero
      setIsSticky(currentScrollY > 300);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Sticky Minimized CTA - Always visible when scrolling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isSticky && scrollDirection === 'down' ? 1 : 0,
          y: isSticky && scrollDirection === 'down' ? 0 : -20,
          pointerEvents: isSticky && scrollDirection === 'down' ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-20 left-0 right-0 z-40 bg-accent text-accent-foreground shadow-lg"
      >
        <div className="container mx-auto px-4 py-5 pt-[2rem] flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-heading font-bold truncate">
              View our full class schedule
            </p>
          </div>
          <Button
            asChild
            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 transition-all duration-200 whitespace-nowrap font-heading no-underline flex-shrink-0"
            size="sm"
          >
            <a href="/book-a-class" className="flex items-center gap-2 no-underline">
              Schedule
              <ArrowRight className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </motion.div>
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
        <section className="py-10 relative overflow-hidden bg-gradient-to-r from-primary via-primary to-accent">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-foreground rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-3">
                  <div className="inline-block px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full border border-primary-foreground/30">
                    <span className="text-sm font-heading font-semibold text-primary-foreground">✨ Special Offer</span>
                  </div>
                </div>

                {/* Main content */}
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 text-primary-foreground leading-tight">
                    {introOffer.itemName}
                  </h2>

                  {/* Price highlight */}
                  {introOffer.itemPrice && (
                    <div className="mb-3 inline-block">
                      <p className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground">
                        £55
                      </p>
                      <p className="text-primary-foreground/80 text-xs mt-1 font-paragraph">Limited time offer</p>
                    </div>
                  )}

                  <p className="text-base md:text-lg mb-4 text-primary-foreground/95 font-paragraph leading-relaxed max-w-2xl mx-auto">
                    {introOffer.itemDescription}
                  </p>

                  {introOffer.specialNotes && (
                    <div className="mb-4 p-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg border border-primary-foreground/20">
                      <p className="text-sm text-primary-foreground/90 font-paragraph">
                        Valid for 30 days from purchase date.
                      </p>
                    </div>
                  )}

                  {introOffer.buyNowUrl && (
                    <Button
                      asChild
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 transition-all duration-300 font-heading hover:scale-110 active:scale-95 no-underline shadow-lg hover:shadow-xl px-6 py-4 text-base"
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
          {/* Category Navigation Bar */}
          <AnimatedSection>
            <div className="mb-12 relative">
              <div
                ref={scrollContainerRef}
                className="grid grid-cols-2 md:flex md:justify-center md:flex-wrap gap-2"
              >
                {uniqueGroups.map((group) => (
                  <motion.button
                    key={group}
                    onClick={() => {
                      setActiveCategory(group);
                      const element = document.getElementById(`category-${group}`);
                      if (element) {
                        const headerHeight = 80;
                        const offset = 200;
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                          top: elementPosition - headerHeight - offset,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`px-4 py-2 rounded-full font-heading font-semibold text-sm transition-all duration-300 ${
                      activeCategory === group
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getDisplayName(group)}
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedSection>

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
              <div className="mb-16" id={`category-${group}`}>
                <h3 className="text-3xl font-heading font-bold text-foreground mb-8">{getDisplayName(group)}</h3>
                <div className={`grid ${groupedPlans[group].length === 2 ? 'md:grid-cols-2 lg:grid-cols-4 max-w-full' : groupedPlans[group].length === 3 ? 'md:grid-cols-3 lg:grid-cols-5 max-w-full' : 'md:grid-cols-2 lg:grid-cols-4 max-w-full'} gap-6`}>
                  {groupedPlans[group].map((plan) => (
                    <PlanCard key={plan._id} plan={plan} expandedPlanId={expandedPlanId} setExpandedPlanId={setExpandedPlanId} />
                  ))}
                </div>
                {group === 'Standard Pack' && (
                  <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border">
                    <p className="text-sm text-foreground font-paragraph">*Validity: 2 months (5 classes) • 3 months (10 & 20 classes)</p>
                  </div>
                )}
                {getDisclaimerMessage(group) && (
                  <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border">
                    <p className="text-sm text-foreground font-paragraph">{getDisclaimerMessage(group)}</p>
                  </div>
                )}
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
