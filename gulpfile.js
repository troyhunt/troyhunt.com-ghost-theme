var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    cmq = require('gulp-combine-media-queries');

gulp.task('bundle-minify-js', function () {
   gulp.src('assets/js/*.js')
      .pipe(uglify())
	  .pipe(concat('app.js'))
      .pipe(gulp.dest('assets/js'))
});

gulp.task('styles-build', function() {
  return gulp.src('assets/css/main.css')
    .pipe(cmq())
	.pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'));
})

gulp.task('default', ['bundle-minify-js', 'styles-build']);