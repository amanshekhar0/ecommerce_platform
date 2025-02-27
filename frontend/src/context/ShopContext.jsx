import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 20;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({}); // Ensuring cartItems is always an object
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // Function to add product to cart
  const addToCart = async (itemId, size) => {
    toast.success("Product added to cart");

    let cartData = { ...cartItems }; // Clone the object safely

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Function to get total cart count
  const getCartCount = () => {
    let totalCount = 0;

    Object.values(cartItems).forEach((sizes) => {
      Object.values(sizes).forEach((quantity) => {
        totalCount += quantity;
      });
    });

    return totalCount;
  };

  // Function to update product quantity in cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Function to fetch user cart from API
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });

      if (response.data.success) {
        setCartItems(response.data.cart || {}); // Ensure it's always an object
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to calculate total cart amount
  const getCartAmount = () => {
    if (!cartItems || typeof cartItems !== "object") return 0; // Prevent errors

    let totalAmount = 0;
    Object.keys(cartItems).forEach((itemId) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        Object.values(cartItems[itemId]).forEach((quantity) => {
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        });
      }
    });

    return totalAmount;
  };

  // Function to fetch products from API
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");


      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export  {ShopContextProvider};
