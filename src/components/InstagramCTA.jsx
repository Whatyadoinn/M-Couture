import { InstagramIcon } from "./SocialIcons";
import Reveal from "./Reveal";

export default function InstagramCTA() {
  return (
    <section className="relative overflow-hidden bg-beige py-24 px-6 text-center lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,#2B2B2B_1px,transparent_1px)] bg-[size:26px_26px]" />
      </div>

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center">
        <InstagramIcon size={30} className="text-gold-dark" />
        <h2 className="mt-6 font-display text-3xl md:text-4xl text-charcoal">
          Follow the Atelier
        </h2>
        <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70">
          Step behind the seams — new collections, bridal edits, and
          behind-the-scenes moments from the M&apos;Couture atelier, first on
          Instagram.
        </p>
        <a
          href="https://www.instagram.com/m_couture_by_minkynarang/"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 border border-charcoal px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
        >
          @m_couture_by_minkynarang
        </a>
      </Reveal>
    </section>
  );
}
