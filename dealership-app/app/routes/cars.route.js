const router = require('express').Router();
const car = require("../controller/car.controller");
const middleware = require("../middlewares");

// Getting All Cars
router.get('/', car.getCars);

// Getting One Car
router.get('/:id', middleware.getCar.getCar, car.getCarById);

// Creating One Car
router.post('/', 
    [
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdmin
    ], car.createCar
);

// Updating One Car
router.put('/:id', 
    [
        middleware.getCar.getCar,
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdmin
    ], car.updateCar
);

// Deleting One Car
router.delete('/:id',
    [
        middleware.getCar.getCar,
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdmin
    ], car.deleteCar
);

module.exports = router