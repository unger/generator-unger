// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    src: 'src',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files

    watch: {
      bower: {
        files: ['bower.json']
      },
      js: {
        files: ['<%%= config.src %>/scripts/{,*/}*.js'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%%= config.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server']
      },
      styles: {
        files: ['<%%= config.src %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.src %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%%= config.src %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.src)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= config.dist %>/*',
            '!<%%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
		},
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.src %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= config.src %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },


    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= config.src %>',
          dest: '<%%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, 
		{
          expand: true,
          dot: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%%= config.dist %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%%= config.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%%= config.dist %>/scripts/{,*/}*.js',
            '<%%= config.dist %>/styles/{,*/}*.css',
            '!<%%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'copy:dist',
    'modernizr'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};