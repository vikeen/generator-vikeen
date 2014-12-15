'use strict';

module.exports = function(grunt) {

  // read paths config from same directory.
  var paths = require('./paths')(grunt);

  var path = require('path');
  //var util = require('util');

  // Load custom Jade helpers module.
  var jadeLocalsPath = path.join(paths.project, paths.src, 'scripts', 'jade', 'helpers', 'node-locals.js');
  var jadeLocals = require(jadeLocalsPath)(grunt);

  jadeLocals.build = '<%= build %>';

  // Gather paths in Jade locals.
  jadeLocals.paths = paths;

  return {
    htdocs: {
      options: {
        pretty: grunt.option('dev'),
        data: jadeLocals
      },
      files: [{
        expand: true,
        cwd: '<%= paths.src %>/markup/htdocs/',
        src: '**/*.jade',
        dest: '<%= paths.build %>/htdocs/',
        ext: '.html'
      }]
    },
    jst: {
      options: {
        client: true,
        amd: true,
        namespace: false
      },
      files: [{
        expand: true,
        cwd: '<%= paths.src %>/markup/jst/',
        src: '**/*.jade',
        dest: '<%= paths.build %>/scripts/jst/',
        ext: '.js'
      }]
    }
  };
};
