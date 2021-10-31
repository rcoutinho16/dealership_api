const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Roles = db.role;

const authJwt = {};

authJwt.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.userId = decoded.id;
        next();
    });
}

authJwt.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Roles.find({
            _id: {$in: user.roles }
        });

        for (let i = 0; i < roles.length; ++i){
            if(roles[i].name === "admin") {
                next();
                return;
            }
        }

        res.status(403).send({ message: "Require Admin Role" });
        return;

    } catch (err) {
        req.status(500).send({ message: err.message });
        return;
    }

}

module.exports = authJwt;