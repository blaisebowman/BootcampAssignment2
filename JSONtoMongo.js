/*
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
'use strict';
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');
mongoose.set('useCreateIndex', true)
/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
//mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, {useNewUrlParser: true});
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
fs.readFile('listings.json', 'utf8', function (err, data) { //used to read listings.json file
    if (err) {
        throw err; //throws error
    }
    JSON.parse(data).entries.forEach(function (listing) {//used to parse each entry
        var entry = new Listing({
            code: listing.code, //the code of the listing
            name: listing.name, //the name of the listing
            coordinates: {
                latitude: listing.latitude, //the latitude of the listing
                longitude: listing.longitude //the longitude of the listing
            },
            address: listing.address //the address of the listing
        })
        entry.save(function (err) {//saves the entry
            if (err) {
                throw err; //throws err
            }
        });
    });
});
//process.exit();
/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */