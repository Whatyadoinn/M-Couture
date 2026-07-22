import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import CustomProcess from "../components/CustomProcess";
import Reveal from "../components/Reveal";
import sewingPersonImg from "../Images/sewing_fabric_person.jpg";
import sewingPersonImg2 from "../Images/sewing_fabric_person_2.jpg";

export default function CustomCouture() {
  return (
    <>
      <PageBanner
        eyebrow="Made For You"
        title="Custom Couture"
        description="A garment built around you — your story, your silhouette, your celebration."
        image={sewingPersonImg2}
      />

      <section className="relative overflow-hidden bg-ivory py-24 px-6 lg:px-12">
        {/* Stitching fabric backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={sewingPersonImg}
            alt="Stitching fabric detail backdrop"
            className="h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/90 to-ivory" />
        </div>

        <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
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
