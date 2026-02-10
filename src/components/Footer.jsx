import { assets } from "../assets/assets";

const Footer = () => {
  const companyLinks = ["Home", "About Us", "Delivery", "Privacy Policy"];
  const contactInfo = ["+91-222-222-2222", "support@ecommerce.com"];

  return (
    <footer className="mt-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 text-sm sm:grid-cols-[3fr_1fr_1fr] my-10">
          {/* Brand */}
          <div>
            <img
              src={assets.logo}
              alt="E-Commerce brand logo"
              className="mb-5 w-32"
              loading="lazy"
            />
            <p className="text-slate-600 md:w-2/3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Company Links */}
          <nav aria-label="Company">
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-slate-600">
              {companyLinks.map((item) => (
                <li key={item} className="cursor-pointer hover:underline">
                  {item}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-slate-600">
              {contactInfo.map((item) => (
                <li key={item} className="cursor-pointer hover:underline">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-slate-200" />

        <p className="text-center text-slate-500 text-sm my-5">
          {"\u00A9"} {new Date().getFullYear()} E-Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
