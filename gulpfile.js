var gulp = global.gulp = require('gulp');
var sass = require('gulp-sass');
var gulpJade = require('gulp-jade');
var jade = require('jade');
var katex = require('katex');

gulp.task('jade', function() {
  return gulp.src('client/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('client/'));
});

gulp.task('sass', function() {
  return gulp.src('./client/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/css/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./client/scss/**/*.scss', ['sass']);
});


gulp.task('default', ['jade', 'sass']);
