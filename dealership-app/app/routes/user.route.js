const router = require('express').Router();
const user = require("../controller/user.controller");
const middleware = require("../middlewares");

// Getting All Users
router.get('/',
    [
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdmin
    ], user.getUsers
);

// Getting One User
router.get('/:id', 
    [
        middleware.getUser.getUser,
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdminOrYourself
    ], user.getUserById
);

// Updating One User
router.put('/:id', 
    [
        middleware.getUser.getUser,
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdminOrYourself
    ], user.updateUser
);

// Deleting One User
router.delete('/:id',
    [
        middleware.getUser.getUser,
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdmin
    ], user.deleteUser
);

module.exports = router;