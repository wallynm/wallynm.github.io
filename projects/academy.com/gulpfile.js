var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence');

// Gulp Sass
gulp.task('sass', function() {
    return gulp.src('./scss/academy.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['iOS > 8', 'Explorer > 9', 'last 3 versions', 'Firefox > 30']}))
        .pipe($.sourcemaps.write('.', { includeContent: false }))
        .pipe($.plumber.stop())
        .pipe(gulp.dest('css'));
});

// Gulp Watch
gulp.task('default', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});

