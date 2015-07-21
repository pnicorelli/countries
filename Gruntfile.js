var index = require('./index'));

module.exports = function(grunt) {

    // A very basic default task.
    grunt.registerTask('clean', 'clean the build tree', function() {
        grunt.file.recurse('./build/', function(abspath, rootdir, subdir, filename){
            grunt.file.delete(rootdir+subdir+'/'+filename);
        });
    });


}
