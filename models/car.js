const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    src: {
        type: String,
        required: true
    },
});

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    km: {
        type: Number,
        required: true
    },
    show: {
        type: Boolean,
        required: false,
        default: true
    },
    images:{
        type: [imageSchema],
        required: false,
    }
});

module.exports = mongoose.model('Car', carSchema);