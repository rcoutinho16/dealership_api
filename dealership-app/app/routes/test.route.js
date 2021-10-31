const router = require('express').Router();
const test = require("../controller/test.controller");
const middleware = require("../middlewares");

router.get("/all", test.allAccess);

router.get("/user", 
    [
        middleware.authJwt.verifyToken
    ], test.userAccess
);

router.get("/admin",
    [
        middleware.authJwt.verifyToken,
        middleware.authJwt.isAdmin
    ], test.adminAccess
);

module.exports = router;