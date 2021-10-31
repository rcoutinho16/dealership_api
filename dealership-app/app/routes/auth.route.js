const router = require('express').Router();
const auth = require("../controller/auth.controller");
const middleware = require("../middlewares");

router.use((req,res,next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Sign-Up
router.post("/signup",
    [
        middleware.verifySignUp.checkDuplicateUsernameOrEmail,
        middleware.verifySignUp.checkRolesExist
    ], auth.signup
);

// Sign-In
router.post("/signin", auth.signin);

module.exports = router;