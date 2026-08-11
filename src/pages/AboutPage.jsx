import PageBanner from "../components/PageBanner";
import About from "../components/About";
import Internship from "../components/Internship";
import InstagramCTA from "../components/InstagramCTA";
import SEO from "../components/SEO";

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About M'Couture"
        description="A premium Panipat boutique devoted to luxury women's couture."
        canonical="https://mcouture.in/about"
        ogImage="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=100&w=3840&auto=format&fit=crop"
      />
      <PageBanner
        eyebrow="Our Story"
        title="About M'Couture"
        description="A premium Panipat boutique devoted to luxury women's couture."
        image="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=100&w=3840&auto=format&fit=crop"
      />
      <About />
      <Internship />
      <InstagramCTA />
    </>
  );
}
