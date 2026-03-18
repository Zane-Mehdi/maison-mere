import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { AboutClassTypesHOMEPAGE } from '@/entities';

interface ClassesCarouselProps {
  classTypes: AboutClassTypesHOMEPAGE[];
}

export default function ClassesCarousel({ classTypes }: ClassesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (classTypes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No classes currently available.
      </div>
    );
  }

  // Scroll to show 1.5 items on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Calculate the width of 1.5 items to scroll to
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const itemWidth = containerWidth * 0.75; // Each item is 75% of container width
      scrollContainerRef.current.scrollLeft = 0; // Start at beginning
    }
  }, []);

  return (
    <div className="md:hidden">
      {/* Fluid Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden bg-background rounded-lg scroll-smooth"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch', // Smooth momentum scrolling on iOS
        }}
      >
        <div className="flex gap-4 px-4 pb-4" style={{ width: 'fit-content' }}>
          {classTypes.map((classType, index) => (
            <a
              key={classType._id}
              href="/book-a-class"
              className="block group flex-shrink-0"
              style={{ width: '75vw', maxWidth: '400px' }}
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
        </div>
      </div>

      {/* Scroll Hint */}
      <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-widest">
        Scroll to browse classes
      </p>
    </div>
  );
}
