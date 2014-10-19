/*
* Part of MZP.CZ Redesign Project
* @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
* @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
* @licence CC BY-NC-ND 3.0 CZ
*/

/*global module:false,require:false*/
/*jslint sloppy: true, white: true, indent: 2 */

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.util.linefeed = '\n';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * Part of <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @author <%= pkg.author.name %>\n' +
      ' * @copyright Copyright (c) <%= grunt.template.today("yyyy") %> Ministry of the Environment of the Czech Republic\n' +
      ' * @licence <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
      ' */',
    dirs: { src: 'src', dist: 'dist', libs: 'bower_components', modules: 'node_modules', tmp: 'tmp' },
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
      tooltip: {
        options: {
          stripBanners: false
        },
        src: [
          '<%=dirs.libs%>/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js'
        ],
        dest: '<%=dirs.tmp%>/tooltip.js',
        nonull: true
      },
      smartmenus:{
        options: {
          stripBanners: false
        },
        src: [
          '<%=dirs.libs%>/smartmenus/dist/jquery.smartmenus.js'
        ],
        dest: '<%=dirs.tmp%>/smartmenus.js',
        nonull: true          
      },
      grunticon: {
        options: {
          stripBanners: false
        },
        src: [
          '<%=dirs.modules%>/grunt-grunticon/tasks/grunticon/static/grunticon.loader.banner.js',
          '<%=dirs.modules%>/grunt-grunticon/tasks/grunticon/static/grunticon.loader.js'
        ],
        dest: '<%=dirs.tmp%>/grunticon.js',
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
          '<%= concat.tooltip.dest %>',
          '<%= concat.smartmenus.dest %>',
          '<%= concat.grunticon.dest %>',
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
          beautify: false,
          mangle: false,
          report: 'min',
          preserveComments:'all'
        },
        src: '<%= concat.final.dest %>',
        dest: '<%=dirs.tmp%>/site.js',
        nonull: true
      }
    },
    compass: {
      options: {
        banner: '<%= banner %>',
        
        sassDir: '<%=dirs.src%>/sass/',
        cssDir: '<%=dirs.dist%>/css/',
        imagesDir: '<%=dirs.src%>/img/',
        generatedImagesDir: '<%=dirs.dist%>/img/',
        importPath: [
          '<%=dirs.libs%>/bootstrap-sass-official/assets/stylesheets/',
          '<%=dirs.libs%>/owl-carousel2/src/scss/'
        ],
        relativeAssets: true
      },
      all: {
        options: {
          specify: '<%=dirs.src%>/sass/all.scss',
          outputStyle: 'compressed',
          noLineComments: true
        }
      },
      ie8: {
        options: {
          specify: '<%=dirs.src%>/sass/ie8.scss',
          outputStyle: 'nested',
          noLineComments: true
        }
      }
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
          immed: false,
          latedef: false,
          curly: false,
          undef: false,
          asi: true,
          laxbreak: true,
          laxcomma: true,
          expr: true,
          validthis: true,
          boss:true,
          sub:true,
          eqnull:true,
          browser:true,
          scripturl:true
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
      boxsizing: {
        nonull: true,
        src: '<%=dirs.libs%>/box-sizing-polyfill/boxsizing.htc',
        dest: '<%=dirs.dist%>/js/boxsizing.htc'
      },
      smartmenus: {
        nonull: true,
        src:  '<%=dirs.libs%>/smartmenus/dist/css/sm-core-css.css',
        dest: '<%=dirs.src%>/sass/_smartmenus-core.scss'
      },
      fonts: {
        nonull: true,
        src: '<%=dirs.src%>/fonts/icomoon/fonts/*',
        dest: '<%=dirs.dist%>/fonts/'
      },
      htmlTemplates: {
        files: [
          {nonull: true, expand: true, cwd: '<%=dirs.src%>/', src: ['*.html'], dest: '<%=dirs.dist%>/', filter: 'isFile'}
        ]
      }
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
      }
    },
    svgmin: {
      organizations: {
        files: [{
          expand: true,
          cwd: '<%=dirs.src%>/img/organizations',
          src: ['*.svg'],
          dest: '<%=dirs.tmp%>/organizations'
        }]
      }
    },
    grunticon: {
      organizations: {
        files: [{
          expand: true,
          cwd: '<%=dirs.tmp%>/organizations',
          src: ['*.svg', '*.png'],
          dest: '<%=dirs.dist%>/css/organizations'
        }],
        options: {
          cssprefix: '.org-',
          pngfolder: '../../img/organizations'
        }
      }
    },
    modernizr: {
      dist:{
        devFile: 'components/modernizr/modernizr.min.js',
        outputFile: '<%=dirs.dist%>/js/modernizr.min.js',
        matchCommunityTests: false,
        extra: {
          'shiv' : false,
          'printshiv' : false,
          'load' : false,
          'mq' : true,
          'cssclasses' : true,
          'csstransitions': true,
          'csstransforms' : false,
          'csstransforms3d' : false,
          'inlinesvg': true,
          'svg': true,
          'backgroundsize': true,
          'fontface': true,
          'opacity': true,
          'cssgradients': true
        },
        extensibility: {
          'testallprops': true,
          'prefixes': true,
          'hasevents': false,
          'addtest' : true,
          'prefixed' : true,
          'teststyles' : false,
          'testprops' : true,
          'domprefixes' : true
        },
        "parseFiles" : false
      }
    },
    clean: {
      concat: [
        '<%= concat.colorbox.dest %>',
        '<%= concat.owlcarousel.dest %>',
        '<%= concat.tooltip.dest %>',
        '<%= concat.smartmenus.dest %>',
        '<%= concat.grunticon.dest %>',
        '<%= concat.mzp.dest %>',
        '<%= concat.final.dest %>'
      ],
      uglify: [
        '<%= uglify.dev.dest %>'
      ],
      svgmin: [
        '<%=dirs.tmp%>/organizations'
      ],
      grunticon: [
        '<%=dirs.dist%>/css/organizations/grunticon.loader.js',
        '<%=dirs.dist%>/css/organizations/preview.html'
      ]
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
        tasks: ['compass', 'replace:css', 'replace:html']
      }
    }
  });
   
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks("grunt-modernizr");

  grunt.registerTask('default', ['htmlhint', 'copy', 'modernizr', 'svgmin', 'grunticon', 'compass', 'jshint:src', 'concat', 'jshint:tmp', 'uglify', 'replace', 'clean']);
};
