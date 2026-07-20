import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { sanitize, isValidEmail, rateLimit } from "../lib/security";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cleanEmail = sanitize(email);
    
    if (!isValidEmail(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Rate limit: max 2 signups per hour per client
    const { allowed, resetIn } = rateLimit("newsletter-signup", 2, 3600000);
    if (!allowed) {
      const minutes = Math.ceil(resetIn / 60000);
      toast.error(`Please wait ${minutes} minutes before trying again.`);
      return;
    }

    setLoading(true);
    try {
      // Mock network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("You're on the list — welcome to M'Couture.");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-y border-gold/20 bg-ivory py-16 px-6 lg:px-12">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="font-body text-xs tracking-luxe text-gold-dark uppercase">
          Stay In Touch
        </p>
        <h3 className="mt-3 font-display text-2xl md:text-3xl text-charcoal">
          Join our private list for early access to new collections
        </h3>
        <form
          onSubmit={handleSubmit}
          className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Your email address"
            className="flex-1 border border-charcoal/20 bg-white px-5 py-3 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-charcoal px-6 py-3 font-body text-xs tracking-luxe uppercase text-white transition-colors hover:bg-gold hover:text-charcoal disabled:opacity-50"
          >
            {loading ? (
               <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Subscribe
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
