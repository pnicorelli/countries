var Q = require('q')
var fs = require('fs-extra');
var svg2png = require('svg2png');


var sourcePath = './flag-icon-css/flags/';
var destPath = './build/flags/';

var scopeData = [];
var step, index=1;

exports.createPics = function( data ){
    var deferred = Q.defer();
    step =  100 / data.length;
    makePics(data, function( dataWithPics ){
        return deferred.resolve(dataWithPics);
    });

    return deferred.promise;
}

function makePics(data,  cb){
    index++;
    var progress = Math.floor( index * step );
    if( data.length === 0 ){
        cb( scopeData );
    }
    var picture = data[0];
    data.shift();
    process.stdout.write("- Graphics generation: "+progress+"% complete                    \r");
    movePictures( picture.alpha2 ).then( function( result ){
        picture["images"] = result;
        scopeData.push( picture );
        makePics( data, cb );
    }).catch( function(err){
        throw err;
    })
}

function movePictures( countryCode ){
    var deferred = Q.defer();
    var code = countryCode.toLowerCase();

    if( fs.existsSync( sourcePath + '4x3/' + code + '.svg') ){
        Q.all([
            makePNG(sourcePath + '1x1/' + code + '.svg', destPath + 'png/1x1/' + code + '.png'),
            makePNG(sourcePath + '4x3/' + code + '.svg', destPath + 'png/4x3/' + code + '.png'),
            fs.copySync(sourcePath + '1x1/' + code + '.svg', destPath + 'svg/1x1/' + code + '.svg'),
            fs.copySync(sourcePath + '4x3/' + code + '.svg', destPath + 'svg/4x3/' + code + '.svg'),
        ]).then( function( result ){
            // flag data information that goes into the country
            var img = {
                'svg_square': destPath + 'svg/1x1/'+code+'.svg',
                'svg': destPath + 'svg/4x3/'+code+'.svg',
                'png_square': destPath + 'png/1x1/'+code+'.png',
                'png': destPath + 'png/4x3/'+code+'.png',
            }

            return deferred.resolve(img);
        }).catch( function(err){
            throw err;
        });
    } else {
        return deferred.resolve({});
    }



    return deferred.promise;
}


/*
 * svg2png on promise
 */
function makePNG(source, dest){
    var deferred = Q.defer();
    svg2png(source, dest, function( err ){
        if( err ) throw err;

        return deferred.resolve();
    })
    return deferred.promise;
}
