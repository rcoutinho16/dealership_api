const db = require("../models");
const User = db.user;

const verifySignUp = {};

verifySignUp.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    //Username
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!"});
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    //Email
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            res.status(400).send({ message: "Failed! E-mail is already in use!"});
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    next();
};

verifySignUp.checkRolesExist = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; ++i){
            if(!db.ROLES.has(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} doesn't exist` 
                });
            }
        }
    }
    next();
};

module.exports = verifySignUp;