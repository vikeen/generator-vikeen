'use strict';

module.exports = function(grunt) {
  return {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: [
      "*.{js,json}",
      "<%= paths.src %>/scripts/**/*.{js,json}",
      "!<%= paths.src %>/scripts/vendor/**/*",
      "<%= paths.grunt %>/**/*.{js,json}"
      //,"<%= paths.test %>/**/*.js"
    ]
  };
};
