import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list as static_food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(""); // store userId
  const [food_list, setFoodList] = useState(static_food_list);
  const url = "http://localhost:4000";

  // Add to cart functionality
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token && userId) {
      try {
        await axios.post(url + "/api/cart/add", { itemId, userId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  // Remove from cart functionality
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    if (token && userId) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId, userId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    if (!cartItems || Object.keys(cartItems).length === 0) return totalAmount;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  // Get total number of items in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const itemId in cartItems) {
      totalItems += cartItems[itemId];
    }
    return totalItems;
  };

  // Fetch food list from API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // Load cart data from API
  const loadCartData = async (token, userId) => {
    try {
      const response = await axios.post(url + "/api/cart/get", { userId }, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  // Load token and userId from localStorage
  useEffect(() => {
    const loadData = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUserId = localStorage.getItem("userId");
      console.log("Loaded token:", savedToken); // Debugging log
      console.log("Loaded userId:", savedUserId); // Debugging log

      if (savedToken && savedUserId) {
        setToken(savedToken);
        setUserId(savedUserId);
        await loadCartData(savedToken, savedUserId);
      }
      await fetchFoodList();
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems, // Expose the getTotalCartItems function
    url,
    token,
    setToken,
    userId,
    setUserId,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
