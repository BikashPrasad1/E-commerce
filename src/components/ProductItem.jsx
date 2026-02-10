import { memo, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const imageSrc = Array.isArray(image) ? image[0] : image;

  return (
    <Link
      to={`/product/${id}`}
      aria-label={`View details for ${name}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
          New
        </span>
      </div>

      {/* Content */}
      <div className="pt-3">
        <p className="line-clamp-2 text-sm font-medium">{name}</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default memo(ProductItem);
