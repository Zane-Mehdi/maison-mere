import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const SlideInText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
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

  useEffect(() => {
    if (!autoPlay || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    onSlideChange?.(index);
  }, [onSlideChange]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-black">
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            {slide.type === 'image' ? (
              <Image
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={slide.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
              />
            )}
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={() => handleSlideChange((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 backdrop-blur-sm border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => handleSlideChange((currentSlide + 1) % slides.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 backdrop-blur-sm border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="container mx-auto px-4 text-center text-white">
            <SlideInText delay={0.2}>
              <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-white/90 font-medium">
                {currentSlideData?.subtitle}
              </p>
            </SlideInText>

            <SlideInText delay={0.4}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight tracking-tight">
                {currentSlideData?.title}
              </h1>
            </SlideInText>

            {currentSlideData?.cta && (
              <SlideInText delay={0.8}>
                <div className="pointer-events-auto">
                  <Button
                    onClick={currentSlideData.cta.action}
                    size="lg"
                    className="bg-primary text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-10 py-6 rounded-none uppercase tracking-widest"
                  >
                    {currentSlideData.cta.text}
                  </Button>
                </div>
              </SlideInText>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70 pointer-events-none"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
