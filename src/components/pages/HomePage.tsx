import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSlideshow from '@/components/HeroSlideshow';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Instructors, PilatesClassTypes, PricingPlans } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  Minus,
  Plus,
  Star
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Type definitions for CMS collections
interface HomepageStats {
  _id: string;
  statLabel?: string;
  statValue?: number;
  unitSuffix?: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface FAQ {
  _id: string;
  question?: string;
  answer?: string;
  category?: string;
  isFeatured?: boolean;
  displayOrder?: number;
  lastUpdated?: Date;
}

interface HeroSlide {
  _id: string;
  slideImage?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
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

// --- Main Page Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [classTypes, setClassTypes] = useState<PilatesClassTypes[]>([]);
  const [instructors, setInstructors] = useState<Instructors[]>([]);
  const [stats, setStats] = useState<HomepageStats[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlans[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Parallax scroll effect for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  useEffect(() => {
    document.title = 'Home | Maison Mère Studio';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classTypesResult, instructorsResult, statsResult, faqsResult, heroSlidesResult, pricingPlansResult] = await Promise.all([
          BaseCrudService.getAll<PilatesClassTypes>('classtypes', {}, { limit: 3 }),
          BaseCrudService.getAll<Instructors>('instructors', {}, { limit: 4 }),
          BaseCrudService.getAll<HomepageStats>('homepagestats', {}, { limit: 10 }),
          BaseCrudService.getAll<FAQ>('faqs', {}, { limit: 50 }),
          BaseCrudService.getAll<HeroSlide>('heroslides', {}, { limit: 10 }),
          BaseCrudService.getAll<PricingPlans>('pricingplans', {}, { limit: 50 })
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
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
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
      <div className="min-h-screen bg-background font-paragraph text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary-foreground pt-24">

      {/* HERO SLIDESHOW SECTION */}
      <HeroSlideshow
        slides={transformedHeroSlides.length > 0 ? transformedHeroSlides : [
          {
            id: '1',
            type: 'image' as const,
            src: 'https://static.wixstatic.com/media/980ffc_c08a8735d35a4fa6a2baeb0678a12c3e~mv2.png?originWidth=1152&originHeight=768',
            title: 'The Maison Mère Standard',
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
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">At Maison Mère Studio every class is more than movement. It is an opportunity to build strength, confidence and connection in a supportive women's - only environment designed for comfort and empowerment.</p>
            <Button
              onClick={() => navigate('/about')}
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

      {/* WOMEN ONLY SECTION - MOVED UP */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.2}>
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">A Safe Place To Grow</p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Step into a serene, elegant space designed exclusively for women. Our studio blends modern design with comfort, creating a welcoming environment where you can move freely and focus on yourself.</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Our studio is proudly hijabi-friendly and built to provide a private space where women can focus on their well-being. We offer group classes, private sessions and specialised training including pre and postnatal support.</p>
              <Button
                onClick={() => navigate('/about')}
                className="bg-primary text-white hover:bg-foreground transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest text-sm no-underline"
              >
                Learn More
              </Button>
            </FadeIn>

            <FadeIn className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src="https://static.wixstatic.com/media/3133d9_7eea06941ae04d518bd04eebd7024da3~mv2.jpg"
                  className="w-full h-full object-cover"
                  originWidth={1455}
                  originHeight={2048} />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-xl max-w-xs hidden md:block">
                <p className="font-heading font-bold text-xl mb-2">Your Space To Move</p>
                <p className="text-sm text-muted-foreground">Private, welcoming and designed for women.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CLASSES SECTION */}
      <section className="py-24 bg-background">
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
            <LoadingSpinner />
          ) : (
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
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
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* INTRO OFFER SECTION - MOVED DOWN */}
      <section className="py-24 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.2} className="relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src="https://static.wixstatic.com/media/980ffc_abd1282a728f4ec8808bf96efe76eea8~mv2.png?originWidth=768&originHeight=960"
                  alt="Pilates Intro Offer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-primary/30 hidden md:block" />
            </FadeIn>

            <FadeIn>
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Special Offer</p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Begin your Pilates journey with our exclusive introductory package. Perfect for newcomers and returning clients alike, this offer gives you the chance to experience our world-class instruction and premium Reformer equipment in a welcoming, supportive setting.</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Unlock your potential with our carefully curated starter classes designed to build strength, confidence and connection. Join our supportive community and discover why Maison Mère Studio is the perfect place to begin your wellness journey.</p>
              
              <div className="mb-8">
                <h3 className="font-heading font-bold text-foreground mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="text-muted-foreground">Access to all class types and levels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="text-muted-foreground">Expert guidance from our experienced instructors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="text-muted-foreground">Premium Reformer equipment in a serene environment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="text-muted-foreground">Welcoming women-only community support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8 inline-block">
                {pricingPlans.length > 0 && pricingPlans[0] ? (
                  <p className="text-xl font-heading font-bold text-foreground">
                    {pricingPlans[0].numberOfClasses} Classes for <span className="text-primary text-2xl">£{pricingPlans[0].itemPrice}</span>
                  </p>
                ) : (
                  <p className="text-xl font-heading font-bold text-foreground">
                    3 Classes for <span className="text-primary text-2xl">£50</span>
                  </p>
                )}
              </div>

              <Button
                onClick={() => navigate('/classes')}
                className="bg-primary text-white hover:bg-foreground transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest text-sm no-underline"
              >
                Claim Offer
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL - MOVED EARLIER */}
      <section className="py-24 bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FadeIn>
            <div className="mb-8 text-primary">
              <Star className="w-6 h-6 inline-block mx-1 fill-current" />
              <Star className="w-6 h-6 inline-block mx-1 fill-current" />
              <Star className="w-6 h-6 inline-block mx-1 fill-current" />
              <Star className="w-6 h-6 inline-block mx-1 fill-current" />
              <Star className="w-6 h-6 inline-block mx-1 fill-current" />
            </div>
            <blockquote className="text-2xl md:text-4xl font-heading font-light italic leading-tight text-foreground mb-8">
              "I've been to several Pilates studios, but I felt the warmest and most welcomed at Maison Mère Studio. I truly love and stand by their values, and I deeply appreciate their inclusivity as well as the variety of classes they offer."
            </blockquote>
            <cite className="not-italic text-sm font-bold uppercase tracking-widest text-muted-foreground">
              — Maryam N
            </cite>
          </FadeIn>
        </div>
      </section>

      {/* WELLNESS BAR SECTION - REPOSITIONED */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                <StaggerItem>
                  <Card className="border-none shadow-none bg-background h-full">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/3133d9_66ff80aab54244578853afa086cf075f~mv2.jpg"
                        className="w-full h-full object-cover opacity-[1]"
                        originWidth={1365}
                        originHeight={2048}
                        focalPointX={72.23443223443223}
                        focalPointY={65} />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2">1-1 Private Sessions</h3>
                      <p className="text-sm text-muted-foreground">Personalised sessions tailored to your specific goals and needs. Ideal for beginners, rehabilitation, or advanced practitioners.</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="border-none shadow-none bg-background h-full">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/3133d9_ed403d35d6ba430a9e44904c548d4ab8~mv2.jpg"
                        className="w-full h-full object-cover"
                        originWidth={1365}
                        originHeight={2048}
                        focalPointX={68.05860805860806}
                        focalPointY={42.7978515625} />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2">Private Hire & Events</h3>
                      <p className="text-sm text-muted-foreground">A beautiful and peaceful studio space available for private hire, ideal for workshops, wellness events and intimate gatherings.</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Maison Mère Studio</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                  Pilates Beyond the Studio
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  At Maison Mère, we believe pilates is a complete wellness experience. Complement your practice with our curated Wellness Bar featuring matcha, cold-pressed juices, and nourishing snacks. Or host your private pilates events in our serene, beautifully designed studio.
                </p>
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
      <section className="py-24 bg-background">
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
