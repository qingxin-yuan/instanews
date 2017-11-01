const gulp = require('gulp'),//load gulp 
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror'),
  babel = require('gulp-babel');

//sass compiled into css files
gulp.task('sass', ()=> {
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
//transpile es5  files into es6
gulp.task('babel', () => {
  return gulp.src('./js/es6/*.js')
      .pipe(babel())
      .pipe(gulp.dest('./js/es5'))
});

//run lint task first before run the script
gulp.task('scripts',['lint'], ()=> {
  return gulp.src('./js/es5/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('lint', ()=> {
  return gulp.src(['./js/es5/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('watch', ()=> {
  gulp.watch('./sass/*.scss',['sass']);
  gulp.watch('./js/es6/*.js',['babel']);
  gulp.watch('./js/es5/*.js', ['scripts']);
  
});
// browser auto-refresh on changes
gulp.task('browser-sync', ()=> {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch(['*.html', 'build/js/*.min.js', 'build/css/*.min.css']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);
