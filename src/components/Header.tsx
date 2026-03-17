import { Image } from '@/components/ui/image';
import { Instagram, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);

  const aboutSections = [
    { id: 'classes', label: 'Our Classes' },
    { id: 'private-classes', label: 'Private Classes' },
    { id: 'corporate', label: 'Corporate & Events' },
    { id: 'instructors', label: 'Our Instructors' }
  ];

  const handleSectionScroll = (sectionId: string) => {
    // Check if we're already on the About page
    const isOnAboutPage = window.location.pathname === '/about';
    
    if (isOnAboutPage) {
      // If on About page, scroll to section directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If not on About page, navigate to it with section hash
      window.location.href = `/about#${sectionId}`;
    }
    setAboutDropdownOpen(false);
  };

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
            <div className="relative group">
              <button
                className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide flex items-center gap-1"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {aboutDropdownOpen && (
                <div
                  className="absolute left-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  {aboutSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionScroll(section.id)}
                      className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary/20 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Home
            </Link>
            <Link
              to="/classes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Membership and Pricing
            </Link>
            
            {/* Mobile About Dropdown */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMobileAboutDropdownOpen(!mobileAboutDropdownOpen)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide flex items-center justify-between"
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileAboutDropdownOpen && (
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-primary/30">
                  {aboutSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        handleSectionScroll(section.id);
                        setMobileMenuOpen(false);
                        setMobileAboutDropdownOpen(false);
                      }}
                      className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm text-left"
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Contact
            </Link>
            <Link
              to="/book-a-class"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-paragraph text-sm uppercase tracking-wide"
            >
              Schedule
            </Link>
            <div className="flex items-center gap-4 pt-2">
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
          </nav>
        )}
      </div>
    </header>
  );
}
