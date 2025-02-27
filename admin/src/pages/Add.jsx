import React, { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [size, setSize] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  
  // Added loading state
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Set loading state to true when form is submitted
    setIsLoading(true);
    setSubmitStatus({ type: "", message: "" });
    
    try {
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", String(bestseller));
      
      if (size.length > 0) {
        formData.append("sizes", JSON.stringify(size)); // Fix key name from "size" to "sizes"

      }
      
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
  
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { 
          token,
          'Content-Type': 'multipart/form-data'
        }
       
      });
  
     if(response.data.success){
      toast.success(response.data.message)
     }
      
      // Reset form after successful submission
      setName("");
      setDescription("");
      setPrice("");
      setSize([]);
      setBestseller(false);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      
      // Show success message
      setSubmitStatus({ 
        type: "success", 
        message: "Product added successfully!" 
      });
      
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      // Show error message
      setSubmitStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Failed to add product. Please try again." 
      });
    } finally {
      // Set loading state to false when form submission completes
      setIsLoading(false);
    }
  };
  
  // Helper function to toggle size selection
  const toggleSize = (sizeValue) => {
    setSize(prevSize => 
      prevSize.includes(sizeValue) 
        ? prevSize.filter(item => item !== sizeValue) 
        : [...prevSize, sizeValue]
    );
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="flex flex-col w-full items-start gap-3">
        <p className="mb-3">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="type here"
          required
          className="w-full max-w-[500px] px-3 py-2 border"
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="write content here"
          required
          className="w-full max-w-[500px] px-3 py-2 border"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="1999"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Size</p>
        <div className="flex gap-3">
          <div onClick={() => toggleSize("S")}>
            <p className={`${size.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              S
            </p>
          </div>
          <div onClick={() => toggleSize("M")}>
            <p className={`${size.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              M
            </p>
          </div>
          <div onClick={() => toggleSize("L")}>
            <p className={`${size.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              L
            </p>
          </div>
          <div onClick={() => toggleSize("XL")}>
            <p className={`${size.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              XL
            </p>
          </div>
          <div onClick={() => toggleSize("XXL")}>
            <p className={`${size.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      {/* Status message display */}
      {submitStatus.message && (
        <div className={`mt-3 p-2 ${submitStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {submitStatus.message}
        </div>
      )}

      <button 
        type="submit" 
        className="w-24 px-3 py-2 bg-black text-white mt-4 relative"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">ADD</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          "ADD"
        )}
      </button>
    </form>
  );
};

export default Add;