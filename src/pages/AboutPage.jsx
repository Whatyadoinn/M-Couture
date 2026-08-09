import PageBanner from "../components/PageBanner";
import About from "../components/About";
import Internship from "../components/Internship";
import InstagramCTA from "../components/InstagramCTA";

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title="About M'Couture"
        description="A premium Panipat boutique devoted to luxury women's couture."
        image="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1600&auto=format&fit=crop"
      />
      <About />
      <Internship />
      <InstagramCTA />
    </>
  );
}
