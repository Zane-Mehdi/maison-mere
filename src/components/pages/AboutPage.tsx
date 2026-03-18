import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { InstructorsABOUTUS, PilatesClassTypesABOUTUS } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { Award, Heart, Shield, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ClassLevelsCarousel from '@/components/ClassLevelsCarousel';

// --- Utility Components ---

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

export const AnimatedSection: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className = '', delay = 0 }) => {
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

const SectionNavigator = () => {
  const sections = [
    { id: 'mission', label: 'Our Mission' },
    { id: 'values', label: 'Our Values' },
    { id: 'classes', label: 'Our Classes' },
    { id: 'private-classes', label: 'Private Classes' },
    { id: 'corporate', label: 'Corporate & Events' },
    { id: 'instructors', label: 'Our Instructors' }
  ];

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the sticky navigator height to account for offset (same as sticky nav)
      const stickyNav = document.querySelector('.sticky-scroll-navigator');
      const offset = stickyNav ? stickyNav.getBoundingClientRect().height : 60;
      
      // Calculate the target scroll position
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const targetScroll = elementTop - offset - 20; // 20px extra padding
      
      // Smooth scroll to the calculated position
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section-navigator bg-white border-b border-border shadow-sm sticky top-24 z-40"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:flex md:overflow-x-auto md:justify-center md:flex-wrap gap-2 py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className="px-4 py-2 text-sm font-paragraph font-semibold text-foreground/70 hover:text-primary hover:bg-secondary/20 rounded-full transition-all duration-200 whitespace-nowrap border border-transparent hover:border-primary/30"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const StickyScrollNavigator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'mission', label: 'Our Mission', abbrev: 'Mission' },
    { id: 'values', label: 'Our Values', abbrev: 'Values' },
    { id: 'classes', label: 'Our Classes', abbrev: 'Levels' },
    { id: 'private-classes', label: 'Private Classes', abbrev: '1-1' },
    { id: 'corporate', label: 'Corporate & Events', abbrev: 'Corp/Events' },
    { id: 'instructors', label: 'Our Instructors', abbrev: 'Instructors' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after scrolling past the initial navigator
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);

      // Determine active section
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the sticky navigator height to account for offset
      const stickyNav = document.querySelector('.sticky-scroll-navigator');
      const offset = stickyNav ? stickyNav.getBoundingClientRect().height : 60;
      
      // Calculate the target scroll position
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const targetScroll = elementTop - offset - 20; // 20px extra padding
      
      // Smooth scroll to the calculated position
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className={`sticky-scroll-navigator fixed top-24 left-0 right-0 z-50 bg-white border-b border-border shadow-sm ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="container mx-auto px-1">
        <div className="flex justify-center gap-0.5 md:gap-2 py-2 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`px-1.5 md:px-4 py-2 text-xs md:text-sm font-paragraph font-semibold whitespace-nowrap rounded-full transition-all duration-200 border border-transparent ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:text-primary hover:bg-secondary/20 hover:border-primary/30'
              }`}
            >
              {/* Desktop: full label, Mobile/Tablet: abbreviated */}
              <span className="hidden md:inline">{section.label}</span>
              <span className="md:hidden">{section.abbrev}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const [instructors, setInstructors] = useState<InstructorsABOUTUS[]>([]);
  const [classTypes, setClassTypes] = useState<PilatesClassTypesABOUTUS[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ctaMinimized, setCtaMinimized] = useState(false);
  const { scrollY } = useScroll();
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaOffsetY = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    document.title = 'About | Maison Mère Studio';
  }, []);

  useEffect(() => {
    // Handle hash navigation when page loads
    const hash = window.location.hash.slice(1); // Remove the '#' character
    if (hash) {
      // Wait for page to render, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instructorsResult, classTypesResult] = await Promise.all([
          BaseCrudService.getAll<InstructorsABOUTUS>('instructors'),
          BaseCrudService.getAll<PilatesClassTypesABOUTUS>('classtypes')
        ]);
        setInstructors(instructorsResult.items);
        setClassTypes(classTypesResult.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle scroll to minimize CTA section
  useEffect(() => {
    const handleScroll = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        // Minimize when CTA section scrolls past the header
        setCtaMinimized(rect.top < 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-0 py-[98px] px-0 pt-[98px] pr-0 pb-0.5 pl-0">
        <SectionNavigator />
      </div>
      <StickyScrollNavigator />
      {/* Mission Section - Now First */}
      <section id="mission" className="py-20 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection delay={100}>
                <div>
                  <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                    Our Mission
                  </p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">Movement Designed for Women</h2>
                  <p className="text-lg text-foreground/80 font-paragraph mb-6 leading-relaxed">At Maison Mere Studios, we believe movement is about more than just exercise. It's about building strength, confidence and connection in a space where women feel supported and comfortable.Our studio brings together Reformer Pilates, mat Pilates and yoga in a welcoming women-only environment. We're also proud to be baby-friendly, with dedicated pre</p>
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

              <AnimatedSection>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">

                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section id="values" className="py-20 bg-background">
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
      {/* CLASSES SECTION - Moved from HomePage */}
      <section id="classes" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Our Classes</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                We Offer A Range Of Classes
              </h2>
              <p className="text-muted-foreground text-lg">To Suit All Levels of Fitness & Experience</p>
            </FadeIn>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Desktop Grid View */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {classTypes.length > 0 ? classTypes.map((classType, index) => (
                  <StaggerItem key={classType._id} className="group">
                    <Link to="/book-a-class" className="block h-full">
                      <Card className="h-full border-none shadow-none bg-transparent hover:bg-secondary/10 transition-colors duration-300 rounded-none overflow-hidden">
                        <div className="aspect-[3/4] overflow-hidden relative mb-0">
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider z-10">
                            {classType.difficultyLevel || 'All Levels'}
                          </div>
                          <Image
                            src={classType.image || "https://static.wixstatic.com/media/980ffc_53ba6cf33fa74be29706e2179f45c6de~mv2.png?originWidth=768&originHeight=1024"}
                            alt={classType.name || "Class Image"}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <CardContent className="p-4 pt-0 text-center">
                          <div className="text-4xl font-heading font-bold text-primary/20 mb-2">
                            0{index + 1}
                          </div>
                          <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {classType.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                            {classType.description}
                          </p>
                          <span className="inline-block text-primary text-sm uppercase tracking-widest pb-1 group-hover:text-foreground transition-all">
                            Book Class
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                )) : (
                  <div className="col-span-3 text-center py-12 text-muted-foreground">
                    No classes currently available.
                  </div>
                )}
              </div>

              {/* Mobile Horizontal Carousel */}
              <ClassLevelsCarousel classTypes={classTypes} />
            </>
          )}
        </div>
      </section>
      {/* 1-1 Private Classes Section */}
      <section id="private-classes" className="py-24 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection>
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Personalized Training</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">1-1 Private Classes</h2>
              <p className="text-muted-foreground text-lg">Tailored sessions designed specifically for your goals and fitness level</p>
            </AnimatedSection>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-secondary/20">
                  <Image
                    src="https://static.wixstatic.com/media/3133d9_6b505d3904304c04aad4b39a3a0a69af~mv2.png?originWidth=384&originHeight=448"
                    alt="1-1 Private Classes"
                    className="w-full h-full object-cover"
                    width={400}
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div>
                  <h3 className="text-3xl font-heading font-bold text-foreground mb-6">Get Expert Attention</h3>
                  <p className="text-lg text-foreground/80 font-paragraph mb-6 leading-relaxed">
                    Our 1-1 private classes offer personalized instruction in a dedicated environment. Work one-on-one with our certified instructors to achieve your specific fitness goals, whether you're recovering from an injury, preparing for an event, or seeking advanced training.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Customized workout plans tailored to your needs',
                      'Flexible scheduling to fit your lifestyle',
                      'Expert form correction and technique guidance',
                      'Progressive training programs'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground/80 font-paragraph">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Link to="/contact">Enquire</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      {/* Private Classes & Hire Section */}
      <section id="corporate" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection>
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Corporate & Events</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Private Classes & Instructor Hire</h2>
              <p className="text-muted-foreground text-lg">Bring wellness to your team or event with our professional instructors</p>
            </AnimatedSection>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection delay={100}>
                <div>
                  <h3 className="text-3xl font-heading font-bold text-foreground mb-6">Corporate Wellness & Events</h3>
                  <p className="text-lg text-foreground/80 font-paragraph mb-6 leading-relaxed">
                    Looking to bring wellness to your workplace or special event? We offer private group classes and can hire our expert instructors for corporate wellness programs, team building events, or special occasions. Create a memorable experience that promotes health and connection.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'On-site or studio-based sessions available',
                      'Flexible group sizes and scheduling',
                      'Professional, certified instructors',
                      'Customizable programs for your needs'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-foreground/80 font-paragraph">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Link to="/contact">Enquire</Link>
                  </Button>
                </div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-secondary/20">
                  <Image
                    src="https://static.wixstatic.com/media/3133d9_68426ea9bd044d899a25a178b018cd2c~mv2.png?originWidth=384&originHeight=448"
                    alt="Private Classes & Instructor Hire"
                    className="w-full h-full object-cover"
                    width={400}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      {/* Instructors Section */}
      <section id="instructors" className="py-20 bg-background">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {instructors.map((instructor, index) => (
                  <AnimatedSection key={instructor._id} delay={index * 50}>
                    <Card className="border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={instructor.photo || 'https://static.wixstatic.com/media/980ffc_76032d75a8b044b2bc400d64f0786611~mv2.png?originWidth=256&originHeight=384'}
                          alt={instructor.name || 'Instructor'}
                          className="w-full h-full object-cover"
                          width={300}
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                          {instructor.name}
                        </h3>
                        {instructor.specialties && (
                          <p className="text-primary font-paragraph text-sm mb-2">
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
      {/* CTA Section - With Sticky Minimized State */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-b from-accent/10 to-background relative">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div 
              className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-12 md:p-16 border border-primary/20 text-center"
              animate={{
                opacity: ctaMinimized ? 0 : 1,
                pointerEvents: ctaMinimized ? 'none' : 'auto'
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-foreground/80 font-paragraph mb-8 leading-relaxed">Join our welcoming community.Your first step towards a stronger, more confident you starts here.</p>
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
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Sticky Minimized CTA */}
        <motion.div
          className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${ctaMinimized ? 'bg-white border-b border-border shadow-md' : 'pointer-events-none'}`}
          animate={{
            opacity: ctaMinimized ? 1 : 0,
            pointerEvents: ctaMinimized ? 'auto' : 'none'
          }}
          transition={{ duration: 0.3 }}
          style={{ paddingTop: 'var(--header-height, 80px)' }}
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-heading font-bold text-foreground">Ready to Start Your Journey?</h3>
              <p className="text-sm text-muted-foreground">Join our welcoming community today</p>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                <Link to="/classes">Book Class</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
