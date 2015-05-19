// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Load other node modules
  grunt.loadNpmTasks('assemble');

  // Configurable paths
  var config = {
    src: 'src',
    dist: 'dist',
    dev: 'dev',
    pkg: grunt.file.readJSON('package.json')
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
        tasks: ['sass:dev']
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
          '<%%= config.dev %>/{,*/}*.html',
          '<%%= config.dev %>/*/styles/{,*/}*.css',
          '<%%= config.src %>/images/{,*/}*'
        ]
      },
	  assemble: {
        files: ['<%%= config.src %>/**/*.{hbs,json}'],
        tasks: ['newer:assemble']
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
              connect.static(config.dev),
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
      all: {
        files: [{
          dot: true,
          src: [
            '<%%= config.dist %>/*',
            '<%%= config.dev %>/*',
            '!<%%= config.dist %>/.git*'
          ]
        }]
      },
      dev: '<%%= config.dev %>/*'
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: false,
        includePaths: ['bower_components']
		},
      dev: {
        files: [{
          expand: true,
          cwd: '<%%= config.src %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%%= config.dev %>/styles',
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
          cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/',
          src: '*',
          dest: '<%%= config.dist %>/fonts/'
        }]
      },
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= config.src %>',
          dest: '<%%= config.dev %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
            'styles/{,*/}*.css',
            'scripts/{,*/}*.js'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: 'bower_components/jquery/dist/',
          src: 'jquery.js',
          dest: '<%%= config.dev %>/scripts/vendor/'
        },
        {
          expand: true,
          dot: true,
          cwd: 'bower_components/modernizr/',
          src: 'modernizr.js',
          dest: '<%%= config.dev %>/scripts/vendor/'
        },
        {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/',
          src: '*',
          dest: '<%%= config.dev %>/fonts/'
        }]
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
            '<%%= config.dev %>/scripts/{,*/}*.js',
            '<%%= config.dev %>/styles/{,*/}*.css',
            '!<%%= config.dev %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Assemble
    assemble: {
      options: {
    	data:   'src/data/*.json',
    	layoutdir: 'src/templates/layouts',
    	assets: '<%%= config.dev %>'
      },
      project: {
    	options: {
    	  layout: 'default.hbs',
    	  partials: 'src/templates/partials/**/*.hbs'
    	},
    	files: [{
    		expand: true,
    		cwd: 'src/templates/pages/',
    		src: '**/*.hbs',
    		dest: '<%%= config.dev %>'
    	}]
      }
    },
	
    // Strip unused css
    uncss: {
    	dist: {
    		options: {
    			htmlroot: '<%%= config.dev %>/',
    		},
    		files: {
    			'<%%= config.dist %>/styles/<%%= config.pkg.name %>.css': ['<%%= config.dev %>/index.html']
    		}
    	}
    },
    
    uglify: {
    	options: {
    		mangle: {
    			except: ['jQuery']
    		}
    	},
    	dist: {
    		files: {
    			'<%%= config.dist %>/scripts/<%%= config.pkg.name %>.min.js': ['<%%= config.dev %>/scripts/vendor/*.js', '<%%= config.dev %>/scripts/*.js', '!<%%= config.dev %>/scripts/vendor/modernizr.js']
    		}
    	}
    },
	

    // Run some tasks in parallel to speed up build process
    concurrent: {
      dev: [
        'sass:dev',
        'copy:dev',
        'assemble'
      ],
      dist: [
        'copy:dist',
        'modernizr:dist',
        'uncss',
        'uglify',
      ]
    },

  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:dev',
      'concurrent:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:all',
    'concurrent:dev',
    'concurrent:dist',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};