var yeoman = require('yeoman-generator');


module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');
  },

  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function () {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {}
    };

    bower.dependencies['bootstrap-sass-official'] = "~3.2.0";
    bower.dependencies.jquery = "~1.11.1";

    bower.dependencies.modernizr = "~2.8.2";

    this.copy('bowerrc', '.bowerrc');
    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },
  

  app: function () {
    this.directory('src');
    this.mkdir('src/scripts');
    this.mkdir('src/styles');
    this.mkdir('src/images');

    this.write('src/scripts/main.js', 'console.log(\'\\\'Allo \\\'Allo!\');');
  }
  
  

});