import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import CustomProcess from "../components/CustomProcess";
import BridalShowcase from "../components/BridalShowcase";
import About from "../components/About";
import InstagramCTA from "../components/InstagramCTA";
import Newsletter from "../components/Newsletter";
import Contact from "../components/Contact";

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://mcouture.in/#website",
        "url": "https://mcouture.in/",
        "name": "M'Couture by Minky Narang",
        "description": "Luxury Women's Couture — Custom Bridal, Trousseau & Ready-to-Wear",
        "publisher": {
          "@id": "https://mcouture.in/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://mcouture.in/#organization",
        "name": "M'Couture by Minky Narang",
        "url": "https://mcouture.in/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://m-couture.onrender.com/favicon.svg"
        }
      },
      {
        "@type": "ClothingStore",
        "@id": "https://mcouture.in/#store",
        "name": "M'Couture by Minky Narang",
        "url": "https://mcouture.in/",
        "image": "https://m-couture.onrender.com/favicon.svg",
        "description": "Premium Haryana-based boutique for luxury women's couture, custom bridal wear, trousseau collections, and elegant ready-to-wear.",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Haryana",
          "addressCountry": "IN"
        },
        "priceRange": "$$$"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Home"
        canonical="https://mcouture.in/"
        schema={homeSchema}
      />
      <Hero />

      <CustomProcess />
      {/* <BridalShowcase /> */}
      <About />
      <InstagramCTA />
      <Newsletter />
      <Contact />
    </>
  );
}
