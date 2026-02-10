import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative top-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
      aria-labelledby="hero-heading"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2">

        {/* Left Content */}
        <div className="flex items-center justify-center px-6 py-14 sm:px-12">
          <div className="max-w-md text-slate-700">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold tracking-widest text-slate-500">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden />
              <p className="uppercase">
                OUR BESTSELLERS
              </p>
            </div>

            <h1
              id="hero-heading"
              className="font-prata mb-5 text-4xl leading-tight sm:text-5xl lg:text-6xl text-slate-900"
            >
              Crafted Essentials For Modern Lives
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Discover refined everyday styles with premium fabric, bold
              silhouettes, and elevated comfort.
            </p>

            <Link
              to="/collection"
              className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 btn-primary"
            >
              SHOP NOW
            </Link>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white/40 to-indigo-50/60" />
          <img
            src={assets.hero_img}
            alt="Latest fashion arrivals"
            loading="eager"
            fetchPriority="high"
            className="relative h-full w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
