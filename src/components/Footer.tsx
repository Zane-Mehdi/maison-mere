import { Instagram, Mail, MapPin, Music2, Phone, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
           <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Maison Mère Studio</h3>
            <p className="text-background/80 font-paragraph text-sm leading-relaxed">Premium women's-only Pilates and wellness studio in Harrow, offering reformer, mat, yoga and pre & postnatal classes in a supportive, elevated space.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
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
                to="/classes"
                className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
              >Membership and Pricing</Link>
            </li>
            <li>
              <a
                href="/book-a-class"
                className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
              >
                Schedule
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/#faq"
                className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
              >
                FAQ
              </Link>
            </li>
          </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/maisonmerestudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@maisonmerestudioldn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                  aria-label="TikTok"
                >
                  <Music2 className="w-4 h-4" />
                  TikTok
                </a>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a
                  href="https://maps.google.com/?q=207+Watford+Rd,+Harrow+HA1+3UA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                >
                  207 Watford Rd, Harrow HA1 3UA
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a
                  href="tel:+447304499808"
                  className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                >
                  07304 499808
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a
                  href="mailto:Contact@maisonmerestudio.com"
                  className="text-background/80 hover:text-primary transition-colors duration-200 font-paragraph text-sm"
                >contact@maisonmerestudio.com</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-background/80 font-paragraph text-sm">
              <li>Monday - Friday: 7:00am - 9:00am | 6:00pm - 9:00pm</li>
              <li>Saturday: 3pm - 5pm</li>
              <li>Sunday: 10am - 1pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-background/60 font-paragraph text-sm">© 2026 Maison Mère Studio.  All rights reserved.</p>
            <div className="flex items-center gap-4">
            <a
              href="https://www.tiktok.com/@maisonmerestudioldn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/80 hover:text-primary transition-colors duration-200"
              aria-label="TikTok"
            >
              <Music className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/80 hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-background/70 font-paragraph text-sm">
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-background/40">•</span>
            <Link
              to="/cancellation-policy"
              className="hover:text-primary transition-colors duration-200"
            >
              Cancellation Policy
            </Link>
            <span className="text-background/40">•</span>
            <Link
              to="/terms-and-conditions"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
