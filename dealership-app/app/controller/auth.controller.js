const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
     try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12)
        });
        let newUser = await user.save();
        //if (req.body.roles) {
        //    const roles = await Role.find({ name: { $in: req.body.roles } });
        //    newUser.roles = roles.map(role => role._id);
        //    await newUser.save();
        //} else {
            const role = await Role.findOne({ name: "user" });
            user.roles = [role._id];
            await user.save();
        //}
        res.status(201).json(newUser);
     } catch (err) {
        res.status(500).json({ message: err.message });
     }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");
        if (!user) {
            return res.status(401).json({ message: "Invalid Username/Password" });
        }
        
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid Username/Password" });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 //24 hours
        })

        let authorities = [];
        for (let i = 0; i < user.roles.length; ++i) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });

    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};