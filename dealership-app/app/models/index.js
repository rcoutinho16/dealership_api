const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Premise = global.Premise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.cars = require("./car.model");
db.dealership = require("./dealership.model");

module.exports = db;