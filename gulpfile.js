var gulp = require('gulp');

var watch = require('gulp-watch');
var notify = require('gulp-notify');
var util = require('gulp-util');
var plumber = require('gulp-plumber');

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>")
  util.log(util.colors.red('Error'), error.message);
}

// JAVASCRIPT

gulp.task('javascript', function() {
  gulp.src('js/main.js')
  .pipe(jshint())
  .on('error', errorNotify)
  .pipe(jshint.reporter('jshint-stylish'))
  .on('error', errorNotify)
  .pipe(jscs('.jscsrc'))
  .on('error', errorNotify)
  .pipe(notify({ message: 'Javascript task complete' }));
});

// TASKS

gulp.task('watch', function() {
  gulp.watch(['index.js'], ['javascript']);
});

gulp.task('default', ['watch']);
