const db = require("../models");
const Role = db.role;
const User = db.user;
const bcrypt = require("bcryptjs");

const Util = {}

Util.initializeRoles = async () => {
    const count = await Role.estimatedDocumentCount();
    if(!count){
        const userRole = new Role( {name: "user"} );
        await userRole.save();
        const adminRole = new Role( {name: "admin"} );
        await adminRole.save();
    }
}

Util.initializeUsers = async () => {
    const count = await User.estimatedDocumentCount();
    if(!count){
        const user = new User({
            username: "root",
            password: bcrypt.hashSync("initpass", 12)
        });
        await user.save();
        const roles = await Role.find();
        user.roles = roles.map(role => role._id);
        await user.save();
    }
}

module.exports = Util;