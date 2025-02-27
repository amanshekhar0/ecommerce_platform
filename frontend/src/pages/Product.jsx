import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Relatedproduct from "../components/Relatedproduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-300 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto max-h-[600px] justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover hover:opacity-80 transition-opacity"
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              className="w-full h-auto object-contain max-h-[600px]"
              alt="Product main image"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 font-medium text-2xl mt-2">
          <h1 className="text-3xl font-bold">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
         
            <img src={assets.star_icon} alt="Star rating" className="w-6 h-6" />
            <img src={assets.star_icon} alt="Star rating" className="w-6 h-6" />
            <img src={assets.star_icon} alt="Star rating" className="w-6 h-6" />
            <img src={assets.star_icon} alt="Star rating" className="w-6 h-6" />
            <img
              src={assets.star_dull_icon}
              alt="Star rating"
              className="w-6 h-6"
            />
            <p className="pl-2 text-base">(122)</p>
          </div>
          <p className="w-3/4 text-base mt-4">{productData.description}</p>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={` py-2 px-4 border-2 bg-gray-100${item === size ? " bg-gray-200" : ""}  border-gray-200 rounded-md`}
                >
                  <p>{item}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <button
              className="bg-black text-white px-8 py-3  text-sm active:bg-gray-700"
              onClick={() => addToCart(productData._id, size)}
            >
              Add to Cart
            </button>
            <hr className="mt-8 sm w-4/5" />
            <div className="text-sm text-gray-600 mt-3 flex flex-col gap-1">
              <p>100% original product</p>
              <p>cash on delivery available</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 mt-4 border-1 text-sm text-gray-700">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            optio rem laboriosam ex commodi reprehenderit! Quod explicabo dolore
            beatae sequi facilis eius voluptas ab, qui magni unde, ad totam
            pariatur.lorem
          </p>
        </div>
      </div>

      {/*related products */}
      <Relatedproduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
