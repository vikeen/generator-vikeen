'use strict';

var yeoman = require('yeoman-generator');

var VikeenGenerator = yeoman.generators.Base.extend({
  // Your initialization methods (checking current project state, getting configs, etc)
  initializing: function() {
    this.pkg = require('../../package.json');
  },

  // Where you prompt users for options (where you'd call this.prompt())
  prompting: function() {},

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  configuring: function() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');

    this.copy('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');
    this.copy('_package.json', 'package.json');
  },

  default: function() {
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_README.md', 'README.md');

    this.directory('src/', 'src/');
    this.directory('grunt/', 'grunt/');
  },

  // Where you write the generator specific files (routes, controllers, etc)
  writing: function() {},

  // Where conflicts are handled (used internally)
  conflicts: function() {},

  // Where installation are run (npm, bower)
  install: function() {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  },

  // Called last, cleanup, say good bye, etc
  end: function() {}
});

module.exports = VikeenGenerator;
