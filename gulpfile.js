/**************************************/
//*****// Dependencies
/**************************************/

var gulp      = require('gulp'),
  uglify      = require('gulp-uglify'),
  rename      = require('gulp-rename'),
  browserSync = require('browser-sync'),
  sass        = require('gulp-sass'),
  livereload  = require('gulp-livereload'),
  sourcemaps  = require('gulp-sourcemaps');

/**************************************/
//*****// File Paths
/**************************************/
var path = {
  js: './public/js/*.js',
  jsOutput: './public/js',
  sass: './public/scss/*.scss',
  sassOutput: './public/css'
}

/**************************************/
//*****// Scripts Task
/**************************************/

gulp.task('scripts', function() {
  gulp.src([path.js, '!./public/js/*.min.js'])
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(path.jsOutput))
    .pipe(livereload());
})

/**************************************/
//*****// Sass Task
/**************************************/

gulp.task('sass', function () {
 return gulp.src(path.sass)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(rename("rombu.css"))
  .pipe(gulp.dest(path.sassOutput))
  .pipe(livereload());
});

/**************************************/
//*****// Watch Task
/**************************************/

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch([path.js, path.sass], ['scripts', 'sass']);
});

/**************************************/
//*****// Default Task
/**************************************/

gulp.task('default', ['scripts', 'sass', 'watch']);
