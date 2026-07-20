import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="font-display text-8xl text-gold-dark">404</p>
      <h1 className="mt-4 font-display text-3xl text-charcoal">
        This Page Has Slipped Off the Runway
      </h1>
      <p className="mt-4 max-w-md font-body text-sm text-charcoal/70">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s guide
        you back to something beautiful.
      </p>
      <Link
        to="/"
        className="mt-8 border border-charcoal px-9 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
      >
        Return Home
      </Link>
    </section>
  );
}
