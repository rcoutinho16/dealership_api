const db = require('../models');
const User = db.user;

exports.getUser = async (req, res, next) => {
    let user;
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            user = await User.findById(req.params.id, 'username email');
        }
        if (!user){
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
};