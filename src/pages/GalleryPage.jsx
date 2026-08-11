import PageBanner from "../components/PageBanner";
import BestsellersCarousel from "../components/BestsellersCarousel";
import OurClients from "../components/OurClients";
import ClientReviews from "../components/GoogleReviews";
import ExhibitionVenues from "../components/ExhibitionVenues";
import SEO from "../components/SEO";

export default function GalleryPage() {
  return (
    <>
      <SEO 
        title="Gallery & Venues"
        description="Discover our bestsellers, client stories, and upcoming showcases."
        canonical="https://mcouture.in/gallery"
        ogImage="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=100&w=3840&auto=format&fit=crop"
      />
      <PageBanner
        eyebrow="The M'Couture Experience"
        title="Gallery & Venues"
        description="Discover our bestsellers, client stories, and upcoming showcases."
        image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=100&w=3840&auto=format&fit=crop"
      />
      <BestsellersCarousel />
      <OurClients />
      <ClientReviews />
      <ExhibitionVenues />
    </>
  );
}
