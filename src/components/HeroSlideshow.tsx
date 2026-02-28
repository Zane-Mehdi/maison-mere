import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

interface SlideItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    action: () => void;
  };
}

interface HeroSlideshowProps {
  slides: SlideItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSlideChange?: (index: number) => void;
}

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HeroSlideshow({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  onSlideChange
}: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Parallax scroll effect for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  useEffect(() => {
    if (!isAutoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, autoPlayInterval, slides.length]);

  useEffect(() => {
    onSlideChange?.(currentSlide);
  }, [currentSlide, onSlideChange]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(autoPlay), 1000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(autoPlay), 1000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(autoPlay), 1000);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Slides Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Dark Overlay - Only affects background, not text */}
          <motion.div 
            className="absolute inset-0 bg-black/30 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Image or Video */}
          {currentSlideData.type === 'image' ? (
            <Image
              src={currentSlideData.src}
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full bg-black">
              <video
                src={currentSlideData.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
              />
              {!isVideoPlaying && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors z-20"
                >
                  <Play className="w-16 h-16 text-white fill-white" />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="container relative z-20 px-4 mx-auto text-center text-white">
        <FadeIn delay={0.2}>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-white/90 font-medium">
            {currentSlideData.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight tracking-tight">
            {currentSlideData.title}
          </h1>
        </FadeIn>

        {currentSlideData.cta && (
          <FadeIn delay={0.8}>
            <Button
              onClick={currentSlideData.cta.action}
              size="lg"
              className="bg-primary text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-10 py-6 rounded-none uppercase tracking-widest"
            >
              {currentSlideData.cta.text}
            </Button>
          </FadeIn>
        )}
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-colors p-3 rounded-full text-white backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-colors p-3 rounded-full text-white backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'bg-white w-8 h-2'
                    : 'bg-white/50 w-2 h-2 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll Indicator */}
      {slides.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
        </motion.div>
      )}
    </section>
  );
}
