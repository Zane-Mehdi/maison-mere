import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { PricingPlansMEMBERSHIPSANDPLANS } from '@/entities';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function MembershipAndPricingPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlansMEMBERSHIPSANDPLANS[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    document.title = 'Membership & Pricing | Maison Mère Studio';
  }, []);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const result = await BaseCrudService.getAll<PricingPlansMEMBERSHIPSANDPLANS>('pricingplans');
        setPricingPlans(result.items || []);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  // Group plans by planGroup
  const groupedPlans = pricingPlans.reduce((acc, plan) => {
    const group = plan.planGroup || 'Other';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(plan);
    return acc;
  }, {} as Record<string, PricingPlansMEMBERSHIPSANDPLANS[]>);

  const planGroups = Object.entries(groupedPlans);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background font-paragraph text-foreground overflow-x-hidden pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <FadeIn>
              <p className="text-primary text-sm uppercase tracking-widest mb-6 font-semibold">Membership & Pricing</p>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-8 leading-tight">
                Choose Your Perfect Plan
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Flexible membership options designed to fit your lifestyle and fitness goals. Start your Pilates journey with us today.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : pricingPlans.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No pricing plans available at the moment.
              </div>
            ) : (
              <div className="space-y-20">
                {planGroups.map(([groupName, plans], groupIndex) => (
                  <div key={groupName}>
                    <FadeIn delay={groupIndex * 0.1}>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                        {groupName}
                      </h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {plans.map((plan, index) => {
                        const isAdding = addingItemId === plan._id;
                        return (
                          <FadeIn key={plan._id} delay={index * 0.1}>
                            <Card className="border-2 border-border hover:border-primary transition-colors duration-300 rounded-lg overflow-hidden h-full flex flex-col">
                              {plan.itemImage && (
                                <div className="aspect-video overflow-hidden">
                                  <Image
                                    src={plan.itemImage}
                                    alt={plan.itemName || 'Plan'}
                                    className="w-full h-full object-cover"
                                    width={400}
                                  />
                                </div>
                              )}

                              <CardContent className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                                  {plan.itemName}
                                </h3>

                                <div className="mb-6">
                                  <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl font-heading font-bold text-primary">
                                      £{plan.itemPrice}
                                    </span>
                                  </div>
                                  {plan.numberOfClasses && (
                                    <p className="text-sm text-muted-foreground">
                                      {plan.numberOfClasses} classes
                                    </p>
                                  )}
                                </div>

                                {plan.itemDescription && (
                                  <p className="text-muted-foreground mb-6 flex-grow">
                                    {plan.itemDescription}
                                  </p>
                                )}

                                {plan.specialNotes && (
                                  <div className="mb-6 p-3 bg-secondary/20 rounded border border-secondary/50">
                                    <p className="text-sm text-foreground font-semibold">
                                      {plan.specialNotes}
                                    </p>
                                  </div>
                                )}

                                <div className="space-y-3 mb-8">
                                  <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground">Access to all class types</span>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground">Expert instruction</span>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground">Women-only environment</span>
                                  </div>
                                </div>

                                <Button
                                  onClick={() => actions.addToCart({ collectionId: 'pricingplans', itemId: plan._id })}
                                  disabled={isAdding}
                                  className="w-full bg-primary text-white hover:bg-foreground transition-all duration-300 rounded-none uppercase tracking-widest text-sm font-heading py-6 no-underline"
                                >
                                  {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
                                </Button>
                              </CardContent>
                            </Card>
                          </FadeIn>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join our supportive community of women and discover the transformative power of Pilates.
              </p>
              <Button
                asChild
                className="bg-white text-primary hover:bg-foreground hover:text-white transition-all duration-300 rounded-none px-10 py-6 uppercase tracking-widest text-sm font-bold font-heading hover:scale-105 active:scale-95 no-underline"
              >
                <a href="/book-a-class">Book Your First Class</a>
              </Button>
            </FadeIn>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
