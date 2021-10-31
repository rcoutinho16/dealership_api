const router = require('express').Router();
const dealership = require("../controller/dealership.controller");

// Getting One Dealership
router.get('/', dealership.getDealership);

// Updating One Dealership
router.put('/:id', dealership.updateDealership);

module.exports = router