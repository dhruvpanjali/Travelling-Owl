const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utilities/wrapAsync.js");
const {validateReview, loggedInCheck, authorCheck} = require("../middlewares.js");
const reviewController = require("../controllers/reviews.js");

// -------------------REST API---------------------------------

// CREATE ROUTE
router.post("/", loggedInCheck, validateReview, wrapAsync(reviewController.postReview));

// DELETE ROUTE
router.delete("/:reviewId", loggedInCheck, authorCheck, wrapAsync(reviewController.deleteReview));

module.exports = router;
