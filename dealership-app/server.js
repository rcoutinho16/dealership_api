//get environment variables
require('dotenv').config();

//setup express
const express = require('express');
const app = express();
const util = require("./app/util/util");

//setup mongoose
const db = require('./app/models');
console.log(`DB URL: ${db.url}`);
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to the database!");
        util.initializeRoles();
        util.initializeUsers();
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

//auth route
const authRouter = require('./app/routes/auth.route');
app.use('/api/auth', authRouter);

//cars route
const carRouter = require('./app/routes/cars.route');
app.use('/api/cars', carRouter);

//dealership route
const dealershipRouter = require('./app/routes/dealership.route');
app.use('/api/dealership', dealershipRouter);

//users route
const usersRouter = require('./app/routes/user.route');
app.use('/api/users', usersRouter);

//test route
const testRouter = require('./app/routes/test.route');
app.use('/api/test', testRouter);

//listen
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));