import ClassesCarousel from '@/components/ClassesCarousel';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSlideshow from '@/components/HeroSlideshow';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { AboutClassTypes, FrequentlyAskedQuestions, HeroSlides, HomepageStats, Instructors, PilatesClassTypes, PricingPlans } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Star
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection } from './AboutPage';

// Testimonials type
interface Testimonial {
  _id: string;
  quote?: string;
  authorName?: string;
  authorTitle?: string;
  rating?: number;
  authorPhoto?: string;
}

// --- Utility Components ---

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

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

// Counter animation component
const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <div ref={ref}>{count}</div>;
};

// Testimonial Carousel Component - Clean & Minimalistic
const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await BaseCrudService.getAll<Testimonial>('testimonials');
        setTestimonials(result.items || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || testimonials.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change testimonial every 6 seconds

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, testimonials.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background flex items-center justify-center">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="text-center"
          >
            {/* Stars */}
            <div className="mb-8 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Star className="w-5 h-5 text-primary fill-primary" />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-heading font-light italic leading-relaxed text-foreground mb-8">
              "{current.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col items-center gap-3">
              {current.authorPhoto && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="w-12 h-12 rounded-full overflow-hidden border border-primary/20"
                >
                  <Image
                    src={current.authorPhoto}
                    className="w-full h-full object-cover"
                    alt={current.authorName || 'Author'}
                    width={48}
                  />
                </motion.div>
              )}
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-foreground">
                  {current.authorName}
                </p>
                {current.authorTitle && (
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                    {current.authorTitle}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {testimonials.length > 1 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              className="p-2 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-primary/20 w-2 hover:bg-primary/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNext}
              className="p-2 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* Auto-play toggle */}
        {testimonials.length > 1 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {autoPlay ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [classTypes, setClassTypes] = useState<PilatesClassTypes[]>([]);
  const [instructors, setInstructors] = useState<Instructors[]>([]);
  const [stats, setStats] = useState<HomepageStats[]>([]);
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlides[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlans[]>([]);
  const [aboutClassTypes, setAboutClassTypes] = useState<AboutClassTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClassesLoading, setIsClassesLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);


  // Parallax scroll effect for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  useEffect(() => {
    document.title = 'Home | Maison Mère Studio';
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classTypesResult, instructorsResult, statsResult, faqsResult, heroSlidesResult, pricingPlansResult, aboutClassTypesResult] = await Promise.all([
          BaseCrudService.getAll<PilatesClassTypes>('classtypes', {}, { limit: 4 }),
          BaseCrudService.getAll<Instructors>('instructors', {}, { limit: 4 }),
          BaseCrudService.getAll<HomepageStats>('homepagestats', {}, { limit: 10 }),
          BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs', {}, { limit: 50 }),
          BaseCrudService.getAll<HeroSlides>('heroslides', {}, { limit: 10 }),
          BaseCrudService.getAll<PricingPlans>('pricingplans', {}, { limit: 50 }),
          BaseCrudService.getAll<AboutClassTypes>('aboutclasstypes', {}, { limit: 50 })
        ]);

        setClassTypes(classTypesResult.items);
        setInstructors(instructorsResult.items);

        // Filter active stats and sort by displayOrder
        const activeStats = statsResult.items.filter(s => s.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setStats(activeStats);

        // Sort FAQs by displayOrder
        const sortedFaqs = faqsResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setFaqs(sortedFaqs);

        // Sort hero slides by creation date
        const sortedSlides = heroSlidesResult.items.sort((a, b) => {
          const aDate = new Date(a._createdDate || 0).getTime();
          const bDate = new Date(b._createdDate || 0).getTime();
          return aDate - bDate;
        });
        setHeroSlides(sortedSlides);

        setPricingPlans(pricingPlansResult.items);
        setAboutClassTypes(aboutClassTypesResult.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
        setIsClassesLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Transform hero slides for HeroSlideshow component
  const transformedHeroSlides = heroSlides.map((slide) => ({
    id: slide._id,
    type: 'image' as const,
    src: slide.slideImage || '',
    title: slide.heading || '',
    subtitle: slide.subheading || '',
    link: slide.link || '',
    cta: {
      text: slide.ctaText || 'Learn More',
      action: () => {
        if (slide.ctaLink) {
          if (slide.ctaLink.startsWith('/')) {
            navigate(slide.ctaLink);
          } else {
            window.location.href = slide.ctaLink;
          }
        }
      }
    }
  }));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background font-paragraph text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary-foreground pt-32">
        {/* Sticky Minimized CTA - Always visible when scrolling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isSticky && scrollDirection === 'down' ? 1 : 0,
            y: isSticky && scrollDirection === 'down' ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-0 right-0 z-40 bg-accent text-accent-foreground shadow-lg pointer-events-none"
          style={{
            pointerEvents: isSticky && scrollDirection === 'down' ? 'auto' : 'none',
          }}
        >
          <div className="container mx-auto px-4 py-5 pt-[2rem] flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-heading font-bold truncate">
                Discover our Pilates classes
              </p>
            </div>
            <Button
              asChild
              className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 transition-all duration-200 whitespace-nowrap font-heading no-underline flex-shrink-0"
              size="sm"
            >
              <a href="/classes" className="flex items-center gap-2 no-underline">
                Explore
                <ArrowRight className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </motion.div>
        {/* ... keep existing code (HERO SLIDESHOW SECTION through CTA SECTION) ... */}
        <HeroSlideshow
          slides={transformedHeroSlides.length > 0 ? transformedHeroSlides : [
            {
              id: '1',
              type: 'image' as const,
              src: 'https://static.wixstatic.com/media/980ffc_c08a8735d35a4fa6a2baeb0678a12c3e~mv2.png?originWidth=1152&originHeight=768',
              title: '',
              subtitle: 'Welcome to Maison Mère Studio',
              cta: {
                text: 'Book Now',
                action: () => navigate('/classes')
              }
            }
          ]}
          autoPlay={true}
          autoPlayInterval={5000}
        />
        {/* WELCOME SECTION - MOVED UP */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <FadeIn>
              <p className="text-primary text-sm uppercase tracking-widest mb-6 font-semibold">Welcome to Maison Mère Studio...</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
                Discover your strength through <span className="italic text-primary">mindful movement</span>, <span className="italic text-primary">expert guidance</span>, and <span className="italic text-primary">sisterhood</span>.
              </h2>
              <div className="w-20 h-[1px] bg-primary mx-auto mb-8" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">A boutique Pilates space in Harrow, designed to build strength, confidence and connection in a supportive women's-only environment.</p>
              <Button
                onClick={() => navigate('/classes')}
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest text-sm bg-transparent font-heading hover:scale-105 active:scale-95 no-underline"
              >
                Join Now
              </Button>
            </FadeIn>
          </div>
        </section>
        {/* STATS SECTION - MOVED UP EARLY */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
              {stats.length > 0 ? stats.map((stat, idx) => (
                <StaggerItem key={stat._id} className="p-4">
                  <div className="text-5xl md:text-6xl font-heading font-bold text-primary mb-3">
                    <Counter target={stat.statValue || 0} />
                  </div>
                  <p className="text-xs md:text-sm uppercase tracking-widest text-background/70">
                    {stat.statLabel}
                  </p>
                </StaggerItem>
              )) : (
                <>
                  {[
                    { number: 42, label: "Classes A Week" },
                    { number: 8, label: "Expert Instructors" },
                    { number: 6, label: "Classes A Day" },
                    { number: 11, label: "Luxury Beds" }
                  ].map((stat, idx) => (
                    <StaggerItem key={idx} className="p-4">
                      <div className="text-5xl md:text-6xl font-heading font-bold text-primary mb-3">
                        <Counter target={stat.number} />
                      </div>
                      <p className="text-xs md:text-sm uppercase tracking-widest text-background/70">
                        {stat.label}
                      </p>
                    </StaggerItem>
                  ))}
                </>
              )}
            </StaggerContainer>
          </div>
        </section>
        {/* WOMEN-ONLY & HIJAB FRIENDLY SECTION */}
        <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeIn>
                  <div>
                    <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                      A Safe Place To Grow
                    </p>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                      Women-Only Studio & Hijab Friendly
                    </h2>
                    <p className="text-lg text-foreground/80 font-paragraph mb-6 leading-relaxed">Step into a calm, welcoming space designed exclusively for women. Our studio combines comfort, privacy and a supportive atmosphere where you can focus fully on your movement and well-being.</p>
                    <p className="text-foreground/70 font-paragraph mb-6 text-lg">We've created an environment where all women feel respected and at ease including those who prefer a more private setting. We are also a child-friendly studio, allowing mothers to attend classes with peace of mind.</p>
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
                        <p className="text-foreground/80 font-paragraph">Hijab-friendly and inclusive space</p>
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
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://static.wixstatic.com/media/980ffc_4f6a8e211a4b4abc8d918d0aac1066d4~mv2.png?originWidth=448&originHeight=576"
                      alt="Women practicing Pilates"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      width={500}
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
        {/* CLASSES SECTION */}
        {/* INTRO OFFER SECTION - MOVED DOWN */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <AnimatedSection>
                <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Our Classes</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  We Offer A Range Of Classes
                </h2>
                <p className="text-muted-foreground text-lg">To Suit All Levels of Fitness & Experience</p>
              </AnimatedSection>
            </div>

            {isClassesLoading ? null : (
              <>
                {/* Desktop Grid View */}
                <div className="hidden md:grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {aboutClassTypes.length > 0 ? aboutClassTypes.map((classType, index) => (
                    <AnimatedSection key={classType._id} delay={index * 50}>
                      <a href="/book-a-class" className="block h-full group">
                        <Card className="h-full border-none shadow-none bg-transparent hover:bg-secondary/10 transition-colors duration-300 rounded-none overflow-hidden">
                          <div className="aspect-[3/4] overflow-hidden relative mb-0">
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider z-10">
                              {classType.difficultyLevel || 'All Levels'}
                            </div>
                            <Image
                              src={classType.classTypeImage || "https://static.wixstatic.com/media/980ffc_53ba6cf33fa74be29706e2179f45c6de~mv2.png?originWidth=768&originHeight=1024"}
                              alt={classType.classTypeName || "Class Image"}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <CardContent className="p-4 pt-0 text-center">
                            <div className="text-4xl font-heading font-bold text-primary/20 mb-2">0{index + 1}</div>
                            <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {classType.classTypeName}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                              {classType.description}
                            </p>
                            <span className="inline-block text-primary text-sm uppercase tracking-widest pb-1 group-hover:text-foreground transition-all">
                              Book Class
                            </span>
                          </CardContent>
                        </Card>
                      </a>
                    </AnimatedSection>
                  )) : (
                    <div className="col-span-4 text-center py-12 text-muted-foreground">
                      No classes currently available.
                    </div>
                  )}
                </div>

                {/* Mobile Horizontal Carousel */}
                <ClassesCarousel classTypes={aboutClassTypes} />
              </>
            )}
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL - CLEAN & MINIMALISTIC */}
        <TestimonialCarousel />
        {/* OUR CLASSES SECTION - FROM ABOUT PAGE */}
        {/* WELLNESS BAR SECTION - REPOSITIONED */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                  <StaggerItem>
                    <Card className="border-none shadow-none bg-background h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src="https://static.wixstatic.com/media/3133d9_66ff80aab54244578853afa086cf075f~mv2.jpg"
                          className="w-full h-full object-cover opacity-[1]"
                          originWidth={1365}
                          originHeight={2048}
                          focalPointX={72.23443223443223}
                          focalPointY={65} />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-heading font-bold mb-2">1-1 Private Sessions</h3>
                        <p className="text-sm text-muted-foreground mb-6 flex-grow">Tailored sessions designed around your individual goals. Ideal for beginners, injury support or those looking for a more personalised approach.</p>
                        <Button
                          asChild
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-6 py-4 uppercase tracking-widest text-xs bg-transparent font-heading hover:scale-105 active:scale-95 no-underline w-full"
                        >
                          <a href="/about#private-classes" className="no-underline">Learn More</a>
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                  <StaggerItem>
                    <Card className="border-none shadow-none bg-background h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src="https://static.wixstatic.com/media/3133d9_ed403d35d6ba430a9e44904c548d4ab8~mv2.jpg"
                          className="w-full h-full object-cover"
                          originWidth={1365}
                          originHeight={2048}
                          focalPointX={68.05860805860806}
                          focalPointY={42.7978515625} />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-heading font-bold mb-2">Private Hire & Events</h3>
                        <p className="text-sm text-muted-foreground mb-6 flex-grow">A calm, beautifully designed space available for private bookings, small sessions and wellness-focused events.</p>
                        <Button
                          asChild
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-6 py-4 uppercase tracking-widest text-xs bg-transparent font-heading hover:scale-105 active:scale-95 no-underline w-full"
                        >
                          <a href="/about#corporate" className="no-underline">Learn More</a>
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </StaggerContainer>
              </div>

              <div className="lg:col-span-4">
                <FadeIn>
                  <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Maison Mère Studio</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">Private Sessions & Studio Hire</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">* Contact us to plan your personalised private sessions</p>
                 <Button
                   onClick={() => navigate('/contact')}
                   variant="outline"
                   className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest text-sm bg-transparent font-heading hover:scale-105 active:scale-95 no-underline"
                 >eNQUIRE</Button>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ SECTION */}
        <section id="faq" className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <FadeIn>
                <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Common Questions</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">FAQ'S</h2>
              </FadeIn>
            </div>

            <div className="space-y-4">
              {faqs.length > 0 ? faqs.map((faq, index) => (
                <FadeIn key={faq._id} delay={index * 0.1}>
                  <div className="bg-secondary/10 border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/20 transition-colors"
                    >
                      <span className="font-heading font-bold text-lg text-foreground pr-8">{faq.question}</span>
                      <span className="text-primary flex-shrink-0">
                        {openFaqIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              )) : (
                <div className="text-center py-12 text-muted-foreground">
                  No FAQs available.
                </div>
              )}
            </div>
          </div>
        </section>
        {/* CTA SECTION */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
            src="https://static.wixstatic.com/media/3133d9_f863f18b3720451a9b425571c2fbee26~mv2.jpg"
            originWidth={2048}
            originHeight={1365}></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <FadeIn>
              <p className="text-white/80 text-sm uppercase tracking-widest mb-6 font-semibold">
                Ready To Try Pilates For The First Time?
              </p>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">
                From Beginners To Advanced
              </h2>
              <p className="text-2xl md:text-3xl font-light mb-10 tracking-wide">
                JOIN MAISON MÈRE STUDIO TODAY
              </p>
              <Button
                onClick={() => navigate('/classes')}
                size="lg"
                className="bg-white text-primary hover:bg-foreground hover:text-white transition-all duration-300 rounded-none px-10 py-6 uppercase tracking-widest text-sm font-bold shadow-lg font-heading hover:scale-105 active:scale-95 no-underline"
              >Our Packages</Button>
            </FadeIn>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
