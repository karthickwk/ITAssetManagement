const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const laptopMappingRoutes = require("./routes/laptopMappingRoutes");
const Employee = require("./models/employee");
const Laptop = require("./models/laptop");
const employee_laptop_history = require("./models/employee_laptop_history");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ITAssetManagementDB');
}

main()
  .then(() => {
    console.log("Connected to database...");
  })
  .catch(err => {
    console.log("Unable to connect to database due to error: " + err);
  });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api", laptopMappingRoutes);

module.exports = app;
