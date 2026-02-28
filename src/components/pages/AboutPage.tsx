import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Instructors } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Users, Award, Shield } from 'lucide-react';

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

export default function AboutPage() {
  const [instructors, setInstructors] = useState<Instructors[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const result = await BaseCrudService.getAll<Instructors>('instructors');
        setInstructors(result.items);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
  }, []);

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
                About Us
              </p>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">Maison Mere Studoi</h1>
              <p className="text-xl text-foreground/80 font-paragraph leading-relaxed">Maison Mere Studios</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://static.wixstatic.com/media/980ffc_dbb2060d23a3454eb14f56e4364fbb2b~mv2.png?originWidth=448&originHeight=576"
                    alt="HNB Studio interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width={500}
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <div>
                  <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                    Our Mission
                  </p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                    Empowering Women Through Movement
                  </h2>
                  <p className="text-lg text-foreground/80 font-paragraph mb-6 leading-relaxed">
                    At HNB Studio, we believe that fitness is more than just physical transformation. It&apos;s about building confidence, fostering community, and creating a space where every woman feels supported and empowered.
                  </p>
                  <p className="text-base text-foreground/70 font-paragraph mb-8 leading-relaxed">
                    Our studio combines premium reformer equipment with expert instruction in a beautifully designed, women-only environment. We&apos;re committed to providing an inclusive space where women of all backgrounds, fitness levels, and abilities can thrive.
                  </p>
                  <Button 
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Link to="/classes">Join Our Community</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Our Values
              </h2>
              <p className="text-lg text-foreground/80 font-paragraph max-w-2xl mx-auto">
                Everything we do is guided by our commitment to creating an exceptional experience for every member.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Inclusivity',
                description: 'A welcoming space for all women, regardless of background, fitness level, or experience.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Community',
                description: 'Building connections and supporting each other on our wellness journeys.'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Excellence',
                description: 'Premium equipment, expert instruction, and attention to detail in everything we do.'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Safety',
                description: 'A comfortable, private environment where you can focus on your practice with confidence.'
              }
            ].map((value, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-8 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 font-paragraph leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* Women-Only & Hijab Friendly Section */}
      <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div>
                  <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                    A Safe Place To Grow
                  </p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                    Women-Only Studio & Hijab Friendly
                  </h2>
                  <p className="text-lg text-foreground/80 font-paragraph mb-6 leading-relaxed">
                    Step into a serene, elegant space designed exclusively for women. Our studio combines modern aesthetics with comfort, providing a chic and supportive atmosphere where you can focus on your well-being without feeling uncomfortable.
                  </p>
                  <p className="text-base text-foreground/70 font-paragraph mb-6 leading-relaxed">
                    We are proud to be a hijab-friendly Pilates studio, providing a private and comfortable space where women can move freely and focus on their wellness journey. Our studio ensures that all women, regardless of their attire, feel welcome and respected.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-foreground/80 font-paragraph">Private, women-only environment</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-foreground/80 font-paragraph">Hijab-friendly facilities</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-foreground/80 font-paragraph">Comfortable changing areas</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-foreground/80 font-paragraph">Respectful, supportive community</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://static.wixstatic.com/media/980ffc_4f6a8e211a4b4abc8d918d0aac1066d4~mv2.png?originWidth=448&originHeight=576"
                    alt="Women practicing Pilates"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width={500}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      {/* Instructors Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                Meet The Team
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Our Expert Instructors
              </h2>
              <p className="text-lg text-foreground/80 font-paragraph max-w-2xl mx-auto">
                Learn from certified professionals who are passionate about helping you achieve your fitness goals.
              </p>
            </div>
          </AnimatedSection>

          <div className="min-h-[400px]">
            {isLoading ? null : instructors.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {instructors.map((instructor, index) => (
                  <AnimatedSection key={instructor._id} delay={index * 50}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-border bg-card overflow-hidden">
                      <div className="aspect-[3/4] overflow-hidden">
                        <Image 
                          src={instructor.photo || 'https://static.wixstatic.com/media/980ffc_76032d75a8b044b2bc400d64f0786611~mv2.png?originWidth=256&originHeight=384'}
                          alt={instructor.name || 'Instructor'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={300}
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                          {instructor.name}
                        </h3>
                        {instructor.specialties && (
                          <p className="text-primary font-paragraph text-sm mb-3">
                            {instructor.specialties}
                          </p>
                        )}
                        {instructor.experienceYears && (
                          <p className="text-foreground/60 font-paragraph text-sm mb-3">
                            {instructor.experienceYears} years experience
                          </p>
                        )}
                        <p className="text-foreground/70 font-paragraph text-sm leading-relaxed">
                          {instructor.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60 font-paragraph">Meet our instructors in person at the studio.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-12 md:p-16 border border-primary/20 text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-foreground/80 font-paragraph mb-8 leading-relaxed">
                Join our welcoming community and experience the HNB difference. Your first step towards a stronger, more confident you starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <Link to="/classes">Book Your First Class</Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
}
