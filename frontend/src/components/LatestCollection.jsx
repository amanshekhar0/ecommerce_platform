import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const [lastestProducts, setLastestProducts] = useState([]);

  useEffect(()=>{
    setLastestProducts(products.slice(0,10))
  },[])
  const { products } = useContext(ShopContext);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
  Stay ahead of the trends with our latest collection.  
  Discover fresh styles, premium quality, and the perfect fit for every occasion!
</p>

      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols4 lg:grid-cols-5 gap-4 gap-y-6">
        {lastestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
