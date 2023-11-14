const Listing = require("../Models/Listing.js");
const Review = require("../Models/review.js");

module.exports.postReview = async(req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "Review Added Succesfully");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async(req, res) => {
    const {id, reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Succesfully");
    res.redirect(`/listings/${id}`);
};