var gulp = require('gulp');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('watch', function () {
  gulp.watch('./src/styles.styl', ['styles']);
});

gulp.task('styles', function () {
  return gulp.src('./src/styles.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['watch', 'styles']);