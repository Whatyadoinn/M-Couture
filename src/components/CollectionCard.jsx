import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CollectionCard({ id, title, description, image, index = 0 }) {
  return (
    <article className="group relative flex flex-col">
      <Link to={`/collections/${id}`} className="group relative flex flex-col h-full">
        <div className="relative aspect-[3/4] overflow-hidden bg-beige">
        <img
          src={image}
          alt={`${title} — M'Couture by Minky Narang`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-5 flex flex-col items-start">
        <h3 className="font-display text-2xl text-charcoal">{title}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70">
          {description}
        </p>
        <button className="mt-4 inline-flex items-center gap-1.5 border-b border-transparent font-body text-xs tracking-luxe uppercase text-gold-dark">
          Explore
          <ArrowUpRight
            size={14}
          />
          </button>
        </div>
      </Link>
    </article>
  );
}
