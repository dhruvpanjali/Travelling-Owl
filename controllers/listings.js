const Listing = require("../Models/Listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req, res) => {
    const listings = await Listing.find({});
    const count = await Listing.count();
    
    res.render("./Listings/index.ejs", {listings, count})
};

module.exports.newForm = (req, res) => {
    res.render("./Listings/listingForm.ejs");
};

module.exports.showListing = async(req, res, next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews", 
        populate: {
            path: "author"
        }
    }).populate("owner");
    
    if(!listing){
        req.flash("error", "No Listing Found");
        res.redirect("/listings");
    }else{
        res.render("./Listings/show.ejs", {listing});
    }
};

module.exports.postListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location, //Listing location
        limit: 1
      }).send();

    let url = req.file.path;
    let filename = req.file.filename;
    inputTags = req.body.listing.tags;

    const newListing = new Listing(req.body.listing);
    newListing.tags = inputTags.split(',').map(tag => tag.trim());
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry; //Listing location coordinates

    await newListing.save();
    req.flash("success", "Listing Created");
    res.redirect("/listings");
};

module.exports.editListingForm = async (req, res) =>{
    const {id} = req.params;
    const listing = await Listing.findById(id);

    let originalUrl = listing.image.url;
    if(originalUrl.match(/unsplash/gi)){
        originalUrl = originalUrl;
    }else{
        originalUrl = originalUrl.replace("/upload", "/upload/w_250");
    }
    if(!listing){
        req.flash("error", "No Listing Found");
        res.redirect("/listings");
    }else{
        res.render("./Listings/editForm.ejs", {listing, originalUrl});
    }
};

module.exports.updateListing = async (req, res) =>{
    const {id} = req.params;
    const updatedlisting = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id, updatedlisting, {runValidators: true});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};