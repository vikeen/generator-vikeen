'use strict';

module.exports = function(grunt) {
  grunt.registerTask('serve', 'Start a server with Grunt, conditionally watching files for changes and livereloading.', function() {
      grunt.task.run(['browserSync:serve', 'concurrent:watch']);
  });
};
