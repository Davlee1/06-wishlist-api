const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, "Please provide item name"],
      maxlength: 100,
    },
    imageURL:{
        type: String,
      required: false,
      maxlength: 100,   
    },
    link: {
      type: String,
      required: false,
      maxlength: 100,
    },
    description: {
      type: String,
      required: false,
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
