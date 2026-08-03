import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CollectionCard from "../components/CollectionCard";
import CustomProcess from "../components/CustomProcess";
import BridalShowcase from "../components/BridalShowcase";
import About from "../components/About";
import InstagramCTA from "../components/InstagramCTA";
import Newsletter from "../components/Newsletter";
import Contact from "../components/Contact";
import Reveal from "../components/Reveal";
import { collections } from "../data/siteData";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="collections" className="bg-ivory py-28 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col items-center text-center">
            <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
              The Collections
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
              Curated for Every Occasion
            </h2>
            <div className="mt-5 h-px w-16 bg-gold" />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c, i) => (
              <CollectionCard key={c.id} index={i} {...c} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/collections"
              className="border border-charcoal/30 px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-colors hover:border-gold hover:text-gold-dark"
            >
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      <CustomProcess />
      {/* <BridalShowcase /> */}
      <About />
      <InstagramCTA />
      <Newsletter />
      <Contact />
    </>
  );
}
