var gulp = require('gulp');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var server = require('gulp-webserver');

var htmlmin = require('gulp-htmlmin');

// var babel = require('gulp-babel');


gulp.task('devScss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devScss'))
})

//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090
        }))
})

//开发环境
gulp.task('dev', gulp.series('devScss', 'server', 'watch'))

//build 
// gulp.task('bUglify', function() {
//     return gulp.src('./src/js/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/js'))
// })

gulp.task('bCopy', function() {
    return gulp.src('./src/js/libs/*.js')
        .pipe(gulp.dest('./build/js/libs'))
})

//线上环境css
gulp.task('bCss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./build/css'))
})

gulp.task('bHtml', function() {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'))
})

//线上环境
gulp.task('build', gulp.parallel('bCopy', 'bCss', 'bHtml'))