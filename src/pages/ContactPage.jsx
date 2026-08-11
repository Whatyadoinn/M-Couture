import PageBanner from "../components/PageBanner";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";
import SEO from "../components/SEO";

export default function ContactPage() {
  return (
    <>
      <SEO 
        title="Contact Us"
        description="Visit our Panipat atelier or reach out to begin your couture journey."
        canonical="https://mcouture.in/contact"
        ogImage="https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=100&w=3840&auto=format&fit=crop"
      />
      <PageBanner
        eyebrow="We'd Love to Hear From You"
        title="Contact Us"
        description="Visit our Panipat atelier or reach out to begin your couture journey."
        image="https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=100&w=3840&auto=format&fit=crop"
      />
      <Contact />
      <Newsletter />
    </>
  );
}
