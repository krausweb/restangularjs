'use strict';

var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    concatCSS = require('gulp-concat-css'),
    concatJS = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    uglifyJS = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    uncss = require('gulp-uncss'),
    revAppend = require('gulp-rev-append'),
    //wiredep = require('wiredep').stream,
    //sftp = require('gulp-sftp'),
    cors = require('cors'),
    //connectPhp = require('gulp-connect-php'),
    //browserSync = require('browser-sync'),
    connect = require('gulp-connect');



gulp.task('default', ['connect', 'mainCSS', 'mainJS', 'concatCSS', 'concatJS', 'concatFrontCSS',
    'concatFrontJS', 'revAppendMain', 'html', 'restng', 'watch']);


/** ################################## STANDARD - START ##################################### **/


/****************************** connect *******************************/
gulp.task('connect', function() {
    connect.server({
        root: '',
        host: 'restangular.com.local',
        livereload: true,
        middleware: function() {
            return [cors()];
        }
    });
});

gulp.task('connectPhp', function() {
    connectPhp.server({}, function (){
        browserSync({
            hostname: 'restangular.com.local'
        });
    });
});
/******************************************************************** */



/****************************** watch *******************************/
gulp.task('watch',function(){
    gulp.watch(mainBowerFiles("**/*.js"), ["mainJS"]);
    gulp.watch(mainBowerFiles("**/*.css"), ["mainCSS"]);
    gulp.watch('assets/css/*.css', ["concatCSS"]);
    gulp.watch('assets/js/*.js', ["concatJS"]);
    gulp.watch('frontend/css/frontend.css', ["concatFrontCSS"]);
    gulp.watch('frontend/js/frontend.js', ["concatFrontJS"]);
    gulp.watch('assets/css_bundle/bundle.min.css', ["revAppendMain"]);
    gulp.watch('frontend/css/frontend.css', ["revAppendMain"]);
    gulp.watch('frontend/js/frontend.js', ["revAppendMain"]);
    gulp.watch('index.html', ["html"]);

    // additional
    gulp.watch('frontend/js/angularjs/rest.js', ["revAppendMain"]);
    gulp.watch('frontend/js/angularjs/rest.js', ["restng"])
});
/****************************************************************** **/



/*************************** mainBowerFiles ************************/
gulp.task('mainJS', function() {
    return gulp.src(mainBowerFiles("**/*.js"))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('mainCSS', function() {
    return gulp.src(mainBowerFiles("**/*.css"))
        .pipe(gulp.dest('assets/css'));
});
/********************************************************************************** /



/*** uncss *** for external plugin (bootstrap, sweetalert etc) *** for PRODUCTION *** */
// uncss for Main .html files (index.php etc)
// @todo uncssMain not used - bug with sweetalert // task default does not use the uncssMain
gulp.task('uncssMain', function () {
    return gulp.src('assets/css_bundle/bundle.min.css')
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css_used/main'));
});
/********************************************************************************* */



/********************* revAppend *** for frontend main page ********************** */
gulp.task('revAppendMain', function() {
    gulp.src('index.html')
        .pipe(revAppend())
        .pipe(gulp.dest('.'));
});
/********************************************************************************** */



/**************** CSS *** concatCSS/minifyCSS/sourcemaps/rename ********************/
// assets
gulp.task('concatCSS', function () {
    return gulp.src('assets/css/*.css')
        .pipe(concatCSS("bundle.css"))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest('assets/css_bundle'))
        .pipe(connect.reload());
});

// frontend
gulp.task('concatFrontCSS', function () {
    return gulp.src('frontend/css/frontend.css')
        .pipe(autoprefixer('last 2 versions', 'ie 10'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(rename("frontend.min.css"))
        .pipe(gulp.dest('frontend/css'))
        .pipe(connect.reload());
});
/******************************************************************************* */



/******************** JS *** concatJS/uglifyJS/sourcemaps/rename ******************/
// assets
gulp.task('concatJS', function () {
    return gulp.src(['assets/js/jquery.min.js', 'assets/js/angular.min.js', 'assets/js/angular-sanitize.min.js'
        ,'assets/js/sweetalert.min.js', 'assets/js/SweetAlert.min.js', 'assets/js/*.js'])
        .pipe(concatJS("bundle.js"))
        .pipe(uglifyJS())
        .pipe(sourcemaps.write())
        .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest('assets/js_bundle'))
        .pipe(connect.reload());
});

// frontend
gulp.task('concatFrontJS', function () {
    return gulp.src('frontend/js/frontend.js')
        .pipe(uglifyJS())
        .pipe(sourcemaps.write())
        .pipe(rename("frontend.min.js"))
        .pipe(gulp.dest('frontend/js'))
        .pipe(connect.reload());
});
/***************************************************************** */



/************************** HTML/PHP ****************************************/
// html
gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(connect.reload());
});

// php
gulp.task('php', function () {
    return gulp.src('index.php')
        .pipe(browserSync.reload());
});
/*********************************************************************** */
/** ################################## STANDARD - END ##################################### **/





/** ################################## ADDITIONAL - START ##################################### **/

// frontend
gulp.task('restng', function () {
    return gulp.src('frontend/js/angularjs/rest.js')
        .pipe(connect.reload('index.php'));
});

/** ################################## ADDITIONAL - END ##################################### **/