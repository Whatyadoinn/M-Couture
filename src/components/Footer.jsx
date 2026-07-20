import { Link } from "react-router-dom";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import { navLinks } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="bg-charcoal px-6 pb-8 pt-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-3xl text-white">
              M&apos;Couture
            </Link>
            <p className="mt-1 font-body text-[11px] tracking-luxe text-gold-light uppercase">
              by Minky Narang
            </p>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-beige/60">
              Luxury women&apos;s couture, custom bridal wear and trousseau
              collections — handcrafted in Haryana.
            </p>
            <div className="mt-6 flex gap-4">
              {[InstagramIcon, FacebookIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-beige/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs tracking-luxe text-gold-light uppercase">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-beige/70 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs tracking-luxe text-gold-light uppercase">
              Contact
            </p>
            <ul className="mt-5 space-y-3 font-body text-sm text-beige/70">
              <li>M&apos;Couture Atelier, Haryana, India</li>
              <li>
                <a href="tel:+919876543210" className="hover:text-gold-light">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:hello@mcouture.in" className="hover:text-gold-light">
                  hello@mcouture.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="font-body text-xs text-beige/50">
            &copy; {new Date().getFullYear()} M&apos;Couture by Minky Narang. All rights reserved.
          </p>
          <p className="font-body text-xs text-beige/50">
            Crafted with care, in Haryana.
          </p>
        </div>
      </div>
    </footer>
  );
}
