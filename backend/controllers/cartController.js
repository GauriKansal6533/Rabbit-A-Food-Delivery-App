import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if both userId and itemId are present
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "userId and itemId are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get existing cart data or initialize an empty object if no cart data exists
    const cartData = userData.cartData || {};

    // Add the item to the cart or increase its quantity
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    // Update the user's cart data
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart successfully", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add item to cart", error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if both userId and itemId are present
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "userId and itemId are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      // Decrease the item quantity by 1
      cartData[itemId] -= 1;
    }

    // If the item quantity becomes 0 or negative, delete it from the cart
    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    // Update the user's cart data
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart successfully", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to remove item from cart", error: error.message });
  }
};

// Fetch user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if userId is present
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, message: "Cart fetched successfully", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch cart", error: error.message });
  }
};

export { addToCart, removeFromCart, getCart };
