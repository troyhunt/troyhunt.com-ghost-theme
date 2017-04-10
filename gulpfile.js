var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    mmq = require('gulp-merge-media-queries');
	
gulp.task('bundle-minify-js', function () {
  return gulp.src(['assets/js/classie.js', 'assets/js/main.js', 'assets/js/sponsorship.js', 'assets/js/disqus.js', 'assets/js/subscribe.js'])
    .pipe(uglify())
	.pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('bundle-minify-google-analytics', function () {
  return gulp.src(['assets/js/google-analytics.js'])
    .pipe(uglify())
	.pipe(concat('google-analytics.min.js'))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('styles-build', function() {
  return gulp.src('assets/css/main.css')
    .pipe(mmq())
	.pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'))
});

gulp.task('default', ['bundle-minify-js', 'bundle-minify-google-analytics', 'styles-build']);
