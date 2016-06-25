module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style:'compressed'
        },
        files: {
          'assets/dist/css/screen.css' : 'scss/screen.scss'
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
        src: ['js/site.js'],
        dest: 'assets/dist/js/site.js'
      }
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
  grunt.registerTask('default',['sass', 'autoprefixer', 'browserify', 'watch']);
}