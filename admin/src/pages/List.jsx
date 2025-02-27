import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/remove/${id}`,  // Send ID in URL
        { headers: { token } }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete product");
    }
  };
  
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">All Product List</h2>

      <div className="flex flex-col gap-3 shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 bg-gray-200 text-sm font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Empty State */}
        {list.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-lg">No products available</div>
        ) : (
          list.map((item) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-4 px-6 border-b hover:bg-gray-100 transition-all"
              key={item._id}
            >
              {/* Product Image */}
              <div className="flex items-center justify-center">
                <img
                  className="w-16 h-16 object-cover rounded-lg shadow-md border border-gray-300"
                  src={item.image[0]}
                  alt={item.name}
                />
              </div>

              {/* Product Name */}
              <p className="font-semibold text-gray-900 truncate">{item.name}</p>

              {/* Category */}
              <p className="text-gray-600">{item.category}</p>

              {/* Price */}
              <p className="font-medium text-gray-800">
                {currency}
                {item.price.toLocaleString()}
              </p>

              {/* Delete Button */}
              <div className="flex justify-end md:justify-center">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-transform transform hover:scale-110 shadow-md"
                  aria-label="Delete product"
                  onClick={() => removeProduct(item._id)}
                >
                  <span className="text-2xl font-bold">×</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
