import { lazy, Suspense } from "react";

const Hero = lazy(() => import("../components/Hero"));
const LatestCollection = lazy(() => import("../components/LatestCollection"));
const BestSeller = lazy(() => import("../components/BestSeller"));
const OurPolicy = lazy(() => import("../components/OurPolicy"));
const NewsLetterBox = lazy(() => import("../components/NewsLetterBox"));

const Home = () => {
  return (
    <main className="space-y-16">
      <Suspense
        fallback={
          <div className="py-10 text-center text-sm text-gray-500">
            Loading...
          </div>
        }
      >
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsLetterBox />
      </Suspense>
    </main>
  );
};

export default Home;
