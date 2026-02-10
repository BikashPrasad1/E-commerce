import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="pt-16">
      <div className="text-2xl mb-8">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="section-card p-6">
          <p className="text-sm text-gray-500">Get in touch</p>
          <p className="mt-2 text-xl font-semibold">We would love to help</p>
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <p>Phone: +91-222-222-2222</p>
            <p>Email: support@ecommerce.com</p>
            <p>Address: 221B MG Road, Bengaluru</p>
          </div>
        </div>

        <form className="section-card p-6">
          <p className="text-sm text-gray-500">Send a message</p>
          <div className="mt-4 flex flex-col gap-3">
            <input
              className="border border-gray-300 rounded-xl px-3 py-2"
              type="text"
              placeholder="Your name"
            />
            <input
              className="border border-gray-300 rounded-xl px-3 py-2"
              type="email"
              placeholder="Your email"
            />
            <textarea
              className="border border-gray-300 rounded-xl px-3 py-2 min-h-28"
              placeholder="How can we help?"
            />
            <button
              type="button"
              className="btn-primary text-sm"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 rounded-2xl bg-cover overflow-hidden border border-slate-200 shadow-lg">
        <img src={assets.contact_img} alt="Contact us" className="w-full h-100" />
      </div>
    </div>
  );
};

export default Contact;
