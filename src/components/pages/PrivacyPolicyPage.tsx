import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-[100rem] mx-auto px-4 py-16 md:py-24">
          <h1 className="font-heading text-5xl md:text-6xl mb-8 text-foreground">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Who We Are</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                Maison Mère Studio is a women’s-only Pilates and wellness studio based in Harrow, offering reformer, mat Pilates,
yoga and pre & postnatal classes.
We are the data controller responsible for the personal information you provide when engaging with our studio.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Information We Collect</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Personal identification information (name, email address, phone number, etc.)</li>
                <li>Billing and payment information</li>
                <li>Class preferences and booking history</li>
                <li>Device information and usage data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">How We Use Your Information</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Process your transactions and send related information</li>
                <li>Email you regarding your account or order</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to our services</li>
                <li>Generate a personal profile about you so that future visits to our site will be personalized</li>
                <li>Increase the efficiency and operation of our site</li>
                <li>Monitor and analyze usage and trends to improve your experience with our site</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Disclosure of Your Information</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We may share your information with third parties who perform services for us, including payment processors, email service providers, and analytics providers. We will not sell, trade, or rent your personal information to others without your consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Security of Your Information</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Contact Us</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 font-paragraph text-lg">
                <p>Email: Contact@maisonmerestudio.com</p>
                <p>Phone: 07304 499808</p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Changes to This Privacy Policy</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting to the website. If we make material changes to this policy, we will notify you here that it has been updated.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
