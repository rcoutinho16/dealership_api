const router = require('express').Router();
const car = require("../controller/car.controller");
const middleware = require("../middlewares")

// Getting All Cars
router.get('/', car.getCars);

// Getting One Car
router.get('/:id', middleware.getCar.getCar, car.getCarById);

// Creating One Car
router.post('/', car.createCar);

// Updating One Car
router.put('/:id', middleware.getCar.getCar, car.updateCar);

// Deleting One Car
router.delete('/:id', middleware.getCar.getCar, car.deleteCar);

module.exports = router