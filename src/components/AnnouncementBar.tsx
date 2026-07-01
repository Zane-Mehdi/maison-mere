import React, { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Announcements } from '@/entities/index';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<Announcements | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const loadAnnouncement = async () => {
      const result = await BaseCrudService.getAll<Announcements>('announcements');
      
      if (result.items && result.items.length > 0) {
        const now = new Date();
        
        // Filter active announcements that are within date range
        const activeAnnouncements = result.items.filter(ann => {
          if (!ann.active) return false;
          
          const startDate = ann.startDate ? new Date(ann.startDate) : null;
          const endDate = ann.endDate ? new Date(ann.endDate) : null;
          
          if (startDate && now < startDate) return false;
          if (endDate && now > endDate) return false;
          
          return true;
        });

        if (activeAnnouncements.length > 0) {
          // Sort by priority (highest first) and get the top one
          const topAnnouncement = activeAnnouncements.sort((a, b) => 
            (b.priority || 0) - (a.priority || 0)
          )[0];
          
          setAnnouncement(topAnnouncement);
          setIsVisible(true);
        }
      }
    };

    loadAnnouncement();
  }, []);

  if (!isVisible || !announcement || isDismissed) {
    return null;
  }

  return (
    <div className="w-full bg-primary/10 border-b border-primary/20">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <p className="font-paragraph text-sm text-foreground truncate">
            {announcement.announcementText}
          </p>
          {announcement.linkText && announcement.linkUrl && (
            <a
              href={announcement.linkUrl}
              className="text-sm font-medium text-link hover:text-accent transition-colors whitespace-nowrap"
            >
              {announcement.linkText}
            </a>
          )}
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="flex-shrink-0 p-1 hover:bg-primary/20 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={18} className="text-foreground" />
        </button>
      </div>
    </div>
  );
}
