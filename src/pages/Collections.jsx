import PageBanner from "../components/PageBanner";
import CollectionCard from "../components/CollectionCard";
import { useData } from "../context/DataContext";

export default function Collections() {
  const { collections } = useData();
  return (
    <>
      <PageBanner
        eyebrow="The Full Edit"
        title="Collections"
        description="Six curated worlds of couture — from everyday elegance to once-in-a-lifetime celebration."
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
      />
      <section className="bg-ivory py-24 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(collections).map(([slug, data], i) => (
              <CollectionCard key={slug} index={i} id={slug} title={data.title} description={data.description} image={data.image} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
