import React, { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities/index';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'private' | 'past'>('upcoming');

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Events>('events');
      
      if (result.items) {
        setEvents(result.items);
        
        // Find featured event
        const featured = result.items.find(e => e.isFeatured);
        if (featured) {
          setFeaturedEvent(featured);
        }
      }
      
      setIsLoading(false);
    };

    loadEvents();
  }, []);

  const getFilteredEvents = () => {
    const now = new Date();
    
    return events.filter(event => {
      const eventStart = event.startDate ? new Date(event.startDate) : null;
      
      if (activeFilter === 'upcoming') {
        return event.eventStatus === 'Upcoming' && eventStart && eventStart > now;
      } else if (activeFilter === 'private') {
        return event.eventType === 'Private Hire' || event.eventStatus === 'Private Hire';
      } else if (activeFilter === 'past') {
        return event.eventStatus === 'Past' || (eventStart && eventStart < now);
      }
      
      return true;
    });
  };

  const filteredEvents = getFilteredEvents();

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
                Events at Maison Mère
              </h1>
              <p className="font-paragraph text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover our curated selection of private Pilates sessions, wellness experiences, 
                intimate group bookings, and special studio events. From birthdays and baby showers 
                to corporate wellness and private hires, we create memorable experiences in our 
                serene studio space.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Event Section */}
        {featuredEvent && (
          <section className="w-full py-16 md:py-24 bg-background">
            <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12 text-center">
                  Featured Event
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-lg aspect-square">
                    {featuredEvent.itemImage && (
                      <Image
                        src={featuredEvent.itemImage}
                        alt={featuredEvent.itemName || 'Featured Event'}
                        className="w-full h-full object-cover"
                        originWidth={600}
                        originHeight={600}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="inline-block mb-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {featuredEvent.eventType}
                      </span>
                    </div>
                    
                    <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                      {featuredEvent.itemName}
                    </h3>

                    <div className="space-y-3 mb-6">
                      {featuredEvent.startDate && (
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Calendar size={20} className="text-primary flex-shrink-0" />
                          <span className="font-paragraph">{formatDate(featuredEvent.startDate)}</span>
                        </div>
                      )}
                      
                      {featuredEvent.location && (
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <MapPin size={20} className="text-primary flex-shrink-0" />
                          <span className="font-paragraph">{featuredEvent.location}</span>
                        </div>
                      )}

                      {featuredEvent.itemQuantity && (
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Users size={20} className="text-primary flex-shrink-0" />
                          <span className="font-paragraph">{featuredEvent.itemQuantity} spaces available</span>
                        </div>
                      )}
                    </div>

                    <p className="font-paragraph text-muted-foreground mb-8 leading-relaxed">
                      {featuredEvent.shortDescription}
                    </p>

                    {featuredEvent.itemPrice && (
                      <div className="mb-8">
                        <p className="font-heading text-2xl text-foreground">
                          £{featuredEvent.itemPrice.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/events/${featuredEvent._id}`}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading px-6 py-3 rounded inline-flex items-center justify-center gap-2 group"
                      >
                        View Full Details
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      {featuredEvent.itemUrl && (
                        <a
                          href={featuredEvent.itemUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-200 font-heading px-6 py-3 rounded inline-flex items-center justify-center gap-2"
                        >
                          Book Now
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Events Grid Section */}
        <section className="w-full py-16 md:py-24 bg-secondary/10">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12 text-center">
                Upcoming Events
              </h2>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { id: 'upcoming', label: 'Upcoming Events' },
                  { id: 'private', label: 'Private Hire' },
                  { id: 'past', label: 'Past Events' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id as 'upcoming' | 'private' | 'past')}
                    className={`px-6 py-2 rounded-full font-paragraph text-sm transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Events Grid */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="font-paragraph text-muted-foreground">Loading events...</p>
                </div>
              ) : filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                      {/* Image */}
                      {event.itemImage && (
                        <div className="relative overflow-hidden aspect-video">
                          <Image
                            src={event.itemImage}
                            alt={event.itemName || 'Event'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            originWidth={400}
                            originHeight={300}
                          />
                          {event.eventStatus && (
                            <div className="absolute top-4 right-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-heading text-xl text-foreground mb-2">
                          {event.itemName}
                        </h3>

                        <p className="font-paragraph text-sm text-muted-foreground mb-4 flex-grow">
                          {event.shortDescription}
                        </p>

                        <div className="space-y-2 mb-6">
                          {event.startDate && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar size={16} className="text-primary flex-shrink-0" />
                              <span className="font-paragraph">{formatDate(event.startDate)}</span>
                            </div>
                          )}
                          
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin size={16} className="text-primary flex-shrink-0" />
                              <span className="font-paragraph">{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.itemPrice && (
                          <div className="mb-4">
                            <p className="font-heading text-lg text-foreground">
                              £{event.itemPrice.toFixed(2)}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-3 mt-auto">
                          <Link
                            to={`/events/${event._id}`}
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading px-4 py-2 rounded text-center text-sm"
                          >
                            View Details
                          </Link>
                          
                          {event.itemUrl && (
                            <a
                              href={event.itemUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-200 font-heading px-4 py-2 rounded text-center text-sm"
                            >
                              Book
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-paragraph text-muted-foreground text-lg">
                    No events found for this category.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Host Your Event With Us
              </h2>
              <p className="font-paragraph text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Looking to host a private event, corporate wellness session, or special celebration? 
                Our serene studio is the perfect venue for your gathering.
              </p>
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading px-8 py-3 rounded inline-flex items-center justify-center gap-2 group"
              >
                Enquire About Private Hire
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
