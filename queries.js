//Blaise Bowman, CEN3031 FALL 2019
/* Add all the required libraries*/
/* Connect to your database using mongoose - remember to keep your key secret*/
/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var fs = require('fs'),
    mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config.js');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(config.db.uri, {useNewUrlParser: true});
const util = require('util')

var findLibraryWest = function () {
    /*
      Find the document that contains data corresponding to Library West,
      then log it to the console.
     */
    Listing.findOne({name: 'Library West'}, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
    });
};
var removeCable = function () {
    /*
      Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
      on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
      and remove this listing from your database and log the document to the console.
     */
    Listing.findOneAndRemove({
        code: "CABL"
    })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.error(err)
        })
};
var updatePhelpsLab = function () {
    /*
      Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
      log the updated document to the console.
     */
    Listing.findOneAndUpdate({"name": "Phelps Laboratory"}, {$set: {address: "1953 Museum Road Gainesville, FL 32611"}}, {returnOriginal: false}, (err, data) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(data);
    });
};

var retrieveAllListings = function () {
    /*
      Retrieve all listings in the database, and log them to the console.
     */
   /* Listing.find({}, function (err, data) {
        if (err) throw err;
        console.log(util.inspect(data, {maxArrayLength: null})) //prints all documents

    });*/

   Listing.find().collation({locale:'en',strength: 2}).sort({code:1})
        .then( (data) =>{
            console.log(util.inspect(data, { maxArrayLength: null })) //prints all documents
        })
        .catch(err => {
            console.error(err)
        })

};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
