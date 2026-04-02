import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-[100rem] mx-auto px-4 py-16 md:py-24">
          <h1 className="font-heading text-5xl md:text-6xl text-foreground m-0 mt-[87px] mr-0 mb-0 ml-0">Terms & Conditions</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Agreement to Terms</h2>
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
              <h2 className="font-heading text-3xl mb-4 text-foreground"> Bookings & Payments</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                All classes must be booked in advance through our booking system or through MINDBODY. Full payment is required
at the time of booking to secure your space.
We accept major payment methods as available on our platform. All purchases are non-refundable, except in cases
of confirmed studio error or where required by law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Cancellations & Attendance</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                Clients must cancel or reschedule classes at least 24 hours in advance. Late cancellations or missed sessions will
result in the class being forfeited.
Clients are expected to arrive on time. Entry may be refused if you arrive more than 10 minutes late for safety and
class flow.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Health & Responsibility</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                By attending classes, you confirm that you are physically and medically fit to participate. You must inform the
instructor of any injuries, medical conditions or pregnancy prior to class.
Participation is at your own risk. Maison Mère Studio is not liable for any injury, loss, or damage sustained during
classes, except where required by law.
We reserve the right to request medical clearance where appropriate.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Modifications</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Studio Environment</h2>
              <p className="font-paragraph text-lg leading-relaxed">
                To maintain a respectful and safe space:
              <ul className="list-disc list-inside space-y-2 font-paragraph text-lg">
                <li>Filming or photography is not permitted without prior consent</li>
                <li>Please arrive at least 10 minutes before class</li>
                <li>Disruptive or inappropriate behaviour may result in refusal of entry or removal</li>
                <li>Equipment must be wiped down after use</li>
                <li>Please do not attend if you are unwell</li>
              </ul>
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Children in the Studio</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                Children are only permitted during designated Hot Mama Reformer sessions.
Parents or guardians are fully responsible for their child’s supervision and safety at all times. Maison Mère Studio
accepts no liability for any injury or incident involving children on the premises.
              </p>
            </section>
                   <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Studio Cancellations</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                Classes may be cancelled if minimum attendance is not met. Clients will be notified at least 2 hours in advance for
same-day classes and by 9pm the evening prior for morning sessions.
In the event that the studio cancels a class, clients will have their studio credit reimbursed.
              </p>
            </section>
                               <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Pricing & Offers</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                All pricing, packages, and introductory offers are subject to change at any time.
Changes to pricing or offers do not entitle clients to refunds, partial refunds, or price adjustments on previous
purchases.
              </p>
            </section>
                               <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground"> Lost Property</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                All personal belongings are brought into the studio at your own risk. We do not accept responsibility for loss, theft,
or damage.
Any lost property will be held for up to 30 days, after which it may be donated or disposed of.
              </p>
            </section>
                               <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Changes to Terms</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                Maison Mère Studio reserves the right to update these Terms & Conditions at any time.
Continued use of our services constitutes acceptance of any updates.
              </p>
            </section>
                               <section>
              <h2 className="font-heading text-3xl mb-4 text-foreground">Memberships & Pricing</h2>
              <p className="font-paragraph text-lg leading-relaxed mb-4">
                Memberships are subject to a minimum commitment period of two (2) months from the start date.
All memberships are billed on a recurring monthly basis and will automatically renew each month unless
cancelled.
After the initial 2-month commitment period, memberships will continue on a rolling monthly basis. Clients may
cancel at any time after this period by contacting the studio directly.
Memberships are non-refundable and non-transferable. It is the client’s responsibility to ensure cancellation
requests are submitted in advance of their next billing date.
              </p>
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
