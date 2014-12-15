'use strict';

module.exports = function(grunt) {


  var util = require('util');
  var path = require('path');
  var paths = require('../../../../grunt/conf/paths')(grunt);
  var jade = require('grunt-contrib-jade/node_modules/jade');
  var _ = require('lodash/dist/lodash.underscore');
  _.str = require('underscore.string');
  _.mixin(_.str.exports());

  //grunt.log.oklns(util.inspect(paths));

  var jadeLocals = {};

  // Expose grunt & _ to Jade.
  var gruntOmissions       = ['log', 'verbose', 'package'];
  var gruntLogExports      = ['write','writeln','error','errorlns','ok','oklns','subhead','writeflags','debug'];

  jadeLocals.grunt         = _.omit(grunt, gruntOmissions);
  jadeLocals.grunt.log     = _.pick(grunt.log, gruntLogExports);
  jadeLocals.grunt.verbose = _.pick(grunt.verbose, gruntLogExports);
  jadeLocals._ = _;
  jadeLocals.util = util;
  jadeLocals.path = path;

  // Expose build as a top-level config.
  var build = grunt.config('build');
  jadeLocals.build = build;

  // Matches "./" preceded by either start of string (^) or "/" (\/).
  // Captures preceding element as either '/' or ''.
  var dotSlashRegex = /(^|\/)\.\//g;
  // Prune & keep preceding slashes by replacing with capture group.
  function pruneDotSlash(url) {
    return url && url.replace(dotSlashRegex, '$1');
  }

  jadeLocals.pruneDotSlash = pruneDotSlash;
  /*
  - console.log(pruneDotSlash())
  - console.log(pruneDotSlash('.'))
  - console.log(pruneDotSlash('./'))
  - console.log(pruneDotSlash('./test'))
  - console.log(pruneDotSlash('./test1/../test2'))
  - console.log(pruneDotSlash('test3././test4/./'))
  */

  // Matches leading slash
  var leadingSlashRegex = /^\//;
  // Trim leading slash.
  function trimLeadingSlash(url) {
    return url && url.replace(leadingSlashRegex, '');
  }

  // Matches trailing slash
  var trailingSlashRegex = /\/$/;
  // Trim trailing slash.
  function trimTrailingSlash(url) {
    return url && url.replace(trailingSlashRegex, '');
  }

  var trimSlashes = _.compose(trimLeadingSlash, trimTrailingSlash);

  jadeLocals.trimLeadingSlash = trimLeadingSlash;
  jadeLocals.trimTrailingSlash = trimTrailingSlash;
  jadeLocals.trimSlashes = trimSlashes;

  var marked = require('marked');

  function includeMarkdown(path) {
    var input = grunt.file.read(path);
    return marked(input, {smartLists: true});
  }

  jadeLocals.includeMarkdown = includeMarkdown;

  function jsonFilePath(path) {
    var paths = grunt.config('paths');
    //return paths.src+'/markup/includes/scripts/'+path+'.json';
    return paths.src+'/scripts/jade/includes/'+path+'.json';

  }

  function includeJSON(path) {
    var jsonPath = jsonFilePath(path);
    if (build === 'dev') {
      // raw file
      return grunt.file.read(jsonPath);
    } else {
      // compressed
      return JSON.stringify(grunt.file.readJSON(jsonPath));
    }
  }


  jadeLocals.includeJSON = includeJSON;

  // Expose JSON config as JS object to Jade.
  function getJSON(path) {
    var jsonPath = jsonFilePath(path);
    return grunt.file.readJSON(jsonPath);
  }
  jadeLocals.getJSON = getJSON;

  function ensureTrailingSlash(path) {
    if( _.isString(path) ) {
      return trimTrailingSlash(path) + '/';
    }
  }

  // Expose URL creation utilities to Jade.
  function urlPrefixer(prefix) {
    return function(url) {
      var paths = grunt.config('paths');
      var baseUrl = ensureTrailingSlash(paths.baseUrl);
      if( _.isString(url) ) {
        return ensureTrailingSlash(baseUrl+trimLeadingSlash(prefix)) + trimLeadingSlash(url);
      }
    };
  }

  function render(filePath) {
    var include = path.join(paths.project, paths.src, 'markup', filePath);
    //var locals = _.extend(_.omit(grunt.config('jade.htdocs.options'), 'data'), grunt.config('jade.htdocs.options.data'));
    var locals = jadeLocals;
    //grunt.log.oklns(util.inspect(locals));
    return jade.renderFile(include, locals);
  }

  jadeLocals.render = render;

  jadeLocals.projectUrl = urlPrefixer('');
  jadeLocals.projectImageUrl = urlPrefixer(paths.absoluteAssets.images);
  jadeLocals.projectScriptUrl = urlPrefixer(paths.absoluteAssets.scripts);
  jadeLocals.projectStyleUrl = urlPrefixer(paths.absoluteAssets.styles);

  return jadeLocals;
};
