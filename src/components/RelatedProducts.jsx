import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";


const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);

    const related = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products
            .filter(item => item.category === category && item.subCategory === subCategory)
            .slice(0, 5);
    }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={"RELATED"} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-7'>
        {related.map((item,index) => (
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
