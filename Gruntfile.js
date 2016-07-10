module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'public/css/app.css': 'public/scss/app.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'public/scss/app.min.css': 'public/scss/app.scss' }
      }
    },
    concat: {
      dist: {
        src: ['public/js/app.js', 'public/js/**/*.js'],
        dest: 'public/js/app.js'
      }
    },
    uglify: {
      'public/js/app.min.js': 'public/js/app.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['public/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      },
      js: {
        files: ['public/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: { livereload: true }
      },
      index: {
        files: ['index.html'],
        options: { livereload: true }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass:expanded', 'concat', 'uglify', 'watch']);
};