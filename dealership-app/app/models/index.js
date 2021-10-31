const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Premise = global.Premise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.car = require("./car.model");
db.dealership = require("./dealership.model");
db.role = require("./role.model");
db.user = require("./user.model");

//set roles
db.ROLES = new Set();
db.ROLES.add("user");
db.ROLES.add("admin");

module.exports = db;