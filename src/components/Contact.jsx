import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";
import Reveal from "./Reveal";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { sanitizeForm, isValidEmail, rateLimit } from "../lib/security";
import toast from "react-hot-toast";

const details = [
  {
    icon: MapPin,
    label: "Boutique Location",
    value: "M'Couture Atelier, Haryana, India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919053040305",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@mcouture.in",
    href: "mailto:[EMAIL_ADDRESS]",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@mcouture.byminkynarang",
    href: "https://www.instagram.com/m_couture_by_minkynarang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanForm = sanitizeForm(form);
    
    if (!cleanForm.name || !cleanForm.email || !cleanForm.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    if (!isValidEmail(cleanForm.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Rate limit: 3 messages per hour
    const { allowed, resetIn } = rateLimit("contact-form", 3, 3600000);
    if (!allowed) {
      const minutes = Math.ceil(resetIn / 60000);
      toast.error(`Too many messages. Please try again in ${minutes} minutes.`);
      return;
    }

    setStatus("sending");
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...cleanForm,
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent successfully. We'll be in touch soon.");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("idle");
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="bg-charcoal py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-body text-xs tracking-luxe text-gold-light uppercase">
            Get in Touch
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-white">
            Visit or Write to Us
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-2">
          {/* Details */}
          <Reveal delay={0.1}>
            <div className="space-y-7">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50">
                    <Icon size={17} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-[11px] tracking-widest uppercase text-beige/60">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-1 block font-body text-[15px] text-white hover:text-gold-light transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-body text-[15px] text-white">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2.5 bg-gold px-7 py-3.5 font-body text-xs tracking-luxe uppercase text-charcoal transition-transform hover:scale-[1.02]"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  disabled={status === "sending"}
                  className="w-full border-b border-white/25 bg-transparent py-3 font-body text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  disabled={status === "sending"}
                  className="w-full border-b border-white/25 bg-transparent py-3 font-body text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your occasion..."
                  disabled={status === "sending"}
                  className="w-full resize-none border-b border-white/25 bg-transparent py-3 font-body text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="mt-4 flex w-full justify-center border border-gold py-3.5 font-body text-xs tracking-luxe uppercase text-gold transition-colors hover:bg-gold hover:text-charcoal sm:w-auto sm:px-10 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gold"
              >
                {status === "sending" ? (
                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                ) : status === "sent" ? (
                  "Message Sent"
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
