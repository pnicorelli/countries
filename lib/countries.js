/*
 * href: http://data.okfn.org/data/core/country-codes#resource-country-codes
 *
 * Comprehensive country codes: ISO 3166, ITU, ISO 4217 currency codes and many more
 *
 */

var http = require('http');
var fs = require('fs');
var Q = require('q');


/*
 * Download data from `url` into `filename`
 *
 * return {string} relative filename path
 */
exports.download = function(  ){
    var deferred = Q.defer();
    var filename = "./build/full.json";
    var url = "http://data.okfn.org/data/core/country-codes/r/country-codes.json"

    var file = fs.createWriteStream(filename);
    var request = http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close( function(){
            deferred.resolve(filename);
        });
      });
    });
    return deferred.promise;
}
