'use strict';

module.exports = function(grunt) {
  grunt.registerTask('setup', 'Create symlinks & copy bower packages.', function() {
    grunt.task.run(['symlink', 'bower']);
  });
};
