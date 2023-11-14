if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); // In order to run server from outside  
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utilities/expressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // Mongo Session Store
const flash = require("connect-flash");
const listingsRoute = require("./Routes/Listing.js");
const reviewsRoute = require("./Routes/Review.js");
const usersRoute = require("./Routes/User.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/User.js");

// In order to use PUT or DELETE Command
app.use(methodOverride('_method'))

app.set("view engine", "ejs"); // In order to use EJS
app.set("views", path.join(__dirname, "views")); // EJS Templates accessible from outside
app.use(express.static(path.join(__dirname, "public"))); // Frontend Files accessible from outside
app.engine("ejs", ejsMate);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ------------establishing mongoose connection-----------------
const databaseUrl = process.env.ATLASDB_URL;

main().then((res) => {
    console.log("connected to database");
})
.catch((err) => {
    console.log(err);
});

async function main() {
   await mongoose.connect(databaseUrl);
}
// ---------------------------------------------------------------

// Mongo Store
const store = MongoStore.create({
    mongoUrl: databaseUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error", () => {
    console.log("Error in Mongo Session Store", err);
});

// Initializing Session Options
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};

// Session & Flash Middlewares
app.use(session(sessionOptions));
app.use(flash());

// Passport Middlewares & requirements
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals define
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// API Routes
app.get("/", (req,res) => {
    res.redirect("/listings");
});
app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", usersRoute);
// ---------------------------------------------------------------

// Universal ERROR ROUTE
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page not found"));
});

// Express Middleware (ERROR ROUTE)
app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong"} = err;
    res.status(status).render("error.ejs", {err});
});

// ---------------------------------------------------------------
app.listen(8080, () => {
    console.log(`listening on port 8080`);
});