import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
              <p className="font-paragraph text-lg leading-relaxed">
                We understand that life happens. If you need to cancel a class booking, please review our cancellation policy below.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Cancellation Timeline</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading text-xl mb-2 text-foreground">24+ Hours Before Class</h3>
                  <p className="font-paragraph text-lg">
                    Full refund or credit to your account. No questions asked.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-heading text-xl mb-2 text-foreground">Less Than 24 Hours Before Class</h3>
                  <p className="font-paragraph text-lg">
                    50% refund or credit. We understand emergencies happen, but we do charge a cancellation fee to account for our instructor's time.
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
              <h2 className="font-heading text-3xl mb-4 text-foreground">How to Cancel</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                To cancel a class, please:
              </p>
              <ol className="list-decimal list-inside space-y-2 font-paragraph text-lg">
                <li>Log into your account on our website</li>
                <li>Navigate to "My Bookings"</li>
                <li>Select the class you wish to cancel</li>
                <li>Click "Cancel Booking"</li>
                <li>Confirm your cancellation</li>
              </ol>
              <p className="font-paragraph text-lg leading-relaxed mt-4">
                Alternatively, you can contact us directly at least 24 hours before your class.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Package and Membership Cancellations</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                For class packages and memberships:
              </p>
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Cancellations must be requested in writing</li>
                <li>Refunds are issued within 7-10 business days</li>
                <li>Unused classes in a package may be refunded if requested within 30 days of purchase</li>
                <li>Monthly memberships can be cancelled with 7 days' notice</li>
              </ul>
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
                <p>Email: support@ourpilatesstudio.com</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
