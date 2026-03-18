import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { PricingPlansMEMBERSHIPSANDPLANS } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: { children: React.ReactNode, className?: string, staggerDelay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      visible: { transition: { staggerChildren: staggerDelay } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function MembershipAndPricingPage() {
  const navigate = useNavigate();
  const [pricingPlans, setPricingPlans] = useState<PricingPlansMEMBERSHIPSANDPLANS[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="min-h-screen bg-background font-paragraph text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary-foreground pt-24">
        
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <FadeIn>
              <p className="text-primary text-sm uppercase tracking-widest mb-6 font-semibold">Membership & Pricing</p>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-8 leading-tight">
                Find Your Perfect Plan
              </h1>
              <div className="w-20 h-[1px] bg-primary mx-auto mb-8" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Choose from our flexible membership options designed to fit your lifestyle and fitness goals. All plans include access to our women-only studio and expert instruction.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : pricingPlans.length > 0 ? (
              <div className="space-y-20">
                {planGroups.map(([groupName, plans], groupIndex) => (
                  <div key={groupName}>
                    <FadeIn delay={groupIndex * 0.1}>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                        {groupName}
                      </h2>
                    </FadeIn>

                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                      {plans.map((plan) => (
                        <StaggerItem key={plan._id}>
                          <Card className="border-2 border-border hover:border-primary transition-colors duration-300 h-full flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
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
                              
                              {plan.numberOfClasses && (
                                <p className="text-sm text-muted-foreground mb-4">
                                  {plan.numberOfClasses} Classes
                                </p>
                              )}

                              <div className="mb-6">
                                <p className="text-4xl font-heading font-bold text-primary">
                                  £{plan.itemPrice}
                                </p>
                              </div>

                              {plan.itemDescription && (
                                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                                  {plan.itemDescription}
                                </p>
                              )}

                              {plan.specialNotes && (
                                <div className="mb-6 p-4 bg-secondary/20 rounded-lg border border-secondary">
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
                                onClick={() => navigate('/book-a-class')}
                                className="bg-primary text-white hover:bg-foreground transition-all duration-300 rounded-none uppercase tracking-widest text-sm w-full py-6 font-heading no-underline"
                              >
                                Get Started
                              </Button>
                            </CardContent>
                          </Card>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No pricing plans available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn className="text-center mb-16">
                <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Why Choose Us</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  What's Included in Every Plan
                </h2>
              </FadeIn>

              <StaggerContainer className="grid md:grid-cols-2 gap-8">
                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        Premium Studio Access
                      </h3>
                      <p className="text-muted-foreground">
                        Full access to our beautifully designed, women-only studio with state-of-the-art Reformer equipment.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        Expert Instructors
                      </h3>
                      <p className="text-muted-foreground">
                        Learn from our experienced, certified Pilates instructors who are passionate about your wellness journey.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        Supportive Community
                      </h3>
                      <p className="text-muted-foreground">
                        Join a welcoming community of women dedicated to building strength, confidence, and connection.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        Flexible Scheduling
                      </h3>
                      <p className="text-muted-foreground">
                        Choose from multiple class times throughout the week to fit your busy lifestyle.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join Maison Mère Studio today and discover the transformative power of Pilates in a supportive, women-only environment.
              </p>
              <Button
                onClick={() => navigate('/book-a-class')}
                size="lg"
                className="bg-white text-primary hover:bg-foreground hover:text-white transition-all duration-300 rounded-none px-10 py-6 uppercase tracking-widest text-sm font-bold shadow-lg font-heading hover:scale-105 active:scale-95 no-underline"
              >
                Book Your First Class
              </Button>
            </FadeIn>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
