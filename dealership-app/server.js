//get environment variables
require('dotenv').config();

//setup express
const express = require('express');
const app = express();

//setup mongoose
const db = require('./app/models');
console.log(`DB URL: ${db.url}`);
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//setup cors
const cors = require('cors');
app.use(cors());

//JSON middleware
app.use(express.json());

//cars route
const carRouter = require('./app/routes/cars');
app.use('/api/cars', carRouter);

//dealership route
const dealershipRoute = require('./app/routes/dealership');
app.use('/api/dealership', dealershipRoute);

//listen
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));