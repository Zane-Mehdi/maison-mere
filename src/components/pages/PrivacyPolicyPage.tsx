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
              <h2 className="font-heading text-3xl mb-4 text-foreground">What Data We Collect</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                We may collect and process the following types of personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Identity Data: name, date of birth</li>
                <li>Contact Data: email address, phone number</li>
                <li>Health Data: relevant medical information, injuries, pregnancy status (only where necessary for your safety)</li>
                <li>Booking Data: class bookings, attendance history</li>
                <li>Financial Data: payment details (processed securely via third-party providers)</li>
                <li>Marketing Preferences: your preferences for receiving communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">How We Collect Your Data</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                We collect your data when you:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Register or book classes (including via platforms such as Mindbody)</li>
                <li>Complete health forms, waivers, or questionnaires (online or in-studio)</li>
                <li>Contact us via email, phone, or social media</li>
                <li>Sign up for updates, offers, or newsletters</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">How We Use Your Data</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We only use your data where we have a lawful basis under UK GDPR, including:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>To manage bookings, memberships, and payments)</li>
                <li>To ensure your health and safety during classes</li>
                <li>To communicate with you regarding your bookings or enquiries
</li>
                <li>To send marketing communications (only where you have opted in)
</li>
<li>To improve our services and client experience
</li>
              </ul>
              <p className="font-paragraph text-lg leading-relaxed">
You may withdraw your consent to marketing communications at any time.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground"> Sharing Your Data</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We only share your data where necessary to provide our services, including:
              </p>
                            <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Booking platforms (e.g. Mindbody)</li>
                <li>Payment providers</li>
                <li> Email and communication platforms
</li>
              </ul>
                <p className="font-paragraph text-lg leading-relaxed">
We do not sell or share your data for third-party marketing purposes.
              </p>
            </section>

             <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground"> Data Retention</h2>
              <p className="font-paragraph text-lg leading-relaxed">
We retain your personal data only as long as necessary:
              </p>
                            <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Booking platforms (e.g. Mindbody)</li>
                <li>Payment providers</li>
                <li> Email and communication platforms
</li>
              </ul>
                <p className="font-paragraph text-lg leading-relaxed">
We do not sell or share your data for third-party marketing purposes.
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
