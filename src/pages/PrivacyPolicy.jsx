export default function PrivacyPolicy() {
  return (
    <div className="bg-ivory min-h-screen py-20 px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-xs tracking-luxe text-gold-light uppercase mb-3">Legal</p>
        <h1 className="font-display text-4xl text-charcoal mb-2">Privacy Policy</h1>
        <p className="font-body text-sm text-charcoal/50 mb-12">Last updated: July 2025</p>

        <div className="space-y-10 font-body text-charcoal/80 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">1. About Us</h2>
            <p>
              M&apos;Couture by Minky Narang (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a luxury women&apos;s couture studio based at SCO 18, Sec 24, TDI City, Panipat, Haryana, India. We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you visit our website or place an order with us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Identity Data</strong> — your name and account display name.</li>
              <li><strong>Contact Data</strong> — billing address, shipping address, email address, and phone number.</li>
              <li><strong>Transaction Data</strong> — details about purchases you make, order history, and payment confirmation references.</li>
              <li><strong>Account Data</strong> — email address and encrypted authentication credentials managed via Firebase Authentication.</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> store raw card or banking details. Payments are processed securely through third-party payment gateways.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and fulfil your orders, including shipping and delivery.</li>
              <li>To communicate with you about your order status or enquiries.</li>
              <li>To manage your account and provide customer support.</li>
              <li>To comply with our legal obligations.</li>
              <li>To improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">4. Data Storage &amp; Security</h2>
            <p>
              Your data is securely stored using Google Firebase (Authentication) and a Neon PostgreSQL cloud database. We implement appropriate technical measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">5. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers (e.g. shipping couriers) solely to fulfil your order. These parties are obligated to keep your information confidential.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us at <a href="mailto:mcouture.offical@gmail.com" className="text-charcoal underline underline-offset-2 hover:text-gold-dark transition-colors">mcouture.offical@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-charcoal mb-3">7. Contact</h2>
            <p>
              M&apos;Couture by Minky Narang<br />
              SCO 18, Sec 24, TDI City, Panipat, Haryana<br />
              Email: <a href="mailto:mcouture.offical@gmail.com" className="text-charcoal underline underline-offset-2 hover:text-gold-dark transition-colors">mcouture.offical@gmail.com</a><br />
              Phone: <a href="tel:+919996100019" className="text-charcoal underline underline-offset-2 hover:text-gold-dark transition-colors">+91 99961 00019</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
