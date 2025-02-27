import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { token, setCartitems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Use navigate directly instead of from context

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`, // Fixed API endpoint
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartitems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Payment verification failed");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, backendUrl, searchParams, setCartitems, navigate]); // Added missing dependencies

  return <div>Verifying payment...</div>;
};

export default Verify;
