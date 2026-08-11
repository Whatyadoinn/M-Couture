import SEO from "../components/SEO";

export default function TermsConditions() {
  return (
    <>
      <SEO 
        title="Terms & Conditions"
        description="Terms and Conditions for M'Couture by Minky Narang."
        canonical="https://mcouture.in/terms-conditions"
      />
      <div className="bg-ivory min-h-screen py-20 px-6 lg:px-12">
        <div className="mx-auto max-w-4xl">
        <p className="font-body text-xs tracking-luxe text-gold-light uppercase mb-3">Legal</p>
        <h1 className="font-display text-4xl text-charcoal mb-2">Terms &amp; Conditions</h1>
        <p className="font-body text-sm text-charcoal/50 mb-12">Last updated: July 2025</p>

        <div className="space-y-10 font-body text-charcoal/80 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the M&apos;Couture by Minky Narang website, placing an order, or creating an account, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">2. Products &amp; Custom Orders</h2>
            <p className="mb-3">
              M&apos;Couture specialises in luxury ready-to-wear, custom bridal couture, and trousseau collections. Please note:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Custom and made-to-order garments are crafted specifically for you. As such, <strong>all custom orders are final and non-refundable</strong> unless there is a manufacturing defect.</li>
              <li>Product images are for illustrative purposes. Actual colours and fabric textures may vary slightly due to screen calibration and material batches.</li>
              <li>Sizing information is provided as a guide. For custom orders, we recommend booking a consultation for accurate measurements.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">3. Orders &amp; Payment</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.</li>
              <li>We reserve the right to cancel or refuse any order at our discretion, in which case a full refund will be issued.</li>
              <li>Payment must be made in full at the time of placing an order unless otherwise agreed upon for custom couture work.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">4. Shipping &amp; Delivery</h2>
            <p>
              We ship across India. Delivery timelines will be communicated at the time of order confirmation. M&apos;Couture is not liable for delays caused by third-party couriers, natural events, or circumstances beyond our control. Risk of loss passes to you upon delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">5. Returns &amp; Exchanges</h2>
            <p>
              Ready-to-wear items may be eligible for exchange within 7 days of delivery, provided the garment is unworn, unaltered, and in its original condition with tags intact. Custom and made-to-measure garments are not eligible for returns. To initiate an exchange, contact us at <a href="mailto:mcouture.offical@gmail.com" className="text-charcoal underline underline-offset-2 hover:text-gold-dark transition-colors">mcouture.offical@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">6. Intellectual Property</h2>
            <p>
              All content on this website — including designs, photographs, text, and branding — is the exclusive property of M&apos;Couture by Minky Narang. Reproduction, distribution, or use of any content without prior written consent is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">7. Limitation of Liability</h2>
            <p>
              M&apos;Couture shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability to you shall not exceed the amount paid for the specific order in question.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Panipat, Haryana.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">9. Contact Us</h2>
            <p>
              M&apos;Couture by Minky Narang<br />
              SCO 18, Sec 24, TDI City, Panipat, Haryana<br />
              Email: <a href="mailto:mcouture.offical@gmail.com" className="text-charcoal underline underline-offset-2 hover:text-gold-dark transition-colors">mcouture.offical@gmail.com</a><br />
              Phone: <a href="tel:+919996100019" className="text-charcoal underline underline-offset-2 hover:text-gold-dark transition-colors">+91 99961 00019</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
