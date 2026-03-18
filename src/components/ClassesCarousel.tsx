import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { AboutClassTypesHOMEPAGE } from '@/entities';

interface ClassesCarouselProps {
  classTypes: AboutClassTypesHOMEPAGE[];
}

export default function ClassesCarousel({ classTypes }: ClassesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (classTypes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No classes currently available.
      </div>
    );
  }

  const peekPercentage = 20; // Show 20% of next item
  const itemWidth = 100 - peekPercentage; // Each item takes 80% of container

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    setDragOffset(currentX - dragStart);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - dragStart);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const dragDistance = dragStart - e.clientX;
    handleSwipe(dragDistance);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const dragDistance = dragStart - e.changedTouches[0].clientX;
    handleSwipe(dragDistance);
  };

  const handleSwipe = (dragDistance: number) => {
    // Swipe threshold: 30px
    if (Math.abs(dragDistance) > 30) {
      if (dragDistance > 0) {
        // Swiped left - go to next
        if (currentIndex < classTypes.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      } else {
        // Swiped right - go to previous
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      }
    }
    setDragOffset(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate translation: move by itemWidth percentage for each item, accounting for drag
  const translateX = -currentIndex * itemWidth + (isDragging ? dragOffset / (containerRef.current?.offsetWidth || 1) * 100 : 0);

  return (
    <div className="md:hidden">
      {/* Carousel Container - Shows item + peek of next */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-background rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          if (isDragging) {
            setIsDragging(false);
            setDragOffset(0);
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex gap-4 px-4"
          animate={{ x: `${translateX}%` }}
          transition={isDragging ? { type: 'inertia', velocity: dragOffset } : { type: 'spring', stiffness: 300, damping: 30 }}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {classTypes.map((classType, index) => (
            <a
              key={classType._id}
              href="/book-a-class"
              className="block group flex-shrink-0"
              style={{ width: `${itemWidth}%` }}
              draggable={false}
            >
              <Card className="border-none shadow-none bg-transparent hover:bg-secondary/10 transition-colors duration-300 rounded-lg overflow-hidden h-full">
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
          ))}
        </motion.div>
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
