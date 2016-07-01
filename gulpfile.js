'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('istanbul', function (cb) {
    gulp.src('./app/**/*.js')
        .pipe(plugins.istanbul({
            includeUntested: true
        })) // Covering files
        .pipe(plugins.istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['./test/**/*.js'])
                .pipe(plugins.mocha())
                .pipe(plugins.istanbul.writeReports({
                    reporters: ['text', 'text-summary']
                }))
                .on('end', cb);
        });
});

gulp.task('test', ['istanbul']);

gulp.task('default', ['test']);
