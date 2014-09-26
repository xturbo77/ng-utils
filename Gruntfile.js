module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist'],
        copy: {
            main: {
                src: '**/ngxUtils.js',
                dest: 'dist/ngxUtils.js',
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app/ngxUtils.js',
                dest: 'dist/ngxUtils.min.js'
            }
        },
        ngdocs: {
            options: {
                dest: 'docs',
                scripts: ['docs/js/angular.min.js', 'app/ngxUtils.js']
            },
            api: {
                src: ['app/*.js'],
                title: 'API Documentation'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // load the ngdoc plugin
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy', 'ngdocs', 'uglify']);

};