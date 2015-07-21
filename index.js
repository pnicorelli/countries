
var countries = require('./lib/countries')
var filter = require('./lib/filter')
var fs = require('fs');
var pictures = require('./lib/pictures')
var Q = require('q')

var promise = Q.fcall( countries.download );

    // 1 - Download data
    process.stdout.write("- Download countries resources \r");
return promise.then( function(filename){
    process.stdout.write("* Download complete             \n");
    process.stdout.write("- Filtering countries\r");
    return filter.cleanUp(filename);

}).then( function( data ){
    process.stdout.write("* Filtered "+data.length+" countries\n");
    process.stdout.write("- Flag creation\r");
    // data contain the cleaned data
    return pictures.createPics(data);
}).then( function( data ){
    process.stdout.write("* Flag created for "+data.length+" countries                \n");
    fs.writeFile('./build/countries.json', JSON.stringify( data ), function(err){
        if(err) throw err;
        process.stdout.write("* Data saved\n");
    });


}).catch( function(err){
    console.log("Exception:")
    console.log(err)
    process.kill(process.pid, 'SIGKILL');
});
