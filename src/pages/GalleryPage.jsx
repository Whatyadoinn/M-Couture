import PageBanner from "../components/PageBanner";
import OurClients from "../components/OurClients";
import ClientReviews from "../components/GoogleReviews";
import ExhibitionVenues from "../components/ExhibitionVenues";

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="The M'Couture Experience"
        title="Gallery & Venues"
        description="Discover our client stories and upcoming showcases."
        image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=100&w=3840&auto=format&fit=crop"
      />
      <OurClients />
      <ClientReviews />
      <ExhibitionVenues />
    </>
  );
}
