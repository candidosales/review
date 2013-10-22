/*global module:false*/
module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.author.email %> - <%= pkg.author.twitter%>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


    // Task configuration.
    dir: {
       app: 'app',
       dist: 'dist'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= dir.dist %>/*'
          ]
        }]
      }
    },
    less: {
      development: {
        files: {
          "<%= dir.app %>/css/app.css": "<%= dir.app %>/css/style.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "<%= dir.app %>/css/app.css": "<%= dir.app %>/css/style.less"
        }
      }
    },
    useminPrepare: {
      html: '<%= dir.app %>/index.html',
      options: {
        dest: '<%= dir.dist %>'
      }
    },
    imagemin: {
      dist: {
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '<%= dir.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= dir.dist %>/img'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          useShortDoctype: true,
          removeCDATASectionsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= dir.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= dir.dist %>'
        }]
      }
    },
    copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= dir.app %>',
                    dest: '<%= dir.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        //'components/**/*',
                        'img/{,*/}*.{gif,webp}',
                        'css/fonts/*'
                    ]
                }]
            }
    },
    usemin: {
      html: ['<%= dir.dist %>/{,*/}*.html'],
      css: ['<%= dir.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= dir.dist %>']
      }
    },
    cropthumb: {
      options: {
        width: 1290,
        height: 720,
        cropAmount: 0.5,
        overwrite: false
      },
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= dir.dist %>/img',
        dest: '<%= dir.dist %>/img/resize',
        src: [
            'home.jpg'
        ]
      }]
    },
  }); 

  // Default task.
  grunt.registerTask('build', [
    'clean:dist',
    'less:production',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'copy',
    'uglify',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);

};
