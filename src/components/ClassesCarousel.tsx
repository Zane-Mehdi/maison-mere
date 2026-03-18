import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { AboutClassTypes } from '@/entities';

interface ClassesCarouselProps {
  classTypes: AboutClassTypes[];
}

export default function ClassesCarousel({ classTypes }: ClassesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (classTypes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No classes currently available.
      </div>
    );
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const dragDistance = dragStart - clientX;

    // Swipe threshold: 50px
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        // Swiped left - go to next
        setCurrentIndex((prev) => (prev + 1) % classTypes.length);
      } else {
        // Swiped right - go to previous
        setCurrentIndex((prev) => (prev - 1 + classTypes.length) % classTypes.length);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const current = classTypes[currentIndex];

  return (
    <div className="md:hidden">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-background rounded-lg"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            <a href="/book-a-class" className="block group">
              <Card className="border-none shadow-none bg-transparent hover:bg-secondary/10 transition-colors duration-300 rounded-none overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden relative mb-0\">
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider z-10">
                    {current.difficultyLevel || 'All Levels'}
                  </div>
                  <Image
                    src={current.classTypeImage || "https://static.wixstatic.com/media/980ffc_53ba6cf33fa74be29706e2179f45c6de~mv2.png?originWidth=768&originHeight=1024"}
                    alt={current.classTypeName || "Class Image"}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-4xl font-heading font-bold text-primary/20 mb-2">0{currentIndex + 1}</div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {current.classTypeName}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                    {current.description}
                  </p>
                  <span className="inline-block text-primary text-sm uppercase tracking-widest pb-1 group-hover:text-foreground transition-all">
                    Book Class
                  </span>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {classTypes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-primary/20 w-2 hover:bg-primary/40'
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to class ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-widest">
        Swipe to browse classes
      </p>
    </div>
  );
}
