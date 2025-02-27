import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, navigate, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
   if(products.length>0){
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
   }
  }, [cartItems,products]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t pt-14 pb-8">
        <div className="mb-8">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        {cartData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr] gap-4 pb-4 border-b text-sm font-medium text-gray-500">
              <div>Product</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Price</div>
            </div>

            {/* Cart Items */}
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-4 py-6 border-b"
                >
                  {/* Product Info */}
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        className="w-full h-full object-cover object-center"
                        src={
                          productData?.image?.[0] || assets.placeholder_image
                        }
                        alt={productData?.name || "Product"}
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">
                          {productData?.name || "Unknown Product"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                      </div>
                      <div className="sm:hidden mt-2">
                        <p className="text-sm font-medium text-gray-900">
                          {currency}
                          {productData?.price || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center">
                    <input
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="w-16 text-center border border-gray-300 rounded-md py-1.5 px-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (!newValue || newValue <= 0) return;
                        updateQuantity(item._id, item.size, newValue);
                      }}
                    />
                    <img
                      onClick={() =>
                        updateQuantity(item._id, item.size, (item.quantity = 0))
                      }
                      src={assets.bin_icon}
                      className="w-4 ml-4 mr-4 sm:w-5 cursor-pointer"
                      alt="Delete"
                    />
                  </div>

                  {/* Price */}
                  <div className="hidden sm:flex items-center justify-center">
                    <p className="text-base font-medium text-gray-900">
                      {currency}
                      {productData?.price || 0}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Summary */}
          </div>
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button onClick={() => navigate("/place-order")}
            className="bg-black text-white text-sm my:8 px-8 py-3 rounded-1xl">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
