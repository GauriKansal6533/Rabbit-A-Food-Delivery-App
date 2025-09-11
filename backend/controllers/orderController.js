import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order Controller
const placeOrder = async (req, res) => {
  const frontend_url = "https://rabbit-a-food-delivery-appfrontend.onrender.com";
  const userId = req.userId;
  const { items, amount, address } = req.body;

  if (!items || !amount || !address) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: items, amount, and address",
    });
  }

  try {
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 20 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order, please try again later",
    });
  }
};

// Verify Order Controller
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// Get user orders (protected)
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// listing orders for admin panel
const listOrders = async (req,res) => {
try {
  const orders = await orderModel.find({});
  res.json({success:true,data:orders})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}

// api for updating order status
const updateStatus = async (req,res) => {
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"Status Updated"})
} catch (error) {
  console.log(Error)
  res.json({success:false,message:"error"})
}
}

export { placeOrder, verifyOrder, userOrders,listOrders,updateStatus };
