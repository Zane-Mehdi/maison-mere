import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Instagram, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >

  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
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
    </header>
  );
}
