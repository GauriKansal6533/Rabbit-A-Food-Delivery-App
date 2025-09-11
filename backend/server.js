import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Static folder for uploaded images
app.use("/images", express.static("uploads"));

// Database connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

  


// Default route
app.get("/", (req, res) => {
  res.send("API Working Successfully 🚀");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
