import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronRight, 
  Star, 
  Instagram, 
  Check, 
  ArrowRight, 
  Play,
  Plus,
  Minus,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { Classes, Instructors } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlideshow from '@/components/HeroSlideshow';

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
  const [classes, setClasses] = useState<Classes[]>([]);
  const [instructors, setInstructors] = useState<Instructors[]>([]);
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
        const [classesResult, instructorsResult] = await Promise.all([
          BaseCrudService.getAll<Classes>('classes', {}, { limit: 3 }),
          BaseCrudService.getAll<Instructors>('instructors', {}, { limit: 4 })
        ]);
        
        setClasses(classesResult.items);
        setInstructors(instructorsResult.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const faqs = [
    {
      q: "What is Reformer Pilates?",
      a: "Reformer Pilates is a sophisticated, machine-based practice that utilizes precision springs, straps, and a sliding carriage to deliver a comprehensive full-body transformation. This refined discipline enhances strength, posture, flexibility, and balance through controlled, intentional movement."
    },
    {
      q: "I have never done Reformer Pilates before, where do I begin?",
      a: "Our Pilates Fundamentals class is thoughtfully designed for the discerning beginner. This elegant, step-by-step introduction to the Reformer is led by our expert instructors in an intimate setting. We recommend arriving 5–10 minutes early to meet your instructor and settle into our serene studio environment."
    },
    {
      q: "When should I arrive?",
      a: "We invite you to arrive 5–15 minutes early to acclimate to our luxurious studio space, prepare your equipment, and connect with your instructor. This allows for a seamless transition into your practice."
    },
    {
      q: "How do I book a class?",
      a: "Booking your Maison Mère experience is effortless through our sophisticated online reservation system. Simply browse our curated class schedule, select your preferred session, and secure your spot with ease."
    },
    {
      q: "What do I need to wear?",
      a: "We recommend elegant, breathable attire that allows for complete freedom of movement. Pilates is practiced in grip socks, which are essential in our studio to ensure safety and stability on the Reformer."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const heroSlides = [
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
    },
    {
      id: '2',
      type: 'image' as const,
      src: 'https://static.wixstatic.com/media/980ffc_8f47758c084f4318b303d3169f16af22~mv2.png?originWidth=1152&originHeight=768',
      title: 'Transform Your Body',
      subtitle: 'Expert Instruction & Premium Equipment',
      cta: {
        text: 'Explore Classes',
        action: () => navigate('/classes')
      }
    },
    {
      id: '3',
      type: 'image' as const,
      src: 'https://static.wixstatic.com/media/980ffc_ad92d84463b446f685b9126dcc4dd81d~mv2.png?originWidth=1152&originHeight=768',
      title: 'Women\'s Only Space',
      subtitle: 'Safe, Supportive & Empowering',
      cta: {
        text: 'Learn More',
        action: () => navigate('/about')
      }
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background font-paragraph text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary-foreground">
      
      {/* HERO SLIDESHOW SECTION */}
      <HeroSlideshow 
        slides={heroSlides}
        autoPlay={true}
        autoPlayInterval={5000}
      />

      {/* INTRO OFFER SECTION */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
                <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Intro Offer</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                  Strongest version of <span className="italic text-primary">yourself</span>.
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We are reintroducing you to our intro offer available for everyone not just your first time. Experience the difference with our specialized equipment and expert guidance.
                </p>
                
                <div className="bg-secondary/30 p-8 rounded-2xl border border-secondary mb-8">
                  <p className="text-2xl font-heading font-bold text-foreground text-center">
                    3 Classes for <span className="text-primary text-3xl">£50</span>
                  </p>
                </div>

                <Button 
                  onClick={() => navigate('/classes')}
                  className="bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest text-sm font-heading hover:scale-105 active:scale-95 no-underline"
                >
                  Claim Offer
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2 relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image 
                  src="https://static.wixstatic.com/media/980ffc_abd1282a728f4ec8808bf96efe76eea8~mv2.png?originWidth=768&originHeight=960" 
                  alt="Pilates Intro Offer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-primary/30 hidden md:block" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn>
            <p className="text-primary text-sm uppercase tracking-widest mb-6 font-semibold">Welcome to Maison Mère Studio...</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
              A space to <span className="italic text-primary">grow</span>, <span className="italic text-primary">strengthen</span>, and <span className="italic text-primary">connect</span> exclusively for women.
            </h2>
            <div className="w-20 h-[1px] bg-primary mx-auto mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              At Maison Mère Studio in Harrow, every class is more than just movement; it's a chance to grow physically and mentally in a supportive, women-only environment designed for your comfort and confidence.
            </p>
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
              {classes.length > 0 ? classes.map((cls, index) => (
                <StaggerItem key={cls._id} className="group">
                  <Link to="/classes" className="block h-full">
                    <Card className="h-full border-none shadow-none bg-transparent hover:bg-secondary/10 transition-colors duration-300 rounded-none overflow-hidden">
                      <div className="aspect-[3/4] overflow-hidden relative mb-6">
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider z-10">
                          {cls.difficultyLevel || 'All Levels'}
                        </div>
                        <Image 
                          src={cls.itemImage || "https://static.wixstatic.com/media/980ffc_53ba6cf33fa74be29706e2179f45c6de~mv2.png?originWidth=768&originHeight=1024"} 
                          alt={cls.itemName || "Class Image"}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-4xl font-heading font-bold text-primary/20 mb-2">
                          0{index + 1}
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {cls.itemName}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                          {cls.itemDescription}
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

      {/* STATS SECTION */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
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
          </StaggerContainer>
        </div>
      </section>

      {/* TESTIMONIAL */}
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
              "Can't recommend this studio enough!! The owner is very welcoming and sweet and goes to lengths to make you feel comfortable. As a pregnant woman, the instructor was very accomodating.and made sure I was feeling okay during the whole session. I can't wait to try the different classes that they offer."
            </blockquote>
            <cite className="not-italic text-sm font-bold uppercase tracking-widest text-muted-foreground">
              — Member
            </cite>
          </FadeIn>
        </div>
      </section>

      {/* WOMEN ONLY SECTION */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <Image 
                  src="https://static.wixstatic.com/media/980ffc_84bdf9424e494e0dbc4b0a4e9b5a9121~mv2.png?originWidth=768&originHeight=960" 
                  alt="Women Only Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl max-w-xs hidden md:block">
                <p className="font-heading font-bold text-xl mb-2">Safe Space</p>
                <p className="text-sm text-muted-foreground">Designed for privacy, comfort, and community.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">A Safe Place To Grow</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Women's Only Studio & <br/><span className="italic text-primary">Hijab Friendly</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Step into a serene, elegant space designed exclusively for women. Our studio combines modern aesthetics with comfort, providing a chic and supportive atmosphere where you can focus on your well-being without feeling uncomfortable.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We are proud to be a hijab-friendly Pilates studio, providing a private and comfortable space where women can move freely and focus on their wellness journey.
              </p>
              <Button 
                onClick={() => navigate('/about')}
                className="bg-primary text-white hover:bg-foreground transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest text-sm no-underline"
              >
                Learn More
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WELLNESS BAR SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Maison Mère Studio</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                  More Than Just Pilates
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Enhance your wellness journey at our in-studio Wellness Bar, or speak to us about private hire. We offer a curated selection of health drinks and a beautiful space for events.
                </p>
               <Button 
                 onClick={() => navigate('/wellness-bar')}
                 variant="outline"
                 className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest text-sm bg-transparent font-heading hover:scale-105 active:scale-95 no-underline"
               >
                 View Menu
               </Button>
              </FadeIn>
            </div>

            <div className="lg:col-span-8">
              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                <StaggerItem>
                  <Card className="border-none shadow-none bg-secondary/10 h-full">
                    <div className="aspect-video overflow-hidden">
                      <Image src="https://static.wixstatic.com/media/980ffc_545fe52b1e4442d1856102c05a047fed~mv2.png?originWidth=768&originHeight=448" alt="Wellness Bar" className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2">Wellness Bar</h3>
                      <p className="text-sm text-muted-foreground">Enjoy a selection of Matcha, cold-pressed juices, and healthy snacks.</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="border-none shadow-none bg-secondary/10 h-full">
                    <div className="aspect-video overflow-hidden">
                      <Image src="https://static.wixstatic.com/media/980ffc_5488cdab3c194676b17782d1783a30a3~mv2.png?originWidth=768&originHeight=448" alt="Private Hire" className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2">Private Hire & Events</h3>
                      <p className="text-sm text-muted-foreground">Our beautiful studio is available for private hire and special events.</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-primary text-sm uppercase tracking-widest mb-4 font-semibold">Common Questions</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">FAQ'S</h2>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-background border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/10 transition-colors"
                  >
                    <span className="font-heading font-bold text-lg text-foreground pr-8">{faq.q}</span>
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
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
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
            >
              Our Classes
            </Button>
          </FadeIn>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}
