import { useState, useEffect, useRef } from 'react';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { Classes } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Users, TrendingUp } from 'lucide-react';

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

export default function ClassesPage() {
  const [classes, setClasses] = useState<Classes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await BaseCrudService.getAll<Classes>('classes');
        setClasses(result.items);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const filteredClasses = selectedLevel === 'all' 
    ? classes 
    : classes.filter(c => c.difficultyLevel?.toLowerCase() === selectedLevel.toLowerCase());

  const getLevelBadgeColor = (level?: string) => {
    switch(level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

      {/* Full Schedule Banner */}
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
                className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 transition-all duration-200 whitespace-nowrap font-heading"
              >
                <a href="/book-a-class" className="flex items-center gap-2">
                  View Full Schedule
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro Offer Banner */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Special Intro Offer
              </h2>
              <p className="text-xl mb-6 opacity-90">
                3 Classes for £50 - Available to Everyone!
              </p>
              <p className="text-base opacity-80">
                Not just for first-timers. Experience the HNB difference with our exclusive package.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => setSelectedLevel('all')}
                variant={selectedLevel === 'all' ? 'default' : 'outline'}
                className={`${selectedLevel === 'all' ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'} font-heading transition-all duration-200 hover:scale-105 active:scale-95`}
              >
                All Classes
              </Button>
              <Button
                onClick={() => setSelectedLevel('beginner')}
                variant={selectedLevel === 'beginner' ? 'default' : 'outline'}
                className={`${selectedLevel === 'beginner' ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'} font-heading transition-all duration-200 hover:scale-105 active:scale-95`}
              >
                Beginner
              </Button>
              <Button
                onClick={() => setSelectedLevel('intermediate')}
                variant={selectedLevel === 'intermediate' ? 'default' : 'outline'}
                className={`${selectedLevel === 'intermediate' ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'} font-heading transition-all duration-200 hover:scale-105 active:scale-95`}
              >
                Intermediate
              </Button>
              <Button
                onClick={() => setSelectedLevel('advanced')}
                variant={selectedLevel === 'advanced' ? 'default' : 'outline'}
                className={`${selectedLevel === 'advanced' ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'} font-heading transition-all duration-200 hover:scale-105 active:scale-95`}
              >
                Advanced
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredClasses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredClasses.map((classItem, index) => {
                  const isAdding = addingItemId === classItem._id;
                  return (
                    <AnimatedSection key={classItem._id} delay={index * 50}>
                      <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-border bg-card overflow-hidden h-full flex flex-col">
                        <div className="aspect-[4/5] overflow-hidden relative">
                          <Image 
                            src={classItem.itemImage || 'https://static.wixstatic.com/media/980ffc_4fdc28c05cbc407ab07a224b0cd2f5ad~mv2.png?originWidth=384&originHeight=448'}
                            alt={classItem.itemName || 'Class'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                          {classItem.difficultyLevel && (
                            <div className="absolute top-4 right-4">
                              <Badge className={`${getLevelBadgeColor(classItem.difficultyLevel)} border`}>
                                {classItem.difficultyLevel}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                            {classItem.itemName}
                          </h3>
                          <p className="text-foreground/70 font-paragraph text-sm mb-4 leading-relaxed flex-1">
                            {classItem.itemDescription}
                          </p>
                          
                          <div className="space-y-3 mb-4">
                            {classItem.duration && (
                              <div className="flex items-center gap-2 text-foreground/60">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm font-paragraph">{classItem.duration} minutes</span>
                              </div>
                            )}
                            {classItem.instructorName && (
                              <div className="flex items-center gap-2 text-foreground/60">
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-sm font-paragraph">Instructor: {classItem.instructorName}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-2xl font-heading font-bold text-primary">
                              {formatPrice(classItem.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                            </span>
                            <Button 
                              disabled={isAdding}
                              onClick={() => actions.addToCart({ 
                                collectionId: 'classes', 
                                itemId: classItem._id 
                              })}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading hover:scale-105 active:scale-95"
                            >
                              {isAdding ? 'Adding...' : 'Buy Now'}
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
                  {selectedLevel === 'all' ? 'No classes available at the moment.' : `No ${selectedLevel} classes available.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Why Choose HNB Studio?
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
