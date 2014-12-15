'use strict';

module.exports = function(grunt) {

  var _ = require('lodash');

  grunt.registerTask('scripts', 'Build scripts source to JS.', function(){
    var tasks = [
      'jade:jst',
      // copied to build
      'copy:devScripts',
      'copy:vendorScripts',
      'requirejs',
      // diff copied to dest
      'diffCopy:scripts',
      'clean:scripts',
      'notify:scripts'
    ];

    if( grunt.option('dev') ) {
      // nice if doing a lot of js dev & don't want anything slowing you down
      // but can be confusing when trying to preview prod as main.pkgd isn't rebuilt
      //tasks = _.without(tasks, 'requirejs');
    }

    grunt.task.run(tasks);

  });
};
