import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities/index';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      
      setIsLoading(true);
      const data = await BaseCrudService.getById<Events>('events', id);
      setEvent(data);
      setIsLoading(false);
    };

    loadEvent();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-32 md:pt-40 min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Header />
        <main className="pt-32 md:pt-40 min-h-screen">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="font-heading text-3xl text-foreground mb-4">Event Not Found</h1>
              <p className="font-paragraph text-muted-foreground mb-8">
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/events"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading px-6 py-3 rounded inline-flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Back to Events
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const galleryImages = event.galleryImages ? 
    (Array.isArray(event.galleryImages) ? event.galleryImages : [event.galleryImages]) 
    : [];

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        {/* Back Button */}
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-paragraph"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>
        </div>

        {/* Hero Section with Main Image */}
        <section className="w-full bg-background mb-12">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-lg aspect-video md:aspect-[2/1] mb-8"
            >
              {event.itemImage && (
                <Image
                  src={event.itemImage}
                  alt={event.itemName || 'Event'}
                  className="w-full h-full object-cover"
                  originWidth={1200}
                  originHeight={600}
                />
              )}
              {event.eventStatus && (
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    event.eventStatus === 'Sold Out'
                      ? 'bg-destructive text-destructive-foreground'
                      : event.eventStatus === 'Past'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {event.eventStatus}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full bg-background pb-12">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-2"
              >
                {/* Title and Type */}
                <div className="mb-8">
                  {event.eventType && (
                    <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {event.eventType}
                    </span>
                  )}
                  <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                    {event.itemName}
                  </h1>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 pb-12 border-b border-border">
                  {event.startDate && (
                    <div className="flex gap-4">
                      <Calendar size={24} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-paragraph text-sm text-muted-foreground mb-1">Date</p>
                        <p className="font-heading text-foreground">{formatDate(event.startDate)}</p>
                      </div>
                    </div>
                  )}

                  {event.time && (
                    <div className="flex gap-4">
                      <Clock size={24} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-paragraph text-sm text-muted-foreground mb-1">Time</p>
                        <p className="font-heading text-foreground">{event.time}</p>
                      </div>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex gap-4">
                      <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-paragraph text-sm text-muted-foreground mb-1">Location</p>
                        <p className="font-heading text-foreground">{event.location}</p>
                      </div>
                    </div>
                  )}

                  {event.itemQuantity && (
                    <div className="flex gap-4">
                      <Users size={24} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-paragraph text-sm text-muted-foreground mb-1">Capacity</p>
                        <p className="font-heading text-foreground">{event.itemQuantity} spaces available</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.fullDescription && (
                  <div className="mb-12">
                    <h2 className="font-heading text-2xl text-foreground mb-4">About This Event</h2>
                    <div className="font-paragraph text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {event.fullDescription}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {galleryImages.length > 0 && (
                  <div className="mb-12">
                    <h2 className="font-heading text-2xl text-foreground mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {galleryImages.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="relative overflow-hidden rounded-lg aspect-square"
                        >
                          <Image
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            originWidth={400}
                            originHeight={400}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-secondary/30 rounded-lg p-8 sticky top-40">
                  {/* Price */}
                  {event.itemPrice !== undefined && (
                    <div className="mb-8 pb-8 border-b border-border">
                      <p className="font-paragraph text-sm text-muted-foreground mb-2">Price</p>
                      <p className="font-heading text-4xl text-foreground">
                        £{event.itemPrice.toFixed(2)}
                      </p>
                    </div>
                  )}

                  {/* Status */}
                  {event.eventStatus && (
                    <div className="mb-8 pb-8 border-b border-border">
                      <p className="font-paragraph text-sm text-muted-foreground mb-2">Status</p>
                      <p className={`font-heading text-lg ${
                        event.eventStatus === 'Sold Out'
                          ? 'text-destructive'
                          : event.eventStatus === 'Past'
                          ? 'text-muted-foreground'
                          : 'text-primary'
                      }`}>
                        {event.eventStatus}
                      </p>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="space-y-4">
                    {event.itemUrl && (
                      <a
                        href={event.itemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading px-6 py-3 rounded text-center block"
                      >
                        Book This Event
                      </a>
                    )}

                    <Link
                      to="/contact"
                      className="w-full border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-200 font-heading px-6 py-3 rounded text-center block"
                    >
                      Enquire Now
                    </Link>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: event.itemName,
                            text: event.shortDescription,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="w-full bg-muted text-foreground hover:bg-muted/80 transition-all duration-200 font-heading px-6 py-3 rounded text-center flex items-center justify-center gap-2"
                    >
                      <Share2 size={18} />
                      Share Event
                    </button>
                  </div>

                  {/* Private Hire CTA */}
                  {event.eventType === 'Private Hire' && (
                    <div className="mt-8 pt-8 border-t border-border">
                      <p className="font-paragraph text-sm text-muted-foreground mb-4">
                        Interested in hosting your own private event?
                      </p>
                      <Link
                        to="/contact"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 font-heading px-6 py-3 rounded text-center block"
                      >
                        Host Your Event
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Events CTA */}
        <section className="w-full py-16 md:py-24 bg-secondary/10">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Explore More Events
              </h2>
              <p className="font-paragraph text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover our full calendar of upcoming events and experiences.
              </p>
              <Link
                to="/events"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading px-8 py-3 rounded inline-block"
              >
                View All Events
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
