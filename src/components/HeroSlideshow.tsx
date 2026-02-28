import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import HeroSlider from 'hero-slider';
import 'hero-slider/build/index.css';

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

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    onSlideChange?.(index);
  }, [onSlideChange]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-black">
      <HeroSlider
        width="100%"
        height="100%"
        autoplay
        autoplayDuration={autoPlayInterval}
        sliderImageComponent={
          <div className="w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
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
              </div>
            ))}
          </div>
        }
        navButtonsWrapperPosition="bottom"
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            borderRadius: '50%',
            padding: '12px',
            backdropFilter: 'blur(4px)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          },
          onMouseEnter: (e: any) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
          },
          onMouseLeave: (e: any) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          },
        }}
        leftNavButtonStyle={{
          position: 'absolute',
          left: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
        }}
        rightNavButtonStyle={{
          position: 'absolute',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
        }}
        onNavButtonClick={(newIndex: number) => handleSlideChange(newIndex)}
        navButtonsWrapperStyle={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          display: 'flex',
          gap: '8px',
        }}
        indicators={slides.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === currentSlide ? '32px' : '8px',
              height: '8px',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      >
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
      </HeroSlider>
    </section>
  );
}
