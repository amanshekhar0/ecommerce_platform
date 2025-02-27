import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { 
        headers: { token } 
      });

      if (response.data.success) {
        let allOrdersItems = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
            console.log(response.data.orders);

          });
        });

        setOrderData(allOrdersItems.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-14 px-4 md:px-8 lg:px-16">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Show message if no orders exist */}
      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orderData.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="order-card border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white shadow-sm"
            >
              {/* Product Image & Details */}
              <div className="flex items-start gap-4 md:gap-6">
                <img src={item.image?.[0]} className="w-20 h-20 object-cover rounded-md shadow-sm" alt="Product" />
                <div>
                  <p className="text-lg font-semibold text-black">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>

              {/* Price, Quantity & Size */}
              <div className="flex items-center gap-3 text-base text-gray-700">
                <p className="font-semibold">{currency}{item.price}</p>
                <p>Qty: {item.quantity}</p>
                {item.size && <p>Size: {item.size}</p>}
              </div>

              {/* Order Date & Payment */}
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Date:</span> {new Date(item.date).toDateString()}
                </p>
                <p>
                  <span className="font-medium">Payment:</span> {item.paymentMethod
                  }
                </p>
              </div>

              {/* Order Status */}
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${item.status === "Shipped" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                <p className="text-black font-medium">{item.status || "Processing"}</p>
              </div>

              {/* Track Order Button */}
              <button className="track-order-btn px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"  onClick={loadOrderData}> 
                Track Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
