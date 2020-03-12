module.exports = function (grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),


      browserSync: {
         bsFiles: {
            src: [
               "./markup/*.html",
               "./markup/css/*.css",
               "./markup/js/*.js",
            ]
         },
         options: {
            watchTask: true,
            server: {
               baseDir: "./markup"
            }
         }
      },


      // Concatenate Configuration
      concat: {
         options: {
            separator: ';'
         },
         script: {
            src: [
               'assets/dist/js/script.js'
            ],
            dest: 'markup/js/script.min.js'
         }
      },


      // Uglify Configuration
      uglify: {
         assets: {
            files: {
               'markup/js/jquery.min.js': ['assets/dist/js/plugin/jquery.js'],
               'markup/js/slick.min.js': ['assets/dist/js/plugin/slick.min.js'],
               'markup/js/jcf.scrollable.min.js': ['assets/dist/js/plugin/jcf.scrollable.js'],
               'markup/js/jcf.select.min.js': ['assets/dist/js/plugin/jcf.select.js'],
               'markup/js/jcf.file.min.js': ['assets/dist/js/plugin/jcf.file.js'],
               'markup/js/jcf.checkbox.min.js': ['assets/dist/js/plugin/jcf.checkbox.js'],
               'markup/js/jcf.radio.min.js': ['assets/dist/js/plugin/jcf.radio.js'],
               'markup/js/jcf.min.js': ['assets/dist/js/plugin/jcf.js'],
               'markup/js/script.min.js': ['assets/dist/js/script.js'],
               'markup/js/home.min.js': ['assets/dist/js/home.js']
            }
         }
      },

      // Sass Configuration
      sass: {
         options: {
            loadPath: ['bower_components/foundation/foundation.scss']
         },
         assets: {
            options: {
               sourcemap: 'none',
               style: 'compressed'
            },
            files: [{
               expand: true,
               cwd: 'assets/dist/scss/',
               src: ['*.scss'],
               dest: 'markup/css/',
               ext: '.css'
            }]
         }
      },


      imagemin: {
         png: {
            options: {
               optimizationLevel: 7,
               progressive: true
            },
            files: [{
               expand: true,
               cwd: 'assets/img/',
               src: ['**/*.png'],
               dest: 'markup/img/'
            }]
         },

         jpg: {
            options: {
               optimizationLevel: 7,
               progressive: true
            },
            files: [{
               expand: true,
               cwd: 'assets/img/',
               src: ['**/*.{jpg,jpeg,png}'],
               dest: 'markup/img/'
            }]
         },
      },

      // Add vendor prefixed styles
      autoprefixer: {
         options: {
            browsers: ['last 2 version']
         },
         markup: {
            files: [{
               expand: true,
               cwd: 'markup/css/',
               src: '**/*.css',
               dest: 'markup/css/'
            }]
         }
      },

      // Watch Configuration
      watch: {
         grunt: {files: ['Gruntfile.js'], tasks: ['default']},

         sass: {
            files: 'assets/dist/scss/**/*.scss',
            tasks: ['buildCss', 'autoprefixer']
         },

         script: {
            files: 'assets/dist/js/*.js',
            tasks: ['buildJs']
         },

         markup: {
            files: 'assets/**/*.html',
            tasks: ['htmlbuild']
         },

         imagemin: {
            files: 'assets/img/*.{png,jpg,jpeg}',
            tasks: ['imagemin']
         }
      },

      fixturesPath: './',
      sourcesPath: 'markup',

      htmlbuild: {
         assets: {
            src: 'assets/*.html',
            dest: '<%= sourcesPath %>/',
            options: {
               beautify: true,
               relative: true,
               sections: {
                  layout: {
                     header: 'assets/templates/header.html',
                     footer: 'assets/templates/footer.html'
                  }
               },
            }
         }
      }

   });

// Load Grunt tasks
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-html-build');
   grunt.loadNpmTasks('grunt-browser-sync');
   grunt.loadNpmTasks('grunt-contrib-imagemin');
   grunt.loadNpmTasks('grunt-autoprefixer');

// Register Grunt tasks
   grunt.registerTask('buildCss', ['sass']);
   grunt.registerTask('buildJs', ['concat', 'uglify']);
   grunt.registerTask('default', ['buildCss', 'buildJs', 'htmlbuild', 'browserSync', 'watch', 'sass', 'autoprefixer', 'imagemin']);


};
