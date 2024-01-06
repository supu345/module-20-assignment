const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
  date: Date,
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
