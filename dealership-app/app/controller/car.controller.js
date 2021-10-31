const db = require('../models');
const Car = db.car;

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCarById = (req, res) => {
    res.send(res.car);
};

exports.createCar = async (req, res) => {
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
};

exports.updateCar = async (req, res) => {
    try {
        const updatedCar = await Car.updateOne({ '_id': res.car._id }, req.body);
        res.json(updatedCar);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await res.car.deleteOne();
        res.json({ message: 'Deleted car' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};