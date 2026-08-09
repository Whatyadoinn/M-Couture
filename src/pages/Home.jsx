import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CustomProcess from "../components/CustomProcess";
import BridalShowcase from "../components/BridalShowcase";
import About from "../components/About";
import InstagramCTA from "../components/InstagramCTA";
import Newsletter from "../components/Newsletter";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
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
