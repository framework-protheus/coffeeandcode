'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
    lint: ['./gulpfile.js', './app/**/*.js', './test/**/*.js'],
    watch: ['./gulpfile.js', './app/**', './test/**/*.js', '!test/{temp,temp/**}'],
    tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
    source: ['./app/**/*.js'],
    report: './report'
};

gulp.task('istanbul', function (cb) {
    gulp.src(paths.source)
        .pipe(plugins.istanbul({
            includeUntested: true
        })) // Covering files
        .pipe(plugins.istanbul.hookRequire())
        .on('finish', function () {
            gulp.src([paths.tests])
                .pipe(plugins.mocha())
                .pipe(plugins.istanbul.writeReports({
                    reporters: ['text', 'text-summary']
                }))
                .on('end', cb);
        });
});

gulp.task('report:istanbul', function (cb) {
    gulp.src(paths.source)
        .pipe(plugins.istanbul({
            includeUntested: true
        })) // Covering files
        .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src(paths.tests)
                .pipe(plugins.mocha())
                .pipe(plugins.istanbul.writeReports({
                    dir: paths.report + '/istanbul'
                })) // Creating the reports after tests runned
                .on('finish', function () {
                    process.chdir(__dirname);
                    cb();
                });
        });
});

gulp.task('report:clear', function (cb) {
    var del = require('del');
    del(paths.report, cb);
});

gulp.task('test', ['istanbul']);

gulp.task('default', ['test']);
