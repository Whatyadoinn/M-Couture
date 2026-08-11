import PageBanner from "../components/PageBanner";
import CollectionCard from "../components/CollectionCard";
import { collectionsMeta } from "../data/products";
import SEO from "../components/SEO";

export default function Collections() {
  const collectionsUrl = "https://mcouture.in/collections";
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mcouture.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Collections",
        "item": collectionsUrl
      }
    ]
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Collections | M'Couture",
    "description": "Six curated worlds of couture — from everyday elegance to once-in-a-lifetime celebration.",
    "url": collectionsUrl
  };

  return (
    <>
      <SEO 
        title="Collections" 
        description="Six curated worlds of couture — from everyday elegance to once-in-a-lifetime celebration."
        canonical={collectionsUrl}
        schema={[breadcrumbSchema, collectionPageSchema]}
      />
      <PageBanner
        eyebrow="The Full Edit"
        title="Collections"
        description="Six curated worlds of couture — from everyday elegance to once-in-a-lifetime celebration."
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=100&w=3840&auto=format&fit=crop"
        disableAnimation={true}
      />
      <section className="bg-ivory py-24 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(collectionsMeta).map(([slug, data], i) => (
              <CollectionCard key={slug} index={i} id={slug} title={data.title} description={data.description} image={data.image} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
