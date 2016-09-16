var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var katex = require('katex');

gulp.task('jade', function() {
  return gulp.src('client/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('client/'))
})

gulp.task('default', function() {
  // place code for your default task here
  console.log("Default gulp task");
});

gulp.task('sass', function() {
  return gulp.src('./client/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./client/scss/**/*.scss', ['sass']);
});
