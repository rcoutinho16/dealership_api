const db = require('../models');
const User = db.user;

const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
    try {
        let users = await User.find({}, 'username email').populate("roles", "-__v");

        let response = [];

        for (let i = 0; i < users.length; ++i) {
            let authorities = [];
            for (let j = 0; j < users[i].roles.length; ++j) {
                authorities.push("ROLE_" + users[i].roles[j].name.toUpperCase());
            }
            response.push({
                _id: users[i]._id,
                username: users[i].username,
                email: users[i].email,
                roles: authorities
            });
        }
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = (req, res) => {
    res.send(res.user);
};

exports.updateUser = async (req, res) => {
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 12);
        }
        const updatedUser = await User.updateOne({ '_id': res.user._id }, req.body);
        res.json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: 'Deleted user' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};