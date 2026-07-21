import { MapPin, Calendar } from "lucide-react";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";

export default function ExhibitionVenues() {
  const { exhibitions } = useData();

  if (exhibitions.length === 0) return null;
  return (
    <section className="bg-charcoal py-28 px-6 lg:px-12 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Exhibitions List */}
        <Reveal className="flex flex-col items-center text-center mb-16">
          <p className="font-body text-xs tracking-luxe text-gold-light uppercase">
            On The Road
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-white">
            Exhibition Venues
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibitions.map((expo, i) => (
            <Reveal key={expo.id} delay={i * 0.15}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden mb-6">
                  <img 
                    src={expo.image} 
                    alt={expo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-2xl text-gold-light mb-4 group-hover:text-gold transition-colors">
                  {expo.title}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/70">
                    <Calendar size={16} className="text-gold" />
                    <span className="font-body text-[13px]">{expo.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin size={16} className="text-gold" />
                    <span className="font-body text-[13px]">{expo.location}</span>
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
