const Sales = require("../models/salesModel");

exports.totalRevenue = async (req, res) => {
  try {
    const sales = await Sales.find();
    console.log("Sales data:", sales);

    const totalRevenue = sales

      .map((sale) => sale.quantity * sale.price)

      .reduce((acc, currentValue) => acc + currentValue, 0);

    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.quantityByProduct = async (req, res) => {
  try {
    const quantityByProduct = await Sales.aggregate([
      { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } },
    ]);
    res.json(quantityByProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate quantity by product" });
  }
};

exports.topProducts = async (req, res) => {
  try {
    const topProducts = await Sales.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
    ]);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve top products" });
  }
};

exports.averagePrice = async (req, res) => {
  try {
    const averagePrice = await Sales.aggregate([
      { $group: { _id: null, averagePrice: { $avg: "$price" } } },
    ]);
    res.json(averagePrice);
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate average price" });
  }
};

exports.revenueByMonth = async (req, res) => {
  try {
    const sales = await Sales.find();

    const revenueByMonth = sales.reduce((acc, sale) => {
      const monthYear = new Date(sale.date).toLocaleString("en-us", {
        month: "numeric",
        year: "numeric",
      });
      acc[monthYear] = (acc[monthYear] || 0) + sale.quantity * sale.price;
      return acc;
    }, {});

    res.json({ revenueByMonth });
  } catch (error) {
    res.status(500).json({
      error: "Failed to calculate revenue by month",
      details: error.message,
    });
  }
};

exports.highestQuantitySold = async (req, res) => {
  try {
    const highestQuantitySold = await Sales.findOne().sort("-quantity");
    res.json(highestQuantitySold);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to find product with highest quantity sold" });
  }
};
