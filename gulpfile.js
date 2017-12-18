/**************************************/
//*****// Dependencies
/**************************************/

var gulp      = require('gulp'),
  uglify      = require('gulp-uglify'),
  rename      = require('gulp-rename'),
  sass        = require('gulp-sass'),
  cleanCSS    = require('gulp-clean-css'),
  livereload  = require('gulp-livereload')

/**************************************/
//*****// File Paths
/**************************************/
var path = {
  js: './public/js/main.js',
  jsOutput: './public/js',
  sass: './public/scss/rombu.scss',
  sassOutput: './public/css',
  views: './views/*.handlebars'
}

/**************************************/
//*****// Scripts Task
/**************************************/

gulp.task('scripts', function() {
  return gulp.src(path.js)
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
  .pipe(sass().on('error', sass.logError))
  .pipe(rename("rombu.css"))
  .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
  .pipe(gulp.dest(path.sassOutput))
  .pipe(livereload());
});

/**************************************/
//*****// Watch Task
/**************************************/

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(path.views);
  gulp.watch(path.js, ['scripts']);
  gulp.watch(path.sass, ['sass']);
});

/**************************************/
//*****// Default Task
/**************************************/

gulp.task('default', ['scripts', 'sass', 'watch'], function() {
  gulp.watch(path.js, ['scripts']);
  gulp.watch(path.sass, ['sass']);
});
