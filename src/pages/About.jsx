import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="pt-16">
      <div className="text-2xl mb-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <img
          src={assets.about_img}
          alt="About our brand"
          className="w-full rounded-2xl object-cover shadow-lg border border-slate-200"
        />
        <div className="text-gray-600 section-card p-6">
          <p className="mb-4">
            We build modern essentials with a focus on quality fabrics and
            timeless cuts. Our mission is to make everyday style effortless and
            reliable.
          </p>
          <p className="mb-4">
            Every piece is thoughtfully designed, responsibly sourced, and
            tested for comfort. We believe in fewer, better items that last.
          </p>
          <p>
            From design to delivery, we keep the experience smooth, transparent,
            and customer-first.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Premium Materials",
            body: "Soft, durable fabrics chosen for comfort and longevity.",
          },
          {
            title: "Thoughtful Design",
            body: "Timeless silhouettes made to fit real life.",
          },
          {
            title: "Customer Support",
            body: "Fast responses and easy returns when you need them.",
          },
        ].map((item) => (
          <div key={item.title} className="section-card p-5">
            <p className="font-semibold">{item.title}</p>
            <p className="mt-2 text-sm text-gray-500">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
