'use strict';

var generators = require('yeoman-generator');

var VikeenGenerator = generators.NamedBase.extend({
  method1: function() {
    console.log('method 1 just ran');
  },
  method2: function() {
    console.log('method 2 just ran');
  }
});

module.exports = VikeenGenerator;
