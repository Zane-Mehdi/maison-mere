import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 transition-colors duration-200 hover:fill-[#25D366]"
    fill="currentColor"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="Icons">
      <g>
        <path d="M38.9,8.1A20.9,20.9,0,0,0,3.2,22.8,19.8,19.8,0,0,0,6,33.2L3,44l11.1-2.9a20.3,20.3,0,0,0,10,2.5A20.8,20.8,0,0,0,38.9,8.1Zm-14.8,32a17.1,17.1,0,0,1-9.5-2.8L8,39.1l1.8-6.4a17.9,17.9,0,0,1-3.1-9.9A17.4,17.4,0,1,1,24.1,40.1Z"></path>
        <path d="M33.6,27.2A29.2,29.2,0,0,0,30,25.5c-.4-.2-.8-.3-1.1.2s-1.4,1.7-1.7,2.1a.8.8,0,0,1-1.1.1,15.2,15.2,0,0,1-4.2-2.6A15,15,0,0,1,19,21.7a.7.7,0,0,1,.2-1l.8-1a3.5,3.5,0,0,0,.5-.8.9.9,0,0,0,0-.9c-.2-.3-1.2-2.8-1.6-3.9s-.9-.9-1.2-.9h-1a1.7,1.7,0,0,0-1.4.7,5.5,5.5,0,0,0-1.8,4.3,10.4,10.4,0,0,0,2.1,5.4c.3.3,3.7,5.6,8.9,7.8a16.4,16.4,0,0,0,3,1.1,6.4,6.4,0,0,0,3.3.2c1-.1,3.1-1.2,3.5-2.4s.5-2.3.3-2.5A2.1,2.1,0,0,0,33.6,27.2Z"></path>
      </g>
    </g>
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLocationBannerVisible, setIsLocationBannerVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide banner when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsLocationBannerVisible(false);
      } else {
        setIsLocationBannerVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Hide banner on About page
  const isAboutPage = location.pathname === '/about';

  return (
    <>
      {/* Location Banner */}
      {!isAboutPage && (
        <motion.div
          initial={{ opacity: 1, height: 'auto' }}
          animate={{
            opacity: isLocationBannerVisible ? 1 : 0,
            height: isLocationBannerVisible ? 'auto' : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground py-2 border-b border-primary/20 overflow-hidden"
        >
          <div className="container mx-auto px-4 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <a
              href="https://maps.app.goo.gl/jUMoCgRDpUjsvzbV8"
              target="_blank"
              rel="noopener noreferrer"
              className="font-paragraph text-sm text-center hover:underline cursor-pointer transition-all duration-200"
            >
              207 Watford Road, Harrow, HA1 3UA
            </a>
          </div>
        </motion.div>
      )}
      <motion.header
        animate={{
          top: !isAboutPage && isLocationBannerVisible ? '37px' : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <Image
              src="https://static.wixstatic.com/media/980ffc_216f68e3d33646088d33a14a1c16dab3~mv2.png"
              className="h-16 w-auto object-contain max-w-xs"
              originWidth={500}
              originHeight={254}
              alt="Maison Mère Studio Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              About
            </Link>
            <Link
              to="/classes"
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Membership and Pricing
            </Link>
            <a
              href="/book-a-class"
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Schedule
            </a>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Contact
            </Link>
          </nav>

          {/* Social Icons & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/447304499808"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="tel:07304499808"
              className="text-foreground hover:text-primary transition-colors duration-200"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/maisonmerestudio/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="/book-a-class"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-heading hover:scale-105 active:scale-95 no-underline px-4 py-2 rounded inline-block"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              About
            </Link>

            <Link
              to="/classes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Membership and Pricing
            </Link>

            <a
              href="/book-a-class"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Schedule
            </a>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Contact
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://wa.me/447304499808"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="tel:07304499808"
                className="text-foreground hover:text-primary transition-colors duration-200"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/maisonmerestudio/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <a
              href="/book-a-class"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 w-full font-heading hover:scale-105 active:scale-95 no-underline px-4 py-2 rounded inline-block text-center"
            >
              Book Now
            </a>
          </motion.nav>
        )}
        </div>
      </motion.header>
    </>
  );
}
