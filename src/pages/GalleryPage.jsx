import PageBanner from "../components/PageBanner";
import BestsellersCarousel from "../components/BestsellersCarousel";
import OurClients from "../components/OurClients";
import GoogleReviews from "../components/GoogleReviews";
import ExhibitionVenues from "../components/ExhibitionVenues";

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="The M'Couture Experience"
        title="Gallery & Venues"
        description="Discover our bestsellers, client stories, and upcoming showcases."
        image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600&auto=format&fit=crop"
      />
      <BestsellersCarousel />
      <OurClients />
      <ExhibitionVenues />
      <GoogleReviews />
    </>
  );
}
