const Listing = require("./Models/Listing.js");
const Review = require("./Models/review.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const expressError = require("./utilities/expressError.js");

module.exports.loggedInCheck = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; 
        req.flash("error", "Must be logged in to continue");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.ownerCheck = async (req, res, next) => {
    let{id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error", "Sorry! You Must be the Owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.authorCheck = async (req, res, next) => {
    let{id, reviewId} = req.params;
    let review = await Review.findById(reviewId);

    if(!review.author._id.equals(res.locals.currentUser._id)){
        req.flash("error", "Sorry! You Must be the Owner of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// LISTING VALIDATION
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(","); 
        throw new expressError(400, errorMsg);
    }else{
        next();
    }
};

// REVIEW VALIDATION
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(","); 
        throw new expressError(400, errorMsg);
    }else{
        next();
    }
};