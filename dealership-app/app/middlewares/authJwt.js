const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Roles = db.role;

const authJwt = {};

authJwt.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.id;
        next();
    });
};

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
        return res.status(403).json({ message: "Require Admin Role" });
    } catch (err) {
        return req.status(500).json({ message: err.message });
    }
};

module.exports = authJwt;