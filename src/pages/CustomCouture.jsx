import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import CustomProcess from "../components/CustomProcess";
import Reveal from "../components/Reveal";

export default function CustomCouture() {
  return (
    <>
      <PageBanner
        eyebrow="Made For You"
        title="Custom Couture"
        description="A garment built around you — your story, your silhouette, your celebration."
        image="https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=80&w=1600&auto=format&fit=crop"
      />

      <section className="bg-ivory py-24 px-6 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal">
            Couture Is a Conversation
          </h2>
          <p className="mt-5 font-body text-[15px] leading-relaxed text-charcoal/70">
            At M&apos;Couture, no two garments are alike. Each custom piece
            begins with your story — an occasion, an heirloom fabric, a
            silhouette you&apos;ve always dreamed of — and is realized by
            master artisans in our Panipat atelier, entirely by hand.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block border border-charcoal px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
          >
            Book a Consultation
          </Link>
        </Reveal>
      </section>

      <CustomProcess />

    </>
  );
}
