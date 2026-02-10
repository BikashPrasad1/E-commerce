import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products = [] } = useContext(ShopContext);

  // Derived data (latest products)
  const latestProducts = useMemo(() => {
    return products.slice(0, 10);
  }, [products]);

  if (!latestProducts.length) {
    return (
      <section className="my-12 text-center">
        <Title text1="Latest" text2="Collection" />
        <p className="mt-6 text-sm text-gray-500">No products available.</p>
      </section>
    );
  }

  return (
    <section className="my-12">
      {/* Header */}
      <div className="px-4 text-center">
        <Title text1="Latest" text2="Collection" />
        <p className="mx-auto mt-3 max-w-3xl text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ratione
          voluptatibus debitis veritatis. Ut pariatur quam quaerat.
        </p>
      </div>

      {/* Products */}
      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
