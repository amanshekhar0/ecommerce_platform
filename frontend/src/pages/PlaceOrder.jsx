import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  // Move useContext inside the component
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        //api call for cod
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            setCartItems({});
            navigate("/orders");
            console.log(response.data.success);
          } else {
            toast.error(response.data.message);
          }

          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh]"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            className="border border-gray-200 rounded py-1.5 px-3 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            className="border border-gray-200 rounded py-1.5 px-3 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          className="border border-gray-200 rounded py-1.5 px-3 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          className="border border-gray-200 rounded py-1.5 px-3 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            className="border border-gray-200 rounded py-1.5 px-3 w-full"
          />
          <input
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            className="border border-gray-200 rounded py-1.5 px-3 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Pincode"
            onChange={onChangeHandler}
            name="pincode"
            value={formData.pincode}
            required
            className="border border-gray-200 rounded py-1.5 px-3 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            className="border border-gray-200 rounded py-1.5 px-3 w-full"
          />
          <input
            type="number"
            placeholder="Phone Number"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
            className="border border-gray-200 rounded py-1.5 px-3 w-full"
          />
        </div>
      </div>

      <div className="mt-8">
        <CartTotal />
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              className="flex items-center gap-2 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`min-w-[14px] h-[14px] border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="Stripe" />
            </div>
            <div
              className="flex items-center gap-2 border p-2 px-3 cursor-pointer"
              onClick={() => toast.error("Currently unavailable")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img
                src={assets.razorpay_logo}
                className="h-5 mx-4"
                alt="Razorpay"
              />
            </div>
            <div
              className="flex items-center gap-2 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white text-sm px-8 py-3 rounded-xl"
              type="submit"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
