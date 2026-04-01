import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-[100rem] mx-auto px-4 py-16 md:py-24">
          <h1 className="font-heading text-5xl md:text-6xl mb-8 text-foreground">Terms & Conditions</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Bookings & Payments</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Use License</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Disclaimer</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Limitations</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Accuracy of Materials</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Links</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Modifications</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Governing Law</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Class Participation</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                By participating in our classes, you acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>You are in good physical health and able to participate in pilates classes</li>
                <li>You have consulted with a healthcare provider if you have any medical conditions</li>
                <li>You assume all risks associated with participation in our classes</li>
                <li>You will follow all instructor guidance and safety protocols</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Contact Us</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="mt-4 font-paragraph text-lg">
                <p>Email: Contact@maisonmerestudio.com</p>
                <p>Phone: 07304 499808</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
