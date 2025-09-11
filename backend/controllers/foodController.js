import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`; // ✅ corrected syntax

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename, // ✅ correct
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food item added successfully", food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to add food item", error });
  }
};

// list food items
const listFood = async (req, res) => {
  try {
    const foodItems = await foodModel.find({});
    res.json({ success: true, data: foodItems }); // ✅ now 'data' not 'foodItems'
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch food items", error });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to remove food item", error });
  }
};

export { addFood, listFood, removeFood };
