// 
var gulp = require('gulp'),
	  less = require('gulp-sources-less'),
  	cssmin = require('gulp-minify-css'),
  	concat = require('gulp-concat'),
  	minify = require('gulp-minify'),

  	sourcemaps = require('gulp-sourcemaps'),
  	copy = require('gulp-copy');

// Base folder to store compiled files
var buildFolder = '../public';

// Scripts files to import and compile
var scriptFiles = [
	'node_modules/jquery/dist/jquery.js',
	'js/*.js'];

// Compiles less files
gulp.task('less', function() {
  return gulp.src('less/import.less')
	  .pipe(sourcemaps.init())
	  .pipe(less())
	  .pipe(cssmin())
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest(buildFolder + '/css'));
});

// Copy images to public folder
gulp.task('copy-images', function(){
	return gulp.src(['images/**/*.*'])
	  .pipe(copy(buildFolder + '/images', {prefix: 1}));
});

// Compile js files into public folder
gulp.task('scripts', function() {
  return gulp.src(scriptFiles)
	  .pipe(sourcemaps.init())
	  .pipe(concat('main.js'))
    .pipe(minify({ext:{min:'.min.js'}}))
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest(buildFolder + '/js'));
});

// Gulp task para executar todos comandos juntos
gulp.task('default', ['less', 'copy-images', 'scripts']);