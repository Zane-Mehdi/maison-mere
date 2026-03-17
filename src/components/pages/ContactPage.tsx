import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Sanitization utility to prevent XSS and injection attacks
const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Remove any HTML tags and dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (onclick, onerror, etc.)
    .trim();
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format (basic validation)
const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const AnimatedSection: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = 'Contact | Maison Mère Studio';
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone if provided
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Message must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) {
      return;
    }

    // Sanitize all form inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    // Create email body with sanitized data
    const emailBody = `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nPhone: ${sanitizedData.phone}\n\n${sanitizedData.message}`;
    
    // Create mailto link with pre-populated data
    const mailtoLink = `mailto:contact@maisonmerestudio.com?subject=${encodeURIComponent(sanitizedData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});

    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-accent/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(179,160,131,0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-paragraph text-sm uppercase tracking-widest mb-4">
                Get In Touch
              </p>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-foreground/80 font-paragraph leading-relaxed">
                Have questions about our classes, memberships, or private hire? We&apos;d love to hear from you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <AnimatedSection>
              <a
                href="https://www.google.com/maps/search/207+Watford+Rd,+Harrow+HA1+3UA"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6 cursor-pointer hover:bg-primary/5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    Location
                  </h3>
                  <p className="text-foreground/70 font-paragraph text-sm hover:text-primary transition-colors">207 Watford Rd, Harrow HA1 3UA</p>
                </Card>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <a
                href="tel:07304499808"
                className="block"
              >
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6 cursor-pointer hover:bg-primary/5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    Phone
                  </h3>
                  <p className="text-foreground/70 font-paragraph text-sm hover:text-primary transition-colors">07304 499808</p>
                </Card>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <a
                href="mailto:Contact@maisonmerestudio.com"
                className="block"
              >
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6 cursor-pointer hover:bg-primary/5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    Email
                  </h3>
                  <p className="text-foreground/70 font-paragraph text-sm hover:text-primary transition-colors">contact@maisonmerestudio.com</p>
                </Card>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  Hours
                </h3>
                <p className="text-foreground/70 font-paragraph text-sm">Mon-Fri: 7am-9pmSat: 3-5pm</p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <AnimatedSection>
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    Send Us A Message
                  </h2>
                  <p className="text-foreground/70 font-paragraph mb-8 leading-relaxed">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-paragraph text-sm">
                        Thank you for your message! We&apos;ll be in touch soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-paragraph mb-2 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`border-border focus:border-primary ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground font-paragraph mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`border-border focus:border-primary ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground font-paragraph mb-2 block">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`border-border focus:border-primary ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="Your phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-foreground font-paragraph mb-2 block">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className={`border-border focus:border-primary ${errors.subject ? 'border-red-500' : ''}`}
                        placeholder="What is this regarding?"
                      />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground font-paragraph mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={`border-border focus:border-primary min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="Tell us more about your inquiry..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                    >
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              {/* Additional Info */}
              <AnimatedSection delay={100}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                      Visit Our Studio
                    </h2>
                    <p className="text-foreground/70 font-paragraph leading-relaxed mb-6">We're located in the heart of Harrow, providing a convenient and accessible location for women across the area.</p>
                  </div>

                  <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/10 p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Opening Hours
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Monday - Friday</span>
                        <span className="text-foreground font-paragraph font-semibold text-justify">7:00 AM - 9:00 AM6:00 PM - 9:00PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Saturday</span>
                        <span className="text-foreground font-paragraph font-semibold">3:00 PM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/80 font-paragraph">Sunday</span>
                        <span className="text-foreground font-paragraph font-semibold text-center">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-border bg-card p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Private Hire & Events
                    </h3>
                    <p className="text-foreground/70 font-paragraph leading-relaxed mb-4">
                      Interested in booking our studio for a private event, corporate wellness session, or special occasion? Get in touch to discuss availability and pricing.
                    </p>
                    <ul className="space-y-2 text-foreground/70 font-paragraph text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Private group classes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Corporate wellness programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Special events and celebrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Team building sessions</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="border-border bg-card p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Membership Inquiries
                    </h3>
                    <p className="text-foreground/70 font-paragraph leading-relaxed">
                      Want to learn more about our membership options, class packages, or intro offers? Send us a message and we&apos;ll provide all the details you need to get started.
                    </p>
                  </Card>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      {/* Google Maps Section */}
      <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Find Us</h2>

              </div>
              <div className="aspect-video rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=Maison+M%C3%A8re+Studio+Harrow&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
}
