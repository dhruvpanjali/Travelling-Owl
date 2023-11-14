const User = require("../Models/User.js");

module.exports.signUpForm = (req, res) => {
    res.render("./Users/signUpForm.ejs");
};

module.exports.signUp = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", `<b>${username}</b>, Welcome to Traveling Owl`)
            res.redirect("/listings");
        });
    } catch (err){
        req.flash("error", err.message);
        res.redirect("/signUp");
    }
};

module.exports.loginForm = (req, res) => {
    res.render("./Users/loginForm.ejs");
};

module.exports.login = async(req, res) => {
    let {username} = req.body;
    const fl = req.flash("success", `<b>${username}</b>, Welcome Back to Travelling Owl`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    const userName = req.user.username;
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", `<b>${userName}</b>, You are successfully Logged out`);
        res.redirect("/listings");
    });
};