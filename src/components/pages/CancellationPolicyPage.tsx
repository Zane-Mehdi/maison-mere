import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-[100rem] mx-auto px-4 py-16 md:py-24">
          <h1 className="font-heading text-5xl md:text-6xl mb-8 text-foreground">Cancellation Policy</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Class Cancellations</h2>
              <p className="font-paragraph text-lg leading-relaxed">At Maison Mère Studio, we aim to keep our schedule fair and accessible for all clients. Please review our cancellation policy below.</p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Class Cancellations</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading text-xl mb-2 text-foreground">All classes must be cancelled or rescheduled at least 24 hours in advance of the scheduled start time.</h3>
                  <p className="font-paragraph text-lg">
                    Cancellations made within 24 hours, or missed sessions, will result in the class being forfeited.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-heading text-xl mb-2 text-foreground">Late Arrival</h3>
                  <p className="font-paragraph text-lg">
                    Clients are expected to arrive on time. Entry may not be permitted if you arrive more than 10 minutes late, as this
may disrupt the class and compromise safety.
                  </p>
                </div>
                <div className="border-l-4 border-muted-foreground pl-4">
                  <h3 className="font-heading text-xl mb-2 text-foreground">No-Show</h3>
                  <p className="font-paragraph text-lg">
                    No refund. The full class fee will be charged to your account.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Studio Cancellations</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                If a class is cancelled by the studio, clients will receive either:
              </p>
              <ol className="list-decimal list-inside space-y-2 font-paragraph text-lg">
                <li> A replacement class, or</li>
                <li> Studio credit</li>
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Membership Cancellations</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                Memberships require a minimum 2-month commitment.
After this period, memberships continue on a rolling monthly basis and may be cancelled at any time by contacting
the studio prior to the next billing date.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Instructor Cancellations</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                If we need to cancel a class due to instructor unavailability, you will be notified as soon as possible. You will receive a full refund or credit, and we will offer you an alternative class time if available.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Contact Us</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                For questions about our cancellation policy or to request a cancellation, please contact us:
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
