var gulp = require('gulp')
  , less = require('gulp-less')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css')
  , rename = require('gulp-rename')
  ;


/**
 * Dev:Less
 * LESS to CSS
 */
gulp.task('dev:less', function() {
    return gulp
    .src(['supportedbrowser.less'])
    .pipe(less({
        paths: [
//            'src/assets/less',
//            'src/vendors'
        ]
    }))
    .pipe(gulp.dest('./'))
});

/**
 * Dev:Watch
 */
gulp.task('dev:watch', function() {
    gulp.watch(['./supportedbrowser.less'], ['dev:less']);
});

/**
 * Production:Compile
 */
gulp.task('dist', ['dev:less'], function() {
  gulp
    .src(['./supportedbrowser.css'])
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./'));
  gulp
    .src(['./supportedbrowser.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./'));
    
});

/**
 * $ gulp
 */
gulp.task('default', [
    'dev:less',
    'dev:watch'
]);
