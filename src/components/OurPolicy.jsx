import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      id: "exchange",
      title: "Easy Exchange Policy",
      body: "We offer hassle-free exchange policy for all our products.",
      icon: assets.exchange_icon,
      alt: "Easy exchange policy",
    },
    {
      id: "quality",
      title: "Quality Policy",
      body: "We ensure the highest quality standards for all our products.",
      icon: assets.quality_icon,
      alt: "Quality assurance policy",
    },
    {
      id: "support",
      title: "Best Customer Support",
      body: "We offer 24/7 customer support for all our products.",
      icon: assets.support_img,
      alt: "Customer support assistance",
    },
  ];

  return (
    <section
      className="py-20"
      aria-labelledby="policy-heading"
    >
      <h2 id="policy-heading" className="sr-only">
        Our Policies
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 text-center text-xs text-gray-700 sm:grid-cols-3 sm:text-sm md:text-base">
        {policies.map((policy) => (
          <article
            key={policy.id}
            className="section-card flex flex-col items-center gap-3 px-6 py-8"
          >
            <img
              src={policy.icon}
              alt={policy.alt}
              className="h-12 w-12"
              loading="lazy"
            />

            <h3 className="font-semibold">
              {policy.title}
            </h3>

            <p className="max-w-xs text-gray-400">
              {policy.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
