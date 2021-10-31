const router = require('express').Router();
const middleware = require("../middlewares");
const dealership = require("../controller/dealership.controller");

// Getting One Dealership
router.get('/', dealership.getDealership);

// Updating One Dealership
router.put('/:id',
    [
        middleware.getCar.getCar,
        middleware.authJwt.verifyToken
    ], dealership.updateDealership);

module.exports = router