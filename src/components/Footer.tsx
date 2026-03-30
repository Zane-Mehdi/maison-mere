import { Instagram, Mail, MapPin, Phone, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const TikTokIcon = () => (
  <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
  </svg>
);

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
                  <TikTokIcon />
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
              <TikTokIcon />
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
