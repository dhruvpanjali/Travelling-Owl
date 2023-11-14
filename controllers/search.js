const Listing = require("../Models/Listing.js");

module.exports.searchResult = async(req, res) => {
    let {q, country} = req.query;
    const regex = new RegExp(q||country, 'i');
    // Decode the URL-encoded string
    q = q ? decodeURIComponent(q) : '';
    let query = {
      $or: [
        { title: { $regex: regex } },
        { location: { $regex: regex } },
        { tags: { $regex: regex } },
        { category: { $in: regex } },
        { country: { $regex: regex } }
      ]
    };

    if (q && country) {
      query = {
          $and: [
              query,
              {
                  $or: [
                      { title: { $regex: new RegExp(q, 'i') } },
                      { location: { $regex: new RegExp(q, 'i') } },
                      { tags: { $regex: new RegExp(q, 'i') } },
                  ]
              },
              { country: { $regex: new RegExp(country, 'i') } }
          ]
      };
  }

    const listings = await Listing.find(query);
    const count = listings.length;
    res.render("./Listings/search.ejs", {listings, count})
};