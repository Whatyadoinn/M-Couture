import PageBanner from "../components/PageBanner";
import Gallery from "../components/Gallery";
import OurClients from "../components/OurClients";

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="In Frame"
        title="Gallery"
        description="Editorial moments and behind-the-scenes glimpses from the M'Couture atelier."
        image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600&auto=format&fit=crop"
      />
      <Gallery />
      <OurClients />
    </>
  );
}
