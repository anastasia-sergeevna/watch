const gulp = require('gulp');
const {src, dest, watch, parallel} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function styles() {
    return src('src/scss/style.scss')
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
};

function browsersync() {
    
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
}

function watching() {
    watch(['src/scss/style.scss'], styles);
    watch(['src/*.html']).on('change', browserSync.reload);
};


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, browsersync, watching);
