const mongoose = require('mongoose');

const dealershipSchema = mongoose.Schema({
    address: {
        type: String,
        required: false
    },
    adressGoogleMapsUrl: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        required: false
    },
    facebookUrl: {
        type: String,
        required: false
    },
    instagramUrl: {
        type: String,
        required: false
    },
    whatsappUrl: {
        type: String,
        required: false
    },
    youtubeUrl: {
        type: String,
        required: false
    },
    twitterUrl: {
        type: String,
        required: false
    },
    mondayToFridayOpening: {
        type: String,
        required: false
    },
    mondayToFridayClosing: {
        type: String,
        required: false
    },
    saturdayOpening: {
        type: String,
        required: false
    },
    saturdayClosing: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Dealership', dealershipSchema);