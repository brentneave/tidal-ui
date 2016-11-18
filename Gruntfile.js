module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style:'compressed'
        },
        files: {
          'assets/dist/css/screen.css' : 'assets/src/scss/screen.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'assets/dist/css/screen.css':'assets/dist/css/screen.css'
        }
      }
    },
    browserify: {
      main: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        src: ['assets/src/js/main.js'],
        dest: 'assets/dist/js/main.js'
      }
    },
    uglify: {
      dist: {
        src: 'assets/dist/js/main.js',
        dest: 'assets/dist/js/main.js'
      },
    },
    watch: {
      css: {
        files: ['assets/src/scss/**/*'],
        tasks: ['sass', 'autoprefixer']
      },
      js: {
        files: ['assets/src/js/**/*', 'package.json'],
        tasks: ['browserify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default',['sass', 'autoprefixer', 'browserify', 'watch']);
  grunt.registerTask('build',['sass', 'autoprefixer', 'browserify', 'uglify']);
}
