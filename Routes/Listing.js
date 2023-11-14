const express = require("express");
const router = express.Router({mergeParams: true}); 
const wrapAsync = require("../utilities/wrapAsync.js");
const {loggedInCheck, ownerCheck, validateListing} = require("../middlewares.js");
const listingController = require("../controllers/listings.js");
const searchController = require("../controllers/search.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// -------------------REST API---------------------------------

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(loggedInCheck, upload.single("listing[image]"), validateListing ,wrapAsync(listingController.postListing));

router.get("/new", loggedInCheck, listingController.newForm); 

//SEARCH ROUTE
router.get("/search", searchController.searchResult);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(loggedInCheck, ownerCheck, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(loggedInCheck, ownerCheck, wrapAsync(listingController.deleteListing));

//EDIT ROUTE
router.get("/:id/edit", loggedInCheck, ownerCheck, wrapAsync(listingController.editListingForm));

module.exports = router;