module.exports = function(grunt) {
    // Load Tasks //
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        // Defaults //
        pkg: '.',

        // Path vars //
        paths: {
            path_project : ".",
            cssDir : "<%= paths.path_project %>/css/",
            assetsDir : "<%= paths.path_project %>/assets/",
            sassDir : "<%= paths.path_project %>/assets/sass/",
            jsDir : "<%= paths.path_project %>/assets/js/",
            distDir : "<%= paths.path_project %>/js/"
        },

        // Tasks //
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    "expand": true,
                    "cwd": "<%= paths.sassDir %>",
                    "src": ["**/*.scss"],
                    "dest": "<%= paths.cssDir %>",
                    "ext": ".css"
                }]
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: [{
                    "expand": true,
                    "cwd": "<%= paths.sassDir %>",
                    "src": ["**/*.scss"],
                    "dest": "<%= paths.cssDir %>",
                    "ext": ".css"
                }]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            lib: {
                src: ['<%= paths.jsDir %>libs/**/*.js'],
                dest: '<%= paths.distDir %>libs.js'
            },
            scripts: {
                src: ['<%= paths.jsDir %>**/*.js','!<%= paths.jsDir %>libs/**/*.js'],
                dest: '<%= paths.distDir %>common.js'
            }
        },

        uglify: {
            options: {
                separator: ';'
            },
            scripts: {
                files: [{
                    "expand": true,
                    "cwd": "<%= paths.distDir %>",
                    "src": ['**/*.js'],
                    "dest": "<%= paths.distDir %>"
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist:{
                files: [{
                    "expand": true,
                    "cwd": "<%= paths.cssDir %>",
                    "src": ["**/*.css"],
                    "dest": "<%= paths.cssDir %>",
                    "ext": ".css"
                }]
            }
        },

        watch: {
            scripts: {
                files: ['<%= paths.jsDir %>**/*.js'],
                tasks: ['concat']
            },
            styles: {
                files: '<%= paths.sassDir %>**/*.scss',
                tasks: ['sass:dev']
            }
        }
    });

    // Commandes //
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('js', ['concat','uglify']);
    grunt.registerTask('dist', ['sass:dist', 'concat', 'uglify', 'autoprefixer']);
};
