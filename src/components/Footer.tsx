import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">HNB STUDIO</h3>
            <p className="text-background/80 font-paragraph text-sm leading-relaxed">
              A women-only reformer Pilates space dedicated to empowering women through mindful movement and inclusive wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/classes" 
                  className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link 
                  to="/wellness-bar" 
                  className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                >
                  Wellness Bar
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-background/80 font-paragraph text-sm">
                  Oldham, United Kingdom
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-background/80 font-paragraph text-sm">
                  Contact us for details
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-background/80 font-paragraph text-sm">
                  info@hnbstudio.co.uk
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-background/80 font-paragraph text-sm">
              <li>Monday - Friday: 6am - 9pm</li>
              <li>Saturday: 8am - 6pm</li>
              <li>Sunday: 9am - 5pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 font-paragraph text-sm">
            © 2026 hnbstudio.co.uk. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/80 hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/80 hover:text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
