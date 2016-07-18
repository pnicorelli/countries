var Q = require('q')
var fs = require('fs');
var svg2png = require("svg2png");

var picturePath = './flag-icon-css/flags/';

exports.cleanUp = function( filename ){
    var deferred = Q.defer();

    var fs = require('fs');
    var obj;
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        var cleanedData = [];

        obj = JSON.parse(data);
        obj.forEach( function(item, index, array){

            cleanedData.push({
                name: item.name,
                prefix: item.Dial,
                currency: item['ISO4217-currency_name'],
                alpha2: item['ISO3166-1-Alpha-2'],
                alpha3: item['ISO3166-1-Alpha-3']
            });
            if( cleanedData.length === array.length){
                deferred.resolve(cleanedData.filter( function(elm){
                  return elm.alpha2.length > 0;
                }));
            }
        });
    });

    return deferred.promise;
}
