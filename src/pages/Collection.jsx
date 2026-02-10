import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  /* -------------------- CONTROLLED FILTER HANDLERS -------------------- */

  const handleCategoryChange = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubCategoryChange = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  /* -------------------- useMemo OPTIMIZATION -------------------- */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category.length) {
      result = result.filter((item) =>
        category.includes(item.category)
      );
    }

    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchLower)
      );
    }

    if (subCategory.length) {
      result = result.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortType === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, subCategory, sortType, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10">

      {/* LEFT FILTER SECTION */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filter
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-180" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* CATEGORY FILTER */}
        <div className={`section-card pl-5 py-4 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="font-medium text-sm mb-3">CATEGORIES</p>

          {["Men", "Women", "Kids"].map((item) => (
            <label key={item} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={category.includes(item)}
                onChange={() => handleCategoryChange(item)}
              />
              {item}
            </label>
          ))}
        </div>

        {/* SUBCATEGORY FILTER */}
        <div className={`section-card pl-5 py-4 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="font-medium text-sm mb-3">TYPE</p>

          {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
            <label key={item} className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={subCategory.includes(item)}
                onChange={() => handleSubCategoryChange(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT PRODUCT SECTION */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 items-center">
          <Title text1="ALL" text2="COLLECTION" />

          <select
            className="rounded-xl border border-slate-300 bg-white text-sm px-3 py-2 shadow-sm"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="section-card py-12 text-center text-gray-500">
            No products match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-7">
            {filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
