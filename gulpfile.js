var gulp = require('gulp'),//load gulp 
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  prettyError = require('gulp-prettyerror');

//sass compiled into css files
gulp.task('sass', function() {
 gulp.src('./sass/style.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(autoprefixer({
       browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

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
  gulp.watch('./sass/*.scss',['sass']);
  gulp.watch('./js/*.js', ['scripts']);
});
// browser auto-refresh on changes
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch(['*.html', 'build/js/*.min.js', 'build/css/*.min.css']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);
