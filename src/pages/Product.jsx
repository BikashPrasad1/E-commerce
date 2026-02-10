import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      products.map((item) => {
        if (item._id === productId) {
          setProductData(item);
          setImage(item.image?.[0] || "");
        }
      });
    };
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-10 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer rounded-lg border border-slate-200"
              />
            ))}
          </div>
          <div className="w-full ml-4 sm:w-[80%]">
            <img
              src={image}
              alt="Product"
              className="w-full h-auto object-cover rounded-2xl border border-slate-200 shadow-lg"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl mt-2 font-medium text-slate-900">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="text-sm">(120)</p>
          </div>
          <p className="text-3xl font-semibold mt-5 text-slate-900">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-justify text-slate-600">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border border-slate-300 px-3 py-1 rounded-lg hover:border-black transition-colors ${
                    size === item ? "bg-slate-900 text-white" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="btn-primary text-sm disabled:opacity-60"
            disabled={!size}
          >
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col text-slate-500 gap-1 mt-5 text-sm">
            <p>100% Original Product</p>
            <p>Cash on Delivery Available</p>
            <p>Easy Returns and Exchanges policy with 7 days</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex gap-2">
          <p className="border border-slate-200 px-5 py-3 text-sm rounded-xl bg-white">Description</p>
          <p className="border border-slate-200 px-5 py-3 text-sm rounded-xl bg-white">Reviews (120)</p>
        </div>
        <div className="section-card flex flex-col gap-4 mt-4 px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim nihil at eum voluptates, architecto culpa, dolores rem ipsam expedita temporibus in minus corrupti saepe hic, unde itaque non ipsa assumenda!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur nobis, rerum temporibus quas suscipit nam quidem magni architecto sapiente voluptatibus distinctio vel, dicta commodi ullam. Quod maxime consectetur dolore id.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="text-center py-10">
      <p className="text-xl">Product not found</p>
    </div>
  );
};

export default Product;
