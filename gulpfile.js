var gulp = require('gulp'),//load gulp 
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint');

//run lint task first before run the script
gulp.task('scripts',['lint'], function () {
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
});
gulp.task('lint',function () {
  return gulp.src(['./js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('watch', function () {
  gulp.watch('js/*.js', ['scripts']);
});
// browser auto-refresh on changes
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch(['*.html', 'build/js/*.js', 'css/*.css']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);
