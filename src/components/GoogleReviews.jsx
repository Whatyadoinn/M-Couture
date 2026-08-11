import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";

const reviews = [
  {
    id: 1,
    name: "Payal Nanda",
    handle: "@payal_nanda",
    occasion: "Custom Couture",
    text: "A big thank you for your consistency, patience and incredible talent. The fit is always perfect and you never miss a deadline.",
    stars: 5,
    initials: "PN",
    color: "bg-rose-400",
  },
  {
    id: 2,
    name: "Simran",
    handle: "@simran_clienty",
    occasion: "Festive Outfit",
    text: "Thank you so much — after wearing the outfit, I was looking so pretty. You delivered it in such little time. Forever grateful!",
    stars: 5,
    initials: "S",
    color: "bg-amber-500",
  },
  {
    id: 3,
    name: "Verified Client",
    handle: "WhatsApp Review",
    occasion: "Evening Wear",
    text: "Hey Minky, thank you for such a lovely dress. You made me feel pretty. Sharing a few pics — everyone loved it!",
    stars: 5,
    initials: "V",
    color: "bg-violet-500",
  },
  {
    id: 4,
    name: "Verified Bride",
    handle: "WhatsApp Review",
    occasion: "Bridal Couture",
    text: "Thank you so much! Everyone appreciated my dress and look. All credit goes to you — you are my last minute saviour!",
    stars: 5,
    initials: "B",
    color: "bg-emerald-500",
  },
  {
    id: 5,
    name: "Happy Client",
    handle: "Instagram Review",
    occasion: "Ready-to-Wear",
    text: "Thank you for the lovely outfit. The moment I wore it I felt so confident and beautiful. You have a true eye for style.",
    stars: 5,
    initials: "H",
    color: "bg-pink-500",
  },
  {
    id: 6,
    name: "Payal Nanda",
    handle: "@payal_nanda",
    occasion: "Trousseau",
    text: "Forever grateful to u my last minute saviour! You always deliver utmost satisfaction based on my preferences.",
    stars: 5,
    initials: "PN",
    color: "bg-rose-400",
  },
];

export default function ClientReviews() {
  return (
    <section className="bg-beige py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
            What Our Clients Say
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
            Client Reviews
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-6 max-w-xl font-body text-sm text-charcoal/60 leading-relaxed">
            Real words from real clients — every garment crafted with care, every occasion made memorable.
          </p>

          {/* Overall rating badge */}
          <div className="mt-8 flex items-center gap-3 bg-white px-7 py-3.5 shadow-sm rounded-full border border-gold/20">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="font-body text-sm font-medium text-charcoal">
              5.0 · 3000+ Happy Clients
            </span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.08}>
              <div className="group relative flex flex-col justify-between h-full bg-white p-8 border border-charcoal/8 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:-translate-y-1">
                {/* Quote icon */}
                <Quote
                  size={28}
                  className="absolute top-6 right-6 text-gold/20 fill-gold/10"
                />

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(review.stars)].map((_, idx) => (
                    <Star key={idx} size={13} className="fill-gold text-gold" />
                  ))}
                </div>

                {/* Review text */}
                <p className="font-body text-[14.5px] leading-relaxed text-charcoal/80 flex-1">
                  "{review.text}"
                </p>

                {/* Divider */}
                <div className="mt-6 h-px w-full bg-charcoal/8" />

                {/* Author */}
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${review.color} text-white font-body text-sm font-semibold`}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-body text-[14px] font-semibold text-charcoal leading-none">
                      {review.name}
                    </p>
                    <p className="mt-1 font-body text-[11px] text-charcoal/45 tracking-wide">
                      {review.occasion} · {review.handle}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
