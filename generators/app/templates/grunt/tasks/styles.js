'use strict';

module.exports = function(grunt) {
  grunt.registerTask('styles', 'Build styles source to CSS.', function(){
    var tasks = [
      'copy:vendorStyles',
      'stylus:compile',
      'diffCopy:styles',
      'clean:styles',
      'notify:styles'
    ];

    grunt.task.run(tasks);
  });
};
