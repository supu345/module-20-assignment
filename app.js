// Basic Lib Import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();

// Database Lib Import
const mongoose = require("mongoose");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Mongo DB Database Connection
let URI =
  "mongodb+srv://supu345:user123@cluster0.fcgjuvw.mongodb.net/sales?retryWrites=true&w=majority";
let OPTION = { user: "supu345", pass: "user123", autoIndex: true };
mongoose.connect(URI, OPTION);

// Routing Implement
app.use("/api/v1", router);

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
