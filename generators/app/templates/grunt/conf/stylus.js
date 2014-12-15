'use strict';

module.exports = function(grunt) {

  // read paths config from same directory.
  var paths = require('./paths')(grunt);
  var ap = require('autoprefixer');
  var koutoSwiss = require('kouto-swiss');
  //var inspect = require('util').inspect;
  //grunt.log.oklns(inspect(paths));

  // yay node path util
  //var path = require('path');

  // set up in gruntfile before load-grunt-config
  var build = grunt.config('build');
  var _ = require('lodash');

  var isDev = ( build === 'dev');

  //grunt.log.ok('build: %s', build);

  // define stylus plugins.
  // Hat tip to Artem Sapegin.
  // http://blog.sapegin.me/all/css-workflow

  // https://github.com/jenius/autoprefixer-stylus
  // https://github.com/ai/autoprefixer
  function autoprefixer() {
    //return require('autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9');
    return function(style) {
      style = this || style;
      style.on('end', function(err, css){
        return ap({browsers: ['> 5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie > 8', 'ios > 6']}).process(css).css;
      });
    };
  }

  // https://github.com/sapegin/csso-stylus
  // http://css.github.io/csso/
  function csso() {
    if( !isDev ) {
      return require('csso-stylus')({restructure: false});
    } else {
      return _.identity;
    }
  }

  return {
    compile: {
      options: {
        // @import will inline include the .css,
        // instead outputting @import CSS literal
        'include css': true,
        // output comments with source line numbers
        linenos: isDev,
        compress: !isDev,
        define: {
          build: build,
          paths: paths.absoluteAssets
        },
        rawDefine: ['paths'],
        use: [
          koutoSwiss,
          autoprefixer,
          csso
        ]
      },
      files: [{
        expand: true,
        cwd: '<%= paths.src %>/styles/lib',
        src: [
          '**/*.styl',
          // ignore files & folders
          // prefixed with _
          '!**/_*',
          '!**/_*/**'
        ],
        dest: '<%= paths.build %>/styles/',
        ext: '.css',
        extDot: 'last'
      }]
    }
  };
};
