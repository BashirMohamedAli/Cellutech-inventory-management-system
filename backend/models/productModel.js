const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter product quantity"],
    min: 0,
    default: 1,
  },
 
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
