const express = require("express");

const {
  totalRevenue,
  quantityByProduct,
  topProducts,
  averagePrice,
  revenueByMonth,
  highestQuantitySold,
} = require("../controllers/salesController");
const {
  departmentSalaryExpense,
} = require("../controllers/employeeController");
const router = express.Router();

router.get("/total-revenue", totalRevenue);
router.get("/sales/quantity-by-product", quantityByProduct);
router.get("/sales/top-products", topProducts);
router.get("/sales/average-price", averagePrice);
router.get("/sales/revenue-by-month", revenueByMonth);
router.get("/sales/highest-quantity-sold", highestQuantitySold);
router.get("/sales/department-salary-expense", departmentSalaryExpense);

module.exports = router;
