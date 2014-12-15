'use strict';

module.exports = function(grunt) {
  grunt.registerTask('markup', 'Build markup source to HTML.', function(){
    grunt.task.run(['jade:htdocs', 'diffCopy:htdocs', 'clean:markup', 'notify:markup']);
  });
};
