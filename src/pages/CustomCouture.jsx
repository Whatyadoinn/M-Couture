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
            master artisans in our Haryana atelier, entirely by hand.
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

      <section className="bg-ivory py-24 px-6 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=700&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=700&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=700&auto=format&fit=crop",
          ].map((src, i) => (
            <Reveal key={src} delay={i * 0.1} className="aspect-[3/4] overflow-hidden">
              <img
                src={src}
                alt="Custom couture craftsmanship at M'Couture atelier"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
