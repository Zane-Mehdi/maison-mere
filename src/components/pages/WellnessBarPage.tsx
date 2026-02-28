import { useState, useEffect, useRef } from 'react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Coffee, Leaf, Droplets } from 'lucide-react';

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

export default function WellnessBarPage() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const result = await BaseCrudService.getAll<any>('wellnessbarmenu');
        setMenuItems(result.items);
      } catch (error) {
        console.error('Error fetching wellness bar menu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category).filter(Boolean)))];
  
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

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
                Wellness Bar
              </p>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
                Nourish Your Body
              </h1>
              <p className="text-xl text-foreground/80 font-paragraph leading-relaxed">
                Enjoy a selection of matcha, cold-pressed juices, and wellness drinks to complement your fitness journey.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  Organic Ingredients
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">
                  All our drinks are made with premium organic ingredients
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Droplets className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  Cold-Pressed
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">
                  Fresh juices pressed daily to retain maximum nutrients
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Coffee className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  Premium Matcha
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">
                  Ceremonial grade matcha sourced from Japan
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {categories.length > 1 && (
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map(category => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={selectedCategory === category ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'}
                  >
                    {category === 'all' ? 'All Items' : category}
                  </Button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Menu Grid */}
      <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredItems.map((item, index) => {
                  const isAdding = addingItemId === item._id;
                  return (
                    <AnimatedSection key={item._id} delay={index * 50}>
                      <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-border bg-card overflow-hidden h-full flex flex-col">
                        <div className="aspect-square overflow-hidden relative">
                          <Image 
                            src={item.itemImage || 'https://static.wixstatic.com/media/980ffc_96df0d5c4b1544168d29c9e34ff422d8~mv2.png?originWidth=384&originHeight=384'}
                            alt={item.itemName || 'Wellness item'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                          {item.category && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-primary/90 text-primary-foreground border-0">
                                {item.category}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                            {item.itemName}
                          </h3>
                          <p className="text-foreground/70 font-paragraph text-sm mb-4 leading-relaxed flex-1">
                            {item.itemDescription}
                          </p>
                          
                          {item.dietaryInformation && (
                            <div className="mb-4">
                              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                                {item.dietaryInformation}
                              </Badge>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-2xl font-heading font-bold text-primary">
                              {formatPrice(item.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                            </span>
                            <Button 
                              disabled={isAdding}
                              onClick={() => actions.addToCart({ 
                                collectionId: 'wellnessbarmenu', 
                                itemId: item._id 
                              })}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                            >
                              {isAdding ? 'Adding...' : 'Add to Order'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 font-paragraph text-lg">
                  {selectedCategory === 'all' ? 'Menu items coming soon.' : `No ${selectedCategory} items available.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-12 border border-primary/20">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                    Visit Our Wellness Bar
                  </h2>
                  <p className="text-lg text-foreground/80 font-paragraph mb-8 leading-relaxed">
                    Located inside HNB Studio, our Wellness Bar is the perfect place to refuel after your class or enjoy a healthy treat any time during studio hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      asChild
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      <a href="#menu">View Full Menu</a>
                    </Button>
                    <Button 
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      <a href="/contact">Contact Us</a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
