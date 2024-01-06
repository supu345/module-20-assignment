const Employee = require("../models/Employee");

exports.departmentSalaryExpense = async (req, res) => {
  try {
    // Assuming your Employee model has fields 'department' and 'salary'
    const employees = await Employee.find();
    console.log("Retrieved employees:", employees);
    // Calculate total salary expense for each department
    const departmentSalaryExpense = employees.reduce((acc, employee) => {
      const { department, salary } = employee;

      if (!acc[department]) {
        acc[department] = 0;
      }

      acc[department] += salary;
      return acc;
    }, {});

    res.json({ departmentSalaryExpense });
  } catch (error) {
    res.status(500).json({
      error: "Failed to calculate department salary expense",
      details: error.message,
    });
  }
};
