'use strict';

var autoprefixer   = require('autoprefixer');
var colors         = require('colors');
var cssnano        = require('cssnano');
var clean          = require('gulp-clean');
var debug          = require('gulp-debug');
var extReplace     = require('gulp-ext-replace');
var gulp           = require('gulp');
var postcss        = require('gulp-postcss');
var sass           = require('gulp-sass');
var runSequence    = require('run-sequence');
var watch          = require('gulp-watch');

var path = {
  src: {
    dir:     'sass',
    sass:    'sass/*.sass'
  },

  watch: {
    sass:    'sass/**/*.sass'
  },

  built: {
    dir:     'css',
    css:     'css'
  }
};

gulp.task('clean', function () {
  return gulp.src(path.built.dir)
    .pipe(clean({force: true}));
});

gulp.task('sass:build:min', function () {

  var processors = [
    autoprefixer({browsers: ['last 2 version', 'ie 10', 'ie 11']}),
    cssnano
  ];
  return gulp.src(path.src.sass)
    .pipe(debug({title: 'sass:'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(extReplace('.min.css'))
    .pipe(gulp.dest(path.built.css))
});

gulp.task('sass:build', function () {
  runSequence('sass:build:min');
});

gulp.task('rebuild', function () {
  runSequence(
    'clean',
    'sass:build',
    function(){
      console.log('project is ' + colors.green.underline('rebuilt'));
    }
  );
});

gulp.task('watch', function () {

  watch([path.watch.sass], function () {
    gulp.start('sass:build');
  });

});

gulp.task('run', ['rebuild', 'watch']);
