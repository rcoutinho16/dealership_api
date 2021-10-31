const db = require('../models');
const Car = db.car;

exports.getCar = async (req, res, next) => {
    let car;
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            car = await Car.findById(req.params.id);
        }
        if (!car){
            return res.status(404).json({ message: 'Cannot find car' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.car = car;
    next();
};