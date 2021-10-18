//get environment variables
require('dotenv').config();

//setup express
const express = require('express');
const app = express();

//setup mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    "user": process.env.DEV_USER,
    "pass": process.env.DEV_PASS
});
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//setup cors
const cors = require('cors');
app.use(cors());

//JSON middleware
app.use(express.json());

//cars route
const carRouter = require('./routes/cars');
app.use('/api/cars', carRouter);

//dealership route
const dealershipRoute = require('./routes/dealership');
app.use('/api/dealership', dealershipRoute);

app.listen(3000, () => console.log('Server Started'));