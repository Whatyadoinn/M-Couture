// Centralized site content — collection images are locally stored assets.
import colWestern from "../Images/collection_western.webp";
import colIndoWestern from "../Images/collection_indo_western.webp";
import colTraditional from "../Images/collection_traditional.webp";
import colTrousseau from "../Images/collection_trousseau.webp";
import colKids from "../Images/collection_kids.webp";
import colPreWedding from "../Images/collection_pre_wedding.webp";

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Collections", path: "/collections" },
  { label: "Custom Couture", path: "/custom-couture" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const collections = [
  {
    id: "hand-embroidery",
    title: "Hand Embroidery",
    description: "Masterfully handcrafted pieces featuring zardozi, phulkari, chikankari and more.",
    image: colTraditional,
  },
  {
    id: "indo-western",
    title: "Indo Western",
    description: "A beautiful confluence of modern silhouettes and traditional Indian craft.",
    image: colIndoWestern,
  },
  {
    id: "kids",
    title: "Kids",
    description: "Miniature masterpieces of couture designed so little ones celebrate in style.",
    image: colKids,
  },
  {
    id: "pre-wedding",
    title: "Pre Wedding",
    description: "Romantic, editorial looks for Mehendi, Sangeet and engagement soirées.",
    image: colPreWedding,
  },
  {
    id: "traditional",
    title: "Traditional",
    description: "Heirloom-quality lehengas, sarees and suits that honour India's textile heritage.",
    image: colTrousseau,
  },
  {
    id: "western",
    title: "Western",
    description: "Clean lines, luxurious fabrics and effortless silhouettes for the global woman.",
    image: colWestern,
  },
];

export const customProcessSteps = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We begin with a private conversation to understand your vision, occasion, and personal style.",
  },
  {
    step: "02",
    title: "Design Discussion",
    description:
      "Our design team curates fabrics, silhouettes, and embellishments to bring your idea to life.",
  },
  {
    step: "03",
    title: "Measurements",
    description:
      "Precise measurements and fittings ensure an impeccable, made-for-you silhouette.",
  },
  {
    step: "04",
    title: "Final Delivery",
    description:
      "Each garment is finished by hand and delivered with the care of a true couture atelier.",
  },
];

export const bridalShowcase = [
  {
    id: "bridal-lehengas",
    title: "Bridal Lehengas",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=100&w=3840&auto=format&fit=crop",
    span: "row-span-2",
  },
  {
    id: "reception-gowns",
    title: "Reception Gowns",
    image:
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=100&w=3840&auto=format&fit=crop",
    span: "",
  },
  {
    id: "cocktail-dresses",
    title: "Cocktail Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=100&w=3840&auto=format&fit=crop",
    span: "",
  },
  {
    id: "engagement-looks",
    title: "Engagement Looks",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=100&w=3840&auto=format&fit=crop",
    span: "row-span-2",
  },
  {
    id: "trousseau-showcase",
    title: "Trousseau",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=100&w=3840&auto=format&fit=crop",
    span: "",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594736797933-d0f06ba4bf95?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=100&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=100&w=3840&auto=format&fit=crop",
];
