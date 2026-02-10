import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext"; // ✅ fixed casing
import Title from "./Title";
import ProductItem from "./ProductItem";

const MAX_ITEMS = 5;

const BestSeller = () => {
  const { products = [] } = useContext(ShopContext);

  const bestSellers = useMemo(() => {
    if (!products.length) return [];

    return products
      .filter(({ bestseller }) => bestseller)

      .slice(0, MAX_ITEMS);
  }, [products]);

  // Avoid rendering empty section

  return (
    <section className="my-12">
      {/* Header */}
      <header className="py-8 text-center">
        <Title text1="BEST" text2="SELLER" />
        <p className="mx-auto mt-3 max-w-3xl text-xs text-gray-600 sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          expedita nisi, facilis molestias voluptate perspiciatis.
        </p>
      </header>

      {/* Products */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellers.map(({ _id, name, image, price }) => (
          <ProductItem
            key={_id}
            id={_id}
            name={name}
            image={image}
            price={price}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
