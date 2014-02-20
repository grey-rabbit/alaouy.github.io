module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: ['js/jquery.easing.min.js', 'js/jquery.slabtext.min.js', 'js/jquery.blockUI.min.js', 'js/waypoints.min.js', 'js/holder.js', 'js/custom.js'],
        dest: 'build/js/custom.min.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          'build/css/style.css': ['css/style.css', 'css/icomoon77ae.css', 'css/animate-custom.css', 'css/slabtext.css'],
          'build/css/bootstrap.css': ['css/bootstrap.css', 'css/bootstrap-responsive.css']
        }
      },
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: '*.css',
        dest: 'build/css/',
        ext: '.css'
      }
    },
    htmlmin: { // Task
      dist: { // Target
        options: { // Target options
          removeComments: false,
          collapseWhitespace: true
        },
        files: { // Dictionary of files
          'index.html': 'index-full.html' // 'destination': 'source'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the plugin that provides the "htmlmin" task.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);


};