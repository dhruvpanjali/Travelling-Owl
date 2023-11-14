const express = require("express");
const wrapAsync = require("../utilities/wrapAsync");
const User = require("../Models/User.js");
const passport = require("passport");
const router = express.Router();
const {saveRedirectUrl} = require("../middlewares.js");
const userController = require("../controllers/users.js");

// -------------------REST API---------------------------------

router.route("/signup")
    .get(userController.signUpForm)
    .post(wrapAsync(userController.signUp));

router.route("/login")
    .get(userController.loginForm)
    .post(saveRedirectUrl, 
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }), 
        userController.login
    );

router.get("/logout", userController.logout);

module.exports = router;