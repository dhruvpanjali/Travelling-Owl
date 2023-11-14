const mongoose = require("mongoose");
// const initdata = require("./newdata.js");
const Listing = require("../Models/Listing.js");

// ------------establishing mongoose connection-----------------
const Monog_url = "mongodb://127.0.0.1:27017/TravellingOwl";

main().then((res) => {
    console.log("connected to database");
})
.catch((err) => {
    console.log(err);
});

async function main() {
   await mongoose.connect(Monog_url);
}
// ------------------Inserting Data------------------------------------------

const initDB = async () => {
    // await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner: "6552fde9e4eaa714cd92b989"}));
    await Listing.insertMany(initdata.data);
    console.log("Data Inserted");
}

initDB();