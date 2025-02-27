import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const statusHandler =async (event,orderId)=>{
    try {
      const response = await axios.post (backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}});
      if(response.data.success){
        await fetchAllOrders()

      }
    } catch (error) {
      console.log(error);
      
      toast.error(response.data.message)
    }
    
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]); // Fetch orders when token changes

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order, orderIndex) => (
            <div key={orderIndex} className="border rounded-lg shadow-lg p-6 bg-white">
              {/* Order Header */}
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <div className="flex items-center gap-4">
                  <img src={assets.parcel_icon} alt="Parcel Icon" className="w-10 h-10" />
                  <p className="text-lg font-semibold text-gray-700">Order #{orderIndex + 1}</p>
                </div>
                <p className="text-sm text-gray-600">📅 {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Ordered Items */}
              <div className="text-sm text-gray-600 mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Ordered Items:</h3>
                {order.items.map((item, index) => (
                  <p key={index} className="ml-3">
                    ➤ {item.name} <span className="font-semibold">x {item.quantity}</span>
                  </p>
                ))}
              </div>

              {/* Address Section - Compact Layout */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-gray-800 font-medium mb-2">Shipping Address</h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span> {order.address?.firstName} {order.address?.lastName}  
                  <span className="ml-4 font-semibold">Phone:</span> {order.address?.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Street:</span> {order.address?.street}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">City:</span> {order.address?.city},  
                  <span className="ml-2 font-semibold">State:</span> {order.address?.state},  
                  <span className="ml-2 font-semibold">Pincode:</span> {order.address?.pincode}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Country:</span> {order.address?.country}
                </p>
              </div>

              {/* Order Status & Payment Details */}
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-semibold">Status:</span>{currency} {order.status}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> ₹{order.amount}
                </p>
                <p>
                  <span className="font-semibold">Items:</span> {order.items.length}
                </p>
                <p>
                  <span className="font-semibold">Method:</span> {order.paymentMethod}
                </p>
               
               <select onChange={(event) => statusHandler(event,order._id)} value={order.status}>
                <option value="order place">order placed</option>
                <option value="packing">packing</option>
                <option value="shipped">shipped</option>
                <option value="out for delivery">out for delivery</option>
                <option value="delivered">delivered</option>
               </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
