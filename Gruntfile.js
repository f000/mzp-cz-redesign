/*
* Part of MZP.CZ Redesign Project
* @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
* @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
* @licence CC BY-NC-ND 3.0 CZ
*/

/*global module:false*/

module.exports = function(grunt) {
  grunt.util.linefeed = '\n';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * Part of <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @author <%= pkg.author.name %>\n' +
      ' * @copyright Copyright (c) <%= grunt.template.today("yyyy") %> Ministry of the Environment of the Czech Republic\n' +
      ' * @licence <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
      ' */',
    dirs: { src: 'src', dist: 'dist', libs: 'bower_components', tmp: 'tmp' },
    concat: {
      colorbox: {
        options: {
          stripBanners: false
        },
        src: [
          '<%=dirs.libs%>/colorbox/jquery.colorbox.js'
        ],
        dest: '<%=dirs.tmp%>/colorbox.js',
        nonull: true
      },
      owlcarousel: {
        options: {
          stripBanners: false
        },
        src: [
          '<%=dirs.libs%>/owl-carousel2/src/js/owl.carousel.js',
          '<%=dirs.libs%>/owl-carousel2/src/js/owl.navigation.js'
        ],
        dest: '<%=dirs.tmp%>/owlcarousel.js',
        nonull: true
      },
      qtip2: {
        options: {
          stripBanners: false
        },
        src: [
          '<%=dirs.libs%>/qTip2/src/core/intro.js',
          '<%=dirs.libs%>/qTip2/src/core/constants.js',
          '<%=dirs.libs%>/qTip2/src/core/class.js',
          '<%=dirs.libs%>/qTip2/src/core/options.js',
          '<%=dirs.libs%>/qTip2/src/core/content.js',
          '<%=dirs.libs%>/qTip2/src/core/position.js',
          '<%=dirs.libs%>/qTip2/src/core/toggle.js',
          '<%=dirs.libs%>/qTip2/src/core/focus.js',
          '<%=dirs.libs%>/qTip2/src/core/disable.js',
          '<%=dirs.libs%>/qTip2/src/core/button.js',
          '<%=dirs.libs%>/qTip2/src/core/style.js',
          '<%=dirs.libs%>/qTip2/src/core/events.js',
          '<%=dirs.libs%>/qTip2/src/core/jquery_methods.js',
          '<%=dirs.libs%>/qTip2/src/core/jquery_overrides.js',
          '<%=dirs.libs%>/qTip2/src/core/defaults.js',
          '<%=dirs.libs%>/qTip2/src/position/viewport.js',
          '<%=dirs.libs%>/qTip2/src/core/outro.js'
        ],
        dest: '<%=dirs.tmp%>/qtip2.js',
        nonull: true
      },
      mzp:{
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        src: [
          '<%=dirs.src%>/js/modernizr.svgasimg.js',
          '<%=dirs.src%>/js/site.js'
        ],
        dest: '<%=dirs.tmp%>/mzp.js',
        nonull: true
      },
      final:{
        src: [
          '<%= concat.colorbox.dest %>',
          '<%= concat.owlcarousel.dest %>',
          '<%= concat.qtip2.dest %>',
          '<%= concat.mzp.dest %>'
        ],
        dest: '<%=dirs.tmp%>/final.js',
        nonull: true
      }
    },
    uglify: {
      dist: {
        options: {
          compress: true,
          beautify: false,
          mangle: true,
          report: 'gzip',
          preserveComments:'some'
        },
        src: '<%= concat.final.dest %>',
        dest: '<%=dirs.dist%>/js/site.min.js',
        nonull: true
      },
      dev: {
        options: {
          compress: false,
          beautify: true,
          mangle: false,
          report: 'min',
          preserveComments:'all'
        },
        src: '<%= concat.final.dest %>',
        dest: '<%=dirs.tmp%>/site.js',
        nonull: true
      }
    },
    sass: {
      options: {
        includePaths: [
          '<%=dirs.libs%>/bootstrap-sass-official/assets/stylesheets/',
          '<%=dirs.libs%>/owl-carousel2/src/scss/',
          '<%=dirs.libs%>/bourbon/dist/'
        ]
      },
      dist: {
        options: {
          outputStyle: 'nested',
          sourceComments: 'none'
        },
        files: {
          '<%=dirs.dist%>/css/all.css' : '<%=dirs.src%>/sass/all.scss' ,
          '<%=dirs.dist%>/css/ie8.css' : '<%=dirs.src%>/sass/ie8.scss'
        }
      }
  /* ,    dev: {
        options: {
          outputStyle: 'nested',
          sourceComments: 'map'
        },
        files: {
          '<%=dirs.src%>/sass/all.scss' : '<%=dirs.dist%>/css/all.css' ,
          '<%=dirs.src%>/sass/print.scss' : '<%=dirs.dist%>/css/print.css' ,
          '<%=dirs.src%>/sass/ie8.scss' : '<%=dirs.dist%>/css/ie8.css'
        }
      }*/
    },
    htmlhint: {
      all: {
        options: {
          'tag-pair': true
        },
        src: '<%=dirs.src%>/*.html'
      }
    },
    jshint: {
      options: {
        globals: {
					console: true, jQuery: true, '$': true, QTip: true, TRUE: true, FALSE: true, NULL: true,
					WIDTH: true, HEIGHT: true, TOP: true, LEFT: true, BOTTOM: true, RIGHT: true, X: true, Y: true,
					CENTER: true, FLIP: true, FLIPINVERT: true, SHIFT: true, QTIP: true,  PROTOTYPE: true,
					CORNER: true,  CHECKS: true, PLUGINS: true, NAMESPACE: true, ATTR_HAS: true, ATTR_ID: true,
					WIDGET: true, SELECTOR: true, INACTIVE_EVENTS: true, CLASS_FIXED: true, CLASS_DEFAULT: true,
					CLASS_FOCUS: true, CLASS_HOVER: true, CLASS_DISABLED: true, replaceSuffix: true, oldtitle: true,
					trackingBound: true, BROWSER: true, createWidgetClass: true, sanitizeOptions: true, cloneEvent: true
          }
      },
      src: {
        options: {
          curly: true,
          undef: true,
          asi: false,
          browser:true
        },
        files: {
          src: ['<%=dirs.src%>/js/*']
        }
      },
      tmp: {
        options: {
          strict: false,
          immed: true,
          latedef: false,
          curly: true,
          undef: false,
          asi: true,
          laxbreak: true,
          expr: true,
          validthis: true,
          boss:true,
          sub:true,
          eqnull:true,
          browser:true

        },
        files: {
          src: ['<%= concat.final.dest %>']
        }
      }
    },
    copy: {
      jquery: {
        nonull: true,
        src: '<%=dirs.libs%>/jquery/dist/jquery.min.js',
        dest: '<%=dirs.dist%>/js/jquery.min.js'
      },
      html5shiv: {
        nonull: true,
        src: '<%=dirs.libs%>/html5shiv/dist/html5shiv.min.js',
        dest: '<%=dirs.dist%>/js/html5shiv.min.js'
      },
      respond: {
        nonull: true,
        src: '<%=dirs.libs%>/respond/dest/respond.min.js',
        dest: '<%=dirs.dist%>/js/respond.min.js'
      },
      fonts: {
        nonull: true,
        src: '<%=dirs.src%>/fonts/icomoon/fonts/*',
        dest: '<%=dirs.src%>/fonts/'
      },
      htmlTemplates: {
        files: [
          {nonull: true, expand: true, cwd: '<%=dirs.src%>/', src: ['*.html'], dest: '<%=dirs.dist%>/', filter: 'isFile'}
        ]
      }
    },
    clean: {
      concat: [
        '<%= concat.colorbox.dest %>',
        '<%= concat.owlcarousel.dest %>',
        '<%= concat.qtip2.dest %>',
        '<%= concat.mzp.dest %>',
        '<%= concat.final.dest %>'
      ],
      uglify: [
        '<%= uglify.dev.dest %>'
      ]
    },
    replace: {
      html: {
        src: ['<%=dirs.dist%>/*.html'],
        overwrite: true,
        replacements: [{
          from: /NCMARK[0-9]{0,12}/g,
          to: "NCMARK<%= grunt.template.today('yymmddHHMMss') %>"
        }]
      },
      css: {
        src: ['<%=dirs.dist%>/css/*.css'],
        overwrite: true,
        replacements: [{
          from: /NCMARK[0-9]{0,12}/g,
          to: "NCMARK<%= grunt.template.today('yymmddHHMMss') %>"
        }]
      },
    },
    watch: {
      html: {
        files: ['<%=dirs.src%>/*.html'],
        tasks: ['htmlhint', 'copy:htmlTemplates']
      },
      js: {
        files: ['<%=dirs.src%>/js/*'],
        tasks: ['jshint:src','concat', 'jshint:tmp', 'uglify', 'replace:html']
      },
      css: {
        files: ['<%=dirs.src%>/sass/*'],
        tasks: ['sass:dev', 'replace:css', 'replace:html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('default', ['htmlhint', 'copy',  'sass:dist', 'jshint:src', 'concat', 'jshint:tmp', 'uglify', 'replace', 'clean']);
};
