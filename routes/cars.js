const express = require('express');
const router = express.Router();

const Car = require('../models/car');

// Getting All Cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Car
router.get('/:id', getCar, (req, res) => {
    res.send(res.car);
});

// Creating One Car
router.post('/', async (req, res) => {
    const car = new Car({
        make: req.body.make,
        model: req.body.model,
        price: req.body.price,
        year: req.body.year,
        km: req.body.km,
        show: req.body.show,
        images: req.body.images
    });
    try {
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One Car
router.put('/:id', getCar, async (req, res) => {
    try {
        const updatedCar = await Car.updateOne({ '_id': res.car._id }, req.body);
        res.json(updatedCar);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Deleting One Car
router.delete('/:id', getCar, async (req, res) => {
    try {
        await res.car.deleteOne();
        res.json({ message: 'Deleted car' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// middleware
async function getCar(req, res, next) {
    let car;
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            car = await Car.findById(req.params.id);
        }
        if (car == null){
            return res.status(404).json({ message: 'Cannot find car' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.car = car;
    next();
}

module.exports = router